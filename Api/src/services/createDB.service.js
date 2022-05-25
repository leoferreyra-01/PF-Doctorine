//consumir el json y ponerlo en la db
const json = require("../../perfumes.json");
const notesJSON = require("../../notas.json");
const brandJson = require("../../marca.json");
const familyJson = require("../../familia.json");

const { Products, Brand, Notes, Family } = require("../db");

const infoDb = async () => {
  await notesInDb();
  await brandInDb();
  await familyInDb();
  let count = Notes.count();
  let count1 = Brand.count();
  let count2 = Family.count();
  if (count !== 0 || count1 !== 0 || count2 !== 0) {
    await productsInDb();
  }
};

//CARGA LA TABLA NOTES
const notesInDb = async () => {
  try {
    notesJSON.forEach(async (e) => {
      await Notes.findOrCreate({
        where: {
          name: e,
        },
      });
    });
  } catch (e) {
    console.log(e);
  }
};

//CARGA LA TABLA BRAND
const brandInDb = async () => {
  try {
    brandJson.forEach(async (e) => {
      await Brand.findOrCreate({
        where: {
          name: e,
        },
      });
    });
  } catch (e) {
    console.log(e);
  }
};

//CARGA LA TABLA FAMILY
const familyInDb = async () => {
  try {
    familyJson.forEach(async (e) => {
      await Family.findOrCreate({
        where: {
          name: e,
        },
      });
    });
  } catch (e) {
    console.log(e);
  }
};

//CARGA LA TABLA PRODUCTS Y RELACIONA CON LAS TABLAS NOTES, BRAND Y FAMILY
const productsInDb = async () => {
  try {
    //Brand
    let arrayBrand = json.map(async (e) => {
      const marca = await Brand.findAll({ where: { name: e.marca } });
      return marca;
    });
    const allBrand = await Promise.all(arrayBrand);
    const brand = allBrand.map((e) => e.map((e) => e.dataValues.id)).flat();

    //Family
    let arrayFamily = json.map(async (e) => {
      const familia = await Family.findAll({ where: { name: e.familia } });
      return familia;
    });
    const allFamily = await Promise.all(arrayFamily);
    const family = allFamily.map((e) => e.map((e) => e.dataValues.id)).flat();

    let infoJson = json.map((e, i) => { 
      return {
        name: e.nombre,
        type: e.tipo,
        genre: e.género,
        img: e.img,
        idBrand: brand[i],
        idFamily: family[i],
        price: e.precio,
        stock: e.stock,
        available: e.disponibilidad,
      };
    });

    const productsCreate = await Products.bulkCreate(infoJson);

    //Notas
    let arrayNotes = json.map(async (e) => {
      const products = await Notes.findAll({ where: { name: e.notas } });
      return products;
    });
    const allNotes = await Promise.all(arrayNotes);

    // await productsCreate[0].addBrand(allBrand[0])
    //Relaciones
    for (let i = 0; i < productsCreate.length; i++) {
      await productsCreate[i].addNotes(allNotes[i]);
      // await productsCreate[i].addBrand(allBrand[i])
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  infoDb,
};