import User from "../models/UserModels.js"
import Book from "../models/BookModels.js"

const createSeeder = async () => {
    const user = await User.create({
        name: 'John',
        email: 'jhonDoegmail.com'
    })
    const book1 = await Book.create({
        name:"Buku Saham",
        page:12,
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam ullam dolore impedit numquam nam officia tenetur doloribus! Placeat dignissimos facilis earum id a sit, illo vero, debitis at nam excepturi.',
        UserId:user.dataValues.id
    })
    const book2 = await Book.create({
        name:"Buku Kucing",
        page:13,
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam ullam dolore impedit numquam nam officia tenetur doloribus! Placeat dignissimos facilis earum id a sit, illo vero, debitis at nam excepturi.',
        UserId:user.dataValues.id
    })
    const findBookByUser = await Book.findAll({
        where:{
            UserId: user.dataValues.id,
        },
        attributes:['name','page','description','UserId']
    })
    return user
}

const users =await createSeeder()
console.log(users)

