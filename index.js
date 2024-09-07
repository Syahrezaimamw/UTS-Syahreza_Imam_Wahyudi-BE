import db from "./utils/connection.js";
import express from 'express';
import './models/index.js'

const app =express()

// await db.sync({force :true})

app.listen(3000,()=>{
    console.log('jalann')
})