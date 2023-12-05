import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { PATHS } from './consts';

import {
    cssLoader,
    scssLoader,
    jsLoader,
    imagesLoader,
    fontsLoader
} from './loaders';

interface ENV {
    NODE_ENV: string;
}

const getClientConfig = (env: ENV) => {
    const isDevelopment = env.NODE_ENV === 'development';

    return {
        target: 'web',
        mode: isDevelopment ? 'development' : 'production',
        entry: {
            bundle: [
                path.join(PATHS.src, 'index')
            ].filter(Boolean)
        },
        output: {
            filename: '[name].js',
            path: path.join(PATHS.dist, 'public'),
            publicPath: '/'
        },
        devtool: isDevelopment ? 'source-map' : false,
        optimization: {
            minimize: !isDevelopment,
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin()
            ]
        },
        module: {
            rules: [
                jsLoader().client,
                cssLoader().client,
                scssLoader().client,
                fontsLoader().client,
                imagesLoader().client
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                public: PATHS.public,
                api: `${PATHS.src}/api`,
                common: `${PATHS.src}/common`,
                components: `${PATHS.src}/components`,
                pages: `${PATHS.src}/pages`,
                types: `${PATHS.src}/types`,
                store: `${PATHS.src}/store`,
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyPlugin({
                patterns: [
                    { from: path.join(PATHS.public, 'fonts'), to: './fonts' },
                    { from: path.join(PATHS.public, 'images'), to: './images' },
                ]
            }),
            new MiniCssExtractPlugin({
                filename: 'index.css'
            }),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env.NODE_ENV),
            }),
        ]
    };
};

export default getClientConfig;