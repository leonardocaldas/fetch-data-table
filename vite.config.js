import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path'

export default defineConfig({
    plugins: [vue()],

    build: {
        minify: false,

        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SparkGrid',
            fileName: (format) => `spark-grid.${format}.js`,
        },

        rollupOptions: {
            // Ensure dependencies are externalized to avoid bundling them
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue', // Ensures Vue is properly recognized in UMD format
                },
            },
        },
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js', // Ensure compatibility with Vue setup
            '@': '/src', // Alias for easy imports
        },
    },
});
