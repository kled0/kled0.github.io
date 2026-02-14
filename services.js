function filterServices() {
    const category = document.getElementById('category').value;
    const duration = document.getElementById('duration').value;
    const search = document.getElementById('search').value.toLowerCase();
    const serviceCards = document.querySelectorAll('.service-card');
    const noResults = document.getElementById('noResults');
    
    let visibleCount = 0;

    serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardDuration = card.getAttribute('data-duration');
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        const matchesCategory = category === 'all' || cardCategory === category;
        const matchesDuration = duration === 'all' || cardDuration === duration;
        const matchesSearch = search === '' || title.includes(search) || description.includes(search);

        if (matchesCategory && matchesDuration && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

function initServices() {
    
    document.getElementById('category').addEventListener('change', filterServices);
    document.getElementById('duration').addEventListener('change', filterServices);
    document.getElementById('search').addEventListener('input', filterServices);
}

document.addEventListener('DOMContentLoaded', initServices);