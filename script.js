document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('characterGrid');
    const slots = document.querySelectorAll('.character-slot');
    const confirmBtn = document.getElementById('confirmSelection');
    const smokeContainer = document.getElementById('smokeContainer');
    let selectedIndex = null;

    slots.forEach((slot, index) => {
        slot.addEventListener('click', () => {
            selectedIndex = index;
            
            // Remove active class from all slots
            slots.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked slot
            slot.classList.add('active');
            
            // Apply the "Weighty Click" layout (80% for selected, 5% for others)
            // We use a 12-column approach or just percentages in grid-template-columns
            let templateColumns = [];
            for (let i = 0; i < slots.length; i++) {
                if (i === index) {
                    templateColumns.push('80%');
                } else {
                    templateColumns.push('5%');
                }
            }
            grid.style.gridTemplateColumns = templateColumns.join(' ');
            
            // Enable confirm button
            confirmBtn.style.opacity = '1';
            confirmBtn.style.pointerEvents = 'all';
            
            console.log(`Selected: ${slot.getAttribute('data-class')}`);
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedIndex !== null) {
            const selectedSlot = slots[selectedIndex];
            const className = selectedSlot.getAttribute('data-class');
            const deathPopup = document.getElementById('deathPopup');
            const chosenClassText = document.getElementById('chosenClassText');
            
            chosenClassText.textContent = `THE PATH OF THE ${className.toUpperCase()} HAS BEEN CHOSEN`;
            deathPopup.classList.add('show');

            // Optional: Reload or reset after some time
            setTimeout(() => {
                deathPopup.classList.remove('show');
            }, 6000);
        }
    });

    // Initialize particles
    createEmbers();
});

function createEmbers() {
    const container = document.getElementById('smokeContainer');
    const count = 40;

    for (let i = 0; i < count; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;

        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.left = `${left}vw`;
        ember.style.bottom = `-10px`;
        ember.style.setProperty('--duration', `${duration}s`);
        ember.style.animationDelay = `${delay}s`;
        
        // Varying colors for "Estus" feel
        const colors = ['#F59E0B', '#ff4500', '#8b4513'];
        ember.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(ember);
    }
}
