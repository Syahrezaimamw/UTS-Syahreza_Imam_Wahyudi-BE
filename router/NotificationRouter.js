import express from 'express'
import { createNotification, deleteNotification, getAllNotification, getAllNotificationById, updateNotification } from '../controller/NotificationController.js'
const RouterNotification=express.Router()

RouterNotification.get('/',getAllNotification)
RouterNotification.get('/find/:id',getAllNotificationById)
RouterNotification.post('/create',createNotification)
RouterNotification.put('/update/:id',updateNotification)
RouterNotification.delete('/delete/:id',deleteNotification)

export default RouterNotification