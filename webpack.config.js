
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.d.ts' ],
        // The aliases below should not be used in production - rather, the correct node modules should be referenced.
        /*
        alias: {
            'flo-numerical$': path.resolve(__dirname, projectRoot + 'numerical/src/index.ts')
        }
        */
    },
    output: {
        filename: 'index.min.js',
        path: path.resolve(__dirname, 'browser'),
        library: 'FloPoly',
        libraryTarget: 'var'
    }
};