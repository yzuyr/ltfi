import { useRef, useMemo } from "react";
import { useFrame, useLoader, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as THREE from "three";
import type { ReactNode } from "react";
import type { Group, Mesh } from "three";

extend({ TextGeometry });

interface VoxelTextProps {
	text?: string;
}

export const VoxelText = ({
	text = "Lock The Fuck In",
}: VoxelTextProps): ReactNode => {
	const groupRef = useRef<Group>(null);
	const meshRef = useRef<Mesh>(null);

	const font = useLoader(FontLoader, "/ltfi/fonts/Orbitron_Bold.json");

	const geometry = useMemo(() => {
		const textGeometry = new TextGeometry(text, {
			font,
			size: 3,
			depth: 0.4,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.1,
			bevelSize: 0.05,
			bevelOffset: 0,
			bevelSegments: 5,
		});

		// Center the text
		textGeometry.computeBoundingBox();
		const centerOffset =
			textGeometry.boundingBox?.getCenter(new THREE.Vector3()) ??
			new THREE.Vector3();
		textGeometry.translate(-centerOffset.x, -centerOffset.y, -centerOffset.z);

		return textGeometry;
	}, [text, font]);

	const material = useMemo(
		() =>
			new THREE.MeshStandardMaterial({
				color: "#4444ff",
				emissive: "#4444ff",
				emissiveIntensity: 2.0,
				metalness: 0.9,
				roughness: 0.2,
				toneMapped: false,
			}),
		[],
	);

	useFrame(({ clock }) => {
		if (!meshRef.current) return;

		// Update emissive color for glow effect
		if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
			// Oscillate between blue (240/360) and purple (280/360)
			const time = clock.getElapsedTime();
			const hue = (240 + Math.sin(time * 0.5) * 20) / 360;
			const saturation = 1.0;
			const lightness = 0.7 + Math.sin(time) * 0.1;

			meshRef.current.material.color.setHSL(hue, saturation, lightness);
			meshRef.current.material.emissive.setHSL(hue, saturation, lightness);
		}
	});

	return (
		<group ref={groupRef}>
			<mesh ref={meshRef} geometry={geometry} material={material} />
		</group>
	);
};
