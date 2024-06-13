//Skater
import pool from "../config/conexion.js";
import {ApiResponseModel} from '../models/ApiResponseModel.js'
import SkaterMutator from'../utilities/skaterMutator.js'

const insertSkater = async (skater) =>{
    let client;
    try{
        
        const values = Object.values(skater);
        //FIXME agreagr nombre dinámico a los name
        const consulta = {
            name : "insert-skater",
            text : "INSERT INTO skaters ( email, nombre, password, anos_experiencia, especialidad, foto) VALUES ($1, $2, $3, $4, $5, $6 ) returning *",
            values
        }

        client = await pool.connect();
        const response = await client.query(consulta);

        return response;
        
    }catch ( err ) {
        throw new Error(`Error al ejecutar la consulta: ${err.message} código de error: ${err.code} Detalles del error: ${err.detail}`);
    }finally{
    if(client){
        client.release();
    }
}
}


const selectSkaters = async () => {
    let client;
    const consulta = {
        name : "get-skaters",
        text : "SELECT id, email, nombre, password, anos_experiencia, especialidad, foto, estado, fecha_creacion FROM skaters ORDER BY id ASC",
    }
    try{
        client = await pool.connect();
        const response = await client.query(consulta);

        return response;
        }catch ( err ) {
            throw new Error(`Error al ejecutar la consulta: ${err.message} código de error: ${err.code} Detalles del error: ${err.detail}`);
        }finally{
        if(client){
            client.release();
        }
    }
}

const updateSkaterStatus = async (id, estado)=>{
    
    let client;
    try {

        const consulta = {
            name:"update-status-skater",
            text: "UPDATE skaters SET estado=$2 WHERE id=$1 RETURNING *",
            values: [id,estado]
        }

        client = await pool.connect();
        const response = await client.query(consulta)

        return new ApiResponseModel(
            ApiResponseModel.SUCCESS,
            200, 
            SkaterMutator.mutarSkater(response.rows[0]),
            'OK');
        }catch ( err ) {
            throw new Error(`Error al ejecutar la consulta: ${err.message} código de error: ${err.code} Detalles del error: ${err.detail}`);
        }finally{
        if(client){
            client.release();
        }
    }
} 
//TODO no se si lo esattus de update son 200 u otro.
const updateSkater = async (skater) => {
    let client
    try {
        const values = Object.values(skater)

        const consulta = {
            name:"update-skater",
            text: "UPDATE skaters SET nombre=$2, password=$3, anos_experiencia=$4, especialidad=$5 WHERE id=$1 RETURNING *",
            values
        }

        client = await pool.connect();
        const response = await client.query(consulta)

        return new ApiResponseModel(
            ApiResponseModel.SUCCESS,
            200, 
            SkaterMutator.mutarSkater(response.rows[0]),
            'OK');
        }catch ( err ) {
            throw new Error(`Error al ejecutar la consulta: ${err.message} código de error: ${err.code} Detalles del error: ${err.detail}`);
        }finally{
        if(client){
            client.release();
        }
    }
}

//TODO HAcer lo mismo con los demás.
const findSkater= async (id) =>{
    let client;
    const consulta = {
            name:"buscar-skater",
            text: "SELECT id, email,nombre, password, anos_experiencia,especialidad,foto, estado FROM skaters WHERE id=$1;",
            values: [id]
        }

    try {
        client = await pool.connect();
        const response = await client.query(consulta);
        return response;
        }catch ( err ) {
            throw new Error(`Error al ejecutar la consulta: ${err.message} código de error: ${err.code} Detalles del error: ${err.detail}`);
        }finally{
        if(client){
            client.release();
        }
    }
}

//TODO este es con query params o :id
const deleteSkater = async (id) => {
    let client
    try {
    const consulta = {
        name:"delete-skater",
        text: "DELETE FROM skaters WHERE id=$1 RETURNING *",
        values : [id]
    }
  
        client = await pool.connect();
        const response = await client.query(consulta);

        return new ApiResponseModel(
            ApiResponseModel.SUCCESS,
            200, 
            SkaterMutator.mutarSkater(response.rows[0]),
            'OK');
    }catch ( error ) {
        return new ApiResponseModel(
            ApiResponseModel.ERROR,
            500, 
            [],
            'Error durante la conexión o la consulta:',
            {
                message: `Error al ejecutar la consulta: ${err.message}`,
                code: `código de error: ${err.code}`,
                detail: `Detalles del error: ${err.detail}`
            });
    }finally{
        if(client){
            client.release();
        }
    }
}
export {
    insertSkater,
    selectSkaters,
    updateSkater,
    deleteSkater,
    findSkater,
    updateSkaterStatus
}