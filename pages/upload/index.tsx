import React, { ChangeEvent, ChangeEventHandler, createRef, useRef, useState } from "react";
import styles from "../../styles/uploadPage.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter()

  let inputRef:HTMLInputElement|null
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleUpload = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/createModel`, formData);
    const result = await res.data;

    router.push(`/model/${result.id}`)
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
      <input
      style={{display:'none'}}
          ref={(refParam)=>inputRef=refParam}
            type="file"
            name="SelectFile"
            accept=".glb,.gltf,.fbx"
            onChange={handleFileChange}
          />
        <div onClick={()=>inputRef?.click()} className={styles.field}>
          <button className={[styles.btn,styles.label].join(" ")}>Select File</button>
          <span style={{border:'none'}} className={styles.input} >{selectedFile?selectedFile.name:'No File Selected'}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Title : </span>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Description : </span>
          <input
            type="text"
            className={styles.input}
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button className={styles.btn} onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
