const {ObjectId} = require('mongodb');
const {Database} = require('../database/index');

const COLLECTION = 'empleados';

const getAll = async() =>{
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getFilterStatus = async(query) =>{
    const collection = await Database(COLLECTION);
    return await collection.find(query).toArray();
}


const getById = async (id)=>{
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: ObjectId(id)});
}

const create = async(empleado)=>{
    const collection =await Database(COLLECTION);
    let result = await collection.insertOne(empleado);
    return result.insertedId;
}

const borrar = async(id)=>{
    const collection =await Database(COLLECTION);
    let result = await collection.deleteOne({_id: ObjectId(id)});
    return result;
}


module.exports.EmpleadosService= {
    getAll,
    getById,
    create,
    borrar,
    getFilterStatus
}