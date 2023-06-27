const express = require("express");
const mongoose = require("mongoose");
const Produit = require("./Produit");

async function startServer() {
  const app = express();
  const PORT = process.env.PORT_ONE || 4000;

  app.use(express.json());
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/produit-service", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Produit-Service DB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  app.post("/produit/ajouter", async (req, res, next) => {
    const { nom, description, prix } = req.body;
    try {
      const newProduit = await Produit.create({ nom, description, prix });
      res.status(201).json(newProduit);
    } catch (error) {
      res.status(400).json({ error });
    }
  });

  app.get("/produit/acheter", async (req, res, next) => {
    const { ids } = req.body;
    try {
      const produits = await Produit.find({ _id: { $in: ids } });
      res.status(200).json(produits);
    } catch (error) {
      res.status(400).json({ error });
    }
  });

  app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
  });
}

startServer();
