export default () => {
    const config = {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: { allowTsInNodeModules: true }
            }
        ],
    };

    return {
        client: config,
        server: config,
    }
}