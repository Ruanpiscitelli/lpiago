import { defineConfig } from 'astro/config';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
	// Configuração para Netlify
	site: process.env.SITE_URL || 'https://iago1lp.netlify.app',
	
	output: 'static',
	build: {
		// Otimizações específicas para melhorar o LCP
		inlineStylesheets: 'auto', // Inline CSS pequeno para evitar requisições bloqueantes
		assets: 'assets', // Define pasta para assets
		format: 'file' // Melhor para cache e performance
	},
	vite: {
		build: {
			cssCodeSplit: true, // Separa CSS por módulo para carregamento mais rápido do CSS crítico
			minify: 'terser', // Melhor minificação para tamanho final
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
					// Estratégia de divisão de chunks para melhorar LCP
					manualChunks: {
						vendor: ['node_modules'], // Agrupa todas as dependências do node_modules
					},
					// Nomes previsíveis para melhor cache
					entryFileNames: 'assets/js/[name].[hash].js',
					chunkFileNames: 'assets/js/[name].[hash].js',
					assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
				}
			},
			// Reduz tamanho do sourcemap enquanto mantém funcionalidade básica
			sourcemap: 'hidden',
		},
		// Otimizações para imagens
		plugins: [],
		optimizeDeps: {
			exclude: ['@rollup/rollup-linux-x64-gnu', '@rollup/rollup-darwin-arm64', '@rollup/rollup-darwin-x64']
		}
	},
	// Plugins para otimizações adicionais
	integrations: [
		// O plugin compress otimiza os assets
		compress({
			// Configuração para compressão de imagens
			img: {
				quality: 80,
				avif: {
					quality: 80
				},
				webp: {
					quality: 80
				}
			},
			// Compressão de arquivos com Brotli para entregas mais rápidas
			brotli: {
				level: 11, // Nível máximo de compressão para brotli
			},
			// Otimização de CSS para melhorar o CLS e LCP
			css: true,
			// Otimização de JavaScript - configurações avançadas
			js: {
				ecma: 6, // Compatível com ES6
				mangle: true, // Reduz nomes de variáveis
				compress: {
					drop_console: true, // Remove console.logs
					drop_debugger: true, // Remove debugger statements
					passes: 2, // Múltiplas passagens para otimização agressiva
				},
				format: {
					comments: false, // Remove comentários
				}
			},
			// Otimização de SVG
			svg: true,
			// Otimização de HTML
			html: {
				removeComments: true,
				collapseWhitespace: true, // Remove espaços em branco
				conservativeCollapse: true, // Mantém um espaço entre elementos
				removeAttributeQuotes: false, // Mantém aspas para compatibilidade
				removeEmptyAttributes: true, // Remove atributos vazios
				minifyJS: true, // Minifica JavaScript inline
				minifyCSS: true, // Minifica CSS inline
				minifyURLs: true // Minifica URLs
			}
		})
	],
	server: {
		port: 4321 // Porta para desenvolvimento
	},
	preview: {
		port: 5000 // Porta diferente para preview
	}
});
