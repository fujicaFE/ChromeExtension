import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
// import manifest from './manifest.config.ts'
import manifest from './manifest.json' assert { type: 'json' } // Node >=17
import copy from 'rollup-plugin-copy' // 引入 rollup-plugin-copy
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    crx({ manifest })
  ],
  // 注意，这段配置很关键，请保证开发端口与 hmr 端口一致。不知道为何，插件生成的扩展里缺少 5173 默认值。
  server: {
    strictPort: true,
    port: 5173,
    hmr: {
      clientPort: 5173
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        entry: path.resolve(__dirname, 'src/index.html'),
        contentPage: path.resolve(__dirname, 'src/contentPage/index.html'),
        popup: path.resolve(__dirname, 'src/popup/index.html')
      },
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]', // 静态资源
        chunkFileNames: 'js/[name]-[hash].js', // 代码分割中产生的 chunk
        entryFileNames: 'js/[name]-[hash].js'
      }
    }
  }
})
