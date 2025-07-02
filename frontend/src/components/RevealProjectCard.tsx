import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub, FaCalendarAlt } from 'react-icons/fa';
import { ProjectType } from '../types';
import './ProjectCard.css';

interface RevealProjectCardProps {
    project: ProjectType;
    activeRole: 'Programmer' | '3D Artist';
}

const RevealProjectCard = ({ project, activeRole }: RevealProjectCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [theme, setTheme] = useState<'light-theme' | 'dark-theme'>('light-theme');
    const [isDarkMode, setIsDarkMode] = useState(false);
    

    // Detect theme changes
    useEffect(() => {
        // Check if dark mode is enabled
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
            setTheme(isDark ? 'dark-theme' : 'light-theme');
        };

        checkDarkMode();

        // Set up a mutation observer to detect theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    // Define overlay gradient styles based on dark mode
    // const overlayStyle = {
    //     background: isDarkMode
    //         ? 'linear-gradient(to bottom, rgba(17, 24, 39, 0.3), rgba(17, 24, 39, 0.85))'
    //         : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.8))'
    // };

    const overlayStyle = {
        background: isDarkMode
            ? activeRole === 'Programmer'
                ? 'linear-gradient(to bottom, rgba(37, 99, 235, 0.3), rgba(37, 99, 235, 0.85))'
                : 'linear-gradient(to bottom, rgba(220, 38, 38, 0.3), rgba(220, 38, 38, 0.85))'
            : activeRole === 'Programmer'
                ? 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.8))'
                : 'linear-gradient(to bottom, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.8))'
    };

    return (
        <div
            className={`reveal-card relative border rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl h-full ${
                activeRole === 'Programmer'
                    ? 'bg-blue-600 dark:bg-blue-800 border-blue-700 hover:bg-blue-700 hover:dark:bg-blue-600'
                    : 'bg-red-700 dark:bg-red-900 border-red-700 hover:bg-red-800 hover:dark:bg-red-600'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cover overlay - with inline styles for dark mode */}
            <div
                className={`absolute inset-0 z-10 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'
                    }`}
                style={overlayStyle}
            />

            {/* Project image */}
            {project.image && (
                <div className="w-full h-48 overflow-hidden image-container">
                    <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover object-center transition-transform duration-500 card-image ${isHovered ? 'scale-110' : 'scale-100'
                            }`}
                    />
                </div>
            )}

            {/* Project details */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white">
                        {project.title}
                    </h3>
                    <Link to={`/projects`} className="text-white/80 hover:text-white">
                        <FaExternalLinkAlt />
                    </Link>
                </div>
                <p className="text-white/90 mb-4 text-sm">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="text-xs px-2 py-1 bg-white/10 text-white rounded-md"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex gap-4 mb-4">
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-white flex items-center gap-1 text-sm"
                            aria-label="GitHub Repository"
                        >
                            <FaGithub />
                            <span>GitHub</span>
                        </a>
                    )}
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-white flex items-center gap-1 text-sm"
                            aria-label="Live Demo"
                        >
                            <FaExternalLinkAlt />
                            <span>Live Demo</span>
                        </a>
                    )}
                </div>
                {project.createdOn && (
                    <div className="flex items-center gap-1 text-white/80 text-xs mb-3">
                        <FaCalendarAlt size={12} />
                        <span>Created on: {project.createdOn}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevealProjectCard; 