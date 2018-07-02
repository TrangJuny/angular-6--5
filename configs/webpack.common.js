var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// the path(s) that should be cleaned
var pathsToClean = [
    'dev',
    'product'
];

// the clean options to use
var cleanOptions = {
    root: helpers.root(),
    verbose: true,
    dry: false
};

module.exports = {
    //the entry-point files that define the bundles.
    entry: {
        'polyfills': helpers.root('src', 'polyfills.ts'), // the polyfills needed to run Angular applications in most modern browsers.
        'vendor': helpers.root('src', 'vendor.ts'), // —the third-party dependencies such as Angular, lodash, and bootstrap.css.
        'app': helpers.root('src', 'main.ts')  //—the application code.
    },
    //how to resolve file names when they lack extensions.
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },
    //module is an object with rules for deciding how files are loaded
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader', //a loader to transpile the Typescript code to ES5, guided by the tsconfig.json file.
                        options: { configFileName: helpers.root('src', 'tsconfig.json') }
                    }, 'angular2-template-loader'//—loads angular components' template and styles.
                ]
                //  loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'//—for component templates.
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, //—Images and fonts are bundled as well.
                loader: 'file-loader?name=assets/image/[name].[hash].[ext]'
            },
            {
                test: /\.css$/, //—the first pattern matches application-wide styles; the second handles component-scoped styles (the ones specified in a component's styleUrls metadata property).
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw-loader'
            }
        ]
    },
    //creates instances of the plugins.
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        new CleanWebpackPlugin(pathsToClean, cleanOptions)
        ,
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new CopyWebpackPlugin([
            { from: './src/assets/js/plugins/jquery/jquery.min.js', to: './js/jquery.min.js' },
            { from: './src/assets/js/plugins/jquery/jquery-ui.min.js', to: './js/jquery-ui.min.js' },
            { from: './src/assets/js/plugins/bootstrap/bootstrap.min.js', to: './js/bootstrap.min.js' },
            { from: './src/assets/js/plugins/icheck/icheck.min.js', to: './js/icheck.min.js' },
            { from: './src/assets/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js', to: './js/jquery.mCustomScrollbar.min.js' },
            { from: './src/assets/js/plugins/scrolltotop/scrolltopcontrol.js', to: './js/scrolltopcontrol.js' },
            { from: './src/assets/js/settings.js', to: './js/settings.js' },
            { from: './src/assets/js/plugins.js', to: './js/plugins.js' },
            { from: './src/assets/js/actions.js', to: './js/actions.js' },
            //Image
            { from: './src/assets/img/themes/black.jpg', to: './img/themes/black.jpg' },
            { from: './src/assets/img/themes/blue.jpg', to: './img/themes/blue.jpg' },
            { from: './src/assets/img/themes/brown.jpg', to: './img/themes/brown.jpg' },
            { from: './src/assets/img/themes/default.jpg', to: './img/themes/default.jpg' },
            { from: './src/assets/img/themes/light.jpg', to: './img/themes/light.jpg' },

        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
};