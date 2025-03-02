/**
 * Image Optimizer
 * 
 * Este script otimiza o carregamento de imagens para melhorar o LCP e CLS:
 * - Implementa carregamento progressivo para imagens
 * - Detecta suporte a formatos modernos (AVIF, WebP)
 * - Aplica técnicas de blur-up para melhorar a experiência de carregamento
 * - Monitora e otimiza o LCP (Largest Contentful Paint)
 */

(function() {
  // Configurações
  const config = {
    lazyLoadThreshold: 200, // Pixels antes da imagem entrar no viewport
    lowQualityWidth: 20,    // Largura da imagem de baixa qualidade para blur-up
    debugMode: false        // Ativa logs de debug
  };
  
  // Detecta suporte a formatos modernos
  const supportsAvif = detectImageFormat('avif');
  const supportsWebP = detectImageFormat('webp');
  
  /**
   * Detecta suporte a um formato de imagem específico
   * @param {string} format - Formato a ser testado (avif, webp)
   * @return {Promise<boolean>} - Promise que resolve para true se o formato for suportado
   */
  function detectImageFormat(format) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = function() {
        resolve(image.width === 1);
      };
      image.onerror = function() {
        resolve(false);
      };
      image.src = `data:image/${format};base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=`;
    });
  }
  
  /**
   * Otimiza a imagem LCP (Largest Contentful Paint)
   */
  async function optimizeLCP() {
    // Identifica a imagem LCP
    const lcpImage = document.querySelector('.main-image img');
    
    if (!lcpImage) {
      if (config.debugMode) console.log('Imagem LCP não encontrada');
      return;
    }
    
    // Aplica otimizações específicas para LCP
    lcpImage.fetchPriority = 'high';
    lcpImage.loading = 'eager';
    lcpImage.decoding = 'async';
    
    // Adiciona classe para estilização
    lcpImage.classList.add('lcp-image');
    
    // Monitora o LCP
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (config.debugMode) {
          console.log('LCP:', lastEntry.startTime, 'ms');
          console.log('LCP Element:', lastEntry.element);
        }
        
        // Desconecta o observer após capturar o LCP
        lcpObserver.disconnect();
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }
  }
  
  /**
   * Implementa carregamento progressivo para imagens
   */
  function setupProgressiveLoading() {
    // Configura o IntersectionObserver para lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Carrega a imagem em alta qualidade
            if (img.dataset.src) {
              // Aplica efeito de blur-up se tiver uma versão de baixa qualidade
              if (img.dataset.lowSrc) {
                img.classList.add('loading');
                
                // Pré-carrega a imagem de alta qualidade
                const highResImage = new Image();
                highResImage.onload = () => {
                  img.src = img.dataset.src;
                  img.classList.remove('loading');
                  img.classList.add('loaded');
                };
                highResImage.src = img.dataset.src;
              } else {
                // Carregamento direto
                img.src = img.dataset.src;
              }
              
              // Remove os atributos data após o carregamento
              img.onload = () => {
                img.removeAttribute('data-src');
                img.removeAttribute('data-low-src');
              };
              
              // Para de observar a imagem
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: `${config.lazyLoadThreshold}px`,
        threshold: 0.01
      });
      
      // Observa todas as imagens com data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        // Não aplica lazy loading na imagem LCP
        if (!img.classList.contains('lcp-image')) {
          imageObserver.observe(img);
        }
      });
    } else {
      // Fallback para navegadores sem suporte a IntersectionObserver
      document.querySelectorAll('img[data-src]').forEach(img => {
        if (!img.classList.contains('lcp-image')) {
          img.src = img.dataset.src;
        }
      });
    }
  }
  
  /**
   * Seleciona o melhor formato de imagem com base no suporte do navegador
   * @param {string} basePath - Caminho base da imagem sem extensão
   * @param {string} originalExt - Extensão original da imagem
   * @return {string} - URL da imagem no melhor formato suportado
   */
  async function selectBestImageFormat(basePath, originalExt) {
    // Verifica suporte a formatos modernos
    const avifSupported = await supportsAvif;
    const webpSupported = await supportsWebP;
    
    // Seleciona o melhor formato
    if (avifSupported) {
      return `${basePath}.avif`;
    } else if (webpSupported) {
      return `${basePath}.webp`;
    } else {
      return `${basePath}.${originalExt}`;
    }
  }
  
  /**
   * Inicializa as otimizações de imagem
   */
  async function init() {
    // Otimiza a imagem LCP primeiro
    await optimizeLCP();
    
    // Configura carregamento progressivo para outras imagens
    setupProgressiveLoading();
    
    if (config.debugMode) {
      console.log('Suporte a AVIF:', await supportsAvif);
      console.log('Suporte a WebP:', await supportsWebP);
    }
  }
  
  // Inicia as otimizações quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expõe funções úteis globalmente
  window.imageOptimizer = {
    selectBestImageFormat,
    supportsAvif,
    supportsWebP
  };
})(); 