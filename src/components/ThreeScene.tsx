import { Canvas, useFrame } from "@react-three/fiber";
import { VoxelText } from "./VoxelText";

interface ThreeSceneProps {
	text?: string;
}

const CameraAnimation = () => {
	useFrame(({ camera, clock }) => {
		const time = clock.getElapsedTime();
		const radius = 40;
		const speed = 0.2;

		// Calculate camera position on a tilted circle
		camera.position.x = Math.sin(time * speed) * radius;
		camera.position.z = Math.cos(time * speed) * radius;
		camera.position.y = Math.sin(time * speed * 0.5) * 10; // Add some vertical movement

		// Look at the center
		camera.lookAt(0, 0, 0);
	});

	return null;
};

const Background = () => {
	return (
		<mesh position={[0, 0, -100]}>
			<planeGeometry args={[400, 200]} />
			<meshStandardMaterial
				color="#000033"
				emissive="#330066"
				emissiveIntensity={0.5}
				metalness={0.8}
				roughness={0.9}
			/>
		</mesh>
	);
};

export const ThreeScene = ({ text = "Lock The Fuck In" }: ThreeSceneProps) => {
	return (
		<div style={{ width: "100%", height: "100vh", background: "#000" }}>
			<Canvas
				camera={{
					position: [0, 0, 40],
					fov: 45,
					near: 0.1,
					far: 1000,
				}}
			>
				<CameraAnimation />
				<Background />
				<ambientLight intensity={2.0} />
				<pointLight position={[10, 10, 10]} intensity={5.0} />
				<pointLight position={[-10, -10, -10]} intensity={5.0} />
				<pointLight position={[0, 0, 15]} intensity={5.0} color="#4444ff" />
				<pointLight position={[0, 0, -15]} intensity={5.0} color="#4444ff" />
				<VoxelText text={text} />
				{/* Removed OrbitControls to allow for automatic camera animation */}
			</Canvas>
		</div>
	);
};

export default ThreeScene;
