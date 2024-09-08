import { where } from "sequelize"
import { response } from "../message/response.js"
import Kendaraan from "../models/KendaraanModels.js"
export const getAllKendaraan=async(req,res)=>{
    try{
        const data = await Kendaraan.findAll()
        response(200,res,data,'mengambil seluruh data Kendaraan')
    }catch(err){
        response(500,res,err.message)
    }

}

export const getAllKendaraanById=async(req,res)=>{
    try{
        const id=req.params.id
        const data = await Kendaraan.findByPk(id)
        response(200,res,data,`mengambil data berdasarkan id (${id})`)
    }catch(err){
        response(500,res,err.message)
    }

}
export const createKendaraan=async(req,res)=>{
    try{
        const {nama,merk,nomer_plat,tahun_pembuatan,kategori,harga,tipe,warna,gambar}=req.body
        const createData= await Kendaraan.create({nama,merk,nomer_plat,tahun_pembuatan,kategori,harga,tipe,warna,gambar})
       response(201,res,createData,'data ditambahkan')
    }catch(err){
        response(500,res,err.message)
    }

}
export const updateKendaraan=async(req,res)=>{
    try{
        const {nama,merk,nomer_plat,tahun_pembuatan,kategori,harga,tipe,warna,gambar}=req.body
        const data= await Kendaraan.update({nama,merk,nomer_plat,tahun_pembuatan,kategori,harga,tipe,warna,gambar},{
            where:{
                id:req.params.id
            }
        })
       response(200,res,'data berhasil diupdate')
    }catch(err){
        response(500,res,err.message)
    }

}

export const deleteKendaraan=async(req,res)=>{
    try{
        const {id}=req.params
        const data = await Kendaraan.destroy({where:{id}})
        res.status(400).json({message:'data dihapus'})
        .end()
    }catch(err){
        response(500,res,err.message)
    }

}

