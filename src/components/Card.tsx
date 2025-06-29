import { useEffect, useState } from "react";

export default function RotatingCubeCard() {
  const images = [
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1AKF7LelsXtbK8YAYYdiPrDMZdFd74ZTgkQ&s",
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357"
  ];

  const [rotation, setRotation] = useState(0); // We will use this to control the rotation angle

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev - 120); // Increase the rotation value smoothly
    }, 4000); // Change the image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-64 h-64 mt-10 mx-auto perspective">
      <div
        className="relative w-full h-full transition-transform duration-3000 preserve-3d"
        style={{
          transform: `rotateY(${rotation}deg)`, // Keep increasing the rotation
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute w-[200px] h-[200px] backface-hidden"
            style={{
              transform: `rotateY(${i * 120}deg) translateZ(120px)`, // Distribute images evenly in 3D space
            }}
          >
            <img
              src={src}
              alt={`img-${i}`}
              className="w-full h-full object-cover rounded-xl shadow-lg opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
