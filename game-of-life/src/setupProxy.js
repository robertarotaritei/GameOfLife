const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/credentials', { target : 'http://user-api' }));
    app.use(createProxyMiddleware('/games', { target : 'http://active-games-api' }));
    app.use(createProxyMiddleware('/history', { target : 'http://game-history-api' }));
};