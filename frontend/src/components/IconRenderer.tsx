import React from 'react';
import { FaJs, FaReact, FaNodeJs, FaMobile } from 'react-icons/fa';
import {
    SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiGraphql,
    SiBootstrap, SiPostman, SiGithub, SiThreedotjs, SiAndroidstudio,
    SiVisualstudiocode, SiVisualstudio, SiDocker, SiKubernetes,
    SiAmazonaws, SiGooglecloud, SiUnity, SiPython, SiVite, SiPhp,
    SiExpress, SiPostgresql, SiSupabase, SiFirebase, SiMysql,
    SiSocketdotio, SiTensorflow, SiKeras, SiOpencv, SiPowerbi,
    SiMui, SiWebgl, SiCsharp, SiAngular, SiMicrosoftazure, SiDotnet,
    SiBlender,
} from 'react-icons/si';
import { FaJava } from "react-icons/fa";

interface IconRendererProps {
    iconType: string;
    className?: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconType, className = '' }) => {
    // Map of icon types to their corresponding components
    const iconMap: Record<string, React.ReactNode> = {
        'FaJs': <FaJs className={className} />,
        'FaReact': <FaReact className={className} />,
        'SiAngular': <SiAngular className={className} />,
        'SiMicrosoftazure': <SiMicrosoftazure className={className} />,
        'FaNodeJs': <FaNodeJs className={className} />,
        'FaMobile': <FaMobile className={className} />,
        'SiTypescript': <SiTypescript className={className} />,
        'SiTailwindcss': <SiTailwindcss className={className} />,
        'SiNextdotjs': <SiNextdotjs className={className} />,
        'SiMongodb': <SiMongodb className={className} />,
        'SiGraphql': <SiGraphql className={className} />,
        'SiBootstrap': <SiBootstrap className={className} />,
        'SiPostman': <SiPostman className={className} />,
        'SiGithub': <SiGithub className={className} />,
        'SiThreedotjs': <SiThreedotjs className={className} />,
        'SiAndroidstudio': <SiAndroidstudio className={className} />,
        'SiVisualstudiocode': <SiVisualstudiocode className={className} />,
        'SiVisualstudio': <SiVisualstudio className={className} />,
        'SiDocker': <SiDocker className={className} />,
        'SiKubernetes': <SiKubernetes className={className} />,
        'SiAmazonaws': <SiAmazonaws className={className} />,
        'SiGooglecloud': <SiGooglecloud className={className} />,
        'SiUnity': <SiUnity className={className} />,
        'SiPython': <SiPython className={className} />,
        'SiVite': <SiVite className={className} />,
        'SiPhp': <SiPhp className={className} />,
        'SiExpress': <SiExpress className={className} />,
        'SiPostgresql': <SiPostgresql className={className} />,
        'SiSupabase': <SiSupabase className={className} />,
        'SiFirebase': <SiFirebase className={className} />,
        'SiMysql': <SiMysql className={className} />,
        'SiSocketdotio': <SiSocketdotio className={className} />,
        'SiTensorflow': <SiTensorflow className={className} />,
        'SiKeras': <SiKeras className={className} />,
        'SiOpencv': <SiOpencv className={className} />,
        'SiPowerbi': <SiPowerbi className={className} />,
        'SiMui': <SiMui className={className} />,
        'SiWebgl': <SiWebgl className={className} />,
        'SiCsharp': <SiCsharp className={className} />,
        'FaJava': <FaJava className={className} />,
        'SiDotnet': <SiDotnet className={className} />,
        'SiBlender': <SiBlender className={className} />
    };

    // Return the icon component if it exists, otherwise return null
    return <>{iconMap[iconType] || null}</>;
};

export default IconRenderer; 