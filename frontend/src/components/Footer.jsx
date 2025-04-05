import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="w-full bg-stone-100 text-zinc-600 py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                {/* Navigation links */}
                <nav className="grid grid-flow-col gap-6 mb-6">
                    <Link to="#faq" className="hover:text-blue-500 transition-colors">FAQs</Link>
                    <a href="https://github.com/Priyesh1311421/SideQuest"
                        className="hover:text-blue-500 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer">
                        Github
                    </a>
                </nav>
                {/* Copyright text */}
                <p className="text-sm">Made with ❤️ in 24 hours</p>
            </div>
        </footer>
    );
};

export default Footer;