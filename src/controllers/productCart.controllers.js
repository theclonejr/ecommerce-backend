const catchError = require('../utils/catchError');
const ProductCart = require('../models/ProductCart');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const results = await ProductCart.findAll({
        include: [Product],
        where: { userId: req.user.id }
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id
    const { productId, quantity } = req.body
    const result = await ProductCart.create({
        userId,
        productId,
        quantity
    });
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductCart.findByPk(id, {
        include: [Product],
        where: {userId: req.user.id}
    });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await ProductCart.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await ProductCart.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
}