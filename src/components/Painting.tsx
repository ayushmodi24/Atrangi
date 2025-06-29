import { useEffect, useState } from "react";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import DownloadDoneTwoToneIcon from '@mui/icons-material/DownloadDoneTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SocialShareButtons from "./ShareButton";
import ShareIcon from '@mui/icons-material/Share';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import FavouriteButton from "./FavButton";
// import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import axios from "axios";

const menuItems = [
  { name: "ALL ARTWORKS" },
  { name: "POSTERS" },
  { name: "PORTRAIT & SKETCHES" },
  { name: "KEYCHAINS" },
  { name: "POLAROIDS" }
];

interface PaintingItem {
  _id: string;
  imgUrl: string[];
  category: string;
  title?: string;
}

export default function Painting() {
  const [isOpen, setIsOpen] = useState(true);
  // const [liked, setLiked] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [openShareId, setOpenShareId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<PaintingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL ARTWORKS");
  const [paintings, setPaintings] = useState<PaintingItem[]>([]);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [imageIndexes, setImageIndexes] = useState<{ [id: string]: number }>({});
  const [groupedPaintings, setGroupedPaintings] = useState<{ [category: string]: PaintingItem[] }>({});
  const navigate = useNavigate();

  // State at the top
  const [likedPaintings, setLikedPaintings] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (id: string) => {
    setLikedPaintings(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  // const toggleLike = () => setLiked(!liked);


  const checkWindowWidth = () => {
    const isMobile = window.innerWidth <= 768;  // Adjust this breakpoint as needed
    if (isMobile) {
      setIsOpen(false);  // Close sidebar on mobile view
    } else {
      setIsOpen(true);   // Open sidebar on larger screens
    }
  };

  useEffect(() => {
    // Set initial sidebar state based on window size
    checkWindowWidth();

    // Listen for window resize events to adjust sidebar visibility
    window.addEventListener('resize', checkWindowWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkWindowWidth);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Add this debug line
        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setCartItems(res.data);
      } catch (error: any) {
        console.error("Error details:", error.response?.data); // More detailed error
      }
    };

    fetchCartItems();
  }, []);

  // Fetch paintings when the component is first mounted
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/paintings", {
          withCredentials: true,
        });
        setPaintings(res.data);

        // Group paintings by category
        const grouped: { [category: string]: PaintingItem[] } = {};
        res.data.forEach((painting: PaintingItem) => {
          if (!grouped[painting.category]) {
            grouped[painting.category] = [];
          }
          grouped[painting.category].push(painting);
        });
        setGroupedPaintings(grouped);

        const idxs: { [key: string]: number } = {};
        res.data.forEach((p: PaintingItem) => {
          idxs[p._id] = 0;
        });
        setImageIndexes(idxs);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };

    fetchPaintings();
  }, []); // Only fetch once when component mounts

  const handlePrev = (id: string) => {
    setImageIndexes(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  };
  const handleCopy = (id: string) => {
    const link = `${window.location.origin}/paintings/${id}`;
    navigator.clipboard.writeText(link)
      // .then(() => alert('Link copied'))
      .then(() => {
        setCopiedLinkId(id); // mark this one as copied
        setTimeout(() => setCopiedLinkId(null), 2000); // reset after 2s
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  const handleNext = (id: string, total: number) => {
    setImageIndexes(prev => ({ ...prev, [id]: Math.min(total - 1, (prev[id] || 0) + 1) }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // setIsOpen(false); // Close the sidebar when a category is selected
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      {isOpen ? (
        <div className="fixed h-full w-65 bg-gray-900 text-white p-4 shadow-lg z-40">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl italic font-semibold">Gallery</div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:text-gray-300">
              <CloseIcon />
            </button>
          </div>
          <ul className="space-y-3">
            {menuItems.map((item, i) => (
              <li
                key={i}
                onClick={() => handleCategoryChange(item.name)}
                className={`px-6 py-2 rounded hover:bg-gray-700 cursor-pointer ${selectedCategory === item.name ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 ml-3 mt-2 fixed z-50 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ViewSidebarIcon />
        </button>
      )}

      {/* Main Content */}
      <div className={`p-3 transition-all duration-300 ${isOpen ? 'ml-10 md:ml-63 ' : 'ml-0 md:ml-5'}`}>
        <h1 className="text-center text-4xl bg-gray-500 py-4 ml-4 rounded-xl font-semibold italic mt-6">Painting Collection</h1>

        {/* Render paintings based on the selected category */}
        <div className="mt-10">
          {selectedCategory === "ALL ARTWORKS" ? (
            // Display all artworks
            <div className={`grid gap-6  ${isOpen
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-5'  // Open sidebar
              : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'  // Closed sidebar
              }`}>
              {paintings.map(item => {
                const idx = imageIndexes[item._id] || 0;
                const src = `http://localhost:3000${item.imgUrl[idx]}`;
                 const liked = likedPaintings[item._id] || false;
                return (
                  <div key={item._id} className="bg-white p-4 rounded overflow-hidden shadow-md relative">
                    <img
                      src={src}
                      alt={item.title || item.category}
                      className="w-full h-60 object-cover rounded cursor-pointer"
                      onClick={() => navigate(`/paintings/${item._id}`)}
                    />
                    {item.imgUrl.length > 1 && idx > 0 && (
                      <button
                        onClick={() => handlePrev(item._id)}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-1 rounded-full"
                      >
                        <ChevronLeftIcon />
                      </button>
                    )}
                    {item.imgUrl.length > 1 && idx < item.imgUrl.length - 1 && (
                      <button
                        onClick={() => handleNext(item._id, item.imgUrl.length)}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-1 rounded-full"
                      >
                        <ChevronRightIcon />
                      </button>
                    )}
                    <div>
                      <button
                        onClick={() => toggleLike(item._id)}
                        className={`absolute top-4 right-4 text-xl border border-black rounded-full p-2 backdrop-blur bg-white/70 hover:scale-110 transition ${liked ? 'text-red-500' : 'text-gray-600'
                          }`}
                      >
                        {liked ? <FaHeart /> : <FaRegHeart />}
                      </button>
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Add to Favourite
                      </span>
                    </div>
                    <FavouriteButton paintingId={item._id} />
                    <div className="mt-3 text-center font-semibold w-full items-center justify-between text-gray-800">
                      {/* {item.title || item.category} */}
                      <button
                        className="py-2 px-18 rounded-xl bg-red-100 cursor-pointer hover:bg-red-300 hover:text-wite shadow-md border-1 "
                        onClick={async () => {
                          // setCartItems(prev => [...prev, item]);
                          // if (!cartItems.find(ci => ci._id === item._id)) {
                          //   setCartItems(prev => [...prev, item]);
                          // }
                          // setIsOpenCart(true)

                          const token = localStorage.getItem("token");

                          if (!token) {
                            navigate("/signin", { state: { returnTo: location.pathname } }); // redirect to login page
                            return;
                          }

                          try {
                            const res = await axios.post(
                              "http://localhost:3000/cart",
                              { paintingId: item._id },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                                withCredentials: true,
                              }
                            );

                            console.log("Added to cart:", res.data);

                            if (!cartItems.find(ci => ci._id === item._id)) {
                              setCartItems(prev => [...prev, item]);
                            }
                            setIsOpenCart(true);
                          } catch (error) {
                            console.error("Add to cart failed:", error);
                          }
                        }}>
                        Add to Cart

                      </button>
                      {/* <button onClick={handleCopy}>Copy Link</button> */}

                    </div>
                    <div className="mt-3 text-center font-semibold w-full items-center justify-between text-gray-800">
                      <button className="py-2 px-18 rounded-xl bg-yellow-100 cursor-pointer hover:bg-yellow-300 hover:text-wite shadow-md border-1">
                        Buy Now
                      </button>
                    </div>

                    <div key={item._id} className="bg-white flex justify-between p-4 rounded shadow-md relative">
                      <button
                        className={`mt-2 px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2 border transition-all duration-300 ${copiedLinkId === item._id
                          ? "bg-green-500 text-white shadow-md"
                          : "bg-gray-500 text-amber-50 hover:bg-gray-800 hover:text-white"
                          }`}
                        onClick={() => handleCopy(item._id)}
                      >
                        {copiedLinkId === item._id ? <div className="flex ">
                          <DownloadDoneTwoToneIcon />
                          <p>Copied</p>
                        </div> : 'Copy Link'}
                      </button>


                      <button
                        onClick={() => setOpenShareId(item._id)}
                        className="mt-2 px-4 py-2 rounded-xl bg-purple-600 text-white  hover:bg-purple-700 flex"
                      >
                        <div className="flex mr-2">
                          <ShareIcon />
                        </div>
                        Share
                      </button>

                      {/* Modal open conditionally */}
                      {openShareId === item._id && (
                        <SocialShareButtons
                          paintingId={item._id}
                          title={item.title}
                          onClose={() => setOpenShareId(null)}
                        />
                      )}
                    </div>
                    {isOpenCart && (
                      <div className="fixed bg-opacity-40 right-0 top-0 h-full w-80 bg-white shadow-sm z-50 p-4 border-l border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h2 className="text-xl text-gray-500 font-semibold">Shopping Cart</h2>

                          </div>

                          <button onClick={() => setIsOpenCart(false)} className="text-gray-600 hover:text-black">
                            <CloseIcon />
                          </button>
                        </div>
                        <hr className="border-b border-gray-300 w-full my-2" />
                        {cartItems.length === 0 ? (
                          <div className="flex-col ml-15 mt-10 items-center justify-center">
                            <div className="w-30 h-30 ml-5">
                              {/* <RemoveShoppingCartIcon fontSize="large" /> */}
                              <img src="https://w7.pngwing.com/pngs/432/660/png-transparent-empty-cart-illustration.png" alt="" />
                            </div>
                            <p className="text-gray-500 text-2xl mt-5">No items in cart.</p>
                            <button
                              className="border-2 bg-gray-300 items-center justify-centre p-2 px-4 text-2xl font-medium mt-20 rounded-xl"
                              onClick={() => {
                                navigate("/Paintings");
                                setIsOpenCart(false);
                              }
                              }> Back to Shop</button>
                          </div>
                        ) : (
                          cartItems.map((item, index) => {
                            const idx = imageIndexes[item._id] || 0;
                            const src = `http://localhost:3000${item.imgUrl[idx]}`;
                            return (
                              <div key={item._id + index} className="mb-4 border-b mt-10 pb-2">
                                <img src={src} alt={item.title || item.category} className="w-full h-40 object-cover rounded" />
                                {/* <div className="mt-1 text-sm font-medium">{item.title || item.category}</div> */}
                                <button className="border-1 hover:bg-black hover:text-white cursor-pointer justify-center
                                ml-30 mt-3 py-1 px-2"
                                  onClick={async () => {

                                    const token = localStorage.getItem("token");
                                    if (!token) {
                                      console.error("No token found");
                                      return;
                                    }

                                    try {
                                      await axios.delete(`http://localhost:3000/cart/${item._id}`, {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                        withCredentials: true,
                                      });
                                      setCartItems(prev => prev.filter((_, i) => i !== index));
                                    } catch (err) {
                                      console.error("Failed to delete cart item:", err);
                                    }
                                  }}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            );
                          })
                        )}
                        {/* <p>Your selected items will appear here.</p> */}
                        {/* You can show selected items dynamically if needed */}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Display paintings for the selected category
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {groupedPaintings[selectedCategory]?.map(item => {
                const idx = imageIndexes[item._id] || 0;
                const src = `http://localhost:3000${item.imgUrl[idx]}`;
                return (
                  <div key={item._id} className="bg-white p-4 rounded shadow-md relative">
                    <img
                      src={src}
                      alt={item.title || item.category}
                      className="w-full h-60 object-cover rounded cursor-pointer"
                      onClick={() => navigate(`/paintings/${item._id}`)}
                    />
                    {item.imgUrl.length > 1 && idx > 0 && (
                      <button
                        onClick={() => handlePrev(item._id)}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-1 rounded-full"
                      >
                        <ChevronLeftIcon />
                      </button>
                    )}
                    {item.imgUrl.length > 1 && idx < item.imgUrl.length - 1 && (
                      <button
                        onClick={() => handleNext(item._id, item.imgUrl.length)}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 p-1 rounded-full"
                      >
                        <ChevronRightIcon />
                      </button>
                    )}
                    <div className="mt-3 text-center font-semibold text-gray-800">
                      {item.title || item.category}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
