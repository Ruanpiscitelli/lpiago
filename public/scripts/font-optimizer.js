/**
 * Font Optimizer
 * 
 * Este script otimiza o carregamento de fontes para melhorar o desempenho:
 * - Implementa Font Loading API para controle preciso
 * - Armazena fontes em cache para carregamentos futuros
 * - Gerencia FOUT (Flash of Unstyled Text)
 * - Implementa fallbacks otimizados
 */

(function() {
  // Configurações
  const config = {
    // Fontes a serem carregadas
    fonts: [
      { family: 'Inter', weights: ['400', '600', '700'], style: 'normal' }
    ],
    
    // Tempo máximo de espera para carregamento de fontes
    timeout: 3000,
    
    // Armazenar estado de carregamento em sessionStorage
    useSessionStorage: true,
    
    // Chave para armazenamento em sessionStorage
    storageKey: 'fontsLoaded',
    
    // Classes CSS para controlar a exibição de fontes
    classes: {
      loading: 'fonts-loading',
      loaded: 'fonts-loaded',
      failed: 'fonts-failed'
    }
  };
  
  /**
   * Verifica se as fontes já foram carregadas anteriormente
   * @return {boolean} - True se as fontes já foram carregadas
   */
  function checkPreviouslyLoaded() {
    if (config.useSessionStorage && 'sessionStorage' in window) {
      try {
        return sessionStorage.getItem(config.storageKey) === 'true';
      } catch (e) {
        console.error('Erro ao acessar sessionStorage:', e);
      }
    }
    return false;
  }
  
  /**
   * Marca as fontes como carregadas
   */
  function markFontsAsLoaded() {
    document.documentElement.classList.remove(config.classes.loading);
    document.documentElement.classList.add(config.classes.loaded);
    
    if (config.useSessionStorage && 'sessionStorage' in window) {
      try {
        sessionStorage.setItem(config.storageKey, 'true');
      } catch (e) {
        console.error('Erro ao armazenar em sessionStorage:', e);
      }
    }
  }
  
  /**
   * Marca as fontes como falhas
   */
  function markFontsAsFailed() {
    document.documentElement.classList.remove(config.classes.loading);
    document.documentElement.classList.add(config.classes.failed);
  }
  
  /**
   * Carrega as fontes usando a Font Loading API
   * @return {Promise} - Promise que resolve quando todas as fontes forem carregadas
   */
  function loadFonts() {
    // Verifica se a Font Loading API está disponível
    if (!('fonts' in document)) {
      return Promise.reject(new Error('Font Loading API não suportada'));
    }
    
    // Cria um array de promessas para cada variação de fonte
    const fontPromises = [];
    
    config.fonts.forEach(font => {
      font.weights.forEach(weight => {
        // Carrega cada variação de fonte
        fontPromises.push(
          document.fonts.load(`${weight} 1em ${font.family}`, 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')
        );
      });
    });
    
    // Retorna uma promessa que resolve quando todas as fontes forem carregadas
    return Promise.all(fontPromises);
  }
  
  /**
   * Inicializa o carregamento de fontes
   */
  function init() {
    // Adiciona classe de carregamento
    document.documentElement.classList.add(config.classes.loading);
    
    // Verifica se as fontes já foram carregadas anteriormente
    if (checkPreviouslyLoaded()) {
      markFontsAsLoaded();
      return;
    }
    
    // Cria um timeout para garantir que as fontes sejam exibidas mesmo se o carregamento falhar
    const timeoutId = setTimeout(() => {
      markFontsAsFailed();
    }, config.timeout);
    
    // Carrega as fontes
    loadFonts()
      .then(() => {
        clearTimeout(timeoutId);
        markFontsAsLoaded();
      })
      .catch(error => {
        console.error('Erro ao carregar fontes:', error);
        clearTimeout(timeoutId);
        markFontsAsFailed();
      });
  }
  
  // Inicia o carregamento de fontes
  init();
})(); 