document.addEventListener('DOMContentLoaded', function () {
    const resultDisplay = document.getElementById('result');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '';
    let lastChar = '';

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');
            handleInput(value);
        });
    });

    document.addEventListener('keydown', (e) => {
        const keyMap = {
            '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
            '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
            '.': '.', '/': '/', '*': '*', '-': '-', '+': '+',
            'Enter': '=', 'Backspace': 'Backspace', 'c': 'C'
        };
        if (keyMap.hasOwnProperty(e.key)) {
            if (e.key === 'Enter') e.preventDefault(); // Prevent form submission on Enter
            handleInput(keyMap[e.key]);
        }
    });

    function handleInput(value) {
        if (value === 'C') {
            currentInput = '';
        } else if (value === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
        } else if (value === '=') {
            try {
                currentInput = eval(currentInput).toString();
            } catch {
                currentInput = 'Error';
            }
        } else {
            // Prevent multiple decimals in a number
            if (value === '.') {
                if (!lastChar.includes('.')) {
                    currentInput += value;
                }
            } else {
                currentInput += value;
            }
        }
        
        // Update the display and track the last character
        lastChar = currentInput.slice(-1);  
        resultDisplay.value = currentInput;
    }
});
