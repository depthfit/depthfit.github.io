document.addEventListener('DOMContentLoaded', () => {
    // Add interactions if needed
    console.log("三川流域誌 loaded");

    // Filter functionality for inner page
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            
            // In a real app, this would filter the content below
        });
    });

    // View toggles
    const viewIcons = document.querySelectorAll('.view-icons i');
    viewIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            viewIcons.forEach(i => i.classList.remove('active'));
            e.target.classList.add('active');
            
            const grid = document.querySelector('.article-grid');
            if (grid) {
                if (e.target.classList.contains('fa-list')) {
                    grid.style.gridTemplateColumns = '1fr';
                } else {
                    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
                }
            }
        });
    });
});
