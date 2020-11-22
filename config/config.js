import { defineConfig } from 'umi';
import routerConfig from './router.config';
const path = require('path');

export default defineConfig({
    dva: {
        immer: true,
        hmr: false,
    },
    title: '网易云音乐',
    nodeModulesTransform: {
        type: 'none',
    },
    // alias: {
    //   components: path.resolve(__dirname, './src/components/'),
    //   pages: path.resolve(__dirname, './src/pages/'),
    //   assets: path.resolve(__dirname, './src/assets/'),
    // },
    routes: routerConfig,
    "proxy": {
        '/music': {
            target: 'http://localhost:3000',
            pathRewrite: { '^/music': '' },
            changeOrigin: true
        }
    }
});
