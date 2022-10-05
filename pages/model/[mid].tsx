import React, { useState } from "react";
import styles from "../../styles/modelPage.module.css";
import { model } from "../../data-types/modelInterface";
import { NextPage, NextPageContext } from "next";
import axios from "axios";
import Scene from "../../components/scene";
import { extname } from "path";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faExpand,faCompress,faChevronDown,faChevronUp} from '@fortawesome/free-solid-svg-icons'
interface Props {
  modelData: model;
}

const RenderModel: NextPage<Props> = ({ modelData }) => {
  const [expandScene,setExpandScene] = useState<boolean>(true)
  const [expandProperties,setExpandProperties] = useState<boolean>(false)
  const handleExpandProperties = ()=>{
    setExpandProperties(!expandProperties)
  }
  const handleExpandScene = ()=>{
    setExpandScene(!expandScene)
  }
  return (
    <div  className={styles.container}>
      <div className={expandScene?styles.render:styles.renderFullScreen}>
        <span className={styles.expandScene} onClick={handleExpandScene} >{
            expandScene?<FontAwesomeIcon icon={faExpand} />:<FontAwesomeIcon icon={faCompress} />
          }</span>
        <Scene
          modelPosition={[0, 0.2, 0]}
          camera={{ position: [0, 0.4, 1], fov: 60 }}
          modelData={modelData}
        />
      </div>
      <div className={[styles.modelProperties,expandProperties?styles.expandedModelProperties:styles.minimizedModelProperties].join(" ")}>
        <span className={styles.title}> <span className={styles.expandProperties} onClick={handleExpandProperties}>{expandProperties?<FontAwesomeIcon icon={faChevronDown} />:<FontAwesomeIcon icon={faChevronUp} />}</span> {modelData.title}</span>
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
