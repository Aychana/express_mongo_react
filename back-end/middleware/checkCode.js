function checkDeleteCode(req, res, next) {
  const code = req.headers["x-delete-code"];
  const expectedCode = process.env.DELETE_CODE;



  if (!code) {
    return res.status(403).json({ message: "Code requis pour suppression" });
  }

  if (code !== expectedCode) {
    return res.status(401).json({ message: "Code invalide" });
  }

  next();
}


module.exports = checkDeleteCode;
