// const appData = require('vcjlog').app;
const home = require('../components/home');
const hoaqua = require('../components/hoa-qua');
const share = require('../components/share');
const list = require('../components/list');
const dongvat = require('../components/dong-vat');
const admin = require('../components/admin');

module.exports = function (app) {
  app.factory('marko', [
    '$location',
    '$q',
    '$http',
    ($location, $q, $http) => {
      const q = $q.defer();
      q.promise.then(angular.noop, angular.noop, (data) => {
        switch (data.cmd) {
          case 'path':
            $location.path(data.data);
            if (data.cb) {
              data.cb();
            }
            break;

          default:
            break;
        }
      });
      function execute(data) {
        const q1 = $q.defer();
        q.notify(
          Object.assign({}, data, {
            function() {
              q1.resolve();
            }
          })
        );

        return q1.promise;
      }
      Object.assign(share, {
        path(href) {
          execute({ cmd: 'path', data: href });
        },
        getData(name) {
          return $http.get(`/data/${name}`).then(rs => rs.data);
        }
      });
      global.cmd = (data) => {
        q.notify(data);
      };
      return {
        home,
        list,

        admin
      };
    }
  ]);
};
