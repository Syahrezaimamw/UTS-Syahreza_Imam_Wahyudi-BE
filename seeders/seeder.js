import User from "../models/UserModels.js"
import Admin from "../models/AdminModels.js"
import Transaksi from "../models/TransaksiModels.js"
import Barang from "../models/BarangModels.js"
import CartBarang from "../models/CartBarang.js"
const createSeeder = async () => {
    const user = await User.create({
        name: 'Danish',
        telephone: `089765465467`,
        email: 'Danishgmail.com',
        address:'Gg Rais, Pamulang, Tangerang Selatan'
    })
    const barang1 = await Barang.create({
        name:'Keyboard Xera 87',
        description:'menggunakan switch white jade,otswappable Universal 5 Pin Switch South Facing PCB - Gasket Mount Structure,brown and white color',
        category:'Keyboard Mechanical',
        price:800000,
        
    })
    const barang2 = await Barang.create({
        name:'Laptop Asus Vivobook Pro 15',
        description:'Up to 12th gen Intel® Core™ i7 H-series processor, NVIDIA® GeForce® RTX 3050 Ti, 16 GB memory and 1 TB PCIe® 4.0 SSD storage',
        category:'electronic',
        price:15000000,
        
    })
    const admin = await Admin.create({
        name:"Jidan",
        email:'Jidan@gmail.com',
        password:'kominfo124'
    })
    const cart1 = await CartBarang.create({
       quantity:1,
       total_price:15000000,
       BarangId:barang2.dataValues.id
    })
    const cart2 = await CartBarang.create({
       quantity:2,
       total_price:1600000,
       BarangId:barang1.dataValues.id
    })

    const transaksi1 = await Transaksi.create({
        purchase_date:'2024-08-01',
        total_price:15800000,
        payment_type:'Transfer BCA',
        status:'di kemas',
        CartbarangId:[
            cart1.dataValues.id,cart2.dataValues.id,],
        AdminId:admin.dataValues.id,
        UserId:user.dataValues.id,
    })
    const transaksi2 = await Transaksi.create({
        purchase_date:'2024-08-01',
        total_price:1600000,
        payment_type:'Transfer BRI',
        status:'di kirim',
        CartbarangId:cart2.dataValues.id,
        AdminId:admin.dataValues.id,
        UserId:user.dataValues.id,
    })
    const findTransaksiByUser = await Transaksi.findAll({
        where:{
            UserId: user.dataValues.id,
        },
        include:[
            {
                model:User,
                as:'User',
                required:true,
            }
        ]
    })
    return findTransaksiByUser
}

const users =await createSeeder()
users.map((a,i)=>{
    console.log(a)
})
