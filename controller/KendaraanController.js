import { where } from "sequelize"
import { response } from "../message/response.js"
import Kendaraan from "../models/KendaraanModels.js"
import { Op } from 'sequelize';
import path from "path"
import fs from "fs"


export const searchKendaraan = async (req, res) => {
    try {
      const { nama, status } = req.query; // Mengambil parameter query dari URL
  
      // Menyusun kondisi pencarian
      const where = {};
  
      // Jika nama ada, mencari berdasarkan nama kendaraan
      if (nama) {
        where.nama = { [Op.like]: `%${nama}%` }; // Mencari nama yang mengandung kata kunci
      }
  
      // Jika status ada, menambahkan kondisi status
      if (status !== undefined) {
        // Mengubah status menjadi boolean true/false jika berupa string
        const statusBool = status === 'true' ? true : status === 'false' ? false : undefined;
        
        if (statusBool !== undefined) {
          where.status = statusBool; // Mencari berdasarkan status true/false
        }
      }
  
      // Mengambil data kendaraan dari database
      const kendaraan = await Kendaraan.findAll({
        where: where,
      });
  
      // Mengirimkan hasil pencarian
      if (kendaraan.length > 0) {
        response(200,res,'mengambil data berdasarkan nama dan status',kendaraan)
      } else {
        response(404, res, `Kendaraan tidak ditemukan`)
    }
    } catch (error) {
      console.error(error);
      response(500, res, err.message)
    }
  };
  

export const getAllKendaraan = async (req, res) => {
    try {
        const data = await Kendaraan.findAll()
        response(200, res, 'mengambil seluruh data Kendaraan', data)
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllKendaraanById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Kendaraan.findByPk(id)
        if (data) {
            response(200, res, `mengambil data berdasarkan id (${id})`, data)
        } else {
            response(200, res, `data tidak ada`, null)
        }
    } catch (err) {
        response(500, res, err.message)
    }

}

export const getAllKendaraanByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const kendaraan = await Kendaraan.findAll({
            where: { status } 
        });
        console.log(kendaraan.length)

        if (kendaraan.length === 0) {
            response(404, res, `Kendaraan dengan status ( Penuh ) tidak ditemukan`)
        }else {

            response(200, res, `mengambil data berdasarkan status ( Kosong )`, kendaraan)
        }

    } catch (err) {
        response(500, res, err.message)
    }

}

export const createKendaraan = async (req, res) => {
    // console.log("Isi req.files:", req.files);
    // console.log("Isi req.files:", req.files.gambar.data.length);
    try {
      // Validasi data wajib di req.body
      if (
        !req.body.nama ||
        !req.body.merk ||
        !req.body.harga ||
        !req.body.nomer_plat ||
        !req.body.kategori ||
        !req.body.tipe ||
        !req.body.warna
      ) {
        return  response(400, res, 'Pastikan mengisi semua data')

      }
  
      // Jika tidak ada file yang diupload, langsung error
      if (!req.files || !req.files.gambar) {
        return  response(400, res, 'File gambar wajib di upload')        ;
      }
  
      // Ambil file gambar
      const file = req.files.gambar;  
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const allowedType = ['.png', '.jpg', '.jpeg'];
  
      if (!allowedType.includes(ext.toLowerCase())) {
        return response(422, res, 'Tidak mendukung tipe gambar');
      }
  
      if (fileSize > 5000000) {
        return response(422, res, 'Ukuran gambar harus dibawah 5mb');
      }
  
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  
      // Pindahkan file ke folder public/images
      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) {
          return response(500, res, err.message);
        }
      });
  
      // Ambil data dari req.body
      const { nama, merk, nomer_plat, tahun_pembuatan, kategori, harga, tipe, warna } = req.body;
  
      // Simpan data ke database, termasuk nama file gambar
      await Kendaraan.create({
        nama,
        merk,
        nomer_plat,
        tahun_pembuatan,
        kategori,
        harga,
        tipe,
        warna,
        gambar: fileName, // Gunakan fileName yang sudah di-generate
        url:url,
        status: true
      });
  
      return response(201, res, 'Data berhasil ditambahkan');
    } catch (err) {
      console.error("Error di createKendaraan:", err);
      return  response(500, res, err.message);
    }
  };
  

  

export const updateKendaraan = async (req, res) => {
 try{
  // Validasi field wajib di req.body
  if (
    !req.body.nama ||
    !req.body.merk ||
    !req.body.harga ||
    !req.body.nomer_plat ||
    !req.body.kategori ||
    !req.body.tipe ||
    !req.body.warna
  ) {
    return response(400, res, 'Pastikan mengisi semua data');
  }

  // Cari data kendaraan berdasarkan id
  const kendaraan = await Kendaraan.findOne({
    where: { id: req.params.id }
  });
  if (!kendaraan) return res.status(404).json({ msg: 'Data tidak ditemukan' });

  let fileName = "";
  // Jika tidak ada file yang diupload, gunakan image yang sudah ada
  if (!req.files || !req.files.gambar) {
    fileName = kendaraan.gambar;
  } else {
    // Proses file baru
    const file = req.files.gambar;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    // Validasi tipe file
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: 'Invalid image type' });

    // Validasi ukuran file
    if (fileSize > 5000000)
      return res.status(422).json({ msg: 'Image must be less than 5 MB' });

    // Hapus file lama (jika ada)
    const filepath = path.join('./public/images', kendaraan.gambar);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    // Pindahkan file baru ke folder public/images
    await new Promise((resolve, reject) => {
      file.mv(`./public/images/${fileName}`, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  // Siapkan data untuk diupdate
  const { nama, merk, nomer_plat, tahun_pembuatan, kategori, harga, tipe, warna } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  // Update data ke database
  await Kendaraan.update(
    {
      nama,
      merk,
      nomer_plat,
      tahun_pembuatan,
      kategori,
      harga,
      tipe,
      warna,
      gambar: fileName, // update nama file gambar
      url: url        // update URL image jika field ini ada di model
    },
    {
      where: { id: req.params.id }
    }
  );
  response(200, res, 'Data berhasil diupdate');
 }catch(err){
    response(500, res, err.message);
 }

}


export const deleteKendaraan = async (req, res) => {
  const product = await Kendaraan.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!product) {
        return response(404, res, 'no Data')

    } else {
        try {
            const filepath = `./public/images/${product.gambar}`
            fs.unlinkSync(filepath)
            await Kendaraan.destroy({
                where: {
                    id: req.params.id
                }
            })
          return  response(400, res, 'data berhasil di hapus')

        } catch (err) {
            console.log(err.message)

        }
    }

    // try {
    //     const { id } = req.params
    //     const data = await Kendaraan.destroy({ where: { id } })
    //     res.status(400).json({ message: 'data dihapus' })
    //         .end()
    // } catch (err) {
    //     response(500, res, err.message)
    // }

}

