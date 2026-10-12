import React, { useEffect, useRef } from 'react';
import { ADSTERRA_KEYS, triggerSmartlink } from './adConfig';

export type AdsterraBannerType = '728x90' | '300x250' | '160x600' | '160x300' | '468x60' | '320x50' | 'native';

interface AdsterraBannerProps {
  type: AdsterraBannerType;
  className?: string;
}

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ type, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = '';

    if (type === 'native') {
      // Native Banner container
      const nativeContainer = document.createElement('div');
      nativeContainer.id = ADSTERRA_KEYS.NATIVE_BANNER.containerId;
      container.appendChild(nativeContainer);

      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = ADSTERRA_KEYS.NATIVE_BANNER.src;
      container.appendChild(script);
      return;
    }

    // Standard Iframe Adsterra Banner
    let config: { key: string; width: number; height: number; url: string };
    switch (type) {
      case '728x90':
        config = ADSTERRA_KEYS.BANNER_728x90;
        break;
      case '300x250':
        config = ADSTERRA_KEYS.BANNER_300x250;
        break;
      case '160x600':
        config = ADSTERRA_KEYS.BANNER_160x600;
        break;
      case '160x300':
        config = ADSTERRA_KEYS.BANNER_160x300;
        break;
      case '468x60':
        config = ADSTERRA_KEYS.BANNER_468x60;
        break;
      case '320x50':
        config = ADSTERRA_KEYS.BANNER_320x50;
        break;
      default:
        config = ADSTERRA_KEYS.BANNER_300x250;
    }

    const iframe = document.createElement('iframe');
    iframe.width = `${config.width}`;
    iframe.height = `${config.height}`;
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.borderRadius = '8px';
    iframe.style.maxWidth = '100%';
    iframe.scrolling = 'no';
    iframe.title = `Adsterra Ad ${type}`;

    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_blank" />
          <style>
            body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; background: transparent; overflow: hidden; }
          </style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '${config.key}',
              'format' : 'iframe',
              'height' : ${config.height},
              'width' : ${config.width},
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="${config.url}"></script>
        </body>
      </html>
    `;

    iframe.srcdoc = iframeHtml;
    container.appendChild(iframe);
  }, [type]);

  const handleContainerClick = () => {
    // If user clicks on the ad banner wrapper, trigger smartlink
    triggerSmartlink(Math.floor(Math.random() * 3));
  };

  return (
    <div 
      className={`adsterra-banner-wrapper relative flex flex-col items-center justify-center overflow-hidden my-2 ${className}`}
    >
      <div 
        ref={containerRef} 
        className="flex items-center justify-center max-w-full overflow-hidden" 
      />
    </div>
  );
};
