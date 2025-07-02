import { useState } from 'react';
import { skillDescriptions } from '../data/skills';
import IconRenderer from './IconRenderer';

interface SkillCardProps {
    name: string;
    iconType: string;
    colorClass: string;
    darkModeClass?: string;
    activeRole: 'Programmer' | '3D Artist';
}

const SkillCard = ({ name, iconType, colorClass, darkModeClass = '', activeRole }: SkillCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // Get description or use default
    const description = skillDescriptions[name] || 'A valuable technology skill in modern web development.';

    return (
        <div
            className={`
                        rounded-lg border overflow-hidden transition-all duration-300 ease-in-out
                        ${isHovered ? 'z-10 scale-110 shadow-xl' : ''}
                        ${activeRole === 'Programmer'
                            ? 'bg-blue-600 dark:bg-blue-800 border-blue-700 text-white hover:bg-blue-700 hover:dark:bg-blue-600'
                            : 'bg-red-600 dark:bg-red-700 border-red-700 text-white hover:bg-red-700 hover:dark:bg-red-500'
                        }
                       overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-4 flex flex-col items-center justify-center text-center">
                <div className="text-xl md:text-2xl mb-2">
                    <IconRenderer iconType={iconType} className={`${colorClass} ${darkModeClass}`} />
                </div>
                <span className="text-xs md:text-sm font-medium text-white">{name}</span>

                {/* Description that appears on hover */}
                <div
                    className={`mt-2 text-xs text-white overflow-hidden transition-all duration-300
                                ${isHovered ? 'max-h-28 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    {description}
                </div>
            </div>
        </div>
    );
};

export default SkillCard; 