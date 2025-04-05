import React from "react";

function Explore() {
    return (
        <div>
            <iframe
                src="https://360stories.com/tokyo/place/Tokyo-Tower?mode=2&playerMode=2"
                width="800"
                height="600"
                allowFullScreen
                style={{ border: 0 }}
                name="360Stories"
            />
        </div>
    );
}

export default Explore;
