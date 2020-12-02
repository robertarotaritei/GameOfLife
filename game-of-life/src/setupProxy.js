const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/credentials', { target : 'http://localhost:3001' }));
    app.use(createProxyMiddleware('/games', { target : 'https://activegamesapi.azurewebsites.net' }));
    app.use(createProxyMiddleware('/history', { target : 'http://localhost:3003' }));
};