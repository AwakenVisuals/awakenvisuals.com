"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface InfiniteGalleryProps {
  images: string[];
  speed?: number;
  visibleCount?: number;
  className?: string;
}

function GalleryImage({
  url,
  position,
  scale,
}: {
  url: string;
  position: [number, number, number];
  scale: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    loader.load(
      url,
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      () => {
        // Fail silently — image won't render
      }
    );
  }, [url]);

  if (!texture) return null;

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={0.95} />
    </mesh>
  );
}

function Gallery({
  images,
  speed = 1,
  visibleCount = 8,
}: {
  images: string[];
  speed: number;
  visibleCount: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const imageWidth = 2.4;
  const gap = 0.4;
  const totalWidth = images.length * (imageWidth + gap);

  const positions = useMemo(() => {
    return images.map((_, i) => {
      const x = i * (imageWidth + gap) - (totalWidth / 2);
      const y = (Math.random() - 0.5) * 0.6;
      const z = (Math.random() - 0.5) * 1.5 - 1;
      return [x, y, z] as [number, number, number];
    });
  }, [images.length, totalWidth]);

  const scales = useMemo(() => {
    return images.map(() => {
      const s = 1.5 + Math.random() * 0.8;
      return [imageWidth * (0.6 + Math.random() * 0.4), s, 1] as [number, number, number];
    });
  }, [images.length]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.x -= delta * speed * 0.3;

    // Loop: when scrolled past half, reset
    if (groupRef.current.position.x < -totalWidth / 2) {
      groupRef.current.position.x += totalWidth;
    }
  });

  // Double the images for seamless loop
  const doubledImages = [...images, ...images];
  const doubledPositions = [
    ...positions,
    ...positions.map(([x, y, z]) => [x + totalWidth, y, z] as [number, number, number]),
  ];
  const doubledScales = [...scales, ...scales];

  return (
    <group ref={groupRef}>
      {doubledImages.map((url, i) => (
        <GalleryImage
          key={`${url}-${i}`}
          url={url}
          position={doubledPositions[i]}
          scale={doubledScales[i]}
        />
      ))}
    </group>
  );
}

export function InfiniteGallery({
  images,
  speed = 1,
  visibleCount = 8,
  className,
}: InfiniteGalleryProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1} />
        <Gallery images={images} speed={speed} visibleCount={visibleCount} />
      </Canvas>
    </div>
  );
}

export default InfiniteGallery;
