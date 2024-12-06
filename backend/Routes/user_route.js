import express from 'express'

import {
    getAllUser,
    getUserById,
    updateUser,
    addUser,
    deleteUser
} from '../Controllers/user_controller.js'


const app = express()
app.use(express.json())

app.get('/',getAllUser)
app.get('/:id', getUserById) //siapapun boleh mengakses 
app.post('/', addUser) //cara menambahkan manager
app.put('/:id', updateUser)
app.delete('/:id', deleteUser)


export default app