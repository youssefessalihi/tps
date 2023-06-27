const express = require("express");
const mongoose = require("mongoose");
const Commande = require("./Commande");
const axios = require('axios');

async function startServer() {
  const app = express();
  const PORT = process.env.PORT_ONE || 4001;

  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/commande-service", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Commande-Service DB Connected`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  app.use(express.json());

  function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; ++t) {
      total += produits[t].prix;
    }
    console.log("prix total: " + total);
    return total;
  }

  async function httpRequest(ids) {
    try {
      const URL = "http://localhost:4000/produit/acheter";
      const response = await axios.post(
        URL,
        { ids: ids },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return prixTotal(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  app.post("/commande/ajouter", async (req, res, next) => {
    const { ids, email_utilisateur } = req.body;
    httpRequest(ids)
      .then(total => {
        const newCommande = new Commande({
          ids,
          email_utilisateur: email_utilisateur,
          prix_total: total,
        });
        return newCommande.save();
      })
      .then(commande => res.status(201).json(commande))
      .catch(error => res.status(400).json({ error }));
  });

  app.listen(PORT, () => {
    console.log(`Commande-Service at ${PORT}`);
  });
}

startServer();
