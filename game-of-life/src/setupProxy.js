const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/credentials', { target : 'user-api' }));
    app.use(createProxyMiddleware('/games', { target : 'active-games-api' }));
    app.use(createProxyMiddleware('/history', { target : 'game-history-api' }));
};