import {fileURLToPath} from 'node:url';

import {defineConfig} from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        css: true,
        server: {
            deps: {
                inline: [/@primer\/react/, /@primer\/octicons-react/],
            },
        },
    },
});
