import * as THREE from "three";
import { ReactThreeFiber } from "@react-three/fiber";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			group: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>;
			mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
			instancedMesh: ReactThreeFiber.Object3DNode<
				THREE.InstancedMesh,
				typeof THREE.InstancedMesh
			>;
			boxGeometry: ReactThreeFiber.BufferGeometryNode<
				THREE.BoxGeometry,
				typeof THREE.BoxGeometry
			>;
			meshStandardMaterial: ReactThreeFiber.MaterialNode<
				THREE.MeshStandardMaterial,
				typeof THREE.MeshStandardMaterial
			>;
			ambientLight: ReactThreeFiber.LightNode<
				THREE.AmbientLight,
				typeof THREE.AmbientLight
			>;
			pointLight: ReactThreeFiber.LightNode<
				THREE.PointLight,
				typeof THREE.PointLight
			>;
			color: ReactThreeFiber.Node<any, any>;
		}
	}
}
