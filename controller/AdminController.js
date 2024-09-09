import { where } from "sequelize"
import { response } from "../message/response.js"
import Admin from "../models/AdminModels.js"

export const getAllAdmin=async(req,res)=>{
    try{
        const data = await Admin.findAll()
        response(200,res,data,'mengambil seluruh data admin')
    }catch(err){
        response(500,res,err.message)
    }

}

export const getAllAdminById=async(req,res)=>{
    try{
        const id=req.params.id
        const data = await Admin.findByPk(id)
        response(200,res,data,`mengambil data berdasarkan id (${id})`)
    }catch(err){
        response(500,res,err.message)
    }

}

export const createAdmin=async(req,res)=>{
    try{
        const {nama,email,password}=req.body
        const createData= await Admin.create({nama,email,password})
       response(201,res,createData,'data ditambahkan')
    }catch(err){
        response(500,res,err.message)
    }

}

export const updateAdmin=async(req,res)=>{
    try{
        const {nama,email,password}=req.body
        const data= await Admin.update({nama,email,password},{
            where:{
                id:req.params.id
            }
        })
       response(200,res,'data berhasil diupdate')
    }catch(err){
        response(500,res,err.message)
    }

}

export const deleteAdmin=async(req,res)=>{
    try{
        const {id}=req.params
        const data = await Admin.destroy({where:{id}})
        res.status(400).json({message:'data dihapus'})
        .end()
    }catch(err){
        response(500,res,err.message)
    }

}

