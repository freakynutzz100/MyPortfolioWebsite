import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
// @ts-ignore (FBXLoader isn't properly typed in the current version)
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Try different approaches to import the file
let boxModelPath: string;
try {
    // First try the Vite import approach
    // @ts-ignore 
    boxModelPath = new URL('../uploads/box.fbx', import.meta.url).href;
} catch (error) {
    // Fallback to a relative path
    boxModelPath = '/src/uploads/box.fbx';
}

// Fallback component to show while loading
const ModelLoading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="text-white">Loading 3D model...</div>
        </div>
    );
};

// Simple cube as fallback model
const CubeModel = () => {
    const mesh = useRef<THREE.Mesh>(null!);

    // Use scroll position to rotate the cube
    useFrame(() => {
        const scrollPos = window.scrollY;
        const scrollMax = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollPos / 1000, 1); // Normalize based on 1000px scroll

        // Rotate from facing down to facing up based on scroll (inverted behavior)
        mesh.current.rotation.x = Math.PI / 4 - (progress * Math.PI / 2);
    });

    return (
        <mesh ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="royalblue" />
        </mesh>
    );
};

// The actual 3D model component using FBXLoader with scroll-based rotation
const FbxModel = ({ url }: { url: string }) => {
    const [model, setModel] = useState<THREE.Group | null>(null);
    const [error, setError] = useState(false);
    const modelRef = useRef<THREE.Group>(null!);
    const { viewport } = useThree();

    // Update rotation based on scroll position
    useFrame(() => {
        if (modelRef.current) {
            const scrollPos = window.scrollY;
            const boxSection = document.getElementById('box-model-section');
            let progress = 0;

            if (boxSection) {
                const boxRect = boxSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Calculate progress based on box position in viewport
                // 1.0 when box is at the top of viewport, 0.0 when box is not yet visible
                progress = 1 - Math.max(0, Math.min(1, boxRect.top / viewportHeight));
            } else {
                // Fallback if section not found
                const scrollMax = document.body.scrollHeight - window.innerHeight;
                progress = Math.min(scrollPos / 1000, 1); // Normalize based on 1000px scroll
            }

            // Rotate from face-down to face-up position (inverted behavior)
            modelRef.current.rotation.x = -Math.PI / 4 + (progress * Math.PI / 2);
        }
    });

    useEffect(() => {
        console.log('Attempting to load model from:', url);
        const loader = new FBXLoader();
        loader.load(
            url,
            (fbx: THREE.Group) => {
                console.log('Model loaded successfully');
                // Adjust scale for your specific model - these values may need tuning
                fbx.scale.set(0.08, 0.08, 0.08);

                // Center the model
                const box = new THREE.Box3().setFromObject(fbx);
                const center = box.getCenter(new THREE.Vector3());
                fbx.position.set(-center.x, -center.y, -center.z);

                // Start with rotation showing the top of the box
                fbx.rotation.set(Math.PI / 4, 0, 0);

                fbx.traverse((child: THREE.Object3D) => {
                    if ((child as THREE.Mesh).isMesh) {
                        // Disable shadows
                        (child as THREE.Mesh).castShadow = false;
                        (child as THREE.Mesh).receiveShadow = false;

                        // Apply flat materials if needed for better visibility
                        const mesh = child as THREE.Mesh;
                        if (mesh.material) {
                            if (Array.isArray(mesh.material)) {
                                mesh.material.forEach(mat => {
                                    mat.needsUpdate = true;
                                    // Cast to correct material type
                                    if ('flatShading' in mat) {
                                        (mat as THREE.MeshPhongMaterial).flatShading = false;
                                    }
                                });
                            } else {
                                mesh.material.needsUpdate = true;
                                // Cast to correct material type
                                if ('flatShading' in mesh.material) {
                                    (mesh.material as THREE.MeshPhongMaterial).flatShading = false;
                                }
                            }
                        }
                    }
                });
                setModel(fbx);
            },
            (xhr: ProgressEvent) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error: Error) => {
                console.error('Error loading FBX:', error);
                setError(true);
            }
        );

        // Clean up
        return () => {
            if (model) {
                model.traverse((child: THREE.Object3D) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;
                        if (mesh.geometry) mesh.geometry.dispose();
                        if (mesh.material) {
                            if (Array.isArray(mesh.material)) {
                                mesh.material.forEach(material => material.dispose());
                            } else {
                                mesh.material.dispose();
                            }
                        }
                    }
                });
            }
        };
    }, [url]);

    if (error) {
        return <CubeModel />;
    }

    return model ? <primitive ref={modelRef} object={model} /> : null;
};

// Wrapper component with Canvas
const Box3DModel = () => {
    // Use the imported model path
    const [modelPath, setModelPath] = useState(boxModelPath);
    const [loadFallback, setLoadFallback] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Try alternative paths if the model fails to load
    const tryAlternativePaths = () => {
        console.log('Trying alternative paths');
        // Try different paths in sequence
        const paths = [
            boxModelPath,
            '/src/uploads/box.fbx',
            'src/uploads/box.fbx',
            '/uploads/box.fbx',
            './uploads/box.fbx',
            '../uploads/box.fbx'
        ];

        let currentIndex = paths.indexOf(modelPath);
        if (currentIndex < paths.length - 1) {
            currentIndex++;
            setModelPath(paths[currentIndex]);
        } else {
            setLoadFallback(true);
        }
    };

    useEffect(() => {
        // If model path is empty, try alternatives
        if (!modelPath) {
            tryAlternativePaths();
        }
    }, [modelPath]);

    return (
        <div id="box-model-section" ref={sectionRef} className="w-full">
            <Canvas shadows={false}>
                {/* Use flat lighting to make model fully visible */}
                <ambientLight intensity={1.2} />
                <directionalLight intensity={0.8} position={[0, 0, 5]} />
                <directionalLight intensity={0.8} position={[0, 0, -5]} />
                <directionalLight intensity={0.8} position={[5, 0, 0]} />
                <directionalLight intensity={0.8} position={[-5, 0, 0]} />
                <directionalLight intensity={0.8} position={[0, 5, 0]} />
                <directionalLight intensity={0.8} position={[0, -5, 0]} />

                <Suspense fallback={<ModelLoading />}>
                    {loadFallback ? (
                        <CubeModel />
                    ) : (
                        <FbxModel url={modelPath} />
                    )}
                    <OrbitControls
                        autoRotate={false}
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                    />
                </Suspense>

                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            </Canvas>
        </div>
    );
};

export default Box3DModel; 