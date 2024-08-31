const express = require('express')
var cors=require('cors')
require('dotenv').config()
const bodyparser=require('body-parser')
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passMongo';

const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect();
const db = client.db(dbName);
const collection = db.collection('passwords');


app.get('/', async (req, res) => {
    try {
        
        const findResult = await collection.find({}).toArray();
        // console.log(findResult);
        res.send(findResult);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'An error occurred while fetching documents' });
    }
});

app.post('/', async (req, res) => {
    try {
        const password=req.body
       
        const findResult = await collection.insertOne(password);
        // console.log(findResult);
        res.send({success:true,result:findResult});
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'An error occurred while fetching documents' });
    }
});

app.delete('/', async (req, res) => {
    try {
        const password=req.body 
        const findResult = await collection.deleteOne(password);
        // console.log(findResult);
        res.send({success:true,result:findResult});
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'An error occurred while fetching documents' });
    }
});

app.put('/', async (req, res) => {
    try {
        const { id, site, username, password } = req.body; 
        const findResult = await collection.updateOne({ id: id },{ $set: { site, username, password } } );
        // console.log(findResult);
        res.send({success:true,result:findResult});
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'An error occurred while fetching documents' });
    }
});


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})