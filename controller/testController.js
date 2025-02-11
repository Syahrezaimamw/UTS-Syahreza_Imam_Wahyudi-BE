import Test from "../models/TestModels.js";
import path from "path"
import fs from "fs"
export const getTest = async (req, res) => {
    try {
        const response = await Test.findAll()
        res.json(response)
    } catch (err) {
        console.log(err.message)
    }
}
export const updateTest = async (req, res) => {
    const product = await Test.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!product) return res.status(404).json({ msg: 'no data' });


    let fileName = "";
    if (req.files === null) {
        fileName = product.img;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name)
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg']

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'invalid img' })

        if (fileSize > 5000000) return res.status(422).json({ msg: ' img max be less than 5 mb' })

        const filepath = `./public/images/${product.img}`
        fs.unlinkSync(filepath)

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message })


        })
    }
    const nama = req.body.nama;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`

    try{
        await Test.update({nama : nama, img : fileName, url:url},{
            where:{
                id:req.params.id
            }
        })
        res.status(200).json({ msg: ' berhasil upda6e' })
    }catch(err){
        console.log(err)
    }


}
export const deleteTest = async (req, res) => {
    const product = await Test.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!product) {
        return res.status(404).json({ msg: 'no data' })
    } else {
        try {
            const filepath = `./public/images/${product.img}`
            fs.unlinkSync(filepath)
            await Test.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({ msg: 'data berhasil dihapus' })
        } catch (err) {
            console.log(err.message)

        }
    }

}
export const saveTest = async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'no file uploaded' })
    } else {
        const nama = req.body.nama;
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name)
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
        const allowedType = ['.png', '.jpg', '.jpeg']

        if (!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: 'invalid img' })
        }

        if (fileSize > 5000000) {
            return res.status(422).json({ msg: ' img max be less than 5 mb' })
        }

        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message })
            } else {
                try {
                    await Test.create({ nama: nama, img: fileName, url: url })
                    res.status(201).json({ msg: 'product created sussces' })
                } catch (err) {
                    console.log(err)
                    // res.status(201).json({msg:'product created sussces'})

                }
            }
        })
    }

}