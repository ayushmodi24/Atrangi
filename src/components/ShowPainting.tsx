import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Reviews from "../Review/Review";

interface PaintingItem {
    _id: string;
    imgUrl: string[];
    category: string;
    title?: string;
}
export default function ShowPainting() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [painting, setPainting] = useState<PaintingItem | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!id)
            return;
        axios.get(`http://localhost:3000/paintings/${id}`, {
            withCredentials: true
        })
            .then((res) => {
                setPainting(res.data);
            })
            .catch((err) => {
                console.error("Error fetching painting:", err);
            });
    }, [id]);

    if (!painting) {
        return <div className="text-5xl p-4 text-red-600">Loading Paintings....</div>
    }

    const totalImages = painting.imgUrl.length;

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
            className="w-full h-full mx-auto p-4 "
            style={{
                backgroundImage: "url('https://img.freepik.com/free-photo/paper-texture_1194-5999.jpg?semt=ais_hybrid&w=740')"
            }}>
            <button
                className="flex bg-white border shadow-2xl items-center justify-center hover:bg-black hover:text-white rounded-full px-3 py-1 fixed top-24 left-4 z-50"
                onClick={() => navigate("/Paintings")}
            >
                <ChevronLeftIcon />
                <div className="text-xl">Back</div>
            </button>
            <div className="relative flex justify-center items-center mb-6 mt-10">
                <img
                    src={`http://localhost:3000${painting.imgUrl[currentIndex]}`}
                    alt={`Painting image ${currentIndex}`}
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
            <div className="mt-10 p-4 bg-white bg-opacity-80 rounded shadow-md">
                <h2 className="text-3xl font-bold mb-4 text-center">Reviews</h2>
                {id && <Reviews refId={id} type="writer" />}
            </div>
        </div>
    )
}