export const response=(status,res,pesan,data)=>{
    data || data === null?
    res.status(status).json(
        {
            datas:data? data : null,
            message:pesan
        }
    )
    :
    res.status(status).json(
        {
            message:pesan
        }
    )
}
