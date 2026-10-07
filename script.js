document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Homepage Mobile Navigation Toggle
    // -------------------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('active');
            hamburger.classList.toggle('is-open', isOpen);
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
                hamburger.classList.remove('is-open');
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
            const isOpen = sidebar.classList.toggle('open');
            sidebarToggle.classList.toggle('is-open', isOpen);
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
                sidebarToggle.classList.remove('is-open');
                const icon = sidebarToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }

    // -------------------------------------------------------------------------
    // 3. Inner Page Category Filter Pills (全部, 大甲溪, 大安溪, 烏溪 / 文章類型)
    // -------------------------------------------------------------------------
    const filterPills = document.querySelectorAll('.filter-pill');
    const articleCards = document.querySelectorAll('.article-card, .article-text-item');

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

                // Filter cards / text items
                articleCards.forEach(card => {
                    const filterTag = card.getAttribute('data-filter-tag') || card.getAttribute('data-river') || card.getAttribute('data-order');
                    if (targetFilter === 'all' || filterTag === targetFilter || targetFilter === card.getAttribute('data-order')) {
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
    const articlesContainer = document.querySelector('.article-grid, .article-text-list');

    if (sortSelect && articlesContainer) {
        sortSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            const cards = Array.from(articlesContainer.querySelectorAll('.article-card, .article-text-item'));

            cards.sort((a, b) => {
                const orderA = parseInt(a.getAttribute('data-order') || '0', 10);
                const orderB = parseInt(b.getAttribute('data-order') || '0', 10);
                return val === 'oldest' ? orderB - orderA : orderA - orderB;
            });

            cards.forEach(card => articlesContainer.appendChild(card));
        });
    }

    // -------------------------------------------------------------------------
    // 6. Query Param Router (e.g. ?journal=action)
    // -------------------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const journalParam = urlParams.get('journal');
    if (journalParam) {
        const routes = {
            'story': 'inner.html',
            'action': 'action.html',
            'eco': 'eco.html',
            'collab': 'collab.html'
        };
        const currentPath = window.location.pathname;
        if (routes[journalParam] && !currentPath.endsWith(routes[journalParam])) {
            window.location.href = routes[journalParam];
        }
    }

    // -------------------------------------------------------------------------
    // 7. Interactive Story Modal & Lightbox Reader (inner.html)
    // -------------------------------------------------------------------------
    const storyModalOverlay = document.getElementById('story-modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalBadgeText = document.getElementById('modal-badge-text');
    const modalBodyContent = document.getElementById('modal-body-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const storyLightbox = document.getElementById('story-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

    const storyData = {
        'wuxi': {
            badge: '烏溪流域 · 走讀紀實',
            title: '尋水烏溪：從龍泉圳到福龜聚落的水路故事',
            heroMap: {
                src: 'assets/v2/wuxi/wuxi_map.webp',
                caption: '《尋水烏溪：從龍泉圳到福龜聚落的水路手繪故事地圖》'
            },
            sections: [
                {
                    title: '尋訪烏溪水脈：古河床與河階台地孕育聚落',
                    content: '烏溪發源於中央山脈，流淌經南投國姓鄉福龜段，切削出壯麗的河階台地與古河床景觀。千百年來，豐沛的水脈不僅滋養了大地，更吸引先民於此依水而居，開拓出依傍山川、融合人文的水路聚落。',
                    photos: []
                },
                {
                    title: '龍泉圳：引烏溪之水，灌溉下游千頃良田',
                    content: '龍泉圳是烏溪流域極具代表性的水利工程。先民巧借地勢，沿著山壁手工砌石築圳，引烏溪之水灌溉下游廣袤良田。如今，現代高聳的國道六號高架橋與古樸的水圳在此交錯穿梭，形成跨越時空的歷史對話。',
                    photos: [
                        { src: 'assets/v2/wuxi/wuxi_canal_overview.webp', caption: '龍泉圳現貌與綠林清溪步道' },
                        { src: 'assets/v2/wuxi/wuxi_stone_canal.webp', caption: '傳承百年的砌石護岸與國道六號遠景' },
                        { src: 'assets/v2/wuxi/wuxi_canal_viaduct.webp', caption: '穿梭於山川良田間的引水渠道' }
                    ]
                },
                {
                    title: '福龜「小香港」與古道：昔日繁榮的水路商貿',
                    content: '福龜聚落昔日為前往埔里盆地必經的交通古道節點。日治時期此地香蕉產業極盛，商賈雲集、車水馬龍，被地方耆老美稱為「小香港」。如今走進老街巷弄，樸實的柑仔店與工會聯絡處，依然散發著溫潤的生活光澤。',
                    photos: [
                        { src: 'assets/v2/wuxi/wuxi_grocery_store.webp', caption: '小香港老柑仔店（果菜包裝運送業工會）' },
                        { src: 'assets/v2/wuxi/wuxi_ancient_steps.webp', caption: '走進埔里的古道聚落石階' },
                        { src: 'assets/v2/wuxi/wuxi_street_tour.webp', caption: '水利走讀導覽聚落人文街景' }
                    ]
                },
                {
                    title: '生活之水與地方情感：阿嬤洗衣場與救命樹',
                    content: '聚落裡的天然湧泉「阿嬤洗衣場」，清冽甘美的泉水至今四季不輟，是庄頭婦女晨昏洗衣、話家常的生活交誼重心；一旁蓊鬱的百年「救命樹」，在二次世界大戰與歷次天災時庇護了無數避難庄民，滿載地方共同的情感依託。',
                    photos: [
                        { src: 'assets/v2/wuxi/wuxi_washing_pool.webp', caption: '天然湧泉 阿嬤洗衣場' },
                        { src: 'assets/v2/wuxi/wuxi_lifesaving_tree.webp', caption: '庇護庄民戰時記憶的「救命樹」' }
                    ]
                },
                {
                    title: '地方信仰與公私協力：北玄宮與河川守護',
                    content: '佇立於龜仔頭的「北玄宮」，主祀玄天上帝，承載著在地獨特的龜蛇信仰與保境安民的祈願。第三河川分署串聯專家學者、社區居民與志工夥伴，以公私協力的精神深入流域現場，攜手記錄水文故事，共創流域永續的美好未來。',
                    photos: [
                        { src: 'assets/v2/wuxi/wuxi_temple_tour.webp', caption: '北玄宮水文走讀踏查現場' },
                        { src: 'assets/v2/wuxi/wuxi_turtle_pond.webp', caption: '龜仔頭八卦龜池與地方傳說' },
                        { src: 'assets/v2/wuxi/wuxi_group_photo.webp', caption: '第三河川分署公私協力共創流域永續合影' }
                    ]
                }
            ]
        },
        'dajia': {
            badge: '大甲溪流域 · 流域記憶',
            title: '大甲溪孕育山林、聚落與水文化，流淌著中臺灣的人文故事',
            heroMap: null,
            sections: [
                {
                    title: '生命之源：從雪山奔流向海的母親河',
                    content: '大甲溪發源於南湖大山與雪山山脈，貫穿台中核心地帶，流經梨山、東勢、石岡、豐原，並於大甲出海。它是台灣水力發電的重鎮，更是滋養台中盆地良田與數百萬居民生息的母親河。',
                    photos: [
                        { src: 'assets/v2/article_dajia.webp?v=3', caption: '大甲溪鐵橋與壯闊溪谷水景' }
                    ]
                },
                {
                    title: '水利與人文：聚落水文化傳承',
                    content: '從東勢客家水文化、石岡水壩的抗災記憶，到葫蘆墩圳引水拓墾的歷史傳奇，大甲溪承載了多元族群在這片土地上與水共榮的深刻足跡。',
                    photos: []
                }
            ]
        },
        'daan': {
            badge: '大安溪流域 · 流域記憶',
            title: '大安溪串聯山林與平原，孕育豐富的流域文化與歷史記憶',
            heroMap: null,
            sections: [
                {
                    title: '峽谷與平原：壯麗自然與原鄉智慧',
                    content: '大安溪以險峻壯麗的河谷峽谷地形著稱，上游滋養著泰雅族部落的古老山林智慧，中游白布帆與卓蘭發展出豐美的水果之鄉，下游沖積出廣闊肥沃的平原，串聯起山海之間的生命之歌。',
                    photos: [
                        { src: 'assets/v2/article_daan.webp?v=3', caption: '大安溪綠林平疇與溪流風光' }
                    ]
                },
                {
                    title: '水利拓墾與族群共融',
                    content: '大安溪流域見證了原住民族與漢人的互動歷程，水圳的修築與土地的守護，凝聚了跨世代居民守護水源、永續共榮的堅定承諾。',
                    photos: []
                }
            ]
        }
    };

    function openStoryModal(storyId) {
        const story = storyData[storyId];
        if (!story || !storyModalOverlay) return;

        if (modalBadgeText) modalBadgeText.textContent = story.badge;
        if (modalTitle) modalTitle.textContent = story.title;

        let html = '';
        if (story.heroMap) {
            html += `
                <div class="story-hero-map" title="點擊放大手繪地圖">
                    <img src="${story.heroMap.src}" alt="${story.heroMap.caption}" class="story-hero-map-img">
                    <div class="story-map-caption">
                        <span>${story.heroMap.caption}</span>
                        <span class="story-map-zoom-hint">🔍 點擊查看全圖</span>
                    </div>
                </div>
            `;
        }

        story.sections.forEach(sec => {
            html += `
                <div class="story-section">
                    <h3 class="story-section-title">${sec.title}</h3>
                    <p>${sec.content}</p>
            `;
            if (sec.photos && sec.photos.length > 0) {
                html += '<div class="story-photo-grid">';
                sec.photos.forEach(p => {
                    html += `
                        <div class="story-photo-card" title="點擊放大相片">
                            <img src="${p.src}" alt="${p.caption}" class="story-photo-img" loading="lazy">
                            <div class="story-photo-caption">${p.caption}</div>
                        </div>
                    `;
                });
                html += '</div>';
            }
            html += '</div>';
        });

        if (modalBodyContent) {
            modalBodyContent.innerHTML = html;
        }
        storyModalOverlay.classList.add('active');
        storyModalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Bind image zoom inside modal
        if (modalBodyContent) {
            modalBodyContent.querySelectorAll('.story-hero-map, .story-photo-card').forEach(el => {
                el.addEventListener('click', () => {
                    const img = el.querySelector('img');
                    if (img && storyLightbox && lightboxImg) {
                        lightboxImg.src = img.src;
                        lightboxImg.alt = img.alt;
                        storyLightbox.classList.add('active');
                        storyLightbox.setAttribute('aria-hidden', 'false');
                    }
                });
            });
        }
    }

    function closeStoryModal() {
        if (!storyModalOverlay) return;
        storyModalOverlay.classList.remove('active');
        storyModalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function closeLightbox() {
        if (!storyLightbox) return;
        storyLightbox.classList.remove('active');
        storyLightbox.setAttribute('aria-hidden', 'true');
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeStoryModal);
    }

    if (storyModalOverlay) {
        storyModalOverlay.addEventListener('click', (e) => {
            if (e.target === storyModalOverlay) {
                closeStoryModal();
            }
        });
    }

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    if (storyLightbox) {
        storyLightbox.addEventListener('click', (e) => {
            if (e.target === storyLightbox || e.target === lightboxCloseBtn) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (storyLightbox && storyLightbox.classList.contains('active')) {
                closeLightbox();
            } else if (storyModalOverlay && storyModalOverlay.classList.contains('active')) {
                closeStoryModal();
            }
        }
    });

    // Story links click handler
    document.querySelectorAll('[data-story-id]').forEach(link => {
        link.addEventListener('click', (e) => {
            const sid = link.getAttribute('data-story-id');
            if (sid && storyData[sid]) {
                e.preventDefault();
                openStoryModal(sid);
            }
        });
    });
});
