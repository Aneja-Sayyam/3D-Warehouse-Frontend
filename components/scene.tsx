import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense, useMemo } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { model } from "../data-types/modelInterface";
import styles from '../styles/scene.module.css'

interface Props {
  modelData: model;
  camera:{position:[number,number,number],fov:number}
  modelPosition:[number,number,number]
}

const Scene = ({ modelData,camera,modelPosition }: Props) => {
  const RenderGLTFModel = (modelData: model) => {
    const { nodes, scene } = useLoader(GLTFLoader, modelData.path);
    useMemo(
      () =>
        Object.values(nodes).forEach(
          (obj) => obj.isObject3D && Object.assign(obj, { castShadow: true })
        ),
      [nodes]
    );
    return <primitive object={scene} dispose={null} />;
  };

  const RenderFBXModel = (modelData: model) => {
    const fbx = useLoader(FBXLoader, modelData.path);
    return <primitive object={fbx} dispose={null} />;
  };

  const RenderOBJModel = (modelData: model) => {
    const obj = useLoader(OBJLoader, modelData.path);
    return <primitive object={obj} dispose={null} />;
  };

  const Model = () => {
    if (modelData) {
      const { extension } = modelData;
      if (extension === ".gltf" || extension === ".glb") {
        return RenderGLTFModel(modelData);
      } else if (extension === "fbx") {
        return RenderFBXModel(modelData);
      } else {
        return RenderOBJModel(modelData);
      }
    } else {
      return null;
    }
  };

  return (
    <div className={styles.scene}>
      <Canvas shadows camera={camera}>
        <ambientLight intensity={1} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <directionalLight
          castShadow
          position={[0, 20, 0]}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <mesh castShadow position={modelPosition}>
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </mesh>
        <mesh
          receiveShadow
          position={[0, -0.1, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry attach={"geometry"} args={[100, 100]} />
          <shadowMaterial color={"black"} opacity={0.3} attach={"material"} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Scene;
