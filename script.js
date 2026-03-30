document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('characterGrid');
    const slots = document.querySelectorAll('.character-slot');
    const confirmBtn = document.getElementById('confirmSelection');
    const ashContainer = document.getElementById('ashContainer');
    let selectedIndex = null;

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
            // If already selected, maybe toggle back? For now, just re-select
            selectedIndex = index;
            
            slots.forEach(s => s.classList.remove('active'));
            slot.classList.add('active');
            
            updateGridColumns(index, 'click');
            
            // Show confirm button
            confirmBtn.classList.add('visible');
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
            }, 5000);
        }
    });

    createAsh();
});

function createAsh() {
    const container = document.getElementById('ashContainer');
    if (!container) return;
    
    const count = 60;
    for (let i = 0; i < count; i++) {
        const ash = document.createElement('div');
        ash.className = 'ash';
        
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 5 + 5;
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
