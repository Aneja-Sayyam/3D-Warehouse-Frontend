import axios from 'axios'
import type { NextPage, NextPageContext } from 'next'
import { extname } from 'path'
import { useState } from 'react'
import ModelCard from '../components/modelCard'
import { model } from '../data-types/modelInterface'
import styles from '../styles/Home.module.css'

interface Props{
  models: model[]
}

const Home: NextPage<Props> = (Props) => {
  const [models,setModels] = useState(Props.models)
  return (
    <div className={styles.container}>
      {models.map(model=>(
        <ModelCard styles={styles} key={model.id} modelData={model} />
      ))}
    </div>
  )
}
Home.getInitialProps = async(context:NextPageContext)=>{

  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getModels`)
  const result = await res.data
  const models:model[] = result.map((modelData:{
    id:string,
    title:string,
    description:string,
    fileName:string 
   })=>{
    return {
      id:modelData.id,
      title:modelData.title,
      description:modelData.description,
      fileName:modelData.fileName,
      extension:extname(modelData.fileName),
      path:`${process.env.NEXT_PUBLIC_SERVER_URL}/${modelData.fileName}`
    }
  })
  return ({models})
  
}

export default Home
