const express = require("express");
const cors = require("cors");
const jsonServer = require("json-server");
const basicAuth = require("express-basic-auth");
const server = express();

server.use(
  "/admin",
  basicAuth({
    users: {
      admin: "GoSweetSibiu1994!",
    },
    challenge: true,
  })
);

server.use(cors());
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Expose-Headers", "Content-Range");
  res.header("Content-Range", "cake 0:20/1000");

  next();
};
server.use(allowCrossDomain);
server.use("/api", jsonServer.router("api/db.json"));
exports.create = (req, res) => {
  if (req.body.myFile) {
    var file = req.body.myFile;
    var fs = require("fs");
    var data = file.src.replace(/^data:image\/\w+;base64,/, "");
    var buf = Buffer.from(data, "base64");
    fs.writeFile(`upload/${file.title}`, buf, (err) => {
      if (err) throw err;
      console.log("Saved!");
    });
  }
};
server.use(express.static("public"));
server.use("/publicapi", jsonServer.router("api/db.json", { readonly: true }));
server.get("*", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
