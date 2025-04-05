import { useState, useEffect } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Maximize,
} from "lucide-react";

export default function TouristCarousel({ touristAttractions }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener(
            "mozfullscreenchange",
            handleFullscreenChange
        );
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "webkitfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "mozfullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener(
                "MSFullscreenChange",
                handleFullscreenChange
            );
        };
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === touristAttractions.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? touristAttractions.length - 1 : prevIndex - 1
        );
    };

    const toggleFullscreen = () => {
        const container = document.getElementById("carousel-container");

        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    const currentAttraction = touristAttractions[currentIndex];

    return (
        <div className="mb-12 shadow-md rounded-lg overflow-hidden w-full max-w-6xl mx-auto">
            <div className="p-4 md:p-6">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Must-visit Places
                </h2>

                <div
                    id="carousel-container"
                    className={`relative ${
                        isFullscreen ? "fixed inset-0 z-50 bg-white" : ""
                    }`}
                >
                    <div className="overflow-hidden rounded-lg">
                        <div className="p-2 md:p-4">
                            <h3 className="text-xl font-bold mb-2 text-gray-800">
                                {currentAttraction.name}
                            </h3>
                            <div
                                className={`relative mb-4 bg-gray-100 rounded-lg overflow-hidden ${
                                    isFullscreen ? "h-screen" : "h-96"
                                }`}
                                style={isFullscreen ? { height: "100vh" } : {}}
                            >
                                <iframe
                                    src={currentAttraction["360"]}
                                    allowFullScreen
                                    style={{ border: 0 }}
                                    title={`Virtual tour of ${currentAttraction.name}`}
                                    className="absolute inset-0 w-full h-full"
                                />

                                {/* Fullscreen button */}
                                <button
                                    onClick={toggleFullscreen}
                                    className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-lg shadow-md z-10"
                                    aria-label="Toggle fullscreen"
                                >
                                    <Maximize size={20} />
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <a
                                    href={currentAttraction.videoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    <ExternalLink size={16} className="mr-2" />
                                    Virtual tour
                                </a>

                                {/* Indicators */}
                                <div className="flex justify-center gap-2">
                                    {touristAttractions.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentIndex(index)
                                            }
                                            className={`w-3 h-3 rounded-full ${
                                                currentIndex === index
                                                    ? "bg-blue-600"
                                                    : "bg-gray-300"
                                            }`}
                                            aria-label={`Go to slide ${
                                                index + 1
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation buttons - positioned more inside the iframe */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-lg shadow-md z-10"
                        aria-label="Previous attraction"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-lg shadow-md z-10"
                        aria-label="Next attraction"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}
