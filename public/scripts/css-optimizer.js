/**
 * CSS Optimizer
 * 
 * Este script otimiza o carregamento de CSS para melhorar o desempenho:
 * - Carrega CSS não crítico de forma assíncrona
 * - Implementa carregamento condicional para diferentes dispositivos
 * - Gerencia prioridades de carregamento
 */

(function() {
  // Configurações
  const config = {
    // CSS não crítico para carregar de forma assíncrona
    nonCriticalCSS: [
      { href: '/styles/animations.css', media: 'all' },
      { href: '/styles/print.css', media: 'print' }
    ],
    
    // CSS específico para dispositivos
    deviceSpecificCSS: [
      { href: '/styles/mobile.css', media: '(max-width: 768px)' },
      { href: '/styles/desktop.css', media: '(min-width: 769px)' },
      { href: '/styles/dark-mode.css', media: '(prefers-color-scheme: dark)' }
    ],
    
    // Tempo para carregar CSS não crítico após o carregamento da página
    loadDelay: 1000
  };
  
  /**
   * Carrega CSS de forma assíncrona
   * @param {string} href - URL do arquivo CSS
   * @param {string} media - Media query para o CSS
   * @param {boolean} preload - Se deve usar preload
   */
  function loadCSS(href, media = 'all', preload = false) {
    // Verifica se o CSS já foi carregado
    if (document.querySelector(`link[href="${href}"]`)) {
      return;
    }
    
    if (preload) {
      // Usa preload para carregar o CSS sem bloquear a renderização
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'style';
      preloadLink.href = href;
      preloadLink.media = media;
      
      // Adiciona o link de preload ao head
      document.head.appendChild(preloadLink);
      
      // Cria o link de stylesheet que será ativado após o preload
      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = href;
      styleLink.media = media;
      
      // Adiciona o link de stylesheet ao head
      document.head.appendChild(styleLink);
    } else {
      // Carrega o CSS diretamente
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = media;
      
      // Adiciona o link ao head
      document.head.appendChild(link);
    }
  }
  
  /**
   * Carrega CSS não crítico de forma assíncrona
   */
  function loadNonCriticalCSS() {
    // Usa requestIdleCallback para carregar CSS quando o navegador estiver ocioso
    const loadCSSFiles = () => {
      config.nonCriticalCSS.forEach(css => {
        loadCSS(css.href, css.media, true);
      });
    };
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadCSSFiles, { timeout: config.loadDelay });
    } else {
      // Fallback para setTimeout
      setTimeout(loadCSSFiles, config.loadDelay);
    }
  }
  
  /**
   * Carrega CSS específico para dispositivos
   */
  function loadDeviceSpecificCSS() {
    config.deviceSpecificCSS.forEach(css => {
      // Cria um link com media query para carregar apenas quando necessário
      loadCSS(css.href, css.media, false);
    });
  }
  
  /**
   * Inicializa as otimizações de CSS
   */
  function init() {
    // Verifica se o navegador suporta data saver mode
    const isDataSaverEnabled = navigator.connection?.saveData === true;
    
    // Carrega CSS específico para dispositivos
    loadDeviceSpecificCSS();
    
    // Não carrega CSS não crítico se o usuário estiver economizando dados
    if (!isDataSaverEnabled) {
      // Carrega CSS não crítico após o carregamento da página
      if (document.readyState === 'complete') {
        loadNonCriticalCSS();
      } else {
        window.addEventListener('load', loadNonCriticalCSS);
      }
    }
  }
  
  // Inicia as otimizações
  init();
})(); 