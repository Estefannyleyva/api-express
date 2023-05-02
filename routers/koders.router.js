import {koder} from '../models/koders.model.js'
import express from 'express'
import {StatusHttp} from '../errorCustom.js'
const router = express.Router()

router.get('/', async (request, response) =>{
    try{    
        const {generation, gender, count} = request.query;
        console.log('generation: ', generation);
        let kodersFiltered = {};
        if(gender) kodersFiltered.gender = gender 
        if(generation) kodersFiltered.generation = generation
        const allKoders = await koder.find({kodersFiltered}).limit(count)
        response.json({
            success: true,
            data: {
                koders: allKoders
            }
        })
    } catch(error){
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
    
})

//   crear a un koder
router.post('/', async (request, response) =>{
    try {
    const newKoder = request.body
    const koderCreated = await koder.create(newKoder)
    console.log(koderCreated)
    response.json({
        success: true,
        message: 'koder created'
    })
    } catch (error){
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
    
})

// buscar un koder por su id
router.get('/:idKoder', async (request, response)=>{
    try{
        const {id} = request.params
        const koderFound = await koder.findById(id)
        if(!koderFound) throw new StatusHttp('Koder no Encontrado', 404)
        
        response.json({
        success: true,
        data: {
            koder: koderFound
        }
    })
    }catch (error){
        response.status(error.status).json({
            success: false,
            message: error.message
        })
    }
})

// editar un koder
router.patch('/:idKoder', async (request, response)=>{
    const id = request.params.idKoder
    const dataUpdated = request.body
    const koderUpdated = await koder.findByIdAndUpdate(id, dataUpdated, {new: true});
    response.json({
        koderUpdate: koderUpdated
    })
})
 
// eliminar un koder
router.delete('/:idKoder', async (request, response)=>{
    const id = request.params.idKoder;
    const koderDeleted = await koder.findByIdAndDelete(id);
    response.json({
        message: 'koder Eliminado',
        koderDelete: koderDeleted
    })
})


export default router