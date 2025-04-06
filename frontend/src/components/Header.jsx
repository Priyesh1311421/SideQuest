import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import FloatingChatbot from "./FloatingChatbot";

const Header = (props) => {
    const { currentPath } = props;

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const navigate = useNavigate();

    const isActive = (path) => {
        if (path === "/") {
            return currentPath === path;
        }
        return currentPath.startsWith(path);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isStoriesOpen, setIsStoriesOpen] = useState(false);
    const [isDesktopStoriesOpen, setIsDesktopStoriesOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Create a ref for detecting clicks outside the dropdown
    const dropdownRef = useRef(null);

    const location = useLocation();

    // Update your useEffect to check for login modal state:
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);

        // Check if we were redirected with showLogin state
        if (location.state?.showLogin) {
            setIsLoginModalOpen(true);
            // Clear the state to prevent modal reopening on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDesktopStoriesOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle item selection to close dropdown
    const handleStoryItemClick = () => {
        setIsDesktopStoriesOpen(false);
        setIsStoriesOpen(false);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    // In the closeLoginModal function:
    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        setIsAuthenticated(true);

        // Dispatch custom event to notify App component
        window.dispatchEvent(new Event("authChange"));
    };

    const openSignupModal = () => {
        setIsSignupModalOpen(true);
    };

    const closeSignupModal = () => {
        setIsSignupModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsAuthenticated(false);

        window.dispatchEvent(new Event("authChange"));

        navigate("/");
    };

    return (
        <>
            <nav className="bg-stone-100 fixed w-full z-20 top-0 start-0 border-b border-gray-300 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-zinc-700 dark:text-zinc-800">
                            SideQuest
                        </span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-xl text-sm px-4 py-2 text-center"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={openLoginModal}
                                className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-xl text-sm px-4 py-2 text-center"
                            >
                                Login
                            </button>
                        )}
                        <button
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-300"
                            aria-controls="navbar-sticky"
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>

                        {/* Mobile Menu Positioned Below the Button */}
                        <div
                            className={`${
                                isOpen ? "absolute right-0 mt-12" : "hidden"
                            } bg-stone-100 w-48 border border-gray-200 rounded-lg shadow-lg md:hidden`}
                        >
                            <ul className="flex flex-col p-4 space-y-2">
                                <li>
                                    <Link
                                        to="/"
                                        className={`block py-2 px-3 ${
                                            isActive("/")
                                                ? "text-blue-500 font-medium"
                                                : "text-zinc-700 hover:text-blue-500"
                                        }`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/voice-chat"
                                        className={`block py-2 px-3 ${
                                            isActive("/voice-chat")
                                                ? "text-blue-500 font-medium"
                                                : "text-zinc-700 hover:text-blue-500"
                                        }`}
                                    >
                                        Voice Chat
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/text-chat"
                                        className={`block py-2 px-3 ${
                                            isActive("/text-chat")
                                                ? "text-blue-500 font-medium"
                                                : "text-zinc-700 hover:text-blue-500"
                                        }`}
                                    >
                                        Text Chat
                                    </Link>
                                </li>
                                <li className="relative">
                                    <button
                                        onClick={() =>
                                            setIsStoriesOpen(!isStoriesOpen)
                                        }
                                        className={`flex items-center justify-between w-full py-2 px-3 ${
                                            isActive("/stories")
                                                ? "text-blue-500 font-medium"
                                                : "text-zinc-700 hover:text-blue-500"
                                        } focus:outline-none`}
                                    >
                                        Cultural Stories
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </button>
                                    <ul
                                        className={`${
                                            isStoriesOpen ? "block" : "hidden"
                                        } pl-4 mt-1 space-y-1`}
                                    >
                                        <li>
                                            <Link
                                                to="/stories/brazil"
                                                onClick={handleStoryItemClick}
                                                className={`block py-1 px-3 text-sm ${
                                                    isActive("/stories/brazil")
                                                        ? "text-blue-500 font-medium"
                                                        : "text-zinc-700 hover:text-blue-500"
                                                }`}
                                            >
                                                Brazil
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/stories/india"
                                                onClick={handleStoryItemClick}
                                                className={`block py-1 px-3 text-sm ${
                                                    isActive("/stories/india")
                                                        ? "text-blue-500 font-medium"
                                                        : "text-zinc-700 hover:text-blue-500"
                                                }`}
                                            >
                                                India
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/stories/italy"
                                                onClick={handleStoryItemClick}
                                                className={`block py-1 px-3 text-sm ${
                                                    isActive("/stories/italy")
                                                        ? "text-blue-500 font-medium"
                                                        : "text-zinc-700 hover:text-blue-500"
                                                }`}
                                            >
                                                Italy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/stories/japan"
                                                onClick={handleStoryItemClick}
                                                className={`block py-1 px-3 text-sm ${
                                                    isActive("/stories/japan")
                                                        ? "text-blue-500 font-medium"
                                                        : "text-zinc-700 hover:text-blue-500"
                                                }`}
                                            >
                                                Japan
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:w-auto md:order-1">
                        <ul className="flex flex-row space-x-8 items-center">
                            <li>
                                <Link
                                    to="/"
                                    className={`block py-2 px-3 ${
                                        isActive("/")
                                            ? "text-blue-500 font-medium"
                                            : "text-zinc-700 hover:text-blue-500"
                                    }`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/voice-chat"
                                    className={`block py-2 px-3 ${
                                        isActive("/voice-chat")
                                            ? "text-blue-500 font-medium"
                                            : "text-zinc-700 hover:text-blue-500"
                                    }`}
                                >
                                    Video Chat
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/text-chat"
                                    className={`block py-2 px-3 ${
                                        isActive("/text-chat")
                                            ? "text-blue-500 font-medium"
                                            : "text-zinc-700 hover:text-blue-500"
                                    }`}
                                >
                                    Text Chat
                                </Link>
                            </li>

                            {/* Dropdown with hover functionality */}
                            <li
                                className="relative"
                                ref={dropdownRef}
                                onMouseEnter={() =>
                                    setIsDesktopStoriesOpen(true)
                                }
                                onMouseLeave={() =>
                                    setIsDesktopStoriesOpen(false)
                                }
                            >
                                <button
                                    className={`block py-2 px-3 ${
                                        isActive("/stories")
                                            ? "text-blue-500 font-medium"
                                            : "text-zinc-700 hover:text-blue-500"
                                    } focus:outline-none flex items-center`}
                                >
                                    Cultural Stories
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </button>
                                <ul
                                    className={`absolute left-0 w-48 bg-white shadow-lg rounded-lg z-10 transition-opacity duration-200 ${
                                        isDesktopStoriesOpen
                                            ? "opacity-100 visible"
                                            : "opacity-0 invisible"
                                    }`}
                                >
                                    <li>
                                        <Link
                                            to="/stories/brazil"
                                            onClick={handleStoryItemClick}
                                            className={`block px-4 py-2 text-sm ${
                                                isActive("/stories/brazil")
                                                    ? "text-blue-500 font-medium bg-blue-50"
                                                    : "text-zinc-700 hover:bg-blue-100"
                                            }`}
                                        >
                                            Brazil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/stories/india"
                                            onClick={handleStoryItemClick}
                                            className={`block px-4 py-2 text-sm ${
                                                isActive("/stories/india")
                                                    ? "text-blue-500 font-medium bg-blue-50"
                                                    : "text-zinc-700 hover:bg-blue-100"
                                            }`}
                                        >
                                            India
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/stories/italy"
                                            onClick={handleStoryItemClick}
                                            className={`block px-4 py-2 text-sm ${
                                                isActive("/stories/italy")
                                                    ? "text-blue-500 font-medium bg-blue-50"
                                                    : "text-zinc-700 hover:bg-blue-100"
                                            }`}
                                        >
                                            Italy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/stories/japan"
                                            onClick={handleStoryItemClick}
                                            className={`block px-4 py-2 text-sm ${
                                                isActive("/stories/japan")
                                                    ? "text-blue-500 font-medium bg-blue-50"
                                                    : "text-zinc-700 hover:bg-blue-100"
                                            }`}
                                        >
                                            Japan
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Modals */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLoginModal}
                openSignupModal={openSignupModal}
            />
            <SignupModal
                isOpen={isSignupModalOpen}
                onClose={closeSignupModal}
                openLoginModal={openLoginModal}
            />
            <FloatingChatbot apiKey={apiKey} />
        </>
    );
};

export default Header;
