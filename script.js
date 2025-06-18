// Supabase configuration
const supabaseUrl = 'https://finigacjcwrrypcgooyf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpbmlnYWNqY3dycnlwY2dvb3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTM5NTksImV4cCI6MjA2NTU2OTk1OX0.CLS27MiQeGSHRQiA0vJu5zUFJO4-sA3JPEIB-dd5pFM';

// Initialize Supabase client
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Test Supabase connection
async function testSupabaseConnection() {
    try {
        const { data, error } = await supabase.from('sensitivity_configs').select('count').limit(1);
        if (error) {
            console.error('Supabase connection error:', error);
            return false;
        }
        console.log('Supabase connected successfully');
        return true;
    } catch (error) {
        console.error('Supabase connection failed:', error);
        return false;
    }
}

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

// Save configuration to Supabase
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
        console.log('Tentando salvar configuração:', window.currentConfig);
        
        const configData = {
            nickname: window.currentConfig.nickname,
            game: window.currentConfig.game,
            device: window.currentConfig.device,
            role: window.currentConfig.role,
            aim_style: window.currentConfig.aimStyle,
            sensitivity_general: parseInt(window.currentConfig.sensitivity.geral),
            sensitivity_red_dot: parseInt(window.currentConfig.sensitivity.redDot),
            sensitivity_2x: parseInt(window.currentConfig.sensitivity.mira2x),
            sensitivity_4x: parseInt(window.currentConfig.sensitivity.mira4x),
            sensitivity_awm: parseInt(window.currentConfig.sensitivity.awm)
        };
        
        console.log('Dados para salvar:', configData);
        
        const { data, error } = await supabase
            .from('sensitivity_configs')
            .insert([configData])
            .select();

        if (error) {
            console.error('Erro do Supabase:', error);
            throw error;
        }
        
        console.log('Configuração salva com sucesso:', data);
        saveStatus.textContent = 'Configuração salva com sucesso na cloud!';
        saveStatus.className = 'save-status success';
        
        // Load and display saved configs
        await loadSavedConfigs();
        
    } catch (error) {
        console.error('Erro ao salvar:', error);
        
        // Fallback to localStorage
        try {
            const savedConfigs = JSON.parse(localStorage.getItem('soberanos-configs') || '[]');
            const configId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
            const configToSave = {
                id: configId,
                ...window.currentConfig
            };
            savedConfigs.push(configToSave);
            localStorage.setItem('soberanos-configs', JSON.stringify(savedConfigs));
            
            saveStatus.textContent = 'Salvo localmente (erro na cloud: ' + error.message + ')';
            saveStatus.className = 'save-status success';
            
            await loadSavedConfigs();
        } catch (localError) {
            saveStatus.textContent = 'Erro ao salvar: ' + error.message;
            saveStatus.className = 'save-status error';
        }
    } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = '💾 Salvar na Cloud';
        
        // Clear status after 5 seconds
        setTimeout(() => {
            saveStatus.textContent = '';
            saveStatus.className = 'save-status';
        }, 5000);
    }
}

// Load saved configurations from Supabase
async function loadSavedConfigs() {
    try {
        console.log('Carregando configurações salvas...');
        
        const { data: configs, error } = await supabase
            .from('sensitivity_configs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10); // Show last 10 configurations

        if (error) {
            console.error('Erro ao carregar do Supabase:', error);
            throw error;
        }
        
        console.log('Configurações carregadas:', configs);
        
        if (configs && configs.length > 0) {
            displaySavedConfigs(configs);
        }
        
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        // Fallback to localStorage if Supabase fails
        const savedConfigs = JSON.parse(localStorage.getItem('soberanos-configs') || '[]');
        if (savedConfigs.length > 0) {
            displaySavedConfigs(savedConfigs.reverse());
        }
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
        
        // Handle both Supabase format and localStorage format
        const sensitivity = config.sensitivity || {
            geral: config.sensitivity_general,
            redDot: config.sensitivity_red_dot,
            mira2x: config.sensitivity_2x,
            mira4x: config.sensitivity_4x,
            awm: config.sensitivity_awm
        };
        
        const timestamp = config.created_at ? 
            new Date(config.created_at).toLocaleString('pt-BR') : 
            config.timestamp;
            
        const aimStyle = config.aim_style || config.aimStyle;
        
        configElement.innerHTML = `
            <div class="config-header">
                <span class="config-nickname">${config.nickname}</span>
                <span class="config-timestamp">${timestamp}</span>
            </div>
            <div class="config-details">
                <div class="config-detail"><strong>Jogo:</strong> ${config.game}</div>
                <div class="config-detail"><strong>Dispositivo:</strong> ${config.device}</div>
                <div class="config-detail"><strong>Função:</strong> ${config.role}</div>
                <div class="config-detail"><strong>Estilo:</strong> ${aimStyle}</div>
            </div>
            <div class="config-sensitivities">
                <div class="config-sens">
                    <span class="config-sens-label">Geral</span>
                    <span class="config-sens-value">${sensitivity.geral}</span>
                </div>
                <div class="config-sens">
                    <span class="config-sens-label">Red Dot</span>
                    <span class="config-sens-value">${sensitivity.redDot}</span>
                </div>
                <div class="config-sens">
                    <span class="config-sens-label">2x</span>
                    <span class="config-sens-value">${sensitivity.mira2x}</span>
                </div>
                <div class="config-sens">
                    <span class="config-sens-label">4x</span>
                    <span class="config-sens-value">${sensitivity.mira4x}</span>
                </div>
                <div class="config-sens">
                    <span class="config-sens-label">AWM</span>
                    <span class="config-sens-value">${sensitivity.awm}</span>
                </div>
            </div>
        `;
        configsList.appendChild(configElement);
    });
    
    savedConfigsSection.style.display = 'block';
}

// Load saved configs on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Página carregada, testando conexão Supabase...');
    const connected = await testSupabaseConnection();
    if (connected) {
        await loadSavedConfigs();
    } else {
        console.log('Usando localStorage como fallback');
        const savedConfigs = JSON.parse(localStorage.getItem('soberanos-configs') || '[]');
        if (savedConfigs.length > 0) {
            displaySavedConfigs(savedConfigs.reverse());
        }
    }
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