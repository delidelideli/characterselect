document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('characterGrid');
    const slots = document.querySelectorAll('.character-slot');
    const confirmBtn = document.getElementById('confirmSelection');
    const backBtn = document.getElementById('backBtn');
    const ashContainer = document.getElementById('ashContainer');
    let selectedIndex = null;
    let typewriterTimeout = null;

    // Helper to update grid columns
    const updateGridColumns = (focusIndex, type = 'hover') => {
        // If a class is selected (click), hover should not override the layout
        if (selectedIndex !== null && type === 'hover') return;

        let columns = [];
        const count = slots.length;
        
        if (focusIndex === null) {
            // Default: equal distribution
            columns = Array(count).fill('1fr');
        } else if (type === 'click') {
            // Click: Selected takes 80%, others shrink to 5%
            for (let i = 0; i < count; i++) {
                columns.push(i === focusIndex ? '80%' : '5%');
            }
        } else {
            // Hover: Focus takes 1.5fr, others shrink slightly to 0.875fr
            for (let i = 0; i < count; i++) {
                columns.push(i === focusIndex ? '1.5fr' : '0.875fr');
            }
        }
        grid.style.gridTemplateColumns = columns.join(' ');
    };

    slots.forEach((slot, index) => {
        // Hover Logic
        slot.addEventListener('mouseenter', () => updateGridColumns(index, 'hover'));
        slot.addEventListener('mouseleave', () => updateGridColumns(null, 'hover'));

        // Weighty Click Logic
        slot.addEventListener('click', () => {
            if (selectedIndex === index) return;
            
            selectedIndex = index;
            
            slots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
            
            updateGridColumns(index, 'click');
            
            // Show buttons
            confirmBtn.classList.add('visible');
            backBtn.classList.add('visible');

            // Trigger lore typewriter
            const loreElement = slot.querySelector('.lore-text');
            if (loreElement) {
                typewriterLore(loreElement);
            }
        });
    });

    backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedIndex = null;
        slots.forEach(s => s.classList.remove('active'));
        updateGridColumns(null, 'hover');
        confirmBtn.classList.remove('visible');
        backBtn.classList.remove('visible');
        
        // Clear typewriter
        if (typewriterTimeout) clearTimeout(typewriterTimeout);
        document.querySelectorAll('.lore-text').forEach(el => el.textContent = '');
    });

    function typewriterLore(element) {
        const text = element.getAttribute('data-lore');
        if (!text) return;

        if (typewriterTimeout) clearTimeout(typewriterTimeout);
        element.textContent = '';
        let i = 0;

        const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚻᚼᚽᚾᚿᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟ';

        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === ' ') {
                    element.textContent += ' ';
                    i++;
                    typewriterTimeout = setTimeout(type, 8);
                } else {
                    const rune = runes[Math.floor(Math.random() * runes.length)];
                    const span = document.createElement('span');
                    span.textContent = rune;
                    span.style.color = 'var(--accent)';
                    element.appendChild(span);

                    typewriterTimeout = setTimeout(() => {
                        span.textContent = char;
                        span.style.color = 'inherit';
                        i++;
                        typewriterTimeout = setTimeout(type, 8);
                    }, 15);
                }
            }
        }
        type();
    }

    confirmBtn.addEventListener('click', () => {
        if (selectedIndex !== null) {
            const className = slots[selectedIndex].getAttribute('data-class');
            const deathPopup = document.getElementById('deathPopup');
            const chosenClassText = document.getElementById('chosenClassText');
            
            chosenClassText.textContent = `THE PATH OF THE ${className.toUpperCase()} HAS BEEN CHOSEN`;
            deathPopup.classList.add('show');

            setTimeout(() => {
                deathPopup.classList.remove('show');
            }, 5000);
        }
    });

    createAsh();
    createEmbers();
});

function createAsh() {
    const container = document.getElementById('ashContainer');
    if (!container) return;
    
    const count = 40;
    for (let i = 0; i < count; i++) {
        const ash = document.createElement('div');
        ash.className = 'ash';
        
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;

        ash.style.width = `${size}px`;
        ash.style.height = `${size}px`;
        ash.style.left = `${left}vw`;
        ash.style.bottom = `-20px`;
        ash.style.setProperty('--duration', `${duration}s`);
        ash.style.animationDelay = `${delay}s`;
        
        container.appendChild(ash);
    }
}

function createEmbers() {
    const container = document.getElementById('ashContainer');
    if (!container) return;
    
    const count = 60;
    for (let i = 0; i < count; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember-particle';
        
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 3 + 4;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;

        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.left = `${left}vw`;
        ember.style.bottom = `-20px`;
        ember.style.setProperty('--duration', `${duration}s`);
        ember.style.animationDelay = `${delay}s`;
        
        // Vary colors for "Estus" feel
        const colors = ['#ff4500', '#f59e0b', '#ff8c00', '#ff0000', '#ffd700', '#ffffff'];
        ember.style.color = colors[Math.floor(Math.random() * colors.length)];
        ember.style.backgroundColor = 'currentColor';
        
        container.appendChild(ember);
    }
}
