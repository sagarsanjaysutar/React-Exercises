export default {
    transpilePackages: ['rc-util', 'rc-pagination', 'rc-picker', '@ant-design/icons-svg'],
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
}