const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const ZipFilesPlugin = require('webpack-zip-files-plugin');

module.exports = {
    ...defaultConfig,
    entry: {
        admin: path.resolve( process.cwd(), 'src', 'admin.js' ),
    },
    plugins: [
        ...defaultConfig.plugins,
        new ZipFilesPlugin({
            entries: [
                { src: path.join(__dirname, './build'), dist: 'build' },
                { src: path.join(__dirname, './inc'), dist: 'inc' },
                { src: path.join(__dirname, './languages'), dist: 'languages' },
                { src: path.join(__dirname, './plugin.php'), dist: 'plugin.php' },
            ],
            output: path.join(__dirname, './dist/wholesome-network-plugin-manager'),
            format: 'zip',
        }),
    ],
};