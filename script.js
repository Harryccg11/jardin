const romanticMessages = [
    "Eres la luz que ilumina mis días más oscuros ✨",
    "Tu sonrisa es mi lugar favorito en todo el mundo 😊", 
    "Contigo, cada momento se vuelve mágico 💫",
    "Eres mi razón para sonreír cada mañana ☀️",
    "Tu amor es el regalo más hermoso que he recibido 🎁",
    "Eres mi estrella más brillante en el cielo 🌟",
    "Contigo descubrí lo que significa amar de verdad 💕",
    "Eres mi hogar, mi paz, mi felicidad 🏡",
    "Tu risa es la melodía más dulce que existe 🎵",
    "Eres perfecta tal como eres, mi amor 💖"
];

const icons = ['💖', '⭐', '🌸', '✨'];

let gameElements = [];
let discoveredCount = 0;
let sparkleInterval;

// Inicializar el juego
function initGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '';
    gameElements = [];
    discoveredCount = 0;
    updateCounter();
    
    // Crear elementos del juego
    for (let i = 0; i < 10; i++) {
        const element = {
            id: i,
            icon: icons[i % icons.length],
            position: {
                x: Math.random() * 80 + 10,
                y: Math.random() * 70 + 15
            },
            discovered: false,
            message: romanticMessages[i] || "Eres increíble ❤️"
        };
        
        gameElements.push(element);
        
        // Crear elemento DOM
        const button = document.createElement('button');
        button.className = 'game-element';
        button.innerHTML = element.icon;
        button.style.left = `${element.position.x}%`;
        button.style.top = `${element.position.y}%`;
        button.onclick = () => handleElementClick(i);
        button.id = `element-${i}`;
        
        gameArea.appendChild(button);
    }
}

// Manejar clic en elemento
function handleElementClick(elementId) {
    const element = gameElements[elementId];
    const elementDOM = document.getElementById(`element-${elementId}`);
    
    if (!element.discovered) {
        element.discovered = true;
        elementDOM.classList.add('discovered');
        
        showMessage(element.message);
        discoveredCount++;
        updateCounter();
        
        if (discoveredCount === 10) {
            setTimeout(showCompletionModal, 2000);
        }
    }
}

// Mostrar mensaje
function showMessage(message) {
    const messageCard = document.getElementById('message-card');
    const currentMessage = document.getElementById('current-message');
    
    currentMessage.textContent = message;
    messageCard.classList.remove('hidden');
    
    setTimeout(() => {
        messageCard.classList.add('hidden');
    }, 4000);
}

// Actualizar contador
function updateCounter() {
    document.getElementById('counter').textContent = discoveredCount;
}

// Mostrar modal de completado
function showCompletionModal() {
    document.getElementById('completion-modal').classList.remove('hidden');
}

// Reiniciar juego
function resetGame() {
    document.getElementById('completion-modal').classList.add('hidden');
    initGame();
}

// Crear sparkles de fondo
function createSparkles() {
    const container = document.getElementById('sparkles-container');
    
    sparkleInterval = setInterval(() => {
        // Limpiar sparkles antiguos
        const oldSparkles = container.querySelectorAll('.sparkle');
        if (oldSparkles.length > 3) {
            oldSparkles[0].remove();
        }
        
        // Crear nuevo sparkle
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(sparkle);
        
        // Remover después de la animación
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 3000);
    }, 2000);
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    createSparkles();
    
    // Event listener para el botón de reset
    document.getElementById('reset-button').onclick = resetGame;
});
