/**
 * Resource Hints Optimizer
 * 
 * Este script implementa otimizações avançadas para carregamento de recursos:
 * - Prefetch: Pré-carrega recursos que serão necessários na próxima navegação
 * - Preconnect: Estabelece conexões antecipadas com origens importantes
 * - Preload: Carrega recursos críticos para a página atual
 * - DNS-Prefetch: Resolve DNS antecipadamente
 */

(function() {
  // Configuração de recursos para otimização
  const config = {
    // Origens para estabelecer conexões antecipadas
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ],
    
    // Recursos para pré-carregar na página atual
    preload: [
      // Fontes críticas
      { href: '/fonts/Inter-roman.var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      
      // Imagens críticas (LCP)
      { href: '/teste.avif', as: 'image', type: 'image/avif' },
      { href: '/teste.webp', as: 'image', type: 'image/webp' },
      
      // Scripts críticos
      { href: '/scripts/web-vitals.js', as: 'script' }
    ],
    
    // Links para pré-buscar para navegação futura
    prefetch: [
      '/about/',
      '/contact/'
    ],
    
    // Origens para resolver DNS antecipadamente
    dnsPrefetch: [
      'https://api.example.com'
    ]
  };
  
  /**
   * Adiciona resource hints ao documento
   */
  function addResourceHints() {
    const head = document.head;
    
    // Adiciona preconnect
    config.preconnect.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    });
    
    // Adiciona preload
    config.preload.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) {
        link.type = resource.type;
      }
      
      if (resource.crossorigin) {
        link.crossOrigin = resource.crossorigin;
      }
      
      head.appendChild(link);
    });
    
    // Adiciona prefetch (com prioridade baixa)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        config.prefetch.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          head.appendChild(link);
        });
      }, { timeout: 5000 });
    } else {
      // Fallback para setTimeout
      setTimeout(() => {
        config.prefetch.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          head.appendChild(link);
        });
      }, 3000);
    }
    
    // Adiciona dns-prefetch
    config.dnsPrefetch.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = url;
      head.appendChild(link);
    });
  }
  
  /**
   * Implementa prefetch inteligente baseado em interação do usuário
   */
  function setupIntelligentPrefetch() {
    // Prefetch em hover para links de navegação
    document.querySelectorAll('a[href^="/"]:not([href^="/api/"]):not([href*="."]):not([data-no-prefetch])').forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (!link.dataset.prefetched && !navigator.connection?.saveData) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = link.href;
          document.head.appendChild(prefetchLink);
          link.dataset.prefetched = 'true';
        }
      });
    });
    
    // Prefetch em scroll para imagens abaixo da dobra
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.dataset.src) {
            // Prefetch da imagem quando estiver próxima do viewport
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.as = 'image';
            prefetchLink.href = entry.target.dataset.src;
            document.head.appendChild(prefetchLink);
            
            // Marca como prefetched para não repetir
            entry.target.dataset.prefetched = 'true';
            imageObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '200px' // Começa a carregar quando estiver a 200px do viewport
      });
      
      // Observa imagens com data-src
      document.querySelectorAll('img[data-src]:not([data-prefetched])').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
  
  /**
   * Otimiza o carregamento de fontes
   */
  function optimizeFontLoading() {
    // Adiciona classe para controlar FOUT (Flash of Unstyled Text)
    document.documentElement.classList.add('fonts-loading');
    
    // Verifica se a API de Font Loading está disponível
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('1em Inter'),
        document.fonts.load('700 1em Inter')
      ]).then(() => {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-loaded');
        
        // Armazena que as fontes foram carregadas
        try {
          sessionStorage.setItem('fontsLoaded', 'true');
        } catch (e) {
          console.error('Erro ao armazenar estado das fontes:', e);
        }
      }).catch(err => {
        console.error('Erro ao carregar fontes:', err);
        // Remove a classe de carregamento mesmo em caso de erro
        document.documentElement.classList.remove('fonts-loading');
      });
    } else {
      // Fallback para navegadores sem suporte à Font Loading API
      // Adiciona um timeout para remover a classe após um tempo razoável
      setTimeout(() => {
        document.documentElement.classList.remove('fonts-loading');
        document.documentElement.classList.add('fonts-loaded');
      }, 2000);
    }
  }
  
  /**
   * Inicializa as otimizações
   */
  function init() {
    // Verifica se o navegador suporta data saver mode
    const isDataSaverEnabled = navigator.connection?.saveData === true;
    
    // Não carrega recursos não essenciais se o usuário estiver economizando dados
    if (!isDataSaverEnabled) {
      addResourceHints();
      
      // Configura prefetch inteligente quando o documento estiver pronto
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupIntelligentPrefetch);
      } else {
        setupIntelligentPrefetch();
      }
    } else {
      console.log('Data Saver ativado. Limitando carregamento de recursos.');
    }
    
    // Otimiza fontes (mesmo com Data Saver, pois são críticas para a experiência)
    optimizeFontLoading();
    
    // Registra métricas de Web Vitals quando disponível
    if (window.getWebVitals) {
      window.getWebVitals();
    }
  }
  
  // Inicia as otimizações
  init();
})(); 