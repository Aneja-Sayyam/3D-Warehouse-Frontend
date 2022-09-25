import Link from 'next/link'
import React from 'react'
import { model } from '../data-types/modelInterface'
import Scene from './scene'

interface Props{
    modelData:model
    removeModel?:(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => Promise<void>
    styles:{
      readonly [key: string]: string;
  }
}

const ModelCard = ({styles,modelData,removeModel}:Props) => {
  return (
    <Link href={`/model/${modelData.id}`}>
    <div className={styles.card}>
      {removeModel?<div onClick={(e)=>{removeModel(e,modelData.id)}} className={styles.remove}>x</div>:undefined}
      <div className={styles.scene}>
      <Scene modelPosition={[0, 0, 0]} camera={{position:[0,0.1,0.4],fov:40}} modelData={modelData}/>
      </div>
      <div className={styles.info}>
        <span className={styles.title}>{modelData.title}</span>
        <span className={styles.description}>{modelData.description}</span>
        <span className={styles.extension}>{modelData.extension}</span>
      </div>
    </div>
    </Link>
  )
}

export default ModelCard