document.addEventListener('DOMContentLoaded', () => {
    const slots = document.querySelectorAll('.character-slot');
    const confirmBtn = document.getElementById('confirmSelection');
    let selectedSlot = null;

    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            // Remove active class from all slots
            slots.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked slot
            slot.classList.add('active');
            selectedSlot = slot.getAttribute('data-class');
            
            // Enable confirm button
            confirmBtn.classList.add('enabled');
            
            // Play a sound effect if available (placeholder logic)
            console.log(`Selected: ${selectedSlot}`);
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedSlot) {
            const deathPopup = document.getElementById('deathPopup');
            const chosenClassText = document.getElementById('chosenClassText');
            
            chosenClassText.textContent = `THE PATH OF THE ${selectedSlot.toUpperCase()} HAS BEEN CHOSEN`;
            deathPopup.classList.add('show');

            // Hide after 5 seconds and reset
            setTimeout(() => {
                deathPopup.classList.remove('show');
            }, 5000);
        }
    });

    // Add some random "ember" elements to the background for atmosphere
    createEmbers();
});

function createEmbers() {
    const container = document.body;
    for (let i = 0; i < 30; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        
        // Random position and animation delay
        const size = Math.random() * 3 + 1;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.left = `${Math.random() * 100}vw`;
        ember.style.bottom = `-10px`;
        ember.style.backgroundColor = 'rgba(255, 69, 0, 0.6)';
        ember.style.position = 'fixed';
        ember.style.borderRadius = '50%';
        ember.style.pointerEvents = 'none';
        ember.style.zIndex = '1';
        ember.style.filter = 'blur(1px)';
        
        ember.style.animation = `embers ${Math.random() * 3 + 2}s linear infinite`;
        ember.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(ember);
    }
}
