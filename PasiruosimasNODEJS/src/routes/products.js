const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const { dbConfig } = require('../config');

router.get('/:id?', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const query = req.params.id ? `WHERE products.id = ${req.params.id}` : '';
    const [data] = await con.execute(
      `SELECT *
      FROM products 
      INNER JOIN products_brands on products.brand = products_brands.id
      INNER JOIN products_categories on products.category = products_categories.id ${query}`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(404).send({ error: err });
  }
});

router.get('/price/lowest', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `SELECT MIN(products.price) as lowest_price FROM products`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(404).send({ error: err });
  }
});

router.get('/price/highest', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `SELECT MAX(products.price) as lowest_price FROM products`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(404).send({ error: err });
  }
});

// router.get('/order/:x?', async (req, res) => {
//   try {
//     let query = '';
//     if (req.params.x === 'lowest') {
//       query = `SELECT MIN(products.price) as lowest_price FROM products`;
//     } else if (req.params.x === 'highest') {
//       query = `SELECT MAX(products.price) as highest_price FROM products`;
//     } else {
//       return res.status(404).send('Page is not found');
//     }

//     const con = await mysql.createConnection(dbConfig);
//     const [data] = await con.execute(query);
//     await con.end();
//     return res.send(data);
//   } catch (err) {
//     return res.status(404).send({ error: err });
//   }
// });

router.get('/price/sum', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
      `SELECT SUM(products.price) as products_price_sum FROM products`,
    );
    await con.end();
    return res.send(data);
  } catch (err) {
    return res.status(404).send({ error: err });
  }
});

router.post('/', async (req, res) => {
  const product = req.body;
  if (product) {
    try {
      const con = await mysql.createConnection(dbConfig);
      const [data] = await con.execute(
        `INSERT INTO products
        (title, description, price, discountPercentage, rating, stock, brand, category, thumbnail)
        VALUES
        (
        ${mysql.escape(product.title)},
        ${mysql.escape(product.description)},
        ${mysql.escape(product.price)},
        ${mysql.escape(product.discountPercentage)},
        ${mysql.escape(product.rating)},
        ${mysql.escape(product.stock)},
        ${mysql.escape(product.brand)},
        ${mysql.escape(product.category)},
        ${mysql.escape(product.thumbnail)})
        `,
      );
      await con.end();
      return res.send(data);
    } catch (err) {
      return res.status(404).send({ error: err });
    }
  }
});

module.exports = router;
