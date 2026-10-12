import React from 'react';
import { ToolItem } from '../../data/toolsData';
import { ImageConverterEngine } from './engines/ImageConverterEngine';
import { PdfEngine } from './engines/PdfEngine';
import { EcommerceFeeCalculatorEngine } from './engines/EcommerceFeeCalculatorEngine';
import { FinancialCalculatorEngine } from './engines/FinancialCalculatorEngine';
import { DeveloperDataEngine } from './engines/DeveloperDataEngine';
import { InvoiceGeneratorEngine } from './engines/InvoiceGeneratorEngine';
import { TextDesignEngine } from './engines/TextDesignEngine';
import { SeoToolsEngine } from './engines/SeoToolsEngine';
import { GenericToolEngine } from './engines/GenericToolEngine';

interface ToolRunnerProps {
  tool: ToolItem;
  onRequestDownload: (fileName: string, blobUrl: string) => void;
}

export const ToolRunner: React.FC<ToolRunnerProps> = ({ tool, onRequestDownload }) => {
  const engine = tool.engineType || '';

  if (
    engine === 'image-converter' ||
    engine === 'image-compressor' ||
    engine === 'image-resize' ||
    engine === 'image-watermark' ||
    engine === 'image-exif' ||
    engine === 'image-to-pdf' ||
    engine === 'image-bg-remover' ||
    engine === 'image-upscaler' ||
    tool.clusterSlug === 'image-convert-edit'
  ) {
    return <ImageConverterEngine tool={tool} onRequestDownload={onRequestDownload} />;
  }

  if (
    engine.startsWith('pdf-') ||
    engine === 'word-to-pdf' ||
    engine === 'html-to-pdf' ||
    tool.clusterSlug === 'pdf-documents'
  ) {
    return <PdfEngine tool={tool} onRequestDownload={onRequestDownload} />;
  }

  if (
    engine === 'etsy-calculator' ||
    engine === 'shopify-calculator' ||
    engine === 'amazon-calculator' ||
    engine === 'stripe-calculator' ||
    engine === 'roas-calculator' ||
    tool.clusterSlug === 'ecommerce-sellers' ||
    tool.clusterSlug === 'marketing-ads'
  ) {
    return <EcommerceFeeCalculatorEngine tool={tool} onRequestDownload={onRequestDownload} />;
  }

  if (
    engine === 'mortgage-calculator' ||
    engine === 'compound-interest' ||
    engine === 'rental-yield' ||
    tool.clusterSlug === 'finance-property-loans' ||
    tool.clusterSlug === 'real-estate-investment'
  ) {
    return <FinancialCalculatorEngine tool={tool} onRequestDownload={onRequestDownload} />;
  }

  if (
    engine === 'json-formatter' ||
    engine === 'json-csv' ||
    engine === 'base64-tool' ||
    engine === 'jwt-decoder' ||
    engine === 'uuid-generator' ||
    engine === 'developer-regex' ||
    engine === 'text-diff' ||
    tool.clusterSlug === 'developer-data'
  ) {
    return <DeveloperDataEngine tool={tool} onRequestDownload={onRequestDownload} />;
  }

  if (
    engine === 'invoice-generator' ||
    engine === 'hourly-rate' ||
    tool.clusterSlug === 'business-freelance'
  ) {
    return <InvoiceGeneratorEngine tool={tool} onRequestDownload={onRequestDownload} />;
  }

  if (
    engine === 'qr-generator' ||
    engine === 'word-counter' ||
    engine === 'color-tool' ||
    engine === 'creator-timestamps' ||
    engine === 'creator-titles' ||
    tool.clusterSlug === 'creator-social-media' ||
    tool.clusterSlug === 'text-education' ||
    tool.clusterSlug === 'design-creative'
  ) {
    return <TextDesignEngine tool={tool} onRequestDownload={onRequestDownload} />;
  }

  if (
    engine.startsWith('seo-') ||
    tool.clusterSlug === 'seo-website-owners'
  ) {
    return <SeoToolsEngine tool={tool} onRequestDownload={onRequestDownload} />;
  }

  return <GenericToolEngine tool={tool} onRequestDownload={onRequestDownload} />;
};
