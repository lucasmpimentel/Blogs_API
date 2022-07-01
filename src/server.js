require('dotenv').config();
const app = require('./api');
const routes = require('./routes');
const errors = require('./middlewares/errorMiddleware');

app.use(routes);
app.use(errors);

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
