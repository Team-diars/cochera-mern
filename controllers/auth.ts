export {};

const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email, status: 1 });
  if (!user)
    return res.status(400).json({
      ok: false,
      msg: "El email o passwod son incorrectos",
    });
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: "El email o passwod son incorrectos",
    });
  }
  //Generar token
  const token = await generateJWT(user.id, user.fullname);
  return res.status(200).json({
    ok: true,
    msg: "Usuario logeado",
    token,
  });
};

module.exports = {
  login,
};
