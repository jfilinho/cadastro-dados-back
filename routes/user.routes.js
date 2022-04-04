const express = require("express");

//Configurar um roteador
const router = express.Router();

//Importar o modelo da coleção

//Importar o modelo de usuários.
const UserModel = require("../models/User.model");
// importar o modelo de livros.

router.post("/cadastrar-usuario", async (req, res) => {
  try {
    //Inserir no banco de dados
    const criateUser = await UserModel.create({
      ...req.body,
    });

    res.status(201).json(criateUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Busca lista completa dos livros  (exibe apenas se estiver logado)
router.get("/lista-usuario", async (req, res) => {
  try {
    const user = await UserModel.find();

    res.status(200).json(user);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

//mostrat o detalhe de um livro específico!!
router.get("/detalhe-usuario/:id", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "Livros não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//atualizar um livro específico somente se for dono do livro!!
router.patch("/atualizar-usuario/:id", async (req, res) => {
  try {
    // Extrair os dados do corpo da requisição
    const user = await UserModel.findOne({ _id: req.params.id });
    // Atualizar o registro
    if (!user) {
      return res.status(404).json({ msg: "usuario não encontrado." });
    }

    const userUpdate = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(userUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Deleta o livro(Deleta apenas se o livro que foi cadastrado pelo usuário logado)

router.delete("/delete-usuario/:id", async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });

    const deleteuser = await UserModel.deleteOne({ _id: req.params.id });

    if (deleteuser.deletedCount < 1) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    res.status(200).json({ message: "Livro deletado." });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Livro não encontrado" });
  }
});

module.exports = router;
