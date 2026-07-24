
import React from 'react';
import Script from 'next/script';

export const metadata = {
  title: '三川流域誌 - 經濟部水利署第三河川分署',
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <head>
        
    
    
    
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Long+Cang&family=Ma+Shan+Zheng&family=Yuji+Syuku&family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+TC:wght@600;700;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    

        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        {children}
        <Script src="/script.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
