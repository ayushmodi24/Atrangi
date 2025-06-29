// import { useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import axios from "axios";

// export const FavouriteButton = ({ paintingId, isInitiallyFavourite }: { paintingId: string; isInitiallyFavourite: boolean }) => {
//   const [isFavourite, setIsFavourite] = useState(isInitiallyFavourite);

//   const toggleFavourite = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please log in first");
//         return;
//       }

//       const res = await axios.post(
//         `http://localhost:3000/users/favourite/${paintingId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setIsFavourite(!isFavourite);
//     } catch (err) {
//       console.error("Failed to toggle favourite:", err);
//     }
//   };

//   return (
//     <button onClick={toggleFavourite} className="absolute top-3 right-3 text-xl bg-white rounded-full p-2 shadow">
//       {isFavourite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//     </button>
//   );
// };


import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface FavouriteButtonProps {
  paintingId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ paintingId }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const fetchFavourites = async () => {
    try {
      const res = await axios.get("http://localhost:3000/favourites", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const favIds = res.data.favourites.map((p: any) => p._id);
      setIsFavourite(favIds.includes(paintingId));
    } catch (err) {
      console.error("Error fetching favourites", err);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [paintingId]);

  const toggleFavourite = async () => {
    try {
      await axios.post(
        `http://localhost:3000/favourites/{paintingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsFavourite((prev) => !prev);
    } catch (err) {
      console.error("Error toggling favourite", err);
    }
  };

  return (
    <button onClick={toggleFavourite} style={{ background: "none", border: "none" }}>
      {isFavourite ? (
        <FaHeart color="red" size={22} />
      ) : (
        <FaRegHeart color="gray" size={22} />
      )}
    </button>
  );
};

export default FavouriteButton;
