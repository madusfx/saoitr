const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado com sucesso ao MongoDB");
}).catch((err) => {
  console.log(err)
});

const database = mongoose.connection;

module.exports = mongoose;