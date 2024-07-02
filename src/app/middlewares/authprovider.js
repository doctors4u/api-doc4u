const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) 
    return res.status(401).json({ error: "Token não existe!" });
    
  try {
      const token = authorization.split(" ")[1]

      const decode = await promisify(jwt.verify)(token, process.env.PROVIDER_TOKEN);

      req.body.provider_id = decode.id
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ 
      error: "Token inválido!" 
    });
  }

  return next();
};
