const request = require('supertest');
const app = require('../app');

let id;
let token;

test("POST /users debe crear un usuario", async() => {
    const newUser = {
        firstName: "Wences",
        lastName: "Reyes",
        email: "wences@gmail.com",
        password: "wences1234",
        phone: "123456789"
    }
    const res = await request(app)
        .post('/users')
        .send(newUser)
    id = res.body.id    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();    
})

test("LOGIN /users/login", async() => {
    const credentials = {
        email: 'wences@gmail.com',
        password: 'wences1234'
    }
    const res = await request(app).post('/users/login').send(credentials)
    token = res.body.token
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(credentials.email);
    expect(res.body.token).toBeDefined();
})

test("LOGIN FAILED /users/login", async() => {
    const wrongCredentials = {
        email: 'sdkajsfjkadshfjdshf',
        password: 'daskhdfasjfjfhdjf'

    }
    const res = await request(app).post('/users/login').send(wrongCredentials)
    expect(res.status).toBe(401)
})

test("GET /users debe traer todos los usuarios", async() => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("PUT /users/:id debe actualizar un usuario", async() => {
    const updatedUser = {
        firstName: "Wencessss",
        lastName: "Reyes",
        email: "wences@gmail.com",
        password: "wences1234",
        phone: "123456789"
    }
    const res = await request(app)
        .put(`/users/${id}`)
        .send(updatedUser)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updatedUser.firstName)
})

test("DELETE /users/:id debe eliminar un usuario", async() => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
})