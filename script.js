// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    // Add your Firebase config here
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase (uncomment when you have Firebase config)
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});

// Smooth scroll to calculator
function scrollToCalculator() {
    document.getElementById('calculator').scrollIntoView({
        behavior: 'smooth'
    });
}

// Sensitivity calculation logic
function calcularSensibilidade() {
    const form = document.getElementById('sensitivityForm');
    const formData = new FormData(form);
    
    const nickname = formData.get('nickname');
    const game = formData.get('game');
    const device = formData.get('device');
    const role = formData.get('role');
    const aimStyle = formData.get('aimStyle');
    
    // Validate form
    if (!nickname || !game || !device || !role || !aimStyle) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    let sensitivity;
    
    if (game === 'PUBG') {
        sensitivity = calcularSensibilidadePUBG(device, role, aimStyle);
    } else if (game === 'FreeFire') {
        sensitivity = calcularSensibilidadeFreeFire(device, role, aimStyle);
    }
    
    // Display results
    displayResults(sensitivity);
    
    // Store current configuration for saving
    window.currentConfig = {
        nickname,
        game,
        device,
        role,
        aimStyle,
        sensitivity,
        timestamp: new Date().toLocaleString('pt-BR')
    };
}

function calcularSensibilidadePUBG(nivel, funcao, mira) {
    let geral = 0, redDot = 0, mira2x = 0, mira4x = 0, awm = 0;

    // Baseado no nível do celular
    if (nivel === "Fraco") {
        geral += 70;
        redDot += 80;
        mira2x += 60;
        mira4x += 50;
        awm += 20;
    } else if (nivel === "Médio") {
        geral += 60;
        redDot += 70;
        mira2x += 65;
        mira4x += 60;
        awm += 30;
    } else if (nivel === "Forte") {
        geral += 50;
        redDot += 60;
        mira2x += 70;
        mira4x += 70;
        awm += 40;
    }

    // Ajustes por função no time
    if (funcao === "Rush") geral += 10;
    if (funcao === "AWM") awm += 30;
    if (funcao === "Suporte") mira2x += 10;

    // Ajustes por estilo de mira
    if (mira === "Rápida") {
        geral += 10;
        redDot += 10;
    } else if (mira === "Precisa") {
        mira4x += 10;
        mira2x += 10;
    }

    return {
        geral: Math.min(100, geral),
        redDot: Math.min(100, redDot),
        mira2x: Math.min(100, mira2x),
        mira4x: Math.min(100, mira4x),
        awm: Math.min(100, awm),
    };
}

function calcularSensibilidadeFreeFire(nivel, funcao, mira) {
    let geral = 0, redDot = 0, mira2x = 0, mira4x = 0, awm = 0;

    // Free Fire tem configurações ligeiramente diferentes
    if (nivel === "Fraco") {
        geral += 75;
        redDot += 85;
        mira2x += 65;
        mira4x += 55;
        awm += 25;
    } else if (nivel === "Médio") {
        geral += 65;
        redDot += 75;
        mira2x += 70;
        mira4x += 65;
        awm += 35;
    } else if (nivel === "Forte") {
        geral += 55;
        redDot += 65;
        mira2x += 75;
        mira4x += 75;
        awm += 45;
    }

    // Ajustes por função no time (Free Fire)
    if (funcao === "Rush") {
        geral += 15;
        redDot += 5;
    }
    if (funcao === "AWM") {
        awm += 25;
        mira4x += 5;
    }
    if (funcao === "Suporte") {
        mira2x += 15;
        mira4x += 5;
    }

    // Ajustes por estilo de mira (Free Fire)
    if (mira === "Rápida") {
        geral += 15;
        redDot += 15;
        mira2x += 5;
    } else if (mira === "Precisa") {
        mira4x += 15;
        mira2x += 15;
        awm += 10;
    }

    return {
        geral: Math.min(100, geral),
        redDot: Math.min(100, redDot),
        mira2x: Math.min(100, mira2x),
        mira4x: Math.min(100, mira4x),
        awm: Math.min(100, awm),
    };
}

function displayResults(sensitivity) {
    document.getElementById('generalSens').textContent = sensitivity.geral;
    document.getElementById('redDotSens').textContent = sensitivity.redDot;
    document.getElementById('aim2xSens').textContent = sensitivity.mira2x;
    document.getElementById('aim4xSens').textContent = sensitivity.mira4x;
    document.getElementById('awmSens').textContent = sensitivity.awm;
    
    document.getElementById('results').style.display = 'block';
    
    // Smooth scroll to results
    document.getElementById('results').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

// Save configuration
async function salvarConfiguracao() {
    if (!window.currentConfig) {
        alert('Calcule a sensibilidade primeiro!');
        return;
    }
    
    const saveBtn = document.querySelector('.save-btn');
    const saveStatus = document.getElementById('saveStatus');
    
    saveBtn.disabled = true;
    saveBtn.textContent = 'Salvando...';
    
    try {
        // For now, save to localStorage (replace with Firebase when configured)
        const savedConfigs = JSON.parse(localStorage.getItem('soberanos-configs') || '[]');
        
        // Generate unique ID
        const configId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
        const configToSave = {
            id: configId,
            ...window.currentConfig
        };
        
        savedConfigs.push(configToSave);
        localStorage.setItem('soberanos-configs', JSON.stringify(savedConfigs));
        
        // Uncomment when Firebase is configured
        // await addDoc(collection(db, 'sensitivity-configs'), window.currentConfig);
        
        saveStatus.textContent = 'Configuração salva com sucesso!';
        saveStatus.className = 'save-status success';
        
        // Load and display saved configs
        loadSavedConfigs();
        
    } catch (error) {
        console.error('Erro ao salvar:', error);
        saveStatus.textContent = 'Erro ao salvar configuração. Tente novamente.';
        saveStatus.className = 'save-status error';
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = '💾 Salvar na Cloud';
        
        // Clear status after 3 seconds
        setTimeout(() => {
            saveStatus.textContent = '';
            saveStatus.className = 'save-status';
        }, 3000);
    }
}

// Load saved configurations
function loadSavedConfigs() {
    try {
        // For now, load from localStorage (replace with Firebase when configured)
        const savedConfigs = JSON.parse(localStorage.getItem('soberanos-configs') || '[]');
        
        if (savedConfigs.length > 0) {
            displaySavedConfigs(savedConfigs.reverse()); // Show newest first
        }
        
        // Uncomment when Firebase is configured
        // const q = query(collection(db, 'sensitivity-configs'), orderBy('timestamp', 'desc'));
        // const querySnapshot = await getDocs(q);
        // const configs = [];
        // querySnapshot.forEach((doc) => {
        //     configs.push({ id: doc.id, ...doc.data() });
        // });
        // displaySavedConfigs(configs);
        
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
    }
}

function displaySavedConfigs(configs) {
    const configsList = document.getElementById('configsList');
    const savedConfigsSection = document.getElementById('savedConfigs');
    
    if (configs.length === 0) {
        savedConfigsSection.style.display = 'none';
        return;
    }
    
    configsList.innerHTML = '';
    
    configs.forEach(config => {
        const configElement = document.createElement('div');
        configElement.className = 'config-item';
        configElement.innerHTML = `
            <div class="config-header">
                <span class="config-nickname">${config.nickname}</span>
                <span class="config-timestamp">${config.timestamp}</span>
            </div>
            <div class="config-details">
                <div class="config-detail"><strong>Jogo:</strong> ${config.game}</div>
                <div class="config-detail"><strong>Dispositivo:</strong> ${config.device}</div>
                <div class="config-detail"><strong>Função:</strong> ${config.role}</div>
                <div class="config-detail"><strong>Estilo:</strong> ${config.aimStyle}</div>
            </div>
            <div class="config-sensitivities">
                <div class="config-sens">
                    <span class="config-sens-label">Geral</span>
                    <span class="config-sens-value">${config.sensitivity.geral}</span>
                </div>
                <div class="config-sens">
                    <span class="config-sens-label">Red Dot</span>
                    <span class="config-sens-value">${config.sensitivity.redDot}</span>
                </div>
                <div class="config-sens">
                    <span class="config-sens-label">2x</span>
                    <span class="config-sens-value">${config.sensitivity.mira2x}</span>
                </div>
                <div class="config-sens">
                    <span class="config-sens-label">4x</span>
                    <span class="config-sens-value">${config.sensitivity.mira4x}</span>
                </div>
                <div class="config-sens">
                    <span class="config-sens-label">AWM</span>
                    <span class="config-sens-value">${config.sensitivity.awm}</span>
                </div>
            </div>
        `;
        configsList.appendChild(configElement);
    });
    
    savedConfigsSection.style.display = 'block';
}

// Load saved configs on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedConfigs();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        document.getElementById('menu').classList.remove('active');
    });
});