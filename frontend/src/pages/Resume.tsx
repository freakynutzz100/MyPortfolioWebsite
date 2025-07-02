import { useState } from 'react';
import { FaDownload } from 'react-icons/fa';

const Resume = ({ activeRole }: { activeRole: 'Programmer' | '3D Artist' }) => {
    const [loading, setLoading] = useState(true);
    const pdfUrl = 'https://drive.google.com/file/d/1Cqmvt6nPj6q8Hrnz3iqJMsHKzBBmJsf8/preview';
    const downloadUrl = 'https://drive.usercontent.google.com/u/0/uc?id=1Cqmvt6nPj6q8Hrnz3iqJMsHKzBBmJsf8&export=download';

    return (
        <div className="pb-20 md:pb-0 mt-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold ">My Resume</h1>
                <a
                    href={downloadUrl}
                    className={`flex items-center gap-2 px-4 py-2 hover:scale-110 transition-all duration-300 rounded-md bg-white shadow-sm ${
                        activeRole === 'Programmer'
                            ? 'bg-white text-blue-600 hover:bg-gray-100 border-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:border-blue-700'
                            : 'bg-white text-red-600 hover:bg-gray-100 border-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700 dark:border-red-700'
                    }`}
                    download="Bright_Stack_Resume.pdf"
                >
                    <FaDownload />
                    <span>Download</span>
                </a>
            </div>

            <div className="w-full mt-4 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src={pdfUrl}
                    className="w-full h-[600px] md:h-[1200px] md:w-full"
                    frameBorder="0"
                    onLoad={() => setLoading(false)}
                    title="Resume"
                    allow="autoplay"
                ></iframe>
            </div>
        </div>
    );
};

export default Resume; 