// karma.conf.js

const path = require('path');

module.exports = function(config) {
    config.set({
        // Frameworks de testing a usar
        frameworks: ['jasmine', 'webpack'],

        // Archivos a cargar en el navegador (incluyendo la entrada de testing)
        files: [
            // Todos tus archivos de prueba deben coincidir con este patrón
            { pattern: 'src/**/*.test.js', watched: false },
            { pattern: 'src/**/*.test.jsx', watched: false }
        ],

        // Preprocesadores: usar webpack en todos los archivos JS
        preprocessors: {
            'src/**/*.js': ['webpack', 'sourcemap'],
            'src/**/*.jsx': ['webpack', 'sourcemap'],
        },

        // Configuración de Webpack (similar a tu configuración de desarrollo)
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    // 1. Transpilación de JS y JSX con Babel
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { modules: false }],
                                '@babel/preset-react'
                            ],
                        },
                    },
                    // 2. Manejo de CSS y CSS Modules
                    {
                        // Importante: Debes usar style-loader y css-loader para que Karma pueda inyectar estilos
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    // Habilitar CSS Modules para archivos que terminan en .module.css
                                    modules: {
                                        auto: true,
                                        localIdentName: '[name]__[local]--[hash:base64:5]',
                                    },
                                },
                            },
                        ],
                        // Si usas SASS o SCSS, añade sass-loader aquí también
                    },
                    // 3. Manejo básico de Assets (simulado para Karma)
                    {
                        test: /\.(png|jpe?g|gif|svg|webp)$/i,
                        type: 'asset/resource',
                        // Simula que Webpack resuelve estos archivos, aunque en tests no se usan
                    }
                ],
            },
            resolve: {
                extensions: ['.js', '.jsx'],
            },
            devtool: 'inline-source-map', // Necesario para karma-sourcemap-loader
        },

        // Webpack Middleware (para evitar problemas de cache)
        webpackMiddleware: {
            noInfo: true
        },

        // Plugins de reportería (para ver los resultados)
        reporters: ['progress', 'kjhtml'],

        // Configuración de karma-jasmine-html-reporter
        jasmineHtmlReporter: {
            suppressAll: true // solo muestra fallos/errores
        },

        // Navegadores a usar
        browsers: ['Chrome'],

        // Configuración de Chrome (para evitar problemas en ambientes CI)
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },

        // Nivel de logging
        logLevel: config.LOG_INFO,

        // Observar cambios en archivos y volver a ejecutar
        autoWatch: true,

        // Una sola ejecución de prueba
        singleRun: false,

        // Concurrencia
        concurrency: Infinity
    });
};