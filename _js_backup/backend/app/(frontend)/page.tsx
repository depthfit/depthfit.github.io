
import React from 'react';
import Script from 'next/script';

export default function Page() {
  return (
    <>
      
    <div className="bg-container">
        {/*  Light blue watercolor base  */}
        <div className="bg-texture"></div>
        {/*  Middle landscape picture  */}
        <div className="bg-landscape"></div>
        {/*  Top left decorative leaves and waterdrop  */}
        <div className="bg-decoration-left">
            <img src="assets/leaves.png" alt="Leaves" className="leaves-img" />
        </div>
    </div>

    <header className="main-header">
        <div className="logo">
            <div className="logo-icon">
                <img src="assets/ROC_Water_Resources_Agency_Seal.svg" alt="經濟部水利署 Logo" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="logo-text">
                <h1>經濟部水利署 第三河川分署</h1>
                <p>Third River Management Branch, Water Resources Agency, Ministry of Economic Affairs</p>
            </div>
        </div>
        
        <div className="hamburger">
            <i className="fas fa-bars"></i>
        </div>

        <nav className="main-nav">
            <a href="#">關於三川</a>
            <a href="01_story.html">流域故事</a>
            <a href="04_ecology.html">生態圖鑑</a>
            <a href="03_guard.html">守護行動</a>
            <a href="contact.html">聯絡我們</a>
            <a href="#" className="lang-btn">EN</a>
        </nav>
    </header>

    <main className="hero">
        <div className="hero-titles">
            <div className="title-wrapper">
                {/*  Watercolor swoosh behind title  */}
                <div className="title-swoosh">
                    <img src="assets/swoosh.png" alt="swoosh decoration" />
                </div>
                {/*  Original extracted calligraphy vector graphic  */}
                <h1 className="main-title">
                    <img src="assets/title.png" alt="三川流域誌" className="title-img" />
                </h1>
            </div>
            
            {/*  Subtitle group restored to flow layout  */}
            <div className="subtitle-group">
                <div className="subtitle-box">
                    記錄三川 · 人與河的故事
                </div>
                <div className="rivers">
                    大甲溪 · 大安溪 · 烏溪
                </div>
            </div>
        </div>

        <section className="journals-section">
            <div className="section-badge-container">
                <div className="section-badge">
                    <img src="assets/badge_text.png" alt="三川流域之六誌" className="badge-img" />
                </div>
            </div>
            
            <div className="cards-container">
                <a href="01_story.html" className="journal-card">
                    <div className="card-content">
                        <div className="card-icon"><i className="fas fa-book-open"></i></div>
                        <div className="card-num">01</div>
                        <h3 className="serif">流域故事誌</h3>
                        <p className="card-desc">探索三大流域的人文歷史、地方記憶與水文故事，傳承世代的河川文化。</p>
                    </div>
                    <div className="card-img" style={{ backgroundImage: "url('https" }}></div>
                    <div className="card-footer">開始閱讀 &rarr;</div>
                </a>
                <a href="02_survey.html" className="journal-card">
                    <div className="card-content">
                        <div className="card-icon"><i className="fas fa-walking"></i></div>
                        <div className="card-num">02</div>
                        <h3 className="serif">川行踏查誌</h3>
                        <p className="card-desc">實地走訪河川現場，記錄踏查足跡與自然地景，發現流域之美。</p>
                    </div>
                    <div className="card-img" style={{ backgroundImage: "url('https" }}></div>
                    <div className="card-footer">開始閱讀 &rarr;</div>
                </a>
                <a href="03_guard.html" className="journal-card">
                    <div className="card-content">
                        <div className="card-icon"><i className="fas fa-heart"></i></div>
                        <div className="card-num">03</div>
                        <h3 className="serif">守護行動誌</h3>
                        <p className="card-desc">記錄守護河川的行動與力量，展現志工、社區與民眾共同守護家園的成果。</p>
                    </div>
                    <div className="card-img" style={{ backgroundImage: "url('https" }}></div>
                    <div className="card-footer">開始閱讀 &rarr;</div>
                </a>
                <a href="04_ecology.html" className="journal-card">
                    <div className="card-content">
                        <div className="card-icon"><i className="fas fa-leaf"></i></div>
                        <div className="card-num">04</div>
                        <h3 className="serif">三川生態誌</h3>
                        <p className="card-desc">介紹流域生態環境與生物多樣性，記錄珍貴物種與棲地，守護自然的永續未來。</p>
                    </div>
                    <div className="card-img" style={{ backgroundImage: "url('https" }}></div>
                    <div className="card-footer">開始閱讀 &rarr;</div>
                </a>
                <a href="05_engineering.html" className="journal-card">
                    <div className="card-content">
                        <div className="card-icon"><i className="fas fa-water"></i></div>
                        <div className="card-num">05</div>
                        <h3 className="serif">治水與工程誌</h3>
                        <p className="card-desc">回顧治水工程與河川整治歷程，展現水利建設如何守護人民與流域安全。</p>
                    </div>
                    <div className="card-img" style={{ backgroundImage: "url('https" }}></div>
                    <div className="card-footer">開始閱讀 &rarr;</div>
                </a>
                <a href="06_cooperation.html" className="journal-card">
                    <div className="card-content">
                        <div className="card-icon"><i className="fas fa-handshake"></i></div>
                        <div className="card-num">06</div>
                        <h3 className="serif">公私協力誌</h3>
                        <p className="card-desc">記錄公私協力合作成果，串聯企業、社區與民間力量，共創流域永續價值。</p>
                    </div>
                    <div className="card-img" style={{ backgroundImage: "url('https" }}></div>
                    <div className="card-footer">開始閱讀 &rarr;</div>
                </a>
            </div>
        </section>
    </main>

    <Script id="script-index">{`
        const hamburger = document.querySelector('.hamburger');
        const icon = hamburger.querySelector('i');
        const mainNav = document.querySelector('.main-nav');
        
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    `}</Script>

    </>
  );
}
