import { useMemo, useState, lazy, Suspense, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
    FaBold, FaItalic, FaUnderline, FaHighlighter,
    FaLink, FaListUl, FaListOl, FaImage, FaPlus, FaMinus
} from 'react-icons/fa';
import ReactDOM from 'react-dom';

// Lazy load ReactQuill
const ReactQuill = lazy(() => import('react-quill'));

const API_BASE = import.meta.env.VITE_SERVER_URI;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const baseBox = 'bg-white/20 dark:bg-black/20 border-2 border-gray-400 rounded-xl transition-all duration-300 outline-none focus:outline-none';

const glowColors = {
    Programmer: 'focus-within:border-blue-500 hover:border-blue-500',
    '3D Artist': 'focus-within:border-red-500 hover:border-red-500',
};


const fontSizes = ['small', false, 'large', 'huge'];

const Spinner = () => (
    <div className="flex flex-col items-center justify-center py-6">
        <svg className="animate-spin h-8 w-8 text-gray-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <span className="text-gray-600 dark:text-gray-300 text-sm">Attaching your image ...</span>
    </div>
);


const ContactMe = ({ activeRole }: { activeRole: 'Programmer' | '3D Artist' }) => {
    const { register, handleSubmit, control, reset, formState: { errors }, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [quillUploading, setQuillUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const emailValue = watch('email', '');
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    const modal = showModal ? (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-60 z-[1000]"></div>
            <div className="fixed inset-0 flex items-center justify-center z-[1001]">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-xs w-full">
                    <DotLottieReact
                        src="https://lottie.host/cc312ac1-5f23-4f18-9a9c-4f944ab3150d/arhm1DtUNE.lottie"
                        loop
                        autoplay
                        style={{ width: 120, height: 120 }}
                    />
                    <div className="mt-4 text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
                        Your Message got Delivered successfully!
                    </div>
                    <button
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    ) : null;

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', { 'color': [] }, { 'background': [] }],
                ['link', 'image'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['clean']
            ],
            handlers: {
                image: function imageHandler(this: any) {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();
                    input.onchange = async () => {
                        if (input.files && input.files[0]) {
                            const formData = new FormData();
                            formData.append('file', input.files[0]);
                            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                            setQuillUploading(true);
                            try {
                                const res = await axios.post(
                                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                                    formData,
                                    { headers: { 'Content-Type': 'multipart/form-data' } }
                                );
                                const quill = this.quill;
                                const range = quill.getSelection(true);
                                quill.insertEmbed(range.index, 'image', res.data.secure_url);
                                quill.setSelection(range.index + 1);
                            } catch {
                                setError('Image upload failed');
                            }
                            setQuillUploading(false);
                        }
                    };
                }
            }
        }
    }), [CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME]);

    const onSubmit = async (data: any) => {
        setLoading(true);
        setSuccess('');
        setError('');
        try {
            await axios.post(`${API_BASE}/api/contact`, data);
            setShowModal(true); // Show modal on success
            reset();
        } catch (err) {
            setError('Failed to send message.');
        }
        setLoading(false);
    };


    useEffect(() => {
        const toolbar = document.querySelector('.ql-toolbar');
        if (!toolbar) return;
    
        const tooltips: Record<string, string> = {
            'ql-bold': 'Bold',
            'ql-italic': 'Italic',
            'ql-underline': 'Underline',
            'ql-strike': 'Strikethrough',
            'ql-link': 'Insert Link',
            'ql-image': 'Insert Image',
            'ql-list': 'List',
            'ql-clean': 'Remove Formatting',
            'ql-color': 'Text Color',
            'ql-background': 'Highlight',
            'ql-script': 'Subscript/Superscript',
            'ql-blockquote': 'Blockquote',
            'ql-code-block': 'Code Block',
            'ql-direction': 'Text Direction',
            'ql-indent': 'Indent',
            'ql-align': 'Align',
        };
    
        function setTooltips() {
            if (!toolbar) return;
            toolbar.querySelectorAll('button:not(.ql-picker-label)').forEach((btn) => {
                for (const key in tooltips) {
                    if (btn.classList.contains(key)) {
                        btn.setAttribute('title', tooltips[key]);
                    }
                }
            });
        }
    
        setTooltips();
    
        // Observe for toolbar changes (e.g. on rerender)
        const observer = new MutationObserver(setTooltips);
        observer.observe(toolbar, { childList: true, subtree: true });
    
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    return (
    <>
        {ReactDOM.createPortal(modal, document.body)}
        <div className="pb-20 md:pb-0 w-full flex flex-col items-start md:items-start">
            <h1 className="text-3xl font-bold mb-10 mt-10 text-left w-full">Contact Page</h1>
            <section className="mb-16 max-w-xl w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <div className={`${baseBox} ${glowColors[activeRole]} p-2`}>
                        <input
                            {...register('name', { required: true })}
                            className="w-full px-4 py-2 bg-transparent rounded-xl outline-none placeholder-gray-400"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className={`${baseBox} ${glowColors[activeRole]} p-2`}>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            className="w-full px-4 py-2 bg-transparent rounded-xl outline-none placeholder-gray-400"
                            placeholder="Email"
                            required
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.email.message as string}</span>
                        )}
                        {!errors.email && emailValue && !isEmailValid && (
                            <span className="text-red-500 text-sm mt-1 block">Invalid email address</span>
                        )}
                    </div>
                    <div className={`${baseBox} ${glowColors[activeRole]} p-2`}>
                        <input
                            {...register('subject', { required: true })}
                            className="w-full px-4 py-2 bg-transparent rounded-xl outline-none placeholder-gray-400"
                            placeholder="Subject"
                            required
                        />
                    </div>
                    <div className={`${baseBox} ${glowColors[activeRole]} p-2`}>
                        <Controller
                            name="body"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Suspense fallback={<div>Loading editor...</div>}>
                                    <div className="relative">
                                        <ReactQuill
                                            {...field}
                                            theme="snow"
                                            modules={modules}
                                            className="bg-transparent rounded-xl border-none"
                                            placeholder="I want your help regarding..."
                                        />
                                        {quillUploading && (
                                            <div className="absolute inset-0 bg-white/70 dark:bg-black/70 flex flex-col items-center justify-center z-10 rounded-xl">
                                                <Spinner />
                                            </div>
                                        )}
                                    </div>
                                </Suspense>
                            )}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !isEmailValid}
                        className={`w-full py-2 rounded-xl font-bold text-white transition-all ${activeRole === 'Programmer'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-red-600 hover:bg-red-700'
                            } ${(!isEmailValid || loading) ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Sending...' : 'Send Message to Yog'}
                    </button>
                    {success && <div className="text-green-600 mt-2">{success}</div>}
                    {error && <div className="text-red-600 mt-2">{error}</div>}
                </form>
            </section>

            <style>{`
                .${baseBox.replace(/\s+/g, '.')} {
                    box-shadow: none !important;
                    border-width: 2px;
                    border-style: solid;
                    overflow: hidden;
                }

                .${glowColors.Programmer.split(' ')[0]}:hover,
                .${glowColors.Programmer.split(' ')[0]}:focus-within {
                    border-color: #2563eb !important;
                }

                .${glowColors['3D Artist'].split(' ')[0]}:hover,
                .${glowColors['3D Artist'].split(' ')[0]}:focus-within {
                    border-color: #dc2626 !important;
                }

                .ql-toolbar {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    flex-direction: row;
                    gap: 0.75rem !important;
                    align-items: center;
                    overflow: visible !important;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.75rem 0.75rem 0 0 !important;
                    background: transparent !important;
                    border: none !important;
                    position: relative;
                    z-index: 5;
                }

                .ql-toolbar .ql-formats {
                    display: flex !important;
                    flex-wrap: nowrap !important;
                    gap: 0.5rem !important;
                    align-items: center;
                    overflow: visible !important;
                }

                .ql-picker {
                    overflow: visible !important;
                    z-index: 10 !important;
                }

                .ql-picker-options {
                    z-index: 20 !important;
                    background-color: #fff;
                    border-radius: 0.375rem;
                    box-shadow: 0 0 5px rgba(0,0,0,0.15);
                    margin-top: 0.25rem;
                }

                /* Light mode styles */
                .ql-toolbar .ql-formats button,
                .ql-toolbar .ql-formats .ql-picker-label, {
                    background: none !important;
                    color: #374151 !important;            /* gray-700 */
                    border: 1px solid #e5e7eb !important;  /* gray-200 */
                    border-radius: 0.375rem !important;
                    margin: 0;
                    min-width: 2rem;
                    min-height: 2rem;
                    padding: 0.25rem 0.5rem;
                    box-sizing: border-box;
                    transition: all 0.2s ease-in-out;
                }

                .ql-toolbar .ql-formats button:hover,
                .ql-toolbar .ql-formats .ql-picker-label:hover,
                .ql-toolbar .ql-formats .ql-picker-item:hover,
                .ql-toolbar .ql-formats button.ql-active,
                .ql-toolbar .ql-formats .ql-picker-label.ql-active {
                    background: #f3f4f6 !important;
                    border-color: #94a3b8 !important;
                    color: #1f2937 !important;
                }

                .ql-toolbar .ql-formats button:focus,
                .ql-toolbar .ql-formats .ql-picker-label:focus {
                    outline: 2px solid #2563eb !important;
                    outline-offset: 1px;
                }

                /* Dark mode styles */
                body.dark .ql-toolbar .ql-formats button,
                body.dark .ql-toolbar .ql-formats .ql-picker-label,
                body.dark .ql-toolbar .ql-formats .ql-picker-item {
                    background: #18181b !important;
                    color: #f3f4f6 !important;
                    border-color: #334155 !important;
                }

                body.dark .ql-toolbar .ql-formats button:hover,
                body.dark .ql-toolbar .ql-formats .ql-picker-label:hover,
                body.dark .ql-toolbar .ql-formats .ql-picker-item:hover,
                body.dark .ql-toolbar .ql-formats button.ql-active,
                body.dark .ql-toolbar .ql-formats .ql-picker-label.ql-active {
                    background: #334155 !important;
                    border-color: #dc2626 !important;
                    color: #f87171 !important;
                }

                body.dark .ql-toolbar .ql-formats button:focus,
                body.dark .ql-toolbar .ql-formats .ql-picker-label:focus {
                    outline: 2px solid #dc2626 !important;
                    outline-offset: 1px;
                }

                .ql-container {
                    border-radius: 0 0 0.75rem 0.75rem !important;
                    background: transparent !important;
                    border: none !important;
                    height: 300px;
                    padding: 0;
                    overflow: hidden;
                }

                .ql-editor {
                    padding: 0.75rem;
                    overflow-y: auto;
                    height: 100%;
                    white-space: normal;
                    word-break: break-word;
                    overflow-wrap: break-word;
                    background: transparent !important;
                    color: inherit;
                }

                .ql-editor img {
                    display: block;
                    height: auto;
                    max-width: 100%;
                    margin: 1rem 0;
                    object-fit: contain;
                    border-radius: 0.5rem;
                    pointer-events: auto;
                    text-align: left;
                }

                .ql-editor img + br {
                    display: inline;
                }

                .ql-editor:after {
                    content: '';
                    display: inline-block;
                    width: 1px;
                }

                .ql-editor.ql-blank::before {
                    font-family: inherit !important;
                    font-style: normal !important;
                    font-size: 1rem !important;
                    color: #9ca3af !important;
                    opacity: 1 !important;
                    left: 0.75rem !important;
                    right: 0.75rem !important;
                    top: 0.75rem !important;
                }

                body.dark .ql-editor.ql-blank::before {
                    color: #d1d5db !important;
                }

                .ql-color .ql-picker-options .ql-picker-item,
                .ql-background .ql-picker-options .ql-picker-item {
                    width: 24px !important;
                    height: 24px !important;
                    border-radius: 0.375rem !important;
                    margin: 2px !important;
                    border: 1px solid #e5e7eb !important;
                    box-sizing: border-box;
                    /* Do NOT set background here! */
                }

                .ql-color .ql-picker-options .ql-picker-item.ql-selected,
                .ql-background .ql-picker-options .ql-picker-item.ql-selected {
                    box-shadow: 0 0 0 2px #2563eb !important;
                    border-color: #2563eb !important;
                }

                @media (prefers-color-scheme: dark) {
                    .ql-color .ql-picker-options .ql-picker-item,
                    .ql-background .ql-picker-options .ql-picker-item {
                        border: 1px solid #334155 !important;
                    }
                    .ql-color .ql-picker-options .ql-picker-item.ql-selected,
                    .ql-background .ql-picker-options .ql-picker-item.ql-selected {
                        box-shadow: 0 0 0 2px #dc2626 !important;
                        border-color: #dc2626 !important;
                    }
                }
            `}</style>
        </div>
    </>
    );
};

export default ContactMe;