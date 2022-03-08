import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'error', 'warn', 'info'] })

const hobbies = [
    {
        name: 'Chess',
        image: 'ches.jpg',
        active: false
    },
    {
        name: 'Painting',
        image: 'paining.jpg',
        active: false
    },
    {
        name: 'Gym',
        image: 'gym.jpg',
        active: true
    },
    {
        name: 'Hiking',
        image: 'bicycle.jpg',
        active: true
    },
    {
        name: 'Running',
        image: 'run.jpg',
        active: true
    },
    {
        name: 'Drawing',
        image: 'pencil.jpg',
        active: false
    }
]

const users = [
    {
        fullName: 'Denis',
        photo: 'denis.jpeg',
        email: 'Denis@email.com',
        hobbies: {
            connect: [{ name: 'Running' }, { name: 'Drawing' }]
        }
    },
    {
        fullName: 'Che Guevara',
        photo: 'che.jpeg',
        email: 'comunism@email.com',
        hobbies: {
            connect: [{ name: 'Chess' }, { name: 'Painting' }]
        }
    },
    {
        fullName: 'Neslon',
        photo: 'mandela.jpeg',
        email: 'peace@email.com',
        hobbies: {
            connect: [{ name: 'Gym' }, { name: 'Hiking' }]
        }
    }
]

async function createStuff() {
    for (const hobby of hobbies) {
        await prisma.hobby.create({ data: hobby })
    }

    for (const user of users) {
        await prisma.user.create({ data: user })
    }
}

createStuff()