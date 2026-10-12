import React, { useState, useEffect } from 'react';
import { ALL_TOOLS_DATA, searchTools } from './data/allToolsRegistry';
import { ToolItem, getToolByUrl, CLUSTERS } from './data/toolsData';
import { GEO_ARTICLES, GeoArticle } from './data/geoArticles';
import { Header } from './components/layout/Header';
import { SearchHero } from './components/layout/SearchHero';
import { Footer } from './components/layout/Footer';
import { HomeDashboard } from './components/views/HomeDashboard';
import { ToolDetailView } from './components/views/ToolDetailView';
import { ArticleView } from './components/views/ArticleView';
import { SEOHead } from './components/seo/SEOHead';
import { AdSlot } from './components/ads/AdSlot';
import { DownloadAdModal } from './components/ads/DownloadAdModal';
import { AdSettingsModal } from './components/ads/AdSettingsModal';
import { SitemapModal } from './components/seo/SitemapModal';
import { SeoAuditModal } from './components/seo/SeoAuditModal';

export const App: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [activeArticle, setActiveArticle] = useState<GeoArticle | null>(null);

  // Modals state
  const [downloadModal, setDownloadModal] = useState<{ isOpen: boolean; fileName: string; blobUrl: string }>({
    isOpen: false,
    fileName: '',
    blobUrl: ''
  });
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);
  const [adSettingsOpen, setAdSettingsOpen] = useState(false);
  const [seoAuditOpen, setSeoAuditOpen] = useState(false);

  // Handle URL Routing & Browser Back/Forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path && path !== '/') {
        // Check if matching a tool URL
        const tool = getToolByUrl(path);
        if (tool) {
          setActiveTool(tool);
          setActiveArticle(null);
          return;
        }

        // Check if matching a cluster URL (e.g. /pdf-documents/)
        const trimmed = path.replace(/^\/|\/$/g, '');
        const matchingCluster = CLUSTERS.find(c => c.id === trimmed);
        if (matchingCluster) {
          setSelectedCluster(matchingCluster.id);
          setActiveTool(null);
          setActiveArticle(null);
          return;
        }
      } else {
        // Root path
        setActiveTool(null);
        setActiveArticle(null);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);

    const handleOpenAdSettings = () => setAdSettingsOpen(true);
    window.addEventListener('anyshift_open_ad_settings', handleOpenAdSettings);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('anyshift_open_ad_settings', handleOpenAdSettings);
    };
  }, []);

  const navigateToTool = (tool: ToolItem) => {
    setActiveTool(tool);
    setActiveArticle(null);
    window.history.pushState({}, '', tool.seoUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCluster = (clusterSlug: string) => {
    setSelectedCluster(clusterSlug);
    setActiveTool(null);
    setActiveArticle(null);
    if (clusterSlug === 'all') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${clusterSlug}/`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    setActiveTool(null);
    setActiveArticle(null);
    setSelectedCluster('all');
    setSearchQuery('');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: GeoArticle) => {
    setActiveArticle(article);
    setActiveTool(null);
    window.history.pushState({}, '', `/guides/${article.slug}/`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Triggered when any tool completes a transformation and requests a file download
  const handleRequestDownload = (fileName: string, blobUrl: string) => {
    setDownloadModal({
      isOpen: true,
      fileName,
      blobUrl
    });
  };

  const handleExecuteActualDownload = () => {
    if (downloadModal.blobUrl) {
      const a = document.createElement('a');
      a.href = downloadModal.blobUrl;
      a.download = downloadModal.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  // Filtered tools list for Home Dashboard
  const filteredTools = searchTools(searchQuery, selectedCluster);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Dynamic SEO & Schema.org JSON-LD injector */}
      <SEOHead 
        tool={activeTool || undefined} 
        clusterTitle={selectedCluster !== 'all' ? CLUSTERS.find(c => c.id === selectedCluster)?.name : undefined} 
      />

      {/* Main Top Header */}
      <Header
        activeCluster={selectedCluster}
        onSelectCluster={navigateToCluster}
        onGoHome={navigateHome}
        onOpenSitemap={() => setSitemapModalOpen(true)}
        onOpenAdSettings={() => setAdSettingsOpen(true)}
        onOpenSeoAudit={() => setSeoAuditOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTool ? (
          <ToolDetailView
            tool={activeTool}
            onGoBack={navigateHome}
            onSelectCluster={navigateToCluster}
            onSelectTool={navigateToTool}
            onRequestDownload={handleRequestDownload}
          />
        ) : activeArticle ? (
          <ArticleView
            article={activeArticle}
            onGoBack={navigateHome}
            onSelectCluster={navigateToCluster}
          />
        ) : (
          <>
            {/* Search Hero Dashboard */}
            <SearchHero
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCluster={selectedCluster}
              onClusterChange={setSelectedCluster}
              onSelectTool={navigateToTool}
              totalToolsCount={ALL_TOOLS_DATA.length}
            />

            {/* Catalog Grid & GEO Articles */}
            <HomeDashboard
              tools={filteredTools}
              selectedCluster={selectedCluster}
              onSelectCluster={setSelectedCluster}
              onSelectTool={navigateToTool}
              onSelectArticle={handleSelectArticle}
            />
          </>
        )}
      </main>

      {/* Footer with topic cluster silos & SEO directory */}
      <Footer
        onSelectCluster={navigateToCluster}
        onSelectToolByUrl={(url) => {
          const t = getToolByUrl(url);
          if (t) navigateToTool(t);
        }}
        onOpenSitemap={() => setSitemapModalOpen(true)}
        onOpenAdSettings={() => setAdSettingsOpen(true)}
        onOpenSeoAudit={() => setSeoAuditOpen(true)}
      />

      {/* Persistent Floating Bottom Anchor Adsterra Banner */}
      <div className="sticky bottom-0 z-30 w-full bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl py-1 flex justify-center items-center">
        <AdSlot placement="sticky-footer" />
      </div>

      {/* Interstitial Ad & 2-Click Download Modal Gate */}
      <DownloadAdModal
        isOpen={downloadModal.isOpen}
        fileName={downloadModal.fileName}
        fileBlobUrl={downloadModal.blobUrl}
        onClose={() => setDownloadModal({ isOpen: false, fileName: '', blobUrl: '' })}
        onExecuteDownload={handleExecuteActualDownload}
      />

      {/* Adsterra & Monetization Manager Modal */}
      <AdSettingsModal
        isOpen={adSettingsOpen}
        onClose={() => setAdSettingsOpen(false)}
      />

      {/* XML Sitemap Viewer & Downloader Modal */}
      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
      />

      {/* SEO & GEO Matrix Inspector Modal */}
      <SeoAuditModal
        isOpen={seoAuditOpen}
        onClose={() => setSeoAuditOpen(false)}
        tool={activeTool || undefined}
      />
    </div>
  );
};

export default App;
