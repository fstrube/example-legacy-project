const { defineConfig } = require('rollup');
const alias = require('@rollup/plugin-alias');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');
const scss = require('rollup-plugin-scss');
const vue = require('rollup-plugin-vue');

module.exports = defineConfig([
    {
        input: 'resources/js/app.js',
        output: {
            dir: 'public/js',
            format: 'iife',
        },
        plugins: [
            alias({
                '@': 'resources/js',
            }),
            commonjs({
                exclude: /.*\.vue\b/,
            }),
            json(),
            postcss(),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            resolve({
                browser: true,
            }),
            vue(),
        ],
    },
    {
        input: 'resources/sass/app.scss',
        output: {
            file: 'public/css/app.css',
        },
        plugins: [
            scss({
                fileName: 'app.css'
            }),
        ]
    }
]);
