import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Navbar from './components/Navbar';
import MobileNavbar from './components/MobileNavbar';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Resume from './pages/Resume';
import ContactMe from './pages/ContactMe';
import './App.css';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const [activeRole, setActiveRole] = useState<'Programmer' | '3D Artist'>(() => {
        const savedRole = localStorage.getItem('activeRole');
        return savedRole === '3D Artist' ? '3D Artist' : 'Programmer';
    });

    const isMobile = useMediaQuery({ maxWidth: 768 });

    // Load theme from localStorage or use default (light mode)
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeRole', activeRole);
    }, [activeRole]);

    // Handle theme toggle
    const toggleTheme = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div 
            data-role={activeRole}
            className={`relative before:absolute before:inset-0 ${
                activeRole === 'Programmer' 
                    ? 'before:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(59,130,246,0.2)_120%,_rgba(59,130,246,0.4)_100%)]' 
                    : 'before:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(220,38,38,0.1)_120%,_rgba(220,38,38,0.3)_100%)]'
            } before:pointer-events-none`}
        >
            <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300 pt-16 px-4 relative before:absolute before:inset-0 ${activeRole === 'Programmer' ? 'before:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(59,130,246,0.2)_120%,_rgba(59,130,246,0.4)_100%)]' : 'before:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(220,38,38,0.1)_120%,_rgba(220,38,38,0.3)_100%)]'} before:opacity-100 before:pointer-events-none`}>
                {/* Cursor glow effect - only appears in dark mode */}
                <CursorGlow activeRole={activeRole} />

                {isMobile ? (
                    <MobileNavbar theme={isDarkMode ? 'dark' : 'light'} toggleTheme={toggleTheme} activeRole={activeRole} setActiveRole={setActiveRole} />
                ) : (
                    <Navbar theme={isDarkMode ? 'dark' : 'light'} toggleTheme={toggleTheme} activeRole={activeRole} setActiveRole={setActiveRole} />
                )}
                <div className={`container mx-auto px-4 md:px-8 lg:px-40 pb-16 glass-container my-6 rounded-xl relative before:absolute before:inset-0 ${activeRole === 'Programmer' ? 'before:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(59,130,246,0.2)_120%,_rgba(59,130,246,0.4)_100%)]' : 'before:bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(220,38,38,0.1)_120%,_rgba(220,38,38,0.3)_100%)]'} before:opacity-100 before:rounded-xl before:pointer-events-none`}>
                    <Routes>
                    <Route path="/" element={<Home activeRole={activeRole} />} />
                        <Route path="/projects" element={<Projects activeRole={activeRole} />} />
                        <Route path="/profile" element={<Profile activeRole={activeRole} />} />
                        <Route path="/resume" element={<Resume activeRole={activeRole} />} />
                        <Route path="/contact" element={<ContactMe activeRole={activeRole} />} />
                    </Routes>
                </div>
            </div>
            <Footer activeRole={activeRole} />
        </div>
    );
};

export default App;