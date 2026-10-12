import React, { useEffect, useRef } from 'react';
import { ADSTERRA_KEYS, triggerSmartlink } from './adConfig';

export type AdsterraBannerType = '728x90' | '300x250' | '160x600' | '160x300' | '468x60' | '320x50' | 'native';

interface AdsterraBannerProps {
  type: AdsterraBannerType;
  className?: string;
}

export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({ type, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exact dimension map for zero layout shifts (CLS prevention)
  const dimensions: Record<AdsterraBannerType, { w: number; h: number; minH: string; minW: string }> = {
    '728x90': { w: 728, h: 90, minH: 'min-h-[90px]', minW: 'max-w-[728px]' },
    '300x250': { w: 300, h: 250, minH: 'min-h-[250px]', minW: 'w-[300px]' },
    '160x600': { w: 160, h: 600, minH: 'min-h-[600px]', minW: 'w-[160px]' },
    '160x300': { w: 160, h: 300, minH: 'min-h-[300px]', minW: 'w-[160px]' },
    '468x60': { w: 468, h: 60, minH: 'min-h-[60px]', minW: 'max-w-[468px]' },
    '320x50': { w: 320, h: 50, minH: 'min-h-[50px]', minW: 'max-w-[320px]' },
    'native': { w: 728, h: 180, minH: 'min-h-[160px]', minW: 'w-full' }
  };

  const dim = dimensions[type];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = '';

    if (type === 'native') {
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
    iframe.style.display = 'block';
    iframe.style.margin = '0 auto';
    iframe.setAttribute('loading', 'lazy');
    iframe.scrolling = 'no';
    iframe.title = `Adsterra Ad ${type}`;

    const iframeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_blank" />
          <style>
            * { box-sizing: border-box; }
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

  return (
    <div 
      className={`adsterra-banner-container relative flex items-center justify-center overflow-hidden my-1 ${dim.minH} ${dim.minW} mx-auto ${className}`}
      style={{ contain: 'layout paint' }}
    >
      <div 
        ref={containerRef} 
        className="flex items-center justify-center w-full h-full overflow-hidden" 
      />
    </div>
  );
};
