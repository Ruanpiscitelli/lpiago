import { defineConfig } from 'vite';
import compressionPlugin from 'vite-plugin-compression';

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
      format: {
        comments: false,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            // Separe as bibliotecas grandes em seus próprios chunks
            'node_modules',
          ],
        },
        // Formato de nomes de arquivos que ajudam com cache
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
      },
    },
    // Garante que o CSS também seja otimizado
    cssCodeSplit: true,
    // Reduz o tamanho do sourcemap enquanto mantém funcionalidade básica
    sourcemap: 'hidden',
  },
  plugins: [
    compressionPlugin({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 512,
      compressionOptions: {
        level: 11, // Nível máximo de compressão para brotli
      },
      filter: /\.(js|css|html|svg|json)$/i,
      deleteOriginalAssets: false,
    }),
    compressionPlugin({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 512,
      compressionOptions: {
        level: 9, // Nível máximo de compressão para gzip
      },
      filter: /\.(js|css|html|svg|json)$/i,
      deleteOriginalAssets: false,
    }),
    {
      name: 'compression-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          // Processa apenas arquivos estáticos
          if (req.url && /\.(js|css|html|svg|json|txt)/.test(req.url)) {
            const acceptEncoding = req.headers['accept-encoding'] || '';
            
            // Tenta buscar versão comprimida com brotli
            if (/\bbr\b/.test(acceptEncoding)) {
              try {
                const brotliPath = req.url + '.br';
                // Verifica se existe o arquivo comprimido
                const hasBrotli = await server.transformRequest(brotliPath)
                  .then(() => true)
                  .catch(() => false);
                
                if (hasBrotli) {
                  res.setHeader('Content-Encoding', 'br');
                  req.url = brotliPath;
                }
              } catch (e) {
                // Ignora erro e continua
              }
            }
            
            // Tenta buscar versão comprimida com gzip
            else if (/\bgzip\b/.test(acceptEncoding)) {
              try {
                const gzipPath = req.url + '.gz';
                // Verifica se existe o arquivo comprimido
                const hasGzip = await server.transformRequest(gzipPath)
                  .then(() => true)
                  .catch(() => false);
                
                if (hasGzip) {
                  res.setHeader('Content-Encoding', 'gzip');
                  req.url = gzipPath;
                }
              } catch (e) {
                // Ignora erro e continua
              }
            }
          }
          
          next();
        });
      }
    }
  ]
}); 