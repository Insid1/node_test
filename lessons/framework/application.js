const http = require('http');
const EventEmitter = require('events');

class Application {
  constructor() {
    this.emmiter = new EventEmitter();
    this.server = this._createServer();
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      console.log(path);
      const endpoint = router.endpoint[path];

      Object.keys(endpoint)
        .forEach((method) => {
          const handler = endpoint[method];
          this.emmiter.on(this._getRouteMask(path, method), (req, res) => {
            handler(req, res);
          });
        });
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  _createServer() {
    return http.createServer((req, res) => {
      const emitted = this
        .emmiter
        .emit(this._getRouteMask(req.path, req.method), req, res);
      if (!emitted) {
        res.end();
      }
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}

module.exports = Application;
