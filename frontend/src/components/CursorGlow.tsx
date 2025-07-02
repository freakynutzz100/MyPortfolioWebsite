import { useEffect, useState } from 'react';

// const CursorGlow = ({ activeRole }: { activeRole: 'Programmer' | '3D Artist' }) => {
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const [isDarkMode, setIsDarkMode] = useState(true);

//     useEffect(() => {
//         // Check if dark mode is active
//         const checkDarkMode = () => {
//             setIsDarkMode(document.documentElement.classList.contains('dark'));
//         };

//         // Update cursor position
//         const updatePosition = (e: MouseEvent) => {
//             setPosition({ x: e.clientX, y: e.clientY });
//         };

//         // Initial check
//         checkDarkMode();

//         // Add event listeners
//         window.addEventListener('mousemove', updatePosition);

//         // Create a MutationObserver to detect dark mode changes
//         const observer = new MutationObserver((mutations) => {
//             mutations.forEach((mutation) => {
//                 if (mutation.attributeName === 'class') {
//                     checkDarkMode();
//                 }
//             });
//         });

//         // Start observing
//         observer.observe(document.documentElement, { attributes: true });

//         // Cleanup event listeners
//         return () => {
//             window.removeEventListener('mousemove', updatePosition);
//             observer.disconnect();
//         };
//     }, []);

//     return (
//         <>
//             {/* For dark mode */}
//             {/* {isDarkMode && (
//                 <div
//                     className="cursor-glow dark-glow"
//                     style={{
//                         position: 'fixed',
//                         pointerEvents: 'none',
//                         left: 0,
//                         top: 0,
//                         width: '200px',
//                         height: '200px',
//                         borderRadius: '50%',
//                         background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0) 70%)',
//                         transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
//                         zIndex: 9999,
//                         transition: 'transform 0.15s ease-out',
//                         filter: 'blur(5px)',
//                         mixBlendMode: 'lighten',
//                     }}
//                 />
//             )} */}

//             {/* For light mode */}
//             {isDarkMode && (
//                 <div
//                     className={`cursor-glow dark-glow ${
//                         activeRole === 'Programmer' ? 'programmer-glow' : 'artist-glow'
//                     }`}
//                     style={{
//                         position: 'fixed',
//                         pointerEvents: 'none',
//                         left: 0,
//                         top: 0,
//                         width: '200px',
//                         height: '200px',
//                         borderRadius: '50%',
//                         transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
//                         zIndex: 9999,
//                         transition: 'transform 0.15s ease-out',
//                         filter: 'blur(5px)',
//                         mixBlendMode: 'lighten',
//                     }}
//                 />
//             )}
//         </>
//     );
// };

// export default CursorGlow;

const CursorGlow = ({ activeRole }: { activeRole: 'Programmer' | '3D Artist' }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updatePosition);
        return () => window.removeEventListener('mousemove', updatePosition);
    }, []);

    return (
        <div
            className={`cursor-glow ${
                activeRole === 'Programmer' ? 'programmer-glow' : 'artist-glow'
            }`}
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                left: 0,
                top: 0,
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
                zIndex: 9999,
                transition: 'transform 0.15s ease-out',
                filter: 'blur(5px)',
            }}
        />
    );
};

export default CursorGlow;