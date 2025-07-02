import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaRss, FaHome, FaMoon, FaBriefcase, FaInstagram } from 'react-icons/fa';

interface NavbarProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    activeRole: 'Programmer' | '3D Artist';
    setActiveRole: Dispatch<SetStateAction<'Programmer' | '3D Artist'>>;
}

const Navbar = ({ theme, toggleTheme, activeRole, setActiveRole }: NavbarProps) => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [buttonWidths, setButtonWidths] = useState({ programmer: 90, artist: 100 }); // Default widths in pixels
    const programmerRef = useRef<HTMLButtonElement>(null);
    const artistRef = useRef<HTMLButtonElement>(null);

    // Update button widths after component mounts and on window resize
    const updateButtonWidths = () => {
        if (programmerRef.current && artistRef.current) {
            setButtonWidths({
                programmer: programmerRef.current.offsetWidth,
                artist: artistRef.current.offsetWidth
            });
        }
    };

    useEffect(() => {
        updateButtonWidths();
        window.addEventListener('resize', updateButtonWidths);
        return () => window.removeEventListener('resize', updateButtonWidths);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isSelected = (path: string) => location.pathname === path;

    const navLinks = [
        { name: <FaHome className="w-5 h-5" />, path: '/' },
        { name: 'Profile', path: '/profile' },
        { name: 'Projects', path: '/projects' },
        { name: 'Resume', path: '/resume' },
        { name: 'Contact Me', path: '/contact' },
    ];

    const socialLinks = [
        { icon: <FaGithub />, url: 'https://github.com/BrightStackTech', label: 'GitHub' },
        { icon: <FaEnvelope />, url: 'mailto:freetimerenderzz100@gmail.com', label: 'Email' },
        { icon: <FaBriefcase />, url: 'https://www.upwork.com/freelancers/~015ce70c38026f389e?viewMode=1', label: 'Upwork' },
        { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/yog-vasaikar-3bb062295/', label: 'LinkedIn' },
        { icon: <FaInstagram />, url: 'https://www.instagram.com/freetime_renderzz/', label: 'Instagram' },
        { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${isScrolled
                    ? `glass-container shadow-md ${
                        activeRole === 'Programmer'
                            ? 'bg-blue-50'
                            : 'bg-red-50'
                    } before:content-[''] before:absolute before:inset-0 before:rounded-none before:pointer-events-none before:opacity-100`
                    : 'bg-transparent'
                }`
            }
        >
            <div className="container flex items-center justify-between py-3">
                <div className="flex items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-1 text-sm font-medium  ${location.pathname === link.path ? 'text-white' : ''
                                } ${isSelected(link.path)
                                    ? `${
                                        activeRole === 'Programmer'
                                            ? 'bg-blue-600 dark:bg-blue-700 text-white'
                                            : 'bg-red-600 dark:bg-red-700 text-white'
                                      } rounded-xl font-semibold hover:scale-110`
                                    : `${
                                        activeRole === 'Programmer'
                                            ? 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 hover:font-bold hover:scale-110'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:font-bold hover:scale-110'
                                      } `}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex-1"></div>

                <div className="flex items-center space-x-4">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            className={`${activeRole == "Programmer" ? 'text-xl dark:hover:text-blue-400 dark:text-gray-500 hover:text-blue-600 text-gray-400 p-1'
                                : 'text-xl dark:hover:text-red-400 dark:text-gray-500 hover:text-red-600 text-gray-400 p-1'} transition-colors hover:font-bold hover:scale-110`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                        >
                            {link.icon}
                        </a>
                    ))}

                    <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-gray-400/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full p-1 relative shadow-inner border border-gray-300/30 dark:border-gray-600/30">
                            <div
                                className={`absolute h-7 rounded-full transition-all duration-300 shadow-lg ${activeRole === 'Programmer'
                                    ? 'bg-gradient-to-b from-blue-500 to-blue-600'
                                    : 'bg-gradient-to-b from-maroon-600 to-maroon-700'
                                    }`}
                                style={{
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 -1px 1px rgba(255,255,255,0.5)',
                                    width: activeRole === 'Programmer'
                                        ? `${buttonWidths.programmer}px`
                                        : `${buttonWidths.artist}px`,
                                    left: activeRole === 'Programmer'
                                        ? '2px'
                                        : `calc(${buttonWidths.programmer}px + 4px)`,
                                    transition: 'all 0.3s ease-in-out',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <button
                                ref={programmerRef}
                                onClick={() => setActiveRole('Programmer')}
                                className={`relative px-4 py-1 text-sm z-10 transition-all duration-200 ${activeRole === 'Programmer'
                                    ? 'text-white font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                                style={{
                                    minWidth: 'fit-content',
                                    padding: '0.25rem 1rem'
                                }}
                            >
                                Programmer
                            </button>
                            <button
                                ref={artistRef}
                                onClick={() => setActiveRole('3D Artist')}
                                className={`relative px-4 py-1 text-sm z-10 transition-all duration-200 ${activeRole === '3D Artist'
                                    ? 'text-white font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                                style={{
                                    minWidth: 'fit-content',
                                    padding: '0.25rem 1rem'
                                }}
                            >
                                3D Artist
                            </button>
                        </div>

                        <button 
                            onClick={toggleTheme} 
                            className="p-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
                            aria-label="Toggle dark mode"
                        >
                            {theme === 'dark' ? 
                                <FaSun className="text-yellow-400 w-5 h-5" /> : 
                                <FaMoon className="text-gray-400 w-5 h-5" />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
