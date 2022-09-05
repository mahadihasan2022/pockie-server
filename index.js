const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion, Db } = require("mongodb");
// const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();


const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h8k01.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});



// db.cities.createIndex(
//   { city: 1 },
//   { 
//     collation: {
//       locale: 'en',
//       strength: 2
//     }
//   }
// );

async function run() {
  try {
    await client.connect();
    const mongodb = client.db("pockie");
    const productCollection = mongodb.collection("product");
    const userCollection = mongodb.collection("user");


    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.json(products);
    });

    // app.get("/searchProduct/:productName", async (req, res) =>{
    //   const searchProduct =req.params.productName;
    //   const cursor = productCollection.find(
    //     { $text: {$category: 'technology'}}
    //   );
    //   const products = await cursor.toArray();
    //   res.json(products);
    // })

    // app.get("/product/:id", async (req, res) => {
    //   const technology = req.params.id;
    //   const query = { category:  /^technology$/i };

    //   const cursor = productCollection.find(query);
    //   const product = await cursor.toArray();
    //   res.json(product);
    // });
    app.get("/product/:id", async (req, res) => {
      const category = req.params.id;
      const query = { category: category };

      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.json(product);
    });
    app.get("/product/subCategory/:id", async (req, res) => {
      const subCategory = req.params.id;
      const query = { subCategory: subCategory };
      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.json(product);
    });
    app.get("/product/brand/:id", async (req, res) => {
      const brand = req.params.id;
      const cursor = productCollection.find({brand});
      const product = await cursor.toArray();
      res.json(product);
    });
    app.get("/product/name/:id", async (req, res) => {
      const name = req.params.id;
      const cursor = productCollection.find({name});
      const product = await cursor.toArray();
      res.json(product);
    });
    app.get("/just", async (req, res) => {
      const subCategory = req.query.subCategory;
      const brand = req.query.brand;
      const cursor = productCollection.find({brand,subCategory});
      const product = await cursor.toArray();
      res.json(product);
    });
    

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      res.send(user);
    });
    app.put("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(filter, updateDoc, options);
      res.send({ result });
    });
   


    // app.delete("/product/:id", async (req, res) =>{
    //   const category = req.params.id;
    //   const query = { category : category };


    // const cursor = productCollection.deleteMany(query);
    // res.json( "delete Successful");
    // });
















  } catch (error) {
    console.log(error);
  } finally {
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Welcome to my pockie website server!')
})

app.listen(port, () => {
  console.log(`Example app listening on port`, port)
})