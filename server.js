
import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/users', async (request, reply) => {
    const body = request.body;

    let error= {};

    if(!body.id){
        error.id = 'O valor  não foi informado'
    } 
    if (!body.password) {
        error.password = 'O valor PASSWORD não foi informado'
    } 
    if (!body.profile) { 
        error.profile = 'O valor PROFILE não foi informado'
    }
    if (!userID) { 
        error.id = 'O valor id não foi informado'

    if (body.name && body.password && body.profile && userID) {
        await databasePostgres.createUser(body);
        return reply.status(201).send(); 
    } else {
        return reply.status(400).send(error);
    }
})
    

// READE
server.get('/users', async () => {
    const users = await databasePostgres.listUsers();
    return users;
});

// UPDATE
server.put('/users/:id', async (request, reply) => {
    const userID = request.params.id;
    const body = request.body;
    await databasePostgres.updateUser(userID, body);

    
})

// DELETE
server.delete('/users/:id', async (request, reply) => {
    const userID = request.params.id;
    await databasePostgres.deleteUser(userID);

    return reply.status(204).send();
})


server.listen({
    port: 3333
});
