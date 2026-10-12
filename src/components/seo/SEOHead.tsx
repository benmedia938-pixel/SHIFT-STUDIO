import React, { useEffect } from 'react';
import { ToolItem } from '../../data/toolsData';

interface SEOHeadProps {
  tool?: ToolItem;
  clusterTitle?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ tool, clusterTitle }) => {
  useEffect(() => {
    const defaultTitle = 'AnyShift – 170+ Free Online Tools, Converters & Financial Calculators';
    const defaultDesc = 'AnyShift is a free, high-speed online utility suite featuring 170+ browser-based tools: PDF utilities, image converters, ecommerce calculators, finance planners, and developer helpers.';
    const baseUrl = 'https://anyshift.online';

    let pageTitle = defaultTitle;
    let pageDesc = defaultDesc;
    let pageUrl = baseUrl;
    let pageKeywords = 'free online tools, file converter, pdf to word, image compressor, etsy fee calculator, mortgage calculator, json formatter';

    if (tool) {
      pageTitle = `${tool.name} – Free Online Tool | AnyShift`;
      pageDesc = `${tool.shortDesc} Fast, private client-side processing with zero uploads or watermark.`;
      pageUrl = `${baseUrl}${tool.seoUrl}`;
      pageKeywords = `${tool.primaryKeyword}, ${tool.keywords.join(', ')}, AnyShift online tool`;
    } else if (clusterTitle) {
      pageTitle = `${clusterTitle} Tools & Utilities – AnyShift`;
      pageDesc = `Explore all free ${clusterTitle.toLowerCase()} tools and converters on AnyShift. 100% free, private browser-first utilities.`;
    }

    // Update title
    document.title = pageTitle;

    // Update Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', pageDesc);
    }

    // Update Keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', pageKeywords);
    }

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', pageUrl);
    }

    // Update OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', pageDesc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', pageUrl);

    // Update Twitter
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', pageDesc);

    // Inject JSON-LD Schema
    const existingJsonLd = document.getElementById('anyshift-dynamic-schema');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const script = document.createElement('script');
    script.id = 'anyshift-dynamic-schema';
    script.type = 'application/ld+json';

    const schemaGraph: any[] = [];

    // WebSite / WebApplication schema
    if (tool) {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': tool.name,
        'url': pageUrl,
        'description': tool.shortDesc,
        'applicationCategory': tool.category || 'UtilitiesApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires JavaScript and HTML5 Canvas',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'creator': {
          '@type': 'Organization',
          'name': 'AnyShift',
          'url': baseUrl
        }
      });

      // BreadcrumbList
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': baseUrl
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': tool.cluster,
            'item': `${baseUrl}/${tool.clusterSlug}/`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': tool.name,
            'item': pageUrl
          }
        ]
      });

      // HowTo schema
      if (tool.howToSteps && tool.howToSteps.length > 0) {
        schemaGraph.push({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          'name': `How to use ${tool.name} on AnyShift`,
          'description': tool.shortDesc,
          'step': tool.howToSteps.map((step, idx) => ({
            '@type': 'HowToStep',
            'position': idx + 1,
            'text': step
          }))
        });
      }

      // FAQPage schema
      if (tool.faqs && tool.faqs.length > 0) {
        schemaGraph.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': tool.faqs.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        });
      }
    } else {
      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'AnyShift',
        'url': baseUrl,
        'description': defaultDesc,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${baseUrl}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      });
    }

    script.text = JSON.stringify(schemaGraph);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('anyshift-dynamic-schema');
      if (el) el.remove();
    };
  }, [tool, clusterTitle]);

  return null;
};
