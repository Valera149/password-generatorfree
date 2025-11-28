// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Элементы DOM
const elements = {
    lengthSlider: document.getElementById('length'),
    lengthValue: document.getElementById('length-value'),
    uppercase: document.getElementById('uppercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols'),
    generateBtn: document.getElementById('generate-btn'),
    passwordDisplay: document.getElementById('password'),
    copyBtn: document.getElementById('copy-btn'),
    strengthMeter: document.getElementById('strength-meter'),
    saveBtn: document.getElementById('save-btn'),
    historyBtn: document.getElementById('history-btn')
};

// Наборы символов
const charSets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Инициализация
function init() {
    updateLengthValue();
    generatePassword();
    
    // События
    elements.lengthSlider.addEventListener('input', updateLengthValue);
    elements.generateBtn.addEventListener('click', generatePassword);
    elements.copyBtn.addEventListener('click', copyPassword);
    elements.saveBtn.addEventListener('click', savePassword);
    elements.historyBtn.addEventListener('click', showHistory);
    
    // Обновляем пароль при изменении настроек
    [elements.uppercase, elements.numbers, elements.symbols].forEach(checkbox => {
        checkbox.addEventListener('change', generatePassword);
    });
}

// Обновление отображения длины
function updateLengthValue() {
    elements.lengthValue.textContent = elements.lengthSlider.value;
}

// Генерация пароля
function generatePassword() {
    const length = parseInt(elements.lengthSlider.value);
    const includeUppercase = elements.uppercase.checked;
    const includeNumbers = elements.numbers.checked;
    const includeSymbols = elements.symbols.checked;
    
    let charset = charSets.lowercase;
    
    if (includeUppercase) charset += charSets.uppercase;
    if (includeNumbers) charset += charSets.numbers;
    if (includeSymbols) charset += charSets.symbols;
    
    // Проверка, что хотя бы один чекбокс выбран
    if (charset === charSets.lowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        elements.uppercase.checked = true;
        charset += charSets.uppercase;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    elements.passwordDisplay.textContent = password;
    updateStrengthMeter(password);
}

// Копирование пароля в буфер обмена
function copyPassword() {
    const password = elements.passwordDisplay.textContent;
    navigator.clipboard.writeText(password).then(() => {
        showNotification('Пароль скопирован!');
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Показать уведомление
function showNotification(message) {
    tg.showPopup({
        title: 'Уведомление',
        message: message,
        buttons: [{ type: 'ok' }]
    });
}

// Оценка сложности пароля
function updateStrengthMeter(password) {
    let strength = 0;
    
    // Длина
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (password.length >= 16) strength++;
    
    // Разнообразие символов
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Обновление UI
    const strengthBar = elements.strengthMeter.querySelector('.strength-bar');
    const strengthText = elements.strengthMeter.querySelector('.strength-text');
    
    elements.strengthMeter.className = 'strength-meter';
    
    if (strength <= 2) {
        elements.strengthMeter.classList.add('strength-weak');
        strengthText.textContent = 'Сложность: Слабый';
    } else if (strength <= 4) {
        elements.strengthMeter.classList.add('strength-medium');
        strengthText.textContent = 'Сложность: Средний';
    } else if (strength <= 6) {
        elements.strengthMeter.classList.add('strength-strong');
        strengthText.textContent = 'Сложность: Сильный';
    } else {
        elements.strengthMeter.classList.add('strength-very-strong');
        strengthText.textContent = 'Сложность: Очень сильный';
    }
}

// Сохранение пароля (заглушка)
function savePassword() {
    const password = elements.passwordDisplay.textContent;
    tg.showPopup({
        title: 'Сохранение',
        message: 'Функция сохранения в разработке',
        buttons: [{ type: 'ok' }]
    });
}

// Показать историю (заглушка)
function showHistory() {
    tg.showPopup({
        title: 'История',
        message: 'Функция истории в разработке',
        buttons: [{ type: 'ok' }]
    });
}

// Запуск приложения
init();