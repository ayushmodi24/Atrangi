// import { useNavigate, useParams } from "react-router-dom";
// import { WriterData } from "./Data/WriterData";
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import { useState } from "react";
// import Reviews from "../Review/Review"; // ✅ Import Reviews component

// export default function ShowWrite() {
//     const { id } = useParams();
//     const writer = WriterData.find(item => item.id.toString() === id);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const navigate = useNavigate();

//     if (!writer) {
//         return <div className="p-4 text-red-600 font-semibold">Writer not found.</div>;
//     }

//     const totalImages = writer.img.length;

//     const handlePrev = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     };

//     const handleNext = () => {
//         if (currentIndex < totalImages - 1) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     };

//     return (
//         <div className="p-4  w-full h-full mx-auto"
//             style={{
//                 backgroundImage: "url('https://img.freepik.com/free-photo/paper-texture_1194-5999.jpg?semt=ais_hybrid&w=740')"
//             }}>
//             <button
//                 className="flex bg-white border shadow-2xl items-center justify-center hover:bg-black hover:text-white rounded-full px-3 py-1 fixed top-24 left-4 z-50"
//                 onClick={() => navigate("/writers")}>
//                 <ChevronLeftIcon />
//                 <div className="text-xl">
//                     Back
//                 </div>
//             </button>

//             <div className="relative flex justify-center items-center mb-6">
//                 <img
//                     src={writer.img[currentIndex]}
//                     alt={`Writer image ${currentIndex}`}
//                     className="rounded shadow object-cover h-[600px] w-[600px] max-w-full"
//                 />

//                 {totalImages > 1 && currentIndex > 0 && (
//                     <button
//                         onClick={handlePrev}
//                         className="absolute left-30 bg-white border-gray-500 border-1 bg-opacity-70 hover:bg-opacity-90 hover:bg-black hover:text-white p-1 text-black px-3  rounded-full shadow-2xl"
//                     >
//                         <ChevronLeftIcon />
//                     </button>
//                 )}

//                 {totalImages > 1 && currentIndex < totalImages - 1 && (
//                     <button
//                         onClick={handleNext}
//                         className="absolute right-30 bg-white border-gray-500 border-1 bg-opacity-70 hover:bg-opacity-90 hover:bg-black hover:text-white p-1 text-black px-3  rounded-full shadow-2xl"
//                     >
//                         <ChevronRightIcon />
//                     </button>
//                 )}
//             </div>

//             <hr className="mx-30 text-gray-800 font-medium mb-10" />
//             <div className="text- text-2xl font-semibold text-gray-800">
//                 <div className="ml-100 underline text-3xl mb-3 font-bold italic">
//                     Caption:
//                 </div>
//                 <div className="text-center">
//                     {writer.description}
//                 </div>
//             </div>

//             {/* ✅ Reviews section */}
//             <div className="mt-10 p-4 bg-white bg-opacity-80 rounded shadow-md">
//                 <h2 className="text-3xl font-bold mb-4 text-center">Reviews</h2>
//                 {id && <Reviews refId={id} type="writer" />}
//             </div>
//         </div>
//     );
// }


import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState, useEffect } from "react";
import axios from "axios";
import Reviews from "../Review/Review";// Ensure this is the correct import path

interface Writer {
  _id: string;
  img: string[];
  description: string;
  category: string;
}

export default function ShowWrite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [writer, setWriter] = useState<Writer | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch writer data when the component mounts or `id` changes
  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:3000/writers/${id}`, { withCredentials: true })
      .then((res) => {
        setWriter(res.data);
      })
      .catch((err) => {
        console.error("Error fetching writer:", err);
      });
  }, [id]);

  if (!writer) {
    return <div className="p-4 text-red-600 font-semibold">Loading writer...</div>;
  }

  const totalImages = writer.img.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div
      className="p-4 w-full h-full mx-auto"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/paper-texture_1194-5999.jpg?semt=ais_hybrid&w=740')"
      }}
    >
      <button
        className="flex bg-white border shadow-2xl items-center justify-center hover:bg-black hover:text-white rounded-full px-3 py-1 fixed top-24 left-4 z-50"
        onClick={() => navigate("/kavya")}
      >
        <ChevronLeftIcon />
        <div className="text-xl">Back</div>
      </button>

      <div className="relative flex justify-center items-center mb-6 mt-10">
        <img
          src={`http://localhost:3000${writer.img[currentIndex]}`}
          alt={`Writer image ${currentIndex}`}
          className="rounded shadow object-cover h-[600px] w-[600px] max-w-full"
        />

        {totalImages > 1 && currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 bg-white border-gray-500 bg-opacity-70 hover:bg-opacity-90 hover:bg-black hover:text-white p-1 text-black px-3 rounded-full shadow-2xl"
          >
            <ChevronLeftIcon />
          </button>
        )}

        {totalImages > 1 && currentIndex < totalImages - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 bg-white border-gray-500 bg-opacity-70 hover:bg-opacity-90 hover:bg-black hover:text-white p-1 text-black px-3 rounded-full shadow-2xl"
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>

      <hr className="mx-30 text-gray-800 font-medium mb-10" />

      <div className="text-2xl font-semibold text-gray-800 text-center">
        <div className="underline text-3xl mb-3 font-bold italic">Caption:</div>
        <div>{writer.description}</div>
      </div>

      {/* Reviews section */}
      <div className="mt-10 p-4 bg-white bg-opacity-80 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Reviews</h2>
        {id && <Reviews refId={id} type="writer" />}
      </div>
    </div>
  );
}
