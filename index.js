const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model')
//import mongoose from 'mongoose';

const app = express()

app.use(express.json());


app.listen(3000, () => {
    console.log('Port 3000 chal raha hai');
});

app.get('/', (req,res) => {
    res.send('Hello from Node API');
});


app.post('/api/products', async (req, res) => {
    console.log(req.body); 
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.put('/api/product/:id', async(req,res) => {
    try{
        const {id} = req.params;

        const uproduct = await Product.findByIdAndUpdate(id, req.body);
        
        if(!uproduct){
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json(uproduct);

    } catch (error){
        res.status(500).json({message: error.message})
    }
});



app.get('/api/products', async(req, res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});


app.get('/api/products/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.delete('/api/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted!'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

mongoose.connect('mongodb+srv://sskhandekar2026:Yq5t4I5CgjOukWTM@cluster0.jsb0i.mongodb.net/', {
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});  