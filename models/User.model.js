const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  Nome: { type: String, required: true },
  Idade: { type: Number, required: true },
  estadoCivil: { type: String, required: true },
  cpf: { type: Number, required: true, unique: true },
  Cidade: { type: String, required: true },
  Estado: { type: String, required: true },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
