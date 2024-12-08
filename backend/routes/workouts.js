import express from "express";

const router = express.Router()

router.get('/', (req, res)=>{
    res.json({msg: 'Get all workouts'})

});

router.post('/',(req, res)=>{
    res.json({msg: 'Post a single workout'})

} );


router.put('/:id', (req, res)=>{
    res.json({msg: 'Update a single workout'})

} );


router.delete('/:id', (req, res)=>{
    res.json({msg: 'Delete a single workout'})

} );

router.get('/:id', (req, res)=>{
    res.json({msg: 'Get a single workout'})

} );

export default router