const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
if (process.env.ENV === 'production') {
    module.exports = require('./configs/webpack.prod.js');
}
else {

 module.exports = require('./configs/webpack.dev.js');
}