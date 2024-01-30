const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const testUser = {
            firstName: 'Alejandrito',
            lastName: 'Masacre',
            email: 'alejandrito@gmail.com',
            password: 'alejandrito1234',
            phone: '123456789'
        }
        await request(app).post('/users').send(testUser);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();