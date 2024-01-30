const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const { id } = req.user
    const purchase = await Purchase.findAll({
        include: [Product],
        where: { userId: id }
    });
    return res.json(purchase)
});

const create = catchError(async(req,res)=>{
  const userId = req.user.id
  const productsCart = await ProductCart.findAll({
      where: { userId },
      attributes: ['quantity', 'userId', 'productId'],
      raw: true,
  });
  const purchases = await Purchase.bulkCreate(productsCart, {include: [Image]});
  await ProductCart.destroy({ where: { userId: req.user.id }})
  return res.json(purchases);
})
module.exports = {
    getAll,
    create
}