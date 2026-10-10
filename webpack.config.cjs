const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');


const config_Basic = {
    // mode: 'development',
    mode: 'production',
    entry: './src/index.ts',
    resolve: {
        extensions: [
            '.js', '.mjs', '.cjs', 
            '.jsx', '.cjsx', '.mjsx',
            '.tsx', '.ts', '.d.ts'
        ],
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // Transpile-only via SWC; type checking is done by `tsc` in
                // `npm run build-node` (TypeScript 7 has no JS API for ts-loader).
                loader: 'swc-loader',
                options: {
                    jsc: {
                        parser: { syntax: 'typescript' },
                        target: 'esnext'
                    },
                    module: { type: 'es6' }
                },
                exclude: /node_modules/,
                sideEffects: false
            }
        ]
    },
    stats: {
        // Don't display most things
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    },
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ],
    output: {
        path: path.resolve(__dirname, 'browser'),
        library: { type: 'module' }
    },
    experiments: {
        outputModule: true
    }
}


/** ESM, minified */ 
const config_EsmMinify = {
    ...config_Basic,
    output: {
        ...config_Basic.output,
        filename: 'index.min.js',
    },
    optimization: { minimize: true }
};


/** ESM, not minified */ 
const config_EsmNoMinify = {
    ...config_Basic,
    output: {
        ...config_Basic.output,
        filename: 'index.js',
    },
    optimization: { minimize: false },
};


module.exports = [
    config_EsmMinify,
    config_EsmNoMinify
];

