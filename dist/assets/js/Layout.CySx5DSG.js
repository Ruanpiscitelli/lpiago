import { b as createAstro, c as createComponent, a as renderTemplate, d as renderSlot, e as renderHead, m as maybeRenderHead, f as addAttribute } from './astro/server.DyGNY9cz.js';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                        */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://SEU_USUARIO.github.io");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Estrat\xE9gias de Aviator - Aprenda como lucrar diariamente com an\xE1lises simples e eficazes",
    image = "/teste.avif",
    canonicalURL,
    type = "website"
  } = Astro2.props;
  const siteUrl = Astro2.site || new URL("https://aviator-app.vercel.app/");
  let canonicalURLString;
  try {
    canonicalURLString = canonicalURL ? canonicalURL instanceof URL ? canonicalURL.toString() : new URL(canonicalURL, siteUrl).toString() : new URL(Astro2.url.pathname, siteUrl).toString();
  } catch (e) {
    canonicalURLString = siteUrl.toString();
  }
  let ogImageURL;
  try {
    ogImageURL = image.startsWith("http") ? image : new URL(image, siteUrl).toString();
  } catch (e) {
    ogImageURL = image.startsWith("/") ? siteUrl.toString().replace(/\/$/, "") + image : siteUrl.toString().replace(/\/$/, "") + "/" + image;
  }
  return renderTemplate(_a || (_a = __template(['<html lang="pt-BR" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><!-- Inicializa\xE7\xE3o do dataLayer antes do GTM --><script>\n			window.dataLayer = window.dataLayer || [];\n			function gtag() {\n				dataLayer.push(arguments);\n			}\n			\n			// Verificar se estamos em ambiente de desenvolvimento (localhost)\n			const isLocalhost = window.location.hostname === 'localhost' || \n								window.location.hostname === '127.0.0.1';\n			\n			// Configurar o GA para n\xE3o gerar erros CORS em ambiente local\n			if (isLocalhost) {\n				window.gtag_transport_url = 'https://www.google-analytics.com';\n				// Isso ajuda a evitar alguns erros de conex\xE3o em ambiente de desenvolvimento\n				window.gtag_disable_cookie_storage = true;\n			}\n		<\/script><!-- Google Tag Manager --><script>(function(w,d,s,l,i){\n			w[l]=w[l]||[];w[l].push({'gtm.start':\n			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n			'https://www.googletagmanager.com/gtm.js?id='+i+dl;\n			\n			// Se estiver em localhost, adiciona par\xE2metro para reduzir erros CORS\n			if (w.location.hostname === 'localhost' || w.location.hostname === '127.0.0.1') {\n				j.src += '&local=1';\n			}\n			\n			f.parentNode.insertBefore(j,f);\n		})(window,document,'script','dataLayer','GTM-TL6TJXNF');<\/script><!-- End Google Tag Manager --><!-- SEO prim\xE1rio --><title>", '</title><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale" content="pt_BR"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- OTIMIZA\xC7\xC3O LCP: Preload e prefetch para recursos cr\xEDticos --><link rel="preload" href="/teste.avif" as="image" fetchpriority="high"><!-- Otimiza\xE7\xE3o para fontes com display swap --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"><!-- Resource hints para melhorar performance --><link rel="dns-prefetch" href="https://fonts.googleapis.com"><!-- Seguran\xE7a e otimiza\xE7\xE3o --><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="theme-color" content="#000000"><!-- Fallback para fontes caso JS esteja desativado -->', '<noscript><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></noscript><!-- Preload de CSS cr\xEDtico inline para melhorar LCP e evitar FOUC -->', '</head> <body data-astro-cid-sckkx6r4> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TL6TJXNF" height="0" width="0" style="display:none;visibility:hidden" data-astro-cid-sckkx6r4></iframe></noscript> <!-- End Google Tag Manager (noscript) --> ', " <!-- Web Vitals para an\xE1lise de performance --> <script type=\"module\">\n			// Carrega a biblioteca web-vitals quando o navegador estiver ocioso\n			const loadWebVitals = () => {\n				const loadWithFallback = () => {\n					// Usando a vers\xE3o base do web-vitals\n					import('https://unpkg.com/web-vitals@3.3.0/dist/web-vitals.js?module')\n						.then(({ onCLS, onFID, onLCP }) => {\n							// Monitora e reporta m\xE9tricas Core Web Vitals\n							onCLS(sendToAnalytics);\n							onFID(sendToAnalytics);\n							onLCP(sendToAnalytics);\n							console.log('Web Vitals carregado com sucesso');\n						})\n						.catch(error => {\n							// Tentar vers\xE3o alternativa se a primeira falhar\n							console.warn('Tentando vers\xE3o alternativa do web-vitals...');\n							import('https://unpkg.com/web-vitals@2.1.4/dist/web-vitals.js?module')\n								.then(({ onCLS, onFID, onLCP }) => {\n									onCLS(sendToAnalytics);\n									onFID(sendToAnalytics);\n									onLCP(sendToAnalytics);\n									console.log('Web Vitals (vers\xE3o alternativa) carregado com sucesso');\n								})\n								.catch(err => {\n									// Falha silenciosa para n\xE3o interromper a experi\xEAncia do usu\xE1rio\n									console.warn('N\xE3o foi poss\xEDvel carregar web-vitals, m\xE9tricas de performance n\xE3o ser\xE3o coletadas');\n								});\n						});\n				};\n\n				if ('requestIdleCallback' in window) {\n					requestIdleCallback(() => loadWithFallback(), { timeout: 5000 });\n				} else {\n					// Fallback para browsers que n\xE3o suportam requestIdleCallback\n					setTimeout(loadWithFallback, 5000);\n				}\n			};\n\n			// Fun\xE7\xE3o para enviar m\xE9tricas para analytics\n			const sendToAnalytics = ({ name, delta, id, attribution }) => {\n				// Log das m\xE9tricas para debugging\n				console.log(`M\xE9trica: ${name} | Valor: ${delta}`);\n				\n				// Envio para endpoint de analytics (quando estiver dispon\xEDvel)\n				if (navigator.sendBeacon) {\n					const analyticsData = {\n						name,\n						value: delta,\n						id,\n						attribution: attribution ? JSON.stringify(attribution) : undefined,\n						page: window.location.pathname\n					};\n					\n					try {\n						// Exemplo de envio de dados (ativar quando o endpoint estiver pronto)\n						// navigator.sendBeacon('/api/vitals', JSON.stringify(analyticsData));\n					} catch (error) {\n						// Evitando erros no console\n					}\n				}\n			};\n			\n			// Carrega web vitals ap\xF3s o onload para priorizar conte\xFAdo vis\xEDvel\n			if (document.readyState === 'complete') {\n				loadWebVitals();\n			} else {\n				window.addEventListener('load', loadWebVitals);\n			}\n		<\/script> <!-- Script para resolver problemas de CORS com o Google Analytics em ambiente local --> <script>\n			// Executar ap\xF3s o carregamento da p\xE1gina\n			window.addEventListener('DOMContentLoaded', function() {\n				// Apenas em ambiente de desenvolvimento local\n				if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {\n					// Configurar vari\xE1veis espec\xEDficas para o GA em ambiente local\n					window.ga_debug = {trace: false};\n					\n					// 1. Interceptar fetch para requisi\xE7\xF5es de analytics\n					const originalFetch = window.fetch;\n					\n					window.fetch = function(resource, options) {\n						// Se a URL for do Google Analytics ou dom\xEDnios relacionados ao GTM\n						if (typeof resource === 'string' && \n							(resource.includes('google-analytics.com') || \n							 resource.includes('analytics.google.com') || \n							 resource.includes('api.iagomilionario.com/g/collect') ||\n							 resource.includes('stats.g.doubleclick.net'))) {\n						\n							// Modificar as op\xE7\xF5es para usar 'no-cors' e evitar erros CORS\n							options = options || {};\n							options.mode = 'no-cors';\n							\n							// Opcional: Log para debug (remover em produ\xE7\xE3o)\n							console.debug('Interceptando requisi\xE7\xE3o fetch de analytics em ambiente local');\n							\n							// Envolver em try/catch para evitar falhas\n							try {\n								return originalFetch(resource, options);\n							} catch (e) {\n								console.debug('Falha silenciosa em requisi\xE7\xE3o de analytics (esperado em localhost)');\n								// Retornar uma resposta vazia para evitar erros\n								return Promise.resolve(new Response());\n							}\n						}\n						\n						// Para todas as outras requisi\xE7\xF5es, manter o comportamento normal\n						return originalFetch.apply(this, arguments);\n					};\n					\n					// 2. Interceptar XMLHttpRequest para requisi\xE7\xF5es de analytics\n					const OriginalXHR = window.XMLHttpRequest;\n					\n					function newXHR() {\n						const xhr = new OriginalXHR();\n						const originalOpen = xhr.open;\n						\n						// Interceptar o m\xE9todo open para detectar requisi\xE7\xF5es de analytics\n						xhr.open = function(method, url) {\n							// Detectar se \xE9 uma URL de analytics\n							if (typeof url === 'string' && \n								(url.includes('google-analytics.com') || \n								 url.includes('analytics.google.com') || \n								 url.includes('api.iagomilionario.com/g/collect') ||\n								 url.includes('stats.g.doubleclick.net'))) {\n							\n								// Silenciar erros para estas requisi\xE7\xF5es\n								xhr.addEventListener('error', function(e) {\n									e.stopPropagation();\n									console.debug('Interceptando erro XMLHttpRequest de analytics em ambiente local');\n									return false;\n								});\n							}\n							\n							// Chamar o m\xE9todo original\n							return originalOpen.apply(xhr, arguments);\n						};\n						\n						return xhr;\n					}\n					\n					// Substituir o construtor XMLHttpRequest global\n					window.XMLHttpRequest = newXHR;\n					\n					console.info('Ambiente de desenvolvimento: intercepta\xE7\xE3o de requisi\xE7\xF5es de analytics ativada');\n				}\n			});\n		<\/script> </body> </html> "], ['<html lang="pt-BR" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><!-- Inicializa\xE7\xE3o do dataLayer antes do GTM --><script>\n			window.dataLayer = window.dataLayer || [];\n			function gtag() {\n				dataLayer.push(arguments);\n			}\n			\n			// Verificar se estamos em ambiente de desenvolvimento (localhost)\n			const isLocalhost = window.location.hostname === 'localhost' || \n								window.location.hostname === '127.0.0.1';\n			\n			// Configurar o GA para n\xE3o gerar erros CORS em ambiente local\n			if (isLocalhost) {\n				window.gtag_transport_url = 'https://www.google-analytics.com';\n				// Isso ajuda a evitar alguns erros de conex\xE3o em ambiente de desenvolvimento\n				window.gtag_disable_cookie_storage = true;\n			}\n		<\/script><!-- Google Tag Manager --><script>(function(w,d,s,l,i){\n			w[l]=w[l]||[];w[l].push({'gtm.start':\n			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n			'https://www.googletagmanager.com/gtm.js?id='+i+dl;\n			\n			// Se estiver em localhost, adiciona par\xE2metro para reduzir erros CORS\n			if (w.location.hostname === 'localhost' || w.location.hostname === '127.0.0.1') {\n				j.src += '&local=1';\n			}\n			\n			f.parentNode.insertBefore(j,f);\n		})(window,document,'script','dataLayer','GTM-TL6TJXNF');<\/script><!-- End Google Tag Manager --><!-- SEO prim\xE1rio --><title>", '</title><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale" content="pt_BR"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- OTIMIZA\xC7\xC3O LCP: Preload e prefetch para recursos cr\xEDticos --><link rel="preload" href="/teste.avif" as="image" fetchpriority="high"><!-- Otimiza\xE7\xE3o para fontes com display swap --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"><!-- Resource hints para melhorar performance --><link rel="dns-prefetch" href="https://fonts.googleapis.com"><!-- Seguran\xE7a e otimiza\xE7\xE3o --><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="theme-color" content="#000000"><!-- Fallback para fontes caso JS esteja desativado -->', '<noscript><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"></noscript><!-- Preload de CSS cr\xEDtico inline para melhorar LCP e evitar FOUC -->', '</head> <body data-astro-cid-sckkx6r4> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TL6TJXNF" height="0" width="0" style="display:none;visibility:hidden" data-astro-cid-sckkx6r4></iframe></noscript> <!-- End Google Tag Manager (noscript) --> ', " <!-- Web Vitals para an\xE1lise de performance --> <script type=\"module\">\n			// Carrega a biblioteca web-vitals quando o navegador estiver ocioso\n			const loadWebVitals = () => {\n				const loadWithFallback = () => {\n					// Usando a vers\xE3o base do web-vitals\n					import('https://unpkg.com/web-vitals@3.3.0/dist/web-vitals.js?module')\n						.then(({ onCLS, onFID, onLCP }) => {\n							// Monitora e reporta m\xE9tricas Core Web Vitals\n							onCLS(sendToAnalytics);\n							onFID(sendToAnalytics);\n							onLCP(sendToAnalytics);\n							console.log('Web Vitals carregado com sucesso');\n						})\n						.catch(error => {\n							// Tentar vers\xE3o alternativa se a primeira falhar\n							console.warn('Tentando vers\xE3o alternativa do web-vitals...');\n							import('https://unpkg.com/web-vitals@2.1.4/dist/web-vitals.js?module')\n								.then(({ onCLS, onFID, onLCP }) => {\n									onCLS(sendToAnalytics);\n									onFID(sendToAnalytics);\n									onLCP(sendToAnalytics);\n									console.log('Web Vitals (vers\xE3o alternativa) carregado com sucesso');\n								})\n								.catch(err => {\n									// Falha silenciosa para n\xE3o interromper a experi\xEAncia do usu\xE1rio\n									console.warn('N\xE3o foi poss\xEDvel carregar web-vitals, m\xE9tricas de performance n\xE3o ser\xE3o coletadas');\n								});\n						});\n				};\n\n				if ('requestIdleCallback' in window) {\n					requestIdleCallback(() => loadWithFallback(), { timeout: 5000 });\n				} else {\n					// Fallback para browsers que n\xE3o suportam requestIdleCallback\n					setTimeout(loadWithFallback, 5000);\n				}\n			};\n\n			// Fun\xE7\xE3o para enviar m\xE9tricas para analytics\n			const sendToAnalytics = ({ name, delta, id, attribution }) => {\n				// Log das m\xE9tricas para debugging\n				console.log(\\`M\xE9trica: \\${name} | Valor: \\${delta}\\`);\n				\n				// Envio para endpoint de analytics (quando estiver dispon\xEDvel)\n				if (navigator.sendBeacon) {\n					const analyticsData = {\n						name,\n						value: delta,\n						id,\n						attribution: attribution ? JSON.stringify(attribution) : undefined,\n						page: window.location.pathname\n					};\n					\n					try {\n						// Exemplo de envio de dados (ativar quando o endpoint estiver pronto)\n						// navigator.sendBeacon('/api/vitals', JSON.stringify(analyticsData));\n					} catch (error) {\n						// Evitando erros no console\n					}\n				}\n			};\n			\n			// Carrega web vitals ap\xF3s o onload para priorizar conte\xFAdo vis\xEDvel\n			if (document.readyState === 'complete') {\n				loadWebVitals();\n			} else {\n				window.addEventListener('load', loadWebVitals);\n			}\n		<\/script> <!-- Script para resolver problemas de CORS com o Google Analytics em ambiente local --> <script>\n			// Executar ap\xF3s o carregamento da p\xE1gina\n			window.addEventListener('DOMContentLoaded', function() {\n				// Apenas em ambiente de desenvolvimento local\n				if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {\n					// Configurar vari\xE1veis espec\xEDficas para o GA em ambiente local\n					window.ga_debug = {trace: false};\n					\n					// 1. Interceptar fetch para requisi\xE7\xF5es de analytics\n					const originalFetch = window.fetch;\n					\n					window.fetch = function(resource, options) {\n						// Se a URL for do Google Analytics ou dom\xEDnios relacionados ao GTM\n						if (typeof resource === 'string' && \n							(resource.includes('google-analytics.com') || \n							 resource.includes('analytics.google.com') || \n							 resource.includes('api.iagomilionario.com/g/collect') ||\n							 resource.includes('stats.g.doubleclick.net'))) {\n						\n							// Modificar as op\xE7\xF5es para usar 'no-cors' e evitar erros CORS\n							options = options || {};\n							options.mode = 'no-cors';\n							\n							// Opcional: Log para debug (remover em produ\xE7\xE3o)\n							console.debug('Interceptando requisi\xE7\xE3o fetch de analytics em ambiente local');\n							\n							// Envolver em try/catch para evitar falhas\n							try {\n								return originalFetch(resource, options);\n							} catch (e) {\n								console.debug('Falha silenciosa em requisi\xE7\xE3o de analytics (esperado em localhost)');\n								// Retornar uma resposta vazia para evitar erros\n								return Promise.resolve(new Response());\n							}\n						}\n						\n						// Para todas as outras requisi\xE7\xF5es, manter o comportamento normal\n						return originalFetch.apply(this, arguments);\n					};\n					\n					// 2. Interceptar XMLHttpRequest para requisi\xE7\xF5es de analytics\n					const OriginalXHR = window.XMLHttpRequest;\n					\n					function newXHR() {\n						const xhr = new OriginalXHR();\n						const originalOpen = xhr.open;\n						\n						// Interceptar o m\xE9todo open para detectar requisi\xE7\xF5es de analytics\n						xhr.open = function(method, url) {\n							// Detectar se \xE9 uma URL de analytics\n							if (typeof url === 'string' && \n								(url.includes('google-analytics.com') || \n								 url.includes('analytics.google.com') || \n								 url.includes('api.iagomilionario.com/g/collect') ||\n								 url.includes('stats.g.doubleclick.net'))) {\n							\n								// Silenciar erros para estas requisi\xE7\xF5es\n								xhr.addEventListener('error', function(e) {\n									e.stopPropagation();\n									console.debug('Interceptando erro XMLHttpRequest de analytics em ambiente local');\n									return false;\n								});\n							}\n							\n							// Chamar o m\xE9todo original\n							return originalOpen.apply(xhr, arguments);\n						};\n						\n						return xhr;\n					}\n					\n					// Substituir o construtor XMLHttpRequest global\n					window.XMLHttpRequest = newXHR;\n					\n					console.info('Ambiente de desenvolvimento: intercepta\xE7\xE3o de requisi\xE7\xF5es de analytics ativada');\n				}\n			});\n		<\/script> </body> </html> "])), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), title, addAttribute(canonicalURLString, "href"), addAttribute(type, "content"), addAttribute(canonicalURLString, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImageURL, "content"), addAttribute(canonicalURLString, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImageURL, "content"), maybeRenderHead(), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/ruanpiscitelli/Documents/lps will/iago-1/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
