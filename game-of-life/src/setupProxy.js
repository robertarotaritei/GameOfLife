const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/credentials', { target : 'http://user-api:3001' }));
    app.use(createProxyMiddleware('/games', { target : 'http://activegamesapi.azurewebsites.net' }));
    app.use(createProxyMiddleware('/history', { target : 'http://game-history-api:3003' }));
};