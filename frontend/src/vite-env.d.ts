/// <reference types="vite/client" />

// Declare modules for specific file types that Vite can handle
declare module '*.fbx' {
    const src: string;
    export default src;
}

declare module '*.fbx?url' {
    const src: string;
    export default src;
}

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // Add other env variables as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
} 