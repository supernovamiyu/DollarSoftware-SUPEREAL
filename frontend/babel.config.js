export default {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 'current',
                browsers: ['last 2 versions', 'not dead']
            }
        }]
    ]
};