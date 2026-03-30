document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('characterGrid');
    const slots = document.querySelectorAll('.character-slot');
    const confirmBtn = document.getElementById('confirmSelection');
    const smokeContainer = document.getElementById('smokeContainer');
    let selectedIndex = null;

    // Helper to update grid columns
    const updateGridColumns = (focusIndex, type = 'hover') => {
        if (selectedIndex !== null && type === 'hover') return; // Don't override click selection with hover

        let columns = [];
        const count = slots.length;
        
        if (focusIndex === null) {
            // Default: equal distribution
            columns = Array(count).fill('1fr');
        } else if (type === 'click') {
            // Click: 80% for selected, 5% for others
            for (let i = 0; i < count; i++) {
                columns.push(i === focusIndex ? '80%' : '5%');
            }
        } else {
            // Hover: Expanded focus (e.g., 2fr for hover, 1fr for others)
            for (let i = 0; i < count; i++) {
                columns.push(i === focusIndex ? '1.5fr' : '0.875fr');
            }
        }
        grid.style.gridTemplateColumns = columns.join(' ');
    };

    slots.forEach((slot, index) => {
        // Hover Expansion
        slot.addEventListener('mouseenter', () => updateGridColumns(index, 'hover'));
        slot.addEventListener('mouseleave', () => updateGridColumns(null, 'hover'));

        // Weighty Click
        slot.addEventListener('click', () => {
            selectedIndex = index;
            slots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
            
            updateGridColumns(index, 'click');
            
            confirmBtn.style.opacity = '1';
            confirmBtn.style.pointerEvents = 'all';
            confirmBtn.style.transform = 'translateY(0)';
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedIndex !== null) {
            const className = slots[selectedIndex].getAttribute('data-class');
            const deathPopup = document.getElementById('deathPopup');
            const chosenClassText = document.getElementById('chosenClassText');
            
            chosenClassText.textContent = `THE PATH OF THE ${className.toUpperCase()} HAS BEEN CHOSEN`;
            deathPopup.classList.add('show');

            setTimeout(() => {
                deathPopup.classList.remove('show');
            }, 6000);
        }
    });

    createEmbers();
    createSmoke();
});

function createEmbers() {
    const container = document.getElementById('smokeContainer');
    for (let i = 0; i < 50; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        const size = Math.random() * 3 + 1;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.left = `${Math.random() * 100}vw`;
        ember.style.bottom = `-20px`;
        ember.style.setProperty('--duration', `${Math.random() * 4 + 4}s`);
        ember.style.animationDelay = `${Math.random() * 8}s`;
        container.appendChild(ember);
    }
}

function createSmoke() {
    const container = document.getElementById('smokeContainer');
    for (let i = 0; i < 15; i++) {
        const puff = document.createElement('div');
        puff.className = 'smoke-puff';
        const size = Math.random() * 300 + 200;
        puff.style.width = `${size}px`;
        puff.style.height = `${size}px`;
        puff.style.left = `${Math.random() * 100 - 10}vw`;
        puff.style.bottom = `${Math.random() * 20 - 10}vh`;
        puff.style.setProperty('--duration', `${Math.random() * 10 + 10}s`);
        puff.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(puff);
    }
}
