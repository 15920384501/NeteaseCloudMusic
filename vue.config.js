
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/cloud': {
                    target: 'https://daiwei.site/netease/',

                    changeOrigin: true,
                    pathRewrite: {'^/cloud' : ''}
                },


            }
        }
    },
};