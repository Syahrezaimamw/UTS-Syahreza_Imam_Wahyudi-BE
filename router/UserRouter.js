import express from 'express'
import { createUser, deleteUser, getAllUser, getAllUserById, loginUser, updateUser } from '../controller/UserController.js'
const RouterUser=express.Router()

RouterUser.get('/',getAllUser)
RouterUser.get('/find/:id',getAllUserById)
RouterUser.post('/register',createUser)
RouterUser.post('/login',loginUser)
RouterUser.put('/update/:id',updateUser)
RouterUser.delete('/delete/:id',deleteUser)

export default RouterUser