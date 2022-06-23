const Router = require('./lessons/framework/router');
const Application = require('./lessons/framework/application');

const PORT = process.env.PORT || 5000;

const app = new Application();
const router = new Router();

app.listen(3000, () => {
  console.log(`server listening on port ${PORT}`);
});

router.get('/', (req, res) => {
  res.end('Welcome to the server`s main page.');
});

app.addRouter(router);
