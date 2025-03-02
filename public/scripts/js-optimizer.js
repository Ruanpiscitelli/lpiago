/**
 * JavaScript Optimizer
 * 
 * Este script otimiza o carregamento de JavaScript para melhorar o desempenho:
 * - Implementa carregamento sob demanda (lazy loading)
 * - Gerencia dependências entre scripts
 * - Prioriza scripts críticos
 * - Implementa técnicas de module/nomodule para compatibilidade
 */

(function() {
  // Configurações
  const config = {
    // Scripts críticos que devem ser carregados imediatamente
    criticalScripts: [
      // Exemplo: { src: '/scripts/critical.js', type: 'module' }
    ],
    
    // Scripts que podem ser carregados sob demanda
    lazyScripts: [
      { 
        src: '/scripts/analytics.js', 
        type: 'module',
        condition: () => !navigator.connection?.saveData, // Não carrega se Data Saver estiver ativo
        delay: 3000 // Carrega após 3 segundos
      },
      {
        src: '/scripts/social-share.js',
        type: 'module',
        condition: () => document.querySelector('.share-buttons'), // Carrega apenas se houver botões de compartilhamento
        event: 'mouseover', // Carrega quando o usuário passar o mouse sobre os botões
        selector: '.share-buttons'
      }
    ],
    
    // Scripts que devem ser carregados apenas em determinadas rotas
    routeSpecificScripts: [
      {
        src: '/scripts/contact-form.js',
        type: 'module',
        routes: ['/contact', '/support']
      }
    ]
  };
  
  /**
   * Carrega um script de forma assíncrona
   * @param {string} src - URL do script
   * @param {string} type - Tipo do script (module, nomodule, text/javascript)
   * @param {Function} callback - Função a ser chamada após o carregamento
   * @return {HTMLScriptElement} - Elemento script criado
   */
  function loadScript(src, type = 'module', callback = null) {
    // Verifica se o script já foi carregado
    if (document.querySelector(`script[src="${src}"]`)) {
      if (callback) callback();
      return null;
    }
    
    // Cria o elemento script
    const script = document.createElement('script');
    script.src = src;
    script.type = type;
    script.async = true;
    
    // Adiciona callback de carregamento
    if (callback) {
      script.onload = callback;
    }
    
    // Adiciona o script ao final do body
    document.body.appendChild(script);
    
    return script;
  }
  
  /**
   * Carrega scripts críticos imediatamente
   */
  function loadCriticalScripts() {
    config.criticalScripts.forEach(script => {
      loadScript(script.src, script.type);
    });
  }
  
  /**
   * Carrega scripts sob demanda com base em condições
   */
  function setupLazyScripts() {
    config.lazyScripts.forEach(script => {
      // Verifica se a condição para carregar o script é atendida
      if (script.condition && !script.condition()) {
        return;
      }
      
      // Carrega o script após um delay
      if (script.delay) {
        setTimeout(() => {
          loadScript(script.src, script.type);
        }, script.delay);
        return;
      }
      
      // Carrega o script quando um evento ocorrer em um elemento específico
      if (script.event && script.selector) {
        const elements = document.querySelectorAll(script.selector);
        if (elements.length > 0) {
          const loadScriptOnEvent = () => {
            loadScript(script.src, script.type);
            // Remove os event listeners após o carregamento
            elements.forEach(el => {
              el.removeEventListener(script.event, loadScriptOnEvent);
            });
          };
          
          elements.forEach(el => {
            el.addEventListener(script.event, loadScriptOnEvent, { once: true });
          });
        }
        return;
      }
      
      // Carrega o script quando o elemento entrar no viewport
      if (script.selector && 'IntersectionObserver' in window) {
        const elements = document.querySelectorAll(script.selector);
        if (elements.length > 0) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                loadScript(script.src, script.type);
                observer.disconnect();
              }
            });
          }, { rootMargin: '200px' });
          
          elements.forEach(el => {
            observer.observe(el);
          });
        }
        return;
      }
    });
  }
  
  /**
   * Carrega scripts específicos para a rota atual
   */
  function loadRouteSpecificScripts() {
    const currentPath = window.location.pathname;
    
    config.routeSpecificScripts.forEach(script => {
      // Verifica se o script deve ser carregado na rota atual
      const shouldLoad = script.routes.some(route => {
        if (route.endsWith('*')) {
          // Suporte a wildcard no final da rota
          const baseRoute = route.slice(0, -1);
          return currentPath.startsWith(baseRoute);
        }
        return currentPath === route;
      });
      
      if (shouldLoad) {
        loadScript(script.src, script.type);
      }
    });
  }
  
  /**
   * Implementa carregamento condicional baseado em recursos do navegador
   */
  function setupFeatureDetection() {
    // Exemplo: Carrega polyfills apenas se necessário
    if (!('IntersectionObserver' in window)) {
      loadScript('/scripts/polyfills/intersection-observer.js', 'text/javascript');
    }
    
    // Exemplo: Carrega versões diferentes do script com base no suporte a módulos ES
    const supportsModules = 'noModule' in document.createElement('script');
    if (supportsModules) {
      // Navegadores modernos: carrega versão ES modules
      loadScript('/scripts/modern.js', 'module');
    } else {
      // Navegadores legados: carrega versão transpilada
      loadScript('/scripts/legacy.js', 'text/javascript');
    }
  }
  
  /**
   * Inicializa as otimizações de JavaScript
   */
  function init() {
    // Carrega scripts críticos imediatamente
    loadCriticalScripts();
    
    // Configura carregamento de scripts específicos para a rota
    loadRouteSpecificScripts();
    
    // Configura detecção de recursos
    setupFeatureDetection();
    
    // Configura carregamento sob demanda quando o documento estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupLazyScripts);
    } else {
      setupLazyScripts();
    }
  }
  
  // Inicia as otimizações
  init();
  
  // Expõe função para carregar scripts dinamicamente
  window.loadScript = loadScript;
})(); 