import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaHome, FaUser, FaBriefcase, FaFileAlt, FaBars, FaTimes, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaRss, FaEnvelope } from 'react-icons/fa';

interface MobileNavbarProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    activeRole: 'Programmer' | '3D Artist';
    setActiveRole: Dispatch<SetStateAction<'Programmer' | '3D Artist'>>;
}

const MobileNavbar = ({ theme, toggleTheme, activeRole, setActiveRole }: MobileNavbarProps) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuAnimation, setMenuAnimation] = useState('');
    const [buttonWidths, setButtonWidths] = useState({ programmer: 90, artist: 100 });
    const programmerRef = useRef<HTMLButtonElement>(null);
    const artistRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (programmerRef.current && artistRef.current) {
            setButtonWidths({
                programmer: programmerRef.current.offsetWidth,
                artist: artistRef.current.offsetWidth
            });
        }
    }, []);

    const toggleMenu = () => {
        if (isMenuOpen) {
            // Start closing animation
            setMenuAnimation('animate-slide-down');
            // Wait for animation to complete before hiding
            setTimeout(() => {
                setIsMenuOpen(false);
                setMenuAnimation('');
            }, 300);
        } else {
            // Open menu with animation
            setIsMenuOpen(true);
            setMenuAnimation('animate-slide-up');
        }
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <FaHome /> },
        { name: 'Profile', path: '/profile', icon: <FaUser /> },
        { name: 'Projects', path: '/projects', icon: <FaBriefcase /> },
        { name: 'Resume', path: '/resume', icon: <FaFileAlt /> },
        { name: 'Contact Me', path: '/contact', icon: <FaEnvelope /> }
    ];

    const externalLinks = [
        { name: 'GitHub', path: 'https://github.com/BrightStackTech', icon: <FaGithub />, external: true },
        { name: 'LinkedIn', path: 'https://linkedin.com', icon: <FaLinkedin />, external: true },
        { name: 'UpWork', path: 'https://www.upwork.com/freelancers/~019553adae7272fc11', icon: <FaBriefcase />, external: true },
        { name: 'brightstack.work.01@gmail.com', path: 'mailto:brightstack.work.01@gmail.com', icon: <FaEnvelope />, external: true },
        { name: 'Twitter', path: 'https://twitter.com', icon: <FaTwitter />, external: true },
        { name: 'Instagram', path: 'https://instagram.com', icon: <FaInstagram />, external: true }
    ];

    // Add animation keyframes to the document once
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes slideUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
            .animate-slide-up {
                animation: slideUp 0.3s ease-out forwards;
            }
            .animate-slide-down {
                animation: slideDown 0.3s ease-in forwards;
            }

            @keyframes rotateFadeOut {
                0% { transform: rotate(0deg); opacity: 1; }
                100% { transform: rotate(90deg); opacity: 0; }
            }
            @keyframes rotateFadeIn {
                0% { transform: rotate(90deg); opacity: 0; }
                100% { transform: rotate(0deg); opacity: 1; }
            }
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            @keyframes fadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
            .icon-animate-out {
                animation: rotateFadeOut 0.3s ease-in-out forwards;
            }
            .icon-animate-in {
                animation: rotateFadeIn 0.3s ease-in-out forwards;
            }
            .fade-in {
                animation: fadeIn 0.3s ease-in-out forwards;
            }
            .fade-out {
                animation: fadeOut 0.3s ease-in-out forwards;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            {/* Theme and Role Toggle Buttons */}
            <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
                <div className={`flex items-center bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full p-1 relative shadow-inner border ${ activeRole == "Programmer" ? 'border-blue-300/30 dark:border-blue-600/30': 'border-red-300/30 dark:border-red-600/30'}`}>
                    <div 
                        className={`absolute h-7 rounded-full transition-all duration-300 shadow-lg ${activeRole === 'Programmer' 
                            ? 'bg-gradient-to-b from-blue-500 to-blue-600'
                            : 'bg-gradient-to-b from-maroon-600 to-maroon-700'
                        }`}
                        style={{
                            width: activeRole === 'Programmer' ? `${buttonWidths.programmer}px` : `${buttonWidths.artist}px`,
                            left: activeRole === 'Programmer' ? '2px' : `calc(${buttonWidths.programmer}px + 4px)`,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 -1px 1px rgba(255,255,255,0.5)',
                            transition: 'all 0.3s ease-in-out',
                            boxSizing: 'border-box'
                        }}
                    />
                    <button 
                        ref={programmerRef}
                        onClick={() => setActiveRole('Programmer')}
                        className={`relative px-4 py-1 text-sm z-10 transition-all duration-200 ${activeRole === 'Programmer' ? 'text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                        style={{ minWidth: 'fit-content', padding: '0.25rem 1rem' }}
                    >
                        Programmer
                    </button>
                    <button 
                        ref={artistRef}
                        onClick={() => setActiveRole('3D Artist')}
                        className={`relative px-4 py-1 text-sm z-10 transition-all duration-200 ${activeRole === '3D Artist' ? 'text-white font-medium' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                        style={{ minWidth: 'fit-content', padding: '0.25rem 1rem' }}
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

            {/* Menu dropdown */}
            {isMenuOpen && (
                <div className={`fixed bottom-16 inset-x-0 z-50 rounded-t-lg shadow-lg ${activeRole=="Programmer" ? 'border border-blue-400 bg-white dark:bg-blue-800' : 'border border-red-400 bg-white dark:bg-red-800'} border-2 mx-4 overflow-hidden ${menuAnimation}`}>
                    <div className="flex justify-end p-2">
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-gray-400 hover:text-white"
                            aria-label="Close menu"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="p-4">
                        <div className="grid grid-cols-1 gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center space-x-3 p-2 rounded-md ${location.pathname === link.path
                                        ? ` ${activeRole === 'Programmer' ? ' bg-blue-600 dark:text-blue-500' : ' bg-red-600 dark:text-red-500'} text-white dark:bg-white font-bold`
                                        : `hover:text-white dark:text-white dark:hover:bg-white ${activeRole === 'Programmer' ? ' text-blue-500 hover:bg-blue-600 dark:hover:text-blue-500 ' : ' text-red-500 hover:bg-red-600 dark:hover:text-red-500'} `
                                        }`}
                                    onClick={toggleMenu}
                                >
                                    <span>{link.icon}</span>
                                    <span>{link.name}</span>
                                </Link>
                            ))}

                            <div className="my-2 border-t border-gray-700"></div>

                            {externalLinks.map((link) => (
                                <a
                                    key={link.path}
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center space-x-3 p-2 rounded-md ${activeRole === 'Programmer' ? ' text-blue-500 hover:bg-blue-600 dark:hover:text-blue-400' : ' text-red-500 hover:bg-red-600 dark:hover:text-red-400'} dark:text-white dark:hover:bg-white dark:hover:font-bold hover:text-white`}
                                    onClick={toggleMenu}
                                >
                                    <span className='font-bold hover:scale-110'>{link.icon}</span>
                                    <span className='hover:scale-110'>{link.name}</span>
                                    <span className="text-xs">↗</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Menu button */}
            <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center text-center ">
                <button
                    onClick={toggleMenu}
                    className={`  w-full mx-4 px-6 py-2 rounded-lg shadow-l ${activeRole=="Programmer"?'border-blue-400 dark:bg-blue-600 bg-white text-blue-600':'border-red-400 bg-white dark:bg-red-600 text-red-600'} border border-2 flex items-center space-x-2 text-center justify-center `}
                    aria-label="Toggle menu"
                >
                    <div className={`relative w-5 h-5 flex items-center justify-center dark:text-white ${activeRole === 'Programmer' ? ' text-blue-600' : ' text-red-600'}`}>
                        <div className={isMenuOpen ? 'icon-animate-out' : 'icon-animate-in'}>
                            <FaBars />
                        </div>
                        <div className={`absolute inset-0 flex items-center justify-center ${isMenuOpen ? 'fade-in' : 'fade-out'} dark:text-white  ${activeRole === 'Programmer' ? ' text-blue-600' : ' text-red-600'}`}>
                            <FaTimes />
                        </div>
                    </div>
                    <span className={`dark:text-white  ${activeRole === 'Programmer' ? ' text-blue-600' : ' text-red-600'}`}>Menu</span>
                </button>
            </div>
        </>
    );
};

export default MobileNavbar;