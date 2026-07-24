
import React from 'react';
import Script from 'next/script';

export default function Page() {
  return (
    <>
      
    <div className="bg-watercolor"></div>

    <div className="layout-container">
        {/*  Sidebar  */}
        <aside className="sidebar">
            <div className="logo">
                <div className="logo-icon">
                    <img src="assets/ROC_Water_Resources_Agency_Seal.svg" alt="經濟部水利署 Logo" style={{ width: "100%", height: "100%" }} />
                </div>
                <div className="logo-text">
                    <h1>經濟部水利署<br />第三河川分署</h1>
                    <p>Third River Management Branch,<br />Water Resources Agency, MOEA</p>
                </div>
            </div>
            
            <nav className="side-nav">
                <a href="index.html" className="nav-item">
                    <i className="fas fa-home"></i>
                    <div>
                        <div className="title">首頁</div>
                        <div className="sub">三川流域誌</div>
                    </div>
                </a>
                <a href="01_story.html" className="nav-item">
                    <i className="fas fa-book-open"></i>
                    <div>
                        <div className="title">流域故事誌</div>
                        <div className="sub">記錄三川 · 人與河的故事</div>
                    </div>
                </a>
                <a href="02_survey.html" className="nav-item active">
                    <i className="fas fa-walking"></i>
                    <div>
                        <div className="title">川行踏查誌</div>
                        <div className="sub">走入河川現場 · 踏查紀錄</div>
                    </div>
                </a>
                <a href="03_guard.html" className="nav-item">
                    <i className="fas fa-heart"></i>
                    <div>
                        <div className="title">守護行動誌</div>
                        <div className="sub">守護家園 · 共同行動</div>
                    </div>
                </a>
                <a href="04_ecology.html" className="nav-item">
                    <i className="fas fa-leaf"></i>
                    <div>
                        <div className="title">三川生態誌</div>
                        <div className="sub">生態多樣 · 永續共生</div>
                    </div>
                </a>
                <a href="05_engineering.html" className="nav-item">
                    <i className="fas fa-water"></i>
                    <div>
                        <div className="title">治水與工程誌</div>
                        <div className="sub">治水建設 · 守護安全</div>
                    </div>
                </a>
                <a href="06_cooperation.html" className="nav-item">
                    <i className="fas fa-handshake"></i>
                    <div>
                        <div className="title">公私協力誌</div>
                        <div className="sub">公私協力 · 共創流域價值</div>
                    </div>
                </a>
            </nav>
        </aside>

        {/*  Main Content  */}
        <main className="content-area">
            <div className="breadcrumb">
                <a href="index.html"><i className="fas fa-home"></i> 首頁</a> <span className="divider">&gt;</span> <span className="current">川行踏查誌</span>
            </div>

            <div className="inner-hero">
                <div className="hero-text">
                    <h1 className="serif title-large">川行踏查誌</h1>
                    <h2 className="subtitle">走入河川現場 · 踏查紀錄</h2>
                    <p>實地走訪河川現場，記錄踏查足跡與自然地景，發現流域之美。</p>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="川行踏查誌" />
                </div>
            </div>

            <div className="controls-bar">
                <div className="filters">
                    <button className="filter-btn active">全部 3</button>
                    <button className="filter-btn">大甲溪 1</button>
                    <button className="filter-btn">大安溪 1</button>
                    <button className="filter-btn">烏溪 1</button>
                </div>
                <div className="view-options">
                    <span className="sort-label">排序</span>
                    <select className="sort-select">
                        <option>最新發佈</option>
                    </select>
                    <span className="view-icons">
                        <span className="view-label">檢視</span>
                        <i className="fas fa-th-large active"></i>
                        <i className="fas fa-list"></i>
                    </span>
                </div>
            </div>

            <div className="article-grid">
                <article className="article-card">
                    <div className="img-wrapper">
                        <span className="badge left">烏溪</span>
                        <span className="badge right">03</span>
                        <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="烏溪" />
                    </div>
                    <div className="article-content">
                        <div className="category">人文歷史 · 河川生態景觀</div>
                        <h3 className="serif">烏溪總先翻湧低語，水位暴漲的瞬間，藏著一段段中部人與洪水對峙的歷史。</h3>
                        <div className="article-footer">
                            <span className="read-more">開始閱讀 &rarr;</span>
                            <span className="date">2024.09.22</span>
                        </div>
                    </div>
                </article>

                <article className="article-card">
                    <div className="img-wrapper">
                        <span className="badge left">大安溪</span>
                        <span className="badge right">01</span>
                        <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="大安溪" />
                    </div>
                    <div className="article-content">
                        <div className="category">人文歷史 · 河川生態景觀</div>
                        <h3 className="serif">大安溪自山谷急湧而出，沖刷河床、改變河道，也默默記錄著人們與洪水周旋的歲月。</h3>
                        <div className="article-footer">
                            <span className="read-more">開始閱讀 &rarr;</span>
                            <span className="date">2024.08.30</span>
                        </div>
                    </div>
                </article>

                <article className="article-card">
                    <div className="img-wrapper">
                        <span className="badge left">大甲溪</span>
                        <span className="badge right">02</span>
                        <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="大甲溪" />
                    </div>
                    <div className="article-content">
                        <div className="category">人文歷史 · 河川生態景觀</div>
                        <h3 className="serif">每逢山雨傾瀉，大甲溪自雪峰奔流而下，洪水刻畫河道，也寫下世代與溪流共存的治水故事。</h3>
                        <div className="article-footer">
                            <span className="read-more">開始閱讀 &rarr;</span>
                            <span className="date">2024.10.18</span>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    </div>
    <script src="script.js"></script>

    </>
  );
}
