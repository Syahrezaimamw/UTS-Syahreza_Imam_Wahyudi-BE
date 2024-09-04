import db from "./utils/connection.js";
import User from "./models/UserModels.js";
import Book from "./models/BookModels.js";
import express from 'express';

const app =express()

// await db.sync({force :true})

app.listen(3000,()=>{
    console.log('jalann')
})