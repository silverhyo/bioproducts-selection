import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FileUpload() {

  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    axios.get("http://localhost:8000/")
    .then(res => {
      setData(res.data[0])
    })
    .catch(err => console.log(err));
  }, [])


  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append('image', file);
    axios.post("http://localhost:8000/upload", formdata)
    .then(res => {
      if(res.data.Status === "Success") {
        console.log("Success")
      } else {
        console.log("Failed")
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="container">
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload}>upload</button>
      <br/>
      <image src={'http://localhost:8000/images/'+data.image} alt=""  style={{
        width: "500px",
        height: "500px"
      }}/>
    </div>
  )
}






// Server Side
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors()); 
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (res, req, cb) => {
    cb(null, 'public/image')
  },
  filename: (req, res, cb)  => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage
})

const db = mysql.createConnection({
  host: "localhost",
  password: "password",
  database: "database",
  user: "root",
  port: "3306"
});

app.post('/upload', upload.single('image'), (req,res) => {
  const image = req.file.filename;
  const sql = "UPDATE users SET image = ?";
  db.query(sql, [image], (err, result) => {
    if(err) return res.json({ Message : "Error"});
    return res.json({ Status : "Success"});
  })
  console.log(req.file);
});

app.get("/" , (req,res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if(err) return res.json({ Message : "Error"});
    return res.json(result);
  })
})

app.listen(8000, () => {
  console.log("Running")
});
