import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub, FaCalendarAlt } from 'react-icons/fa';
import { ProjectType } from '../types';
import './ProjectCard.css';

interface ProjectCardProps {
    project: ProjectType;
    loading?: boolean;
    activeRole: 'Programmer' | '3D Artist';
}

const ProjectCard = ({ project, loading = false, activeRole }: ProjectCardProps) => {
    if (loading) {
        return (
            <div className={`border rounded-lg overflow-hidden backdrop-blur-sm animate-pulse ${
                activeRole === 'Programmer' 
                    ? 'bg-blue-600/80 dark:bg-blue-800/80 border-blue-700'
                    : 'bg-red-600/80 dark:bg-red-900/80 border-red-700'
            }`}>
                <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
                        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 mb-4"></div>
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`border rounded-lg overflow-hidden backdrop-blur-sm shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl ${
            activeRole === 'Programmer'
                ? 'bg-blue-600 dark:bg-blue-800 border-blue-700  hover:bg-blue-700 hover:dark:bg-blue-600'
                : 'bg-red-600 dark:bg-red-700 border-red-700 hover:bg-red-700 hover:dark:bg-red-500'
        }`}>
            {project.image && (
                <div className="w-full h-48 overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                    />
                </div>
            )}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white">
                        {project.title}
                    </h3>
                    <Link to={`${project.liveUrl}`} className="text-white/80 hover:text-white">
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

export default ProjectCard; 