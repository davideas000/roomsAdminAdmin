const express = require('express');

const app = express();

const publicPath = __dirname + '/dist';

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(publicPath + '/index.html');
});

const port = process.env.PORT || 3100;

app.listen(port, () => console.log('server listen on port', port));
