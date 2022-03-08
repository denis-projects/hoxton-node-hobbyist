import express, { response } from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const prisma = new PrismaClient({ log: ['query', 'error', 'info', 'warn'] });

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({ include: { hobbies: true } })
    res.send(users)
})

app.get('/hobbies', async (req, res) => {
    const hobbies = await prisma.hobby.findMany({ include: { users: true } })
    res.send(hobbies)
})

app.listen(4000, () => {
    console.log(`Server up: http://localhost:4000`);

})
