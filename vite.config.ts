import { defineConfig } from 'vite';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = repo ? `/${repo}/` : '/';

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          const match = id.match(/src\/content\/(volume-\d+|companion)\/(ch\d+)\.ts/);
          if (match) return `content-${match[1]}-${match[2]}`;
          if (id.includes('/diagrams/')) return 'diagrams';
        },
      },
    },
  },
});
