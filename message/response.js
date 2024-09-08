export const response=(status,res,data,pesan)=>{
    res.status(status).json(
        {
            datas:data? data : null,
            message:pesan
        }
    )

}