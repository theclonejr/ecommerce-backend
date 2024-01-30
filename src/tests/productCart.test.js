const request = require('supertest');
const app = require('../app');
const { any } = require('../utils/multer');
require('../models')

let token;
let id;

beforeAll(async () => {
    const credentials = {
        email: 'alejandrito@gmail.com',
        password: 'alejandrito1234'
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token
})

test("GET /cart debe traer todos los carritos", async() => {
    const res = await request(app).get('/cart').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /cart debe crear un carrito", async() => {
    const newCart = {
        quantity: 5
    }
    const res = await request(app).post('/cart').send(newCart).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(newCart.quantity)
});

test("PUT /cart/:id debe actualizar un carrito", async() => {
    const updated = {
        quantity: 666
    }
    const res = await request(app).put(`/cart/${id}`).send(updated).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(updated.quantity)
})

test("DELETE /cart/:id debe eliminar un carrito", async() => {
    const res = await request(app).delete(`/cart/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
})