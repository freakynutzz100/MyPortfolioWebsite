import { useState, useEffect, RefObject, useCallback } from 'react';

interface CursorFollowProps {
    maxRotation?: number;  // Maximum rotation in degrees
    followIntensity?: number; // How much the element follows the cursor (0-1)
}

export const useCursorFollow = <T extends HTMLElement>({
    maxRotation = 15,
    followIntensity = 0.03,
}: CursorFollowProps = {}) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [elementCenter, setElementCenter] = useState({ x: 0, y: 0 });

    // Update the element's center position and window dimensions
    const updateElementPosition = useCallback((ref: RefObject<T>) => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setElementCenter({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            });
        }
    }, []);

    // Handle mouse movement to update rotation
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate rotation based on cursor position relative to element center
        const rotateY = ((mouseX - elementCenter.x) / window.innerWidth) * maxRotation;
        const rotateX = ((elementCenter.y - mouseY) / window.innerHeight) * maxRotation;

        setRotation({ x: rotateX, y: rotateY });

        // Calculate subtle follow movement
        const followX = (mouseX - elementCenter.x) * followIntensity;
        const followY = (mouseY - elementCenter.y) * followIntensity;

        setPosition({ x: followX, y: followY });
    }, [elementCenter, maxRotation, followIntensity]);

    // Effect to setup event listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return {
        style: {
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
        },
        updateElementPosition,
    };
}; 