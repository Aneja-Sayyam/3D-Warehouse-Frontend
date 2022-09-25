import React from "react";
import styles from "../../styles/modelPage.module.css";
import { model } from "../../data-types/modelInterface";
import { NextPage, NextPageContext } from "next";
import axios from "axios";
import Scene from "../../components/scene";
import { extname } from "path";

interface Props {
  modelData: model;
}

const RenderModel: NextPage<Props> = ({ modelData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.render}>
        <Scene
          modelPosition={[0, 0, 0]}
          camera={{ position: [0, 0.1, 0.7], fov: 60 }}
          modelData={modelData}
        />
      </div>
      <div className={styles.modelProperties}>
        <span className={styles.title}>{modelData.title}</span>
        <span className={styles.description}>{modelData.description}</span>
        <span className={styles.extension}>{modelData.extension}</span>
      </div>
    </div>
  );
};

export default RenderModel;

RenderModel.getInitialProps = async (context: NextPageContext) => {
  const body = {
    id: context.query.mid,
  };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getModel`,
    body
  );
  const result = await res.data;
  const modelData:model = {
    id: result.id,
    title: result.title,
    description: result.description,
    fileName: result.fileName,
    extension: extname(result.fileName),
    path: `${process.env.NEXT_PUBLIC_SERVER_URL}/${result.fileName}`,
  }
  return { modelData:modelData };
};
