import express from 'express'
import { createUser, deleteUser, getAllUser, getAllUserById, updateUser } from '../controller/UserController.js'
const RouterUser=express.Router()

RouterUser.get('/',getAllUser)
RouterUser.get('/find/:id',getAllUserById)
RouterUser.post('/create',createUser)
RouterUser.put('/update/:id',updateUser)
RouterUser.delete('/delete/:id',deleteUser)

export default RouterUser