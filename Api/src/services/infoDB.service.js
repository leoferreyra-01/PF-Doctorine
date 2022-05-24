const { Products, Brand, Notes, Stock, Family } = require("../db");

const notesDbInfo = async () => {
  let array = await Notes.findAll();
  return array.map((e) => e.dataValues);
};

const productsDbInfo = async () => {
  try {
    let products = await Products.findAll({
      include: [
        {
          model: Brand,
          attributes: ["name"],
        },
        {
          model: Notes,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Family,
          attributes: ["name"],
        },
      ],
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  notesDbInfo,
  productsDbInfo,
};