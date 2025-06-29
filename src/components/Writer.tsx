import { useEffect, useState } from "react";
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const menuItems = [
  { name: "ALL CONTENT" },
  { name: "Poetry" },
  { name: "Stories" },
  { name: "Essays" },
];

interface WriterItem {
  _id: string;
  img: string[];
  category: string;
  description: string;
}

export default function Writer() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL CONTENT");
  const [writers, setWriters] = useState<WriterItem[]>([]);
  const [imageIndexes, setImageIndexes] = useState<{ [key: string]: number }>({});
  const [groupedWriters, setGroupedWriters] = useState<{ [category: string]: WriterItem[] }>({});
  const navigate = useNavigate();

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


  // Fetch writers when the component is first mounted
  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/writers", {
          withCredentials: true,
        });
        setWriters(response.data);

        // Group writers by category
        const grouped: { [category: string]: WriterItem[] } = {};
        response.data.forEach((writer: WriterItem) => {
          if (!grouped[writer.category]) {
            grouped[writer.category] = [];
          }
          grouped[writer.category].push(writer);
        });
        setGroupedWriters(grouped);

        const idxs: { [key: string]: number } = {};
        response.data.forEach((w: WriterItem) => {
          idxs[w._id] = 0;
        });
        setImageIndexes(idxs);
      } catch (error) {
        console.error("Error fetching writers:", error);
      }
    };

    fetchWriters();
  }, []);

  const handlePrev = (id: string) => {
    setImageIndexes(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  };

  const handleNext = (id: string, total: number) => {
    setImageIndexes(prev => ({ ...prev, [id]: Math.min(total - 1, (prev[id] || 0) + 1) }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/paper-texture_1194-5999.jpg?semt=ais_hybrid&w=740')"
      }}
    >
      {/* Sidebar */}
      {isOpen ? (
        <div className="fixed h-full w-65 bg-[#6e7b8b] text-[#fdfdfd]  p-4 shadow-lg z-40">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold italic tracking-wide ml-2">
              Writer's Desk
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-black hover:bg-[#7c8998] rounded-full p-1"
            >
              <CloseIcon />
            </button>
          </div>
          <ul className="space-y-3">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleCategoryChange(item.name)}
                className={`px-6 py-2 rounded cursor-pointer hover:bg-[#7c8998] transition text-lg tracking-wide hover:font-bold ml-3 ${selectedCategory === item.name ? 'bg-[#7c8998] text-white' : 'text-gray-200'}`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 ml-3 fixed z-50 text-gray-800 bg-white shadow-md rounded-full hover:bg-gray-100 transition"
        >
          <ViewSidebarIcon />
        </button>
      )}

      {/* Main Content */}
      <div className={`p-3 transition-all duration-300 ${isOpen ? 'ml-10 md:ml-64 ' : 'ml-0 md:ml-5'}`}>
        <div className="bg-gray-400 mt-5 rounded-2xl py-2">
          <div className="text-center text-4xl font-bold italic mt-6 text-gray-800">
            Voices of Atrangi
          </div>
          <div className="text-center text-2xl mt-6 mb-2 text-gray-900  max-w-3xl mx-auto">
            Explore stories, poetry, essays, and personal thoughts shared by our vibrant community of writers.
          </div>
        </div>


        {/* Writers Grid */}
        <div className={`mt-10 grid gap-6 ${isOpen ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'} p-4 transition-all duration-300`}>
          {selectedCategory === "ALL CONTENT" ? (
            writers.map((item) => {
              const currentIndex = imageIndexes[item._id] || 0;
              const totalImages = item.img.length;
              const currentImgSrc = `http://localhost:3000${item.img[currentIndex]}`;

              return (
                <div key={item._id} className="bg-white bg-opacity-80 p-4 rounded shadow-md relative">
                  <div className="relative">
                    <img
                      src={currentImgSrc}
                      alt={`Writer content ${currentIndex}`}
                      className="rounded cursor-pointer w-full object-cover h-60"
                      onClick={() => navigate(`/writers/${item._id}`)}
                    />

                    {/* Left Arrow */}
                    {totalImages > 1 && currentIndex > 0 && (
                      <button
                        onClick={() => handlePrev(item._id)}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-0.5 rounded-full shadow"
                      >
                        <ChevronLeftIcon />
                      </button>
                    )}

                    {/* Right Arrow */}
                    {totalImages > 1 && currentIndex < totalImages - 1 && (
                      <button
                        onClick={() => handleNext(item._id, totalImages)}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-0.5 rounded-full shadow"
                      >
                        <ChevronRightIcon />
                      </button>
                    )}
                  </div>

                  <div className="mt-3 text-center text-lg font-semibold text-gray-800">
                    {item.description}
                  </div>
                </div>
              );
            })
          ) : (
            groupedWriters[selectedCategory]?.map((item) => {
              const currentIndex = imageIndexes[item._id] || 0;
              const totalImages = item.img.length;
              const currentImgSrc = `http://localhost:3000${item.img[currentIndex]}`;

              return (
                <div key={item._id} className="bg-white bg-opacity-80 p-4 rounded shadow-md relative">
                  <div className="relative">
                    <img
                      src={currentImgSrc}
                      alt={`Writer content ${currentIndex}`}
                      className="rounded cursor-pointer w-full object-cover h-60"
                      onClick={() => navigate(`/writers/${item._id}`)}
                    />

                    {/* Left Arrow */}
                    {totalImages > 1 && currentIndex > 0 && (
                      <button
                        onClick={() => handlePrev(item._id)}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-0.5 rounded-full shadow"
                      >
                        <ChevronLeftIcon />
                      </button>
                    )}

                    {/* Right Arrow */}
                    {totalImages > 1 && currentIndex < totalImages - 1 && (
                      <button
                        onClick={() => handleNext(item._id, totalImages)}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-black px-0.5 rounded-full shadow"
                      >
                        <ChevronRightIcon />
                      </button>
                    )}
                  </div>

                  <div className="mt-3 text-center text-lg font-semibold text-gray-800">
                    {item.description}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
