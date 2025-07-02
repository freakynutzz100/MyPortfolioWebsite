import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectType } from '../types';
import RevealProjectCard from './RevealProjectCard';
import Box3DModel from './Box3DModel';

interface BoxRevealProjectsProps {
    projects: ProjectType[];
}

const BoxRevealProjects = ({ projects }: BoxRevealProjectsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
    const [boxPosition, setBoxPosition] = useState<{ top: number; opacity: number }>({
        top: 0,
        opacity: 1
    });
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        // Create an Intersection Observer to detect when the section is in view
        const observer = new IntersectionObserver(
            (entries) => {
                // If the container is intersecting (visible)
                if (entries[0].isIntersecting) {
                    setIsInView(true);
                } else {
                    // Reset when scrolled away (optional, removes animation when scrolling back up)
                    // Uncomment if you want animation to reset when scrolled away
                    // setIsInView(false);
                    // setVisibleProjects([]);
                }
            },
            {
                // Start observing when the element is 15% visible
                threshold: 0.15,
                // Add rootMargin to trigger slightly before the element is in view
                rootMargin: '-100px 0px -10% 0px'
            }
        );

        // Start observing the container
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Cleanup
        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Don't do anything if the section isn't in view yet
            if (!isInView || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how far the section has been scrolled into the viewport
            // This gives us a value from 1 (top of section at top of viewport) to 0 (not visible yet)
            const visibleRatio = 1 - (rect.top / viewportHeight);

            // Only start the animation when the section is actually visible
            if (visibleRatio <= 0) return;

            // Use the visible ratio as our scroll progress, clamped between 0 and 1
            const scrollProgress = Math.max(0, Math.min(1, visibleRatio * 1.5)); // Multiply by 1.5 to make animation faster

            // Determine which projects should be visible based on scroll
            const newVisibleProjects = [];
            for (let i = 0; i < projects.length; i++) {
                // Show projects one by one as scroll progresses
                // Divide scroll progress by the number of projects + 1 (for the box)
                // Add a small delay factor to each project to create a sequence
                const projectThreshold = (i + 0.5) / (projects.length + 1);
                if (scrollProgress >= projectThreshold) {
                    newVisibleProjects.push(i);
                }
            }

            setVisibleProjects(newVisibleProjects);

            // Move the box down as scroll progresses
            const boxMovement = Math.min(scrollProgress * 400, 400); // Move up to 400px down
            const boxOpacity = Math.max(0, 1 - (scrollProgress * 1.2)); // Fade out slightly slower

            setBoxPosition({
                top: boxMovement,
                opacity: boxOpacity
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [projects.length, isInView]); // Added isInView to dependencies

    // Function to create staggered animation delay
    const getTransitionDelay = (index: number) => {
        return { transitionDelay: `${index * 0.1}s` };
    };

    return (
        <div ref={containerRef} className="relative min-h-[600px]">
            {/* Box Model */}
            <div
                className="absolute left-0 right-0 transition-all duration-500 ease-out"
                style={{
                    top: `${boxPosition.top}px`,
                    opacity: boxPosition.opacity,
                    zIndex: visibleProjects.length === projects.length ? 0 : 2
                }}
            >
                <Box3DModel />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="transition-all duration-700 ease-out transform"
                        style={{
                            ...getTransitionDelay(index),
                            opacity: visibleProjects.includes(index) ? 1 : 0,
                            transform: visibleProjects.includes(index)
                                ? 'translateY(0) scale(1)'
                                : 'translateY(-50px) scale(0.9)',
                            zIndex: 1
                        }}
                    >
                        {/* <RevealProjectCard project={project}/> */}
                    </div>
                ))}
            </div>

            {/* View All Projects Link */}
            <div className="flex justify-end mt-6 mb-20">
                <Link
                    to="/projects"
                    className="text-sm text-blue-400 hover:underline flex items-center"
                >
                    View all projects →
                </Link>
            </div>
        </div>
    );
};

export default BoxRevealProjects; 