const request = require('supertest');
const app = require('../app');
let id;
let token;

beforeAll(async() => {
    const creds = {
        email: 'alejandrito@gmail.com',
        password: 'alejandrito1234'
    }
    const res = await request(app).post('/users/login').send(creds);
    token = res.body.token
});

test("POST /products debe crear un producto", async() => {
    const newProduct = {
        title: 'Smart TV AIWA 70"',
        description: "ASDSADASDASDSs",
        brand: 'AIWA',
        price: 299.99,
        categoryId: 3
    }
    const res = await request(app)
        .post('/products')
        .send(newProduct)
        .set('Authorization', `Bearer ${token}`)
    id = res.body.id   
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test("GET /products debe traer todos los productos", async() => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
});


test("GETONE /products/:id debe traer un producto por su ID", async() => {
    const res = await request(app).get(`/products/${id}`)
    expect(res.status).toBe(200)
})

test("PUT /products/:id debe actualizar un producto", async() => {
    const updatedProduct = {
        title: 'Smart TV AIWA 80"',
        description: "ASDSADASDASDSs",
        brand: 'AIWA',
        price: 299.99,
        categoryId: 2
    }
    const res = await request(app)
        .put(`/products/${id}`)
        .send(updatedProduct)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedProduct.title)    
})

test("DELETE /products/:id debe eliminar un producto", async() => {
    const res = await request(app)
        .delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
})