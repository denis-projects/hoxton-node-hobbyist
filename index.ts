import express, { response } from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const prisma = new PrismaClient({ log: ['query', 'error', 'info', 'warn'] });


// users

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({ include: { hobbies: true } })
    res.send(users)
})

app.post('/users', async (req, res) => {
    const { fullName, photo, email, hobbies = [] } = req.body
    const newUsers = await prisma.user.create({
        data: {
            fullName: fullName,
            photo: photo,
            email: email,
            hobbies: {
                connectOrCreate: hobbies.map((hobby: any) => ({
                    where: { name: hobby.name },
                    create: hobby
                }))
            }
        }
    })
    res.send(newUsers)
})


// hobbies
app.get('/hobbies', async (req, res) => {
    const hobbies = await prisma.hobby.findMany({ include: { users: true } })
    res.send(hobbies)
})

app.listen(4000, () => {
    console.log(`Server up: http://localhost:4000`);

})
