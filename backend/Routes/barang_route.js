import express from 'express'

import {
    getAllBarang,
    getBarangById,
    updateBarang,
    addBarang,
    deleteBarang,
} from '../Controllers/barang_controller.js'
import { authorize } from '../Controllers/auth_controller.js'
import { IsAdmin } from '../middleware/role_validation.js'

const app = express()
app.use(express.json())

app.get('/',getAllBarang)
app.get('/:id', getBarangById)
app.post('/', authorize, [IsAdmin], addBarang)
app.put('/:id',authorize, [IsAdmin], updateBarang)
app.delete('/:id', deleteBarang)



export default app