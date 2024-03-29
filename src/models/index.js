const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const ProductCart = require("./ProductCart");
const Purchase = require("./Purchase");
const User = require("./User");

Product.belongsTo(Category);
Category.hasMany(Product);

Image.belongsTo(Product);
Product.hasMany(Image);

User.hasMany(ProductCart);
ProductCart.belongsTo(User);

Product.hasMany(ProductCart);
ProductCart.belongsTo(Product);

ProductCart.hasMany(Image);
Image.belongsTo(ProductCart);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

Image.hasMany(Purchase);
Purchase.belongsTo(Image)