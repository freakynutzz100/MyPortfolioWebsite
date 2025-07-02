import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/80 transition-colors"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound; 