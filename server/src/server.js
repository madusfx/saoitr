const express = require('express');
const app = express();

app.get('/', function (req, res) {
  return res.send({
    error: false,
    message: 'Acesso bem sucedido'
  })
})

app.listen(3001, () => {
  console.log('Server is runing');
});