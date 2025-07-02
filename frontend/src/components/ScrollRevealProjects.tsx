import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectType } from '../types';
import RevealProjectCard from './RevealProjectCard';

interface ScrollRevealProjectsProps {
    projects: ProjectType[];
    activeRole: 'Programmer' | '3D Artist';
}

const ScrollRevealProjects = ({ projects, activeRole }: ScrollRevealProjectsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
    const [isInView, setIsInView] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Detect if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            const mobileBreakpoint = 768; // Standard mobile breakpoint
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        // Check on initial load
        checkIfMobile();

        // Listen for window resize
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    useEffect(() => {
        // Use different threshold values based on device type
        const observerThreshold = isMobile ? 0.1 : 0.1;

        // Create an Intersection Observer to detect when the section is in view
        const observer = new IntersectionObserver(
            (entries) => {
                // If the container is intersecting (visible)
                if (entries[0].isIntersecting) {
                    setIsInView(true);
                }
            },
            {
                // Use the appropriate threshold based on device
                threshold: observerThreshold,
                // Add rootMargin to trigger slightly before the element is in view
                // Use smaller margin on mobile for faster triggering
                rootMargin: isMobile ? '-20px 0px -5% 0px' : '-50px 0px -10% 0px'
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
    }, [isMobile]); // Re-run when isMobile changes

    useEffect(() => {
        const handleScroll = () => {
            // Don't do anything if the section isn't in view yet
            if (!isInView || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how far the section has been scrolled into the viewport
            const visibleRatio = 1 - (rect.top / viewportHeight);

            // Only start the animation when the section is actually visible
            if (visibleRatio <= 0) return;

            // Use the visible ratio as our scroll progress, clamped between 0 and 1
            // Adjust multiplier based on device - faster on mobile
            const multiplier = isMobile ? 2.2 : 1.8;
            const progress = Math.max(0, Math.min(1, visibleRatio * multiplier));
            setScrollProgress(progress);

            // Determine which projects should be visible based on scroll
            const newVisibleProjects = [];
            for (let i = 0; i < projects.length; i++) {
                // Show projects one by one as scroll progresses
                // Use different threshold calculations for mobile vs desktop
                const projectThreshold = isMobile
                    ? Math.max(0.15, i / (projects.length * 1.3)) // Add minimum threshold for mobile
                    : Math.max(0.15, i / (projects.length + 1)); // Add minimum threshold for desktop

                if (progress >= projectThreshold) {
                    newVisibleProjects.push(i);
                }
            }

            setVisibleProjects(newVisibleProjects);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [projects.length, isInView, isMobile]); // Added isMobile to dependencies

    // Function to create staggered animation delay
    const getTransitionDelay = (index: number) => {
        // Use shorter delays on mobile
        const delayIncrement = isMobile ? 0.08 : 0.12;
        return { transitionDelay: `${index * delayIncrement}s` };
    };

    // Calculate a staggered opacity based on both visibility and scroll progress
    const getCardStyle = (index: number) => {
        const isVisible = visibleProjects.includes(index);

        return {
            ...getTransitionDelay(index),
            opacity: isVisible ? 1 : 0,
            transform: isVisible
                ? 'translateY(0) scale(1)'
                : 'translateY(40px) scale(0.96)',
            filter: `blur(${isVisible ? 0 : 3}px)`
        };
    };

    return (
        <div ref={containerRef} className="relative mb-10">
            {/* Projects Grid - adjust columns based on device */}
            <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-3'} gap-12 sm:gap-6`}>
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="transition-all duration-800 ease-out transform perspective-1000"
                        style={getCardStyle(index)}
                    >
                        <Link to={project.liveUrl || '#'} target="_blank" rel="noopener noreferrer">
                        <RevealProjectCard project={project} activeRole={activeRole} />
                        </Link>
                    </div>
                ))}
            </div>

            {/* View All Projects Link */}
            <div
                className="flex justify-end mt-6"
                style={{
                    opacity: scrollProgress > (isMobile ? 0.5 : 0.7) ? 1 : 0,
                    transform: `translateY(${scrollProgress > (isMobile ? 0.5 : 0.7) ? 0 : 10}px)`,
                    transition: 'all 0.5s ease-out'
                }}
            >
                <Link
                    to="/projects"
                    className={`text-sm hover:underline flex items-center ${
                        activeRole === 'Programmer'
                            ? 'text-blue-400 dark:text-blue-300'
                            : 'text-red-600 dark:text-red-300'}`}
                >
                    View all projects →
                </Link>
            </div>
        </div>
    );
};

export default ScrollRevealProjects; 