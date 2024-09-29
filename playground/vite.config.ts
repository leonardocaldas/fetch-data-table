import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    root: path.resolve(__dirname), // Set the playground folder as the root
    plugins: [vue()],
    resolve: {
        alias: {
            // Alias to your plugin's src directory
            '@': path.resolve(__dirname, '../src')
        }
    },
    server: {
        open: true, // Automatically open the browser
        port: 3000  // Port for the playground server
    },
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html') // Specify the HTML entry
        }
    }
});
