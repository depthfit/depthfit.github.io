document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Homepage Mobile Navigation Toggle
    // -------------------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu on link click
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // 2. Inner Page Mobile Sidebar Drawer Toggle
    // -------------------------------------------------------------------------
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('open');
            const icon = sidebarToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close sidebar if tapped outside on mobile
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
                sidebar.classList.remove('open');
                const icon = sidebarToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. Inner Page Category Filter Pills (全部, 大甲溪, 大安溪, 烏溪)
    // -------------------------------------------------------------------------
    const filterPills = document.querySelectorAll('.filter-pill');
    const articleCards = document.querySelectorAll('.article-card');

    if (filterPills.length > 0 && articleCards.length > 0) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                // Update active pill
                filterPills.forEach(p => {
                    p.classList.remove('active');
                    p.setAttribute('aria-selected', 'false');
                });
                pill.classList.add('active');
                pill.setAttribute('aria-selected', 'true');

                const targetFilter = pill.getAttribute('data-filter');

                // Filter cards
                articleCards.forEach(card => {
                    const river = card.getAttribute('data-river');
                    if (targetFilter === 'all' || river === targetFilter) {
                        card.classList.remove('hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.35s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 20);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // -------------------------------------------------------------------------
    // 4. View Mode Toggle (Grid vs List View)
    // -------------------------------------------------------------------------
    const gridModeBtn = document.querySelector('.view-mode-btn.grid-mode');
    const listModeBtn = document.querySelector('.view-mode-btn.list-mode');
    const articleGrid = document.querySelector('.article-grid');

    if (gridModeBtn && listModeBtn && articleGrid) {
        gridModeBtn.addEventListener('click', () => {
            gridModeBtn.classList.add('active');
            listModeBtn.classList.remove('active');
            articleGrid.classList.remove('list-view');
        });

        listModeBtn.addEventListener('click', () => {
            listModeBtn.classList.add('active');
            gridModeBtn.classList.remove('active');
            articleGrid.classList.add('list-view');
        });
    }

    // -------------------------------------------------------------------------
    // 5. Sorting (Newest vs Oldest)
    // -------------------------------------------------------------------------
    const sortSelect = document.querySelector('.sort-select');

    if (sortSelect && articleGrid) {
        sortSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            const cards = Array.from(articleGrid.querySelectorAll('.article-card'));

            cards.sort((a, b) => {
                const orderA = parseInt(a.getAttribute('data-order') || '0', 10);
                const orderB = parseInt(b.getAttribute('data-order') || '0', 10);
                return val === 'oldest' ? orderB - orderA : orderA - orderB;
            });

            cards.forEach(card => articleGrid.appendChild(card));
        });
    }
});
