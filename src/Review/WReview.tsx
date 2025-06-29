// import React from "react";
import Reviews from "./Review";

const WritingsPage = () => {
    const writerId = "writer-id"; // The actual writer ID from your data

    return (
        <div>
            <h1>Writings</h1>
            {/* Render writing details here */}
            <Reviews refId={writerId} type="writer" />
        </div>
    );
};

export default WritingsPage;
