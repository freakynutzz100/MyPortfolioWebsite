import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { text } from 'stream/consumers';

const Footer = ({ activeRole = 'Programmer' }: { activeRole?: 'Programmer' | '3D Artist' }) => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaGithub />, url: 'https://github.com/BrightStackTech', label: 'GitHub' },
        { icon: <FaLinkedin />, url: 'https://linkedin.com/in/sanjibroy360', label: 'LinkedIn' },
        { icon: <FaTwitter />, url: 'https://twitter.com/sanjibroy360', label: 'Twitter' },
        { icon: <FaEnvelope />, url: 'mailto:brightstack.work.01@gmail.com', label: 'Email' },
    ];

    // Use the same radial background as the main pages
    const bgClass =
        activeRole === 'Programmer'
            ? 'bg-blue-50'
            : 'bg-red-50';

    return (
        <footer className={`w-full border-t border-gray-800 mt-20 py-6 glass-container relative before:absolute before:inset-0 ${bgClass} before:opacity-100 before:pointer-events-none`}>
            <div className="container mx-auto max-w-5xl px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className={`text-gray-500 dark:text-gray-400 font-semibold text-sm mb-4 md:mb-0 ${activeRole == "Programmer" ? 'hover:text-blue-500 dark:hover:text-blue-400' : 'hover:text-red-500 dark:hover:text-red-400'} transition-colors`}>
                        © {currentYear} Yog Vasaikar
                    </p>

                    <div className="flex gap-4">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`text-gray-500 dark:text-gray-400 hover:font-bold hover:scale-110 text-lg ${activeRole=="Programmer"?'hover:text-blue-500 dark:hover:text-blue-400':'hover:text-red-500 dark:hover:text-red-400'}  transition-colors`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;