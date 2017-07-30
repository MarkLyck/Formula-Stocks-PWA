const path = require('path')
const glob = require('glob')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
    webpack: (config, { dev }) => {
        /**
        * Install and Update our Service worker
        * on our main entry file :)
        * Reason: https://github.com/ooade/NextSimpleStarter/issues/32
        */
        const oldEntry = config.entry

        config.entry = () =>
            oldEntry().then((entry) => {
                entry['main.js'].push(path.resolve('./lib/offline'))
                return entry
            })

            /* Enable only in Production */
        if (!dev) {
            // Service Worker
            config.plugins.push(
                new SWPrecacheWebpackPlugin({
                    cacheId: 'next-ss',
                    filename: 'sw.js',
                    minify: true,
                    staticFileGlobsIgnorePatterns: [/\.next\//],
                    staticFileGlobs: [
                        'static/**/*', // Precache all static files by default
                    ],
                    runtimeCaching: [
                        // Example with different handlers
                        {
                            handler: 'fastest',
                            urlPattern: /[.](png|jpg|css)/,
                        },
                        {
                            handler: 'networkFirst',
                            urlPattern: /^https.*/, //cache all files
                        },
                    ],
                }))
        }

        config.module.rules.push(
            {
                test: /\.(css|scss)/,
                loader: 'emit-file-loader',
                options: {
                    name: 'dist/[path][name].[ext]',
                },
            },
            {
                test: /\.css$/,
                loader: 'babel-loader!raw-loader',
            },
            {
                test: /\.scss$/,
                loader: 'babel-loader!raw-loader!sass-loader',
            })

        // Remove minifed react aliases for material-ui so production builds work
        if (config.resolve.alias) {
            delete config.resolve.alias.react
            delete config.resolve.alias['react-dom']
        }
        return config
    },
}
