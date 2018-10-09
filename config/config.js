import Router from './router.config';

export default {
    // singular: true,
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
            dynamicImport: {
                loadingComponent: './components/PageLoading/index',
            },
        }],
    ],
    routes: Router,
    proxy: {
        '/dev': {
            target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
            changeOrigin: true,
        }
    }
};