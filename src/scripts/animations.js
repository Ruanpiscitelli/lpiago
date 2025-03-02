/**
 * Animações otimizadas para o site Aviator
 * Carregado apenas quando o navegador estiver ocioso
 * e se o dispositivo tiver recursos suficientes
 */

// Configurações de animação
const ANIMATION_CONFIG = {
  diceCount: 8,          // Quantidade de dados na tela
  minSize: 40,           // Tamanho mínimo dos dados (px)
  maxSize: 80,           // Tamanho máximo dos dados (px)
  minSpeed: 4,           // Velocidade mínima de rotação (segundos)
  maxSpeed: 10,          // Velocidade máxima de rotação (segundos)
  minDuration: 15,       // Duração mínima da animação (segundos)
  maxDuration: 30,       // Duração máxima da animação (segundos)
  container: 'dice-container', // ID do container para os dados
  mobileLimit: 4,        // Limite de dados em dispositivos móveis
};

// Otimização: use requestAnimationFrame para animações suaves
let animationFrameId = null;

// Criador de elementos com cache de DOM para performance
const createElement = (tag, className, parent) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (parent) parent.appendChild(element);
  return element;
};

// Inicializa animações quando o DOM estiver pronto e o navegador ocioso
const init = () => {
  // Referência ao container dos dados
  const container = document.getElementById(ANIMATION_CONFIG.container);
  if (!container) return;
  
  // Determina quantidade de dados baseado no dispositivo
  const isMobile = window.innerWidth < 768;
  const diceCount = isMobile ? 
    Math.min(ANIMATION_CONFIG.diceCount, ANIMATION_CONFIG.mobileLimit) : 
    ANIMATION_CONFIG.diceCount;
  
  // Limpa animações anteriores
  cleanup();
  
  // Cria novos dados
  for (let i = 0; i < diceCount; i++) {
    createDice(container);
  }
  
  // Aplica animações de fade-in suaves
  const dices = document.querySelectorAll('.dice');
  dices.forEach((dice, index) => {
    setTimeout(() => {
      dice.style.opacity = '0.7';
    }, index * 100);
  });
};

// Criar um dado com posição e animação aleatória
const createDice = (container) => {
  // Cria elemento principal do dado
  const dice = createElement('div', 'dice', container);
  
  // Define tamanho aleatório
  const size = Math.floor(Math.random() * 
    (ANIMATION_CONFIG.maxSize - ANIMATION_CONFIG.minSize) + 
    ANIMATION_CONFIG.minSize);
  
  // Posiciona aleatoriamente no container
  const xPos = Math.random() * 100;
  const yPos = Math.random() * 100;
  
  // Aplica estilos com will-change para otimização
  dice.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${xPos}%;
    top: ${yPos}%;
    opacity: 0;
    transition: opacity 0.5s ease;
  `;
  
  // Cria o cubo do dado
  const cube = createElement('div', 'cube', dice);
  
  // Define velocidade aleatória para rotação
  const speed = Math.random() * 
    (ANIMATION_CONFIG.maxSpeed - ANIMATION_CONFIG.minSpeed) + 
    ANIMATION_CONFIG.minSpeed;
  
  cube.style.animation = `rotate ${speed}s infinite linear`;
  
  // Cria as faces do dado
  createFaces(cube);
  
  // Define duração aleatória para o dado permanecer na tela
  const duration = Math.random() * 
    (ANIMATION_CONFIG.maxDuration - ANIMATION_CONFIG.minDuration) + 
    ANIMATION_CONFIG.minDuration;
  
  // Remove o dado após a duração
  setTimeout(() => {
    if (dice && dice.parentNode) {
      dice.style.opacity = '0';
      setTimeout(() => {
        if (dice && dice.parentNode) {
          dice.parentNode.removeChild(dice);
          // Cria um novo dado para substituir
          if (document.getElementById(ANIMATION_CONFIG.container)) {
            createDice(document.getElementById(ANIMATION_CONFIG.container));
          }
        }
      }, 500);
    }
  }, duration * 1000);
};

// Cria as faces do dado com os pontos
const createFaces = (cube) => {
  // Classes CSS para as faces
  const faces = ['one', 'two', 'three', 'four', 'five', 'six'];
  
  // Posições das faces no cubo 3D
  const positions = [
    'rotateY(0deg)',
    'rotateY(90deg)',
    'rotateY(180deg)',
    'rotateY(270deg)',
    'rotateX(90deg)',
    'rotateX(-90deg)'
  ];
  
  // Cria cada face
  faces.forEach((faceClass, index) => {
    const face = createElement('div', `face ${faceClass}`, cube);
    face.style.transform = `${positions[index]} translateZ(40px)`;
    
    // Adiciona pontos conforme o número da face
    const dotsCount = index + 1;
    for (let i = 0; i < dotsCount; i++) {
      createElement('div', 'dot', face);
    }
  });
};

// Limpa quaisquer animações em execução
const cleanup = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  
  // Remove todos os dados existentes
  const container = document.getElementById(ANIMATION_CONFIG.container);
  if (container) {
    const dices = container.querySelectorAll('.dice');
    dices.forEach(dice => {
      dice.parentNode.removeChild(dice);
    });
  }
};

// Inicia a animação
init();

// Reinicia animação quando a janela é redimensionada
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    init();
  }, 200);
});

// Exporta funções para uso externo
export { init, cleanup }; 