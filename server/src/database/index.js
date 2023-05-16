const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  if(error) {
    console.log('Falha ao autenticar com MongoDB');
    console.log(error);
    return;
  }
});

mongoose.Promise = global.Promise;

module.exports = mongoose;