import axios from 'axios'
import type { NextPage, NextPageContext } from 'next'
import { extname } from 'path'
import { useState } from 'react'
import ModelCard from '../../../components/modelCard'
import { model } from '../../../data-types/modelInterface'
import styles from '../../../styles/Home.module.css'

interface Props{
  models: model[]
}

const AdminHome: NextPage<Props> = (Props) => {
  const [models,setModels] = useState(Props.models)
  const removeModel = async(e: React.MouseEvent<HTMLDivElement, MouseEvent>,id:string)=>{
    e.stopPropagation()
    const body ={
      id
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/deleteModel`,body)
    const result = await res.data
    setModels([...models].filter(model=>model.id!==result.id))
  }
  return (
    <div className={styles.container}>
      {models.map(model=>(
        <ModelCard removeModel={removeModel} styles={styles} key={model.id} modelData={model} />
      ))}
    </div>
  )
}
AdminHome.getInitialProps = async(context:NextPageContext)=>{

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

export default AdminHome
