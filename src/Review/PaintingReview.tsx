// import React from "react";
import Reviews from "./Review";

const PaintingsPage = () => {
    const paintingId = "painting-id"; // The actual painting ID from your data

    return (
        <div>
            <h1>Paintings</h1>
            {/* Render painting details here */}
            <Reviews refId={paintingId} type="painting" />
        </div>
    );
};

export default PaintingsPage;