import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // Alias to your plugin's src directory
            '@': path.resolve(__dirname, '../src')
        }
    },
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'DynaGrid',
            fileName: (format) => `dyna-grid.${format}.js`
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            },
            plugins: [typescript()]
        }
    }
});
