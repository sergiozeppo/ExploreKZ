import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'node-fetch': 'isomorphic-fetch',
        },
    },
    // build: {
    //     rollupOptions: {
    //         input: {
    //             main: './index.html',
    //         },
    //     },
    // },
});
