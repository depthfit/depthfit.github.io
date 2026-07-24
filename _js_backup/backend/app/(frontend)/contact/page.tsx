
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
                <a href="02_survey.html" className="nav-item">
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
                <a href="index.html"><i className="fas fa-home"></i> 首頁</a> <span className="divider">&gt;</span> <span className="current">聯絡我們</span>
            </div>

            <div className="inner-hero">
                <div className="hero-text">
                    <h1 className="serif title-large">聯絡我們</h1>
                    <h2 className="subtitle">與我們保持聯繫，攜手守護河川</h2>
                    <p>如果您對三川流域有任何問題、建議，或是想參與我們的守護行動，歡迎隨時與我們聯絡。我們將有專人為您服務。</p>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="聯絡我們" />
                </div>
            </div>

            
            <div className="contact-section" style={{ background: "white", padding: "3rem", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginTop: "2rem" }}>
                <h3 className="serif" style={{ marginBottom: "1.5rem", fontSize: "1.5rem", color: "var(--primary-blue)" }}>聯絡資訊</h3>
                <p style={{ marginBottom: "0.5rem" }}><i className="fas fa-map-marker-alt" style={{ width: "20px", color: "var(--primary-blue)" }}></i> <strong>地址：</strong>412 臺中市大里區國光路二段250號</p>
                <p style={{ marginBottom: "0.5rem" }}><i className="fas fa-phone" style={{ width: "20px", color: "var(--primary-blue)" }}></i> <strong>電話：</strong>(04)2220-3151</p>
                <p style={{ marginBottom: "2rem" }}><i className="fas fa-envelope" style={{ width: "20px", color: "var(--primary-blue)" }}></i> <strong>信箱：</strong>wra03@wra.gov.tw</p>
                
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
