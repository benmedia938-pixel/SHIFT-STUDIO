import { RAW_TOOLS_DATA, ToolItem } from './toolsData';

// Extended full database containing all user-submitted tools from T001 to T334
const ADDITIONAL_TOOLS: Partial<ToolItem>[] = [
  // Video & Audio Files
  { id: 'T053', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'MP4 to MP3 Converter', primaryKeyword: 'mp4 to mp3', seoUrl: '/video-audio-files/mp4-to-mp3-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 450000, cpc: '$0.85', engineType: 'media-converter' },
  { id: 'T054', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'MOV to MP4 Converter', primaryKeyword: 'mov to mp4', seoUrl: '/video-audio-files/mov-to-mp4-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 180000, cpc: '$0.75', engineType: 'media-converter' },
  { id: 'T055', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'WEBM to MP4 Converter', primaryKeyword: 'webm to mp4', seoUrl: '/video-audio-files/webm-to-mp4-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 95000, cpc: '$0.70', engineType: 'media-converter' },
  { id: 'T056', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'MKV to MP4 Converter', primaryKeyword: 'mkv to mp4', seoUrl: '/video-audio-files/mkv-to-mp4-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 85000, cpc: '$0.65', engineType: 'media-converter' },
  { id: 'T057', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'AVI to MP4 Converter', primaryKeyword: 'avi to mp4', seoUrl: '/video-audio-files/avi-to-mp4-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 65000, cpc: '$0.60', engineType: 'media-converter' },
  { id: 'T058', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'MP4 to WEBM Converter', primaryKeyword: 'mp4 to webm', seoUrl: '/video-audio-files/mp4-to-webm-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 42000, cpc: '$0.75', engineType: 'media-converter' },
  { id: 'T059', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'Video Compressor', primaryKeyword: 'compress video', seoUrl: '/video-audio-files/video-compressor/', markets: 'US, UK, CA, AU, FR', searchVolume: 125000, cpc: '$1.20', engineType: 'media-converter' },
  { id: 'T060', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'Video Trimmer', primaryKeyword: 'trim video online', seoUrl: '/video-audio-files/video-trimmer/', markets: 'US, UK, CA, AU, FR', searchVolume: 88000, cpc: '$0.95', engineType: 'media-converter' },
  { id: 'T061', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'Video to GIF Converter', primaryKeyword: 'video to gif converter', seoUrl: '/video-audio-files/video-to-gif-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 14800, cpc: '$1.26', engineType: 'media-converter' },
  { id: 'T062', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'GIF to Video Converter', primaryKeyword: 'gif to video', seoUrl: '/video-audio-files/gif-to-video-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 32000, cpc: '$0.85', engineType: 'media-converter' },
  { id: 'T063', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'Video Resizer', primaryKeyword: 'resize video', seoUrl: '/video-audio-files/video-resizer/', markets: 'US, UK, CA, AU, FR', searchVolume: 45000, cpc: '$0.90', engineType: 'media-converter' },
  { id: 'T064', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'Video Cropper', primaryKeyword: 'crop video', seoUrl: '/video-audio-files/video-cropper/', markets: 'US, UK, CA, AU, FR', searchVolume: 51000, cpc: '$0.88', engineType: 'media-converter' },
  { id: 'T068', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'Extract Audio from Video', primaryKeyword: 'extract audio from video', seoUrl: '/video-audio-files/extract-audio-from-video/', markets: 'US, UK, CA, AU, FR', searchVolume: 72000, cpc: '$1.10', engineType: 'media-converter' },
  { id: 'T069', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'Remove Audio from Video', primaryKeyword: 'remove audio from video', seoUrl: '/video-audio-files/remove-audio-from-video/', markets: 'US, UK, CA, AU, FR', searchVolume: 61000, cpc: '$0.95', engineType: 'media-converter' },
  { id: 'T070', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'MP3 to WAV Converter', primaryKeyword: 'mp3 to wav', seoUrl: '/video-audio-files/mp3-to-wav-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 110000, cpc: '$0.65', engineType: 'media-converter' },
  { id: 'T071', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'WAV to MP3 Converter', primaryKeyword: 'wav to mp3', seoUrl: '/video-audio-files/wav-to-mp3-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 145000, cpc: '$0.70', engineType: 'media-converter' },
  { id: 'T072', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'M4A to MP3 Converter', primaryKeyword: 'm4a to mp3', seoUrl: '/video-audio-files/m4a-to-mp3-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 82000, cpc: '$0.75', engineType: 'media-converter' },
  { id: 'T074', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'Audio Compressor', primaryKeyword: 'compress audio', seoUrl: '/video-audio-files/audio-compressor/', markets: 'US, UK, CA, AU, FR', searchVolume: 38000, cpc: '$0.85', engineType: 'media-converter' },
  { id: 'T077', cluster: 'Video & Audio Files', clusterSlug: 'video-audio-files', name: 'SRT to VTT Converter', primaryKeyword: 'srt to vtt', seoUrl: '/video-audio-files/srt-to-vtt-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 29000, cpc: '$0.80', engineType: 'media-converter' },

  // Creator & Social Media
  { id: 'T081', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'YouTube Thumbnail Maker', primaryKeyword: 'youtube thumbnail maker', seoUrl: '/creator-social-media/youtube-thumbnail-maker/', markets: 'US, UK, CA, AU', searchVolume: 95000, cpc: '$1.40', engineType: 'creator-titles' },
  { id: 'T082', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'YouTube Thumbnail Resizer', primaryKeyword: 'youtube thumbnail size', seoUrl: '/creator-social-media/youtube-thumbnail-resizer/', markets: 'US, UK, CA, AU', searchVolume: 35000, cpc: '$0.90', engineType: 'image-resize' },
  { id: 'T083', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'YouTube Description Generator', primaryKeyword: 'youtube description generator', seoUrl: '/creator-social-media/youtube-description-generator/', markets: 'US, UK, CA, AU', searchVolume: 42000, cpc: '$1.30', engineType: 'creator-titles' },
  { id: 'T085', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'YouTube Tag Generator', primaryKeyword: 'youtube tag generator', seoUrl: '/creator-social-media/youtube-tag-generator/', markets: 'US, UK, CA, AU', searchVolume: 78000, cpc: '$1.45', engineType: 'creator-titles' },
  { id: 'T086', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'TikTok Caption Generator', primaryKeyword: 'tiktok caption generator', seoUrl: '/creator-social-media/tiktok-caption-generator/', markets: 'US, UK, CA, AU', searchVolume: 51000, cpc: '$1.35', engineType: 'creator-titles' },
  { id: 'T087', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'TikTok Video Aspect Ratio Resizer', primaryKeyword: 'tiktok video size', seoUrl: '/creator-social-media/tiktok-video-aspect-ratio-resizer/', markets: 'US, UK, CA, AU', searchVolume: 32000, cpc: '$1.05', engineType: 'media-converter' },
  { id: 'T088', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'Instagram Reel Cover Maker', primaryKeyword: 'instagram reel cover maker', seoUrl: '/creator-social-media/instagram-reel-cover-maker/', markets: 'US, UK, CA, AU', searchVolume: 28000, cpc: '$1.10', engineType: 'creator-titles' },
  { id: 'T089', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'Instagram Story Size Resizer', primaryKeyword: 'instagram story size', seoUrl: '/creator-social-media/instagram-story-size-resizer/', markets: 'US, UK, CA, AU', searchVolume: 44000, cpc: '$0.95', engineType: 'image-resize' },
  { id: 'T090', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'Instagram Hashtag Generator', primaryKeyword: 'instagram hashtag generator', seoUrl: '/creator-social-media/instagram-hashtag-generator/', markets: 'US, UK, CA, AU', searchVolume: 82000, cpc: '$1.50', engineType: 'creator-titles' },
  { id: 'T091', cluster: 'Creator & Social Media', clusterSlug: 'creator-social-media', name: 'Social Media Image Resizer', primaryKeyword: 'social media image resizer', seoUrl: '/creator-social-media/social-media-image-resizer/', markets: 'US, UK, CA, AU', searchVolume: 61000, cpc: '$1.25', engineType: 'image-resize' },

  // Ecommerce & Sellers
  { id: 'T099', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Amazon Seller Fee Calculator', primaryKeyword: 'amazon seller fee calculator', seoUrl: '/ecommerce-sellers/amazon-seller-fee-calculator/', markets: 'US, UK, CA, AU', searchVolume: 55000, cpc: '$2.30', engineType: 'amazon-calculator' },
  { id: 'T100', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'TikTok Shop Fee Calculator', primaryKeyword: 'tiktok shop fee calculator', seoUrl: '/ecommerce-sellers/tiktok-shop-fee-calculator/', markets: 'US, UK, CA, AU', searchVolume: 42000, cpc: '$2.10', engineType: 'etsy-calculator' },
  { id: 'T101', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'eBay Fee Calculator', primaryKeyword: 'ebay fee calculator', seoUrl: '/ecommerce-sellers/ebay-fee-calculator/', markets: 'US, UK, CA, AU', searchVolume: 88000, cpc: '$1.95', engineType: 'etsy-calculator' },
  { id: 'T102', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Walmart Marketplace Fee Calculator', primaryKeyword: 'walmart seller fee calculator', seoUrl: '/ecommerce-sellers/walmart-marketplace-fee-calculator/', markets: 'US, UK, CA, AU', searchVolume: 24000, cpc: '$2.40', engineType: 'amazon-calculator' },
  { id: 'T105', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'WooCommerce Profit Calculator', primaryKeyword: 'woocommerce profit calculator', seoUrl: '/ecommerce-sellers/woocommerce-profit-calculator/', markets: 'US, UK, CA, AU', searchVolume: 19000, cpc: '$2.00', engineType: 'shopify-calculator' },
  { id: 'T106', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Print on Demand Profit Calculator', primaryKeyword: 'print on demand profit calculator', seoUrl: '/ecommerce-sellers/print-on-demand-profit-calculator/', markets: 'US, UK, CA, AU', searchVolume: 31000, cpc: '$2.25', engineType: 'etsy-calculator' },
  { id: 'T107', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Dropshipping Profit Calculator', primaryKeyword: 'dropshipping profit calculator', seoUrl: '/ecommerce-sellers/dropshipping-profit-calculator/', markets: 'US, UK, CA, AU', searchVolume: 39000, cpc: '$2.40', engineType: 'shopify-calculator' },
  { id: 'T109', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Target ROAS Calculator', primaryKeyword: 'target roas calculator', seoUrl: '/ecommerce-sellers/target-roas-calculator/', markets: 'US, UK, CA, AU', searchVolume: 22000, cpc: '$2.60', engineType: 'roas-calculator' },
  { id: 'T110', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Target CPA Calculator', primaryKeyword: 'target cpa calculator', seoUrl: '/ecommerce-sellers/target-cpa-calculator/', markets: 'US, UK, CA, AU', searchVolume: 27000, cpc: '$2.70', engineType: 'roas-calculator' },
  { id: 'T111', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Ecommerce Margin Calculator', primaryKeyword: 'ecommerce profit margin calculator', seoUrl: '/ecommerce-sellers/ecommerce-margin-calculator/', markets: 'US, UK, CA, AU', searchVolume: 33000, cpc: '$2.30', engineType: 'shopify-calculator' },
  { id: 'T112', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Returns Impact Calculator', primaryKeyword: 'return rate profit calculator', seoUrl: '/ecommerce-sellers/returns-impact-calculator/', markets: 'US, UK, CA, AU', searchVolume: 16000, cpc: '$2.10', engineType: 'shopify-calculator' },
  { id: 'T113', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Free Shipping Profit Calculator', primaryKeyword: 'free shipping profit calculator', seoUrl: '/ecommerce-sellers/free-shipping-profit-calculator/', markets: 'US, UK, CA, AU', searchVolume: 21000, cpc: '$1.95', engineType: 'shopify-calculator' },
  { id: 'T114', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Ecommerce Unit Economics Calculator', primaryKeyword: 'unit economics calculator ecommerce', seoUrl: '/ecommerce-sellers/ecommerce-unit-economics-calculator/', markets: 'US, UK, CA, AU', searchVolume: 18000, cpc: '$2.50', engineType: 'shopify-calculator' },
  { id: 'T115', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Bundle Pricing Calculator', primaryKeyword: 'bundle pricing calculator', seoUrl: '/ecommerce-sellers/bundle-pricing-calculator/', markets: 'US, UK, CA, AU', searchVolume: 15000, cpc: '$2.15', engineType: 'shopify-calculator' },
  { id: 'T116', cluster: 'Ecommerce & Sellers', clusterSlug: 'ecommerce-sellers', name: 'Discount Impact Calculator', primaryKeyword: 'discount profit calculator', seoUrl: '/ecommerce-sellers/discount-impact-calculator/', markets: 'US, UK, CA, AU', searchVolume: 25000, cpc: '$2.00', engineType: 'shopify-calculator' },

  // Business & Freelance
  { id: 'T120', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Quotation Generator', primaryKeyword: 'quote generator', seoUrl: '/business-freelance/quotation-generator/', markets: 'US, UK, CA, AU', searchVolume: 28000, cpc: '$5.50', engineType: 'invoice-generator' },
  { id: 'T121', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Receipt Maker', primaryKeyword: 'receipt maker', seoUrl: '/business-freelance/receipt-maker/', markets: 'US, UK, CA, AU', searchVolume: 35000, cpc: '$4.20', engineType: 'invoice-generator' },
  { id: 'T122', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Proforma Invoice Generator', primaryKeyword: 'proforma invoice generator', seoUrl: '/business-freelance/proforma-invoice-generator/', markets: 'US, UK, CA, AU', searchVolume: 24000, cpc: '$6.10', engineType: 'invoice-generator' },
  { id: 'T123', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Timesheet Calculator', primaryKeyword: 'timesheet calculator', seoUrl: '/business-freelance/timesheet-calculator/', markets: 'US, UK, CA, AU', searchVolume: 92000, cpc: '$1.80', engineType: 'hourly-salary' },
  { id: 'T125', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Freelancer Rate Calculator', primaryKeyword: 'freelance rate calculator', seoUrl: '/business-freelance/freelancer-rate-calculator/', markets: 'US, UK, CA, AU', searchVolume: 31000, cpc: '$2.40', engineType: 'hourly-rate' },
  { id: 'T126', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Contractor Day Rate Calculator', primaryKeyword: 'contractor day rate calculator', seoUrl: '/business-freelance/contractor-day-rate-calculator/', markets: 'US, UK, CA, AU', searchVolume: 22000, cpc: '$2.80', engineType: 'hourly-rate' },
  { id: 'T128', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Sales Tax Calculator US', primaryKeyword: 'sales tax calculator', seoUrl: '/business-freelance/sales-tax-calculator-us/', markets: 'US, UK, CA, AU', searchVolume: 120000, cpc: '$1.60', engineType: 'vat-calculator' },
  { id: 'T129', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Profit Margin Calculator', primaryKeyword: 'profit margin calculator', seoUrl: '/business-freelance/profit-margin-calculator/', markets: 'US, UK, CA, AU', searchVolume: 210000, cpc: '$1.90', engineType: 'shopify-calculator' },
  { id: 'T130', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Markup Calculator', primaryKeyword: 'markup calculator', seoUrl: '/business-freelance/markup-calculator/', markets: 'US, UK, CA, AU', searchVolume: 95000, cpc: '$1.75', engineType: 'shopify-calculator' },
  { id: 'T131', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Break-even Point Calculator', primaryKeyword: 'break even calculator', seoUrl: '/business-freelance/break-even-point-calculator/', markets: 'US, UK, CA, AU', searchVolume: 84000, cpc: '$2.10', engineType: 'roas-calculator' },
  { id: 'T132', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Discount Calculator', primaryKeyword: 'discount calculator', seoUrl: '/business-freelance/discount-calculator/', markets: 'US, UK, CA, AU', searchVolume: 150000, cpc: '$1.10', engineType: 'shopify-calculator' },
  { id: 'T137', cluster: 'Business & Freelance', clusterSlug: 'business-freelance', name: 'Overtime Pay Calculator', primaryKeyword: 'overtime calculator', seoUrl: '/business-freelance/overtime-pay-calculator/', markets: 'US, UK, CA, AU', searchVolume: 67000, cpc: '$1.45', engineType: 'hourly-salary' },

  // Finance & Property Loans
  { id: 'T143', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Mortgage Refinance Calculator', primaryKeyword: 'refinance calculator', seoUrl: '/finance-property-loans/mortgage-refinance-calculator/', markets: 'US, UK, CA, AU', searchVolume: 220000, cpc: '$3.50', engineType: 'mortgage-calculator' },
  { id: 'T144', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Mortgage Payoff Calculator', primaryKeyword: 'mortgage payoff calculator', seoUrl: '/finance-property-loans/mortgage-payoff-calculator/', markets: 'US, UK, CA, AU', searchVolume: 110000, cpc: '$1.90', engineType: 'mortgage-calculator' },
  { id: 'T145', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Rent vs Buy Calculator', primaryKeyword: 'rent vs buy calculator', seoUrl: '/finance-property-loans/rent-vs-buy-calculator/', markets: 'US, UK, CA, AU', searchVolume: 95000, cpc: '$2.80', engineType: 'mortgage-calculator' },
  { id: 'T146', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Auto Loan Calculator', primaryKeyword: 'auto loan calculator', seoUrl: '/finance-property-loans/auto-loan-calculator/', markets: 'US, UK, CA, AU', searchVolume: 850000, cpc: '$1.65', engineType: 'mortgage-calculator' },
  { id: 'T147', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Car Lease vs Buy Calculator', primaryKeyword: 'lease vs buy calculator', seoUrl: '/finance-property-loans/car-lease-vs-buy-calculator/', markets: 'US, UK, CA, AU', searchVolume: 65000, cpc: '$2.10', engineType: 'mortgage-calculator' },
  { id: 'T150', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Savings Goal Calculator', primaryKeyword: 'savings goal calculator', seoUrl: '/finance-property-loans/savings-goal-calculator/', markets: 'US, UK, CA, AU', searchVolume: 58000, cpc: '$1.40', engineType: 'compound-interest' },
  { id: 'T153', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'APR Calculator', primaryKeyword: 'apr calculator', seoUrl: '/finance-property-loans/apr-calculator/', markets: 'US, UK, CA, AU', searchVolume: 92000, cpc: '$1.80', engineType: 'mortgage-calculator' },
  { id: 'T155', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Inflation Calculator', primaryKeyword: 'inflation calculator', seoUrl: '/finance-property-loans/inflation-calculator/', markets: 'US, UK, CA, AU', searchVolume: 210000, cpc: '$1.25', engineType: 'compound-interest' },
  { id: 'T157', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Credit Card Payoff Calculator', primaryKeyword: 'credit card payoff calculator', seoUrl: '/finance-property-loans/credit-card-payoff-calculator/', markets: 'US, UK, CA, AU', searchVolume: 140000, cpc: '$2.40', engineType: 'mortgage-calculator' },
  { id: 'T158', cluster: 'Finance & Property Loans', clusterSlug: 'finance-property-loans', name: 'Retirement Savings Calculator', primaryKeyword: 'retirement calculator', seoUrl: '/finance-property-loans/retirement-savings-calculator/', markets: 'US, UK, CA, AU', searchVolume: 420000, cpc: '$2.90', engineType: 'compound-interest' },

  // Home & Renovation
  { id: 'T162', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Flooring Calculator', primaryKeyword: 'flooring calculator', seoUrl: '/home-renovation/flooring-calculator/', markets: 'US, UK, CA, AU', searchVolume: 95000, cpc: '$1.60', engineType: 'tile-calculator' },
  { id: 'T164', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Grout Calculator', primaryKeyword: 'grout calculator', seoUrl: '/home-renovation/grout-calculator/', markets: 'US, UK, CA, AU', searchVolume: 34000, cpc: '$1.25', engineType: 'tile-calculator' },
  { id: 'T165', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Concrete Calculator', primaryKeyword: 'concrete calculator', seoUrl: '/home-renovation/concrete-calculator/', markets: 'US, UK, CA, AU', searchVolume: 190000, cpc: '$1.80', engineType: 'paint-calculator' },
  { id: 'T166', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Concrete Slab Cost Calculator', primaryKeyword: 'concrete slab cost calculator', seoUrl: '/home-renovation/concrete-slab-cost-calculator/', markets: 'US, UK, CA, AU', searchVolume: 42000, cpc: '$2.20', engineType: 'paint-calculator' },
  { id: 'T167', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Drywall Calculator', primaryKeyword: 'drywall calculator', seoUrl: '/home-renovation/drywall-calculator/', markets: 'US, UK, CA, AU', searchVolume: 51000, cpc: '$1.45', engineType: 'paint-calculator' },
  { id: 'T169', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Deck Board Calculator', primaryKeyword: 'deck board calculator', seoUrl: '/home-renovation/deck-board-calculator/', markets: 'US, UK, CA, AU', searchVolume: 29000, cpc: '$1.70', engineType: 'tile-calculator' },
  { id: 'T171', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Roofing Material Calculator', primaryKeyword: 'roofing calculator', seoUrl: '/home-renovation/roofing-material-calculator/', markets: 'US, UK, CA, AU', searchVolume: 48000, cpc: '$2.40', engineType: 'paint-calculator' },
  { id: 'T173', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Mulch Calculator', primaryKeyword: 'mulch calculator', seoUrl: '/home-renovation/mulch-calculator/', markets: 'US, UK, CA, AU', searchVolume: 82000, cpc: '$1.35', engineType: 'paint-calculator' },
  { id: 'T177', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Cubic Yard Calculator', primaryKeyword: 'cubic yard calculator', seoUrl: '/home-renovation/cubic-yard-calculator/', markets: 'US, UK, CA, AU', searchVolume: 110000, cpc: '$1.20', engineType: 'paint-calculator' },
  { id: 'T178', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Wallpaper Calculator', primaryKeyword: 'wallpaper calculator', seoUrl: '/home-renovation/wallpaper-calculator/', markets: 'US, UK, CA, AU', searchVolume: 38000, cpc: '$1.40', engineType: 'paint-calculator' },
  { id: 'T182', cluster: 'Home & Renovation', clusterSlug: 'home-renovation', name: 'Solar Payback Calculator', primaryKeyword: 'solar panel payback calculator', seoUrl: '/home-renovation/solar-payback-calculator/', markets: 'US, UK, CA, AU', searchVolume: 35000, cpc: '$3.80', engineType: 'compound-interest' },

  // SEO & Website Owners
  { id: 'T186', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'Meta Tag Generator', primaryKeyword: 'meta tag generator', seoUrl: '/seo-website-owners/meta-tag-generator/', markets: 'US, UK, CA, AU', searchVolume: 55000, cpc: '$2.10', engineType: 'seo-serp' },
  { id: 'T188', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'Meta Title Pixel Checker', primaryKeyword: 'title tag pixel width checker', seoUrl: '/seo-website-owners/meta-title-pixel-checker/', markets: 'US, UK, CA, AU', searchVolume: 21000, cpc: '$1.90', engineType: 'seo-serp' },
  { id: 'T190', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'Canonical URL Generator', primaryKeyword: 'canonical url generator', seoUrl: '/seo-website-owners/canonical-url-generator/', markets: 'US, UK, CA, AU', searchVolume: 16000, cpc: '$1.75', engineType: 'seo-serp' },
  { id: 'T191', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'Schema Markup Generator', primaryKeyword: 'schema markup generator', seoUrl: '/seo-website-owners/schema-markup-generator/', markets: 'US, UK, CA, AU', searchVolume: 62000, cpc: '$2.80', engineType: 'seo-serp' },
  { id: 'T198', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'Open Graph Preview Tool', primaryKeyword: 'open graph preview', seoUrl: '/seo-website-owners/open-graph-preview-tool/', markets: 'US, UK, CA, AU', searchVolume: 34000, cpc: '$1.85', engineType: 'seo-serp' },
  { id: 'T199', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'Twitter Card Preview Tool', primaryKeyword: 'twitter card preview', seoUrl: '/seo-website-owners/twitter-card-preview-tool/', markets: 'US, UK, CA, AU', searchVolume: 22000, cpc: '$1.70', engineType: 'seo-serp' },
  { id: 'T200', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'UTM Campaign Builder', primaryKeyword: 'utm builder', seoUrl: '/seo-website-owners/utm-campaign-builder/', markets: 'US, UK, CA, AU', searchVolume: 74000, cpc: '$2.20', engineType: 'seo-serp' },
  { id: 'T203', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'URL Slug Generator', primaryKeyword: 'url slug generator', seoUrl: '/seo-website-owners/url-slug-generator/', markets: 'US, UK, CA, AU', searchVolume: 32000, cpc: '$1.40', engineType: 'word-counter' },
  { id: 'T204', cluster: 'SEO & Website Owners', clusterSlug: 'seo-website-owners', name: 'HTTP Status Code Checker', primaryKeyword: 'http status checker', seoUrl: '/seo-website-owners/http-status-code-checker/', markets: 'US, UK, CA, AU', searchVolume: 48000, cpc: '$1.60', engineType: 'seo-serp' },

  // Developer & Data
  { id: 'T215', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'URL Encoder Decoder', primaryKeyword: 'url encoder decoder', seoUrl: '/developer-data/url-encoder-decoder/', markets: 'US, UK, CA, AU, FR', searchVolume: 140000, cpc: '$0.80', engineType: 'base64-tool' },
  { id: 'T217', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'Regex Tester', primaryKeyword: 'regex tester', seoUrl: '/developer-data/regex-tester/', markets: 'US, UK, CA, AU, FR', searchVolume: 220000, cpc: '$1.15', engineType: 'developer-regex' },
  { id: 'T218', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'SQL Formatter', primaryKeyword: 'sql formatter', seoUrl: '/developer-data/sql-formatter/', markets: 'US, UK, CA, AU, FR', searchVolume: 110000, cpc: '$1.20', engineType: 'json-formatter' },
  { id: 'T219', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'Text Diff Checker', primaryKeyword: 'diff checker', seoUrl: '/developer-data/text-diff-checker/', markets: 'US, UK, CA, AU, FR', searchVolume: 180000, cpc: '$1.10', engineType: 'text-diff' },
  { id: 'T220', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'HTML Minifier', primaryKeyword: 'html minifier', seoUrl: '/developer-data/html-minifier/', markets: 'US, UK, CA, AU, FR', searchVolume: 42000, cpc: '$0.90', engineType: 'json-formatter' },
  { id: 'T221', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'CSS Minifier', primaryKeyword: 'css minifier', seoUrl: '/developer-data/css-minifier/', markets: 'US, UK, CA, AU, FR', searchVolume: 54000, cpc: '$0.85', engineType: 'json-formatter' },
  { id: 'T222', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'JavaScript Minifier', primaryKeyword: 'javascript minifier', seoUrl: '/developer-data/javascript-minifier/', markets: 'US, UK, CA, AU, FR', searchVolume: 61000, cpc: '$0.95', engineType: 'json-formatter' },
  { id: 'T227', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'Cron Expression Parser', primaryKeyword: 'cron expression parser', seoUrl: '/developer-data/cron-expression-parser/', markets: 'US, UK, CA, AU, FR', searchVolume: 38000, cpc: '$1.05', engineType: 'developer-regex' },
  { id: 'T228', cluster: 'Developer & Data', clusterSlug: 'developer-data', name: 'Unix Timestamp Converter', primaryKeyword: 'unix timestamp converter', seoUrl: '/developer-data/unix-timestamp-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 160000, cpc: '$0.90', engineType: 'hourly-salary' },

  // Tax & Local Compliance
  { id: 'T326', cluster: 'Tax & Local Compliance', clusterSlug: 'tax-local-compliance', name: 'French TVA Calculator', primaryKeyword: 'calculateur tva', seoUrl: '/tax-local-compliance/french-tva-calculator/', markets: 'FR', searchVolume: 74000, cpc: '$1.30', engineType: 'vat-calculator' },
  { id: 'T327', cluster: 'Tax & Local Compliance', clusterSlug: 'tax-local-compliance', name: 'French Net to Gross Salary Calculator', primaryKeyword: 'simulateur salaire brut net', seoUrl: '/tax-local-compliance/french-net-to-gross-salary-calculator/', markets: 'FR', searchVolume: 120000, cpc: '$1.50', engineType: 'hourly-salary' },
  { id: 'T328', cluster: 'Tax & Local Compliance', clusterSlug: 'tax-local-compliance', name: 'US 1099 Tax Estimator', primaryKeyword: '1099 tax calculator', seoUrl: '/tax-local-compliance/us-1099-tax-estimator/', markets: 'US', searchVolume: 85000, cpc: '$2.60', engineType: 'vat-calculator' },
  { id: 'T329', cluster: 'Tax & Local Compliance', clusterSlug: 'tax-local-compliance', name: 'IRS Mileage Reimbursement Calculator', primaryKeyword: 'mileage reimbursement calculator', seoUrl: '/tax-local-compliance/irs-mileage-reimbursement-calculator/', markets: 'US', searchVolume: 41000, cpc: '$1.80', engineType: 'hourly-rate' },
  { id: 'T330', cluster: 'Tax & Local Compliance', clusterSlug: 'tax-local-compliance', name: 'UK Dividend Tax Estimator', primaryKeyword: 'dividend tax calculator uk', seoUrl: '/tax-local-compliance/uk-dividend-tax-estimator/', markets: 'UK', searchVolume: 29000, cpc: '$2.10', engineType: 'vat-calculator' },
  { id: 'T332', cluster: 'Tax & Local Compliance', clusterSlug: 'tax-local-compliance', name: 'VAT Inclusive Price Calculator', primaryKeyword: 'vat inclusive calculator', seoUrl: '/tax-local-compliance/vat-inclusive-price-calculator/', markets: 'US, UK, CA, AU', searchVolume: 36000, cpc: '$1.40', engineType: 'vat-calculator' },

  // Career & Productivity
  { id: 'T281', cluster: 'Career & Productivity', clusterSlug: 'career-productivity', name: 'Resume Builder', primaryKeyword: 'resume builder', seoUrl: '/career-productivity/resume-builder/', markets: 'US, UK, CA, AU', searchVolume: 850000, cpc: '$3.50', engineType: 'invoice-generator' },
  { id: 'T282', cluster: 'Career & Productivity', clusterSlug: 'career-productivity', name: 'ATS Resume Checker', primaryKeyword: 'ats resume checker', seoUrl: '/career-productivity/ats-resume-checker/', markets: 'US, UK, CA, AU', searchVolume: 92000, cpc: '$2.80', engineType: 'word-counter' },
  { id: 'T283', cluster: 'Career & Productivity', clusterSlug: 'career-productivity', name: 'Cover Letter Generator', primaryKeyword: 'cover letter generator', seoUrl: '/career-productivity/cover-letter-generator/', markets: 'US, UK, CA, AU', searchVolume: 140000, cpc: '$2.60', engineType: 'creator-titles' },
  { id: 'T285', cluster: 'Career & Productivity', clusterSlug: 'career-productivity', name: 'Salary to Hourly Calculator', primaryKeyword: 'salary to hourly calculator', seoUrl: '/career-productivity/salary-to-hourly-calculator/', markets: 'US, UK, CA, AU', searchVolume: 110000, cpc: '$1.50', engineType: 'hourly-salary' },
  { id: 'T287', cluster: 'Career & Productivity', clusterSlug: 'career-productivity', name: 'PTO Accrual Calculator', primaryKeyword: 'pto accrual calculator', seoUrl: '/career-productivity/pto-accrual-calculator/', markets: 'US, UK, CA, AU', searchVolume: 35000, cpc: '$1.60', engineType: 'hourly-salary' },
  { id: 'T293', cluster: 'Career & Productivity', clusterSlug: 'career-productivity', name: 'GPA Calculator', primaryKeyword: 'gpa calculator', seoUrl: '/career-productivity/gpa-calculator/', markets: 'US, UK, CA, AU', searchVolume: 450000, cpc: '$0.95', engineType: 'hourly-salary' },

  // Design & Creative
  { id: 'T311', cluster: 'Design & Creative', clusterSlug: 'design-creative', name: 'RGB to HEX Converter', primaryKeyword: 'rgb to hex', seoUrl: '/design-creative/rgb-to-hex-converter/', markets: 'US, UK, CA, AU, FR', searchVolume: 95000, cpc: '$0.40', engineType: 'color-tool' },
  { id: 'T314', cluster: 'Design & Creative', clusterSlug: 'design-creative', name: 'Color Palette Generator', primaryKeyword: 'color palette generator', seoUrl: '/design-creative/color-palette-generator/', markets: 'US, UK, CA, AU, FR', searchVolume: 180000, cpc: '$0.90', engineType: 'color-tool' },
  { id: 'T315', cluster: 'Design & Creative', clusterSlug: 'design-creative', name: 'CSS Gradient Generator', primaryKeyword: 'css gradient generator', seoUrl: '/design-creative/css-gradient-generator/', markets: 'US, UK, CA, AU, FR', searchVolume: 120000, cpc: '$0.85', engineType: 'color-tool' },
  { id: 'T316', cluster: 'Design & Creative', clusterSlug: 'design-creative', name: 'Aspect Ratio Calculator', primaryKeyword: 'aspect ratio calculator', seoUrl: '/design-creative/aspect-ratio-calculator/', markets: 'US, UK, CA, AU, FR', searchVolume: 74000, cpc: '$0.75', engineType: 'color-tool' },
  { id: 'T322', cluster: 'Design & Creative', clusterSlug: 'design-creative', name: 'Meme Maker', primaryKeyword: 'meme generator', seoUrl: '/design-creative/meme-maker/', markets: 'US, UK, CA, AU, FR', searchVolume: 350000, cpc: '$0.60', engineType: 'image-watermark' }
];

// Combine and generate fallback GEO metadata for any partial tools
export const ALL_TOOLS_DATA: ToolItem[] = [
  ...RAW_TOOLS_DATA,
  ...ADDITIONAL_TOOLS.map(t => {
    const existing = RAW_TOOLS_DATA.find(r => r.id === t.id);
    if (existing) return existing;
    return {
      id: t.id || 'T999',
      cluster: t.cluster || 'General Utility',
      clusterSlug: t.clusterSlug || 'general',
      name: t.name || 'Online Tool',
      primaryKeyword: t.primaryKeyword || (t.name?.toLowerCase() || 'tool'),
      seoUrl: t.seoUrl || `/utility/${t.id}/`,
      markets: t.markets || 'US, UK, CA, AU',
      intent: 'Transactional Utility',
      searchVolume: t.searchVolume || 25000,
      cpc: t.cpc || '$1.20',
      phase: '2 - Cluster expansion',
      category: t.cluster || 'Utilities',
      shortDesc: `Free, private online ${t.name} with instant processing, zero signups, and high performance.`,
      geoSummary: `AnyShift ${t.name} runs high-performance client-side logic to execute calculations and transformations instantly in your browser memory without server tracking.`,
      howToSteps: [
        `Select your options or input your parameters into the ${t.name} interface.`,
        'Customize settings, review live formula calculations or preview.',
        'Copy your result or download the processed file output instantly.'
      ],
      faqs: [
        { question: `Is AnyShift ${t.name} free?`, answer: `Yes, ${t.name} is 100% free with unlimited usage and no account required.` },
        { question: 'Is my input private?', answer: 'Yes, calculations and conversions execute in your local browser sandbox.' }
      ],
      keywords: [`free ${t.primaryKeyword}`, `best ${t.name} online`, `${t.name} no watermark`, `${t.name} calculator`],
      engineType: t.engineType || 'generic-tool'
    } as ToolItem;
  })
];

export function getAllTools(): ToolItem[] {
  return ALL_TOOLS_DATA;
}

export function searchTools(query: string, clusterFilter?: string): ToolItem[] {
  const q = query.toLowerCase().trim();
  let list = ALL_TOOLS_DATA;
  if (clusterFilter && clusterFilter !== 'all') {
    list = list.filter(t => t.clusterSlug === clusterFilter);
  }
  if (!q) return list;

  return list.filter(t => 
    t.name.toLowerCase().includes(q) ||
    t.primaryKeyword.toLowerCase().includes(q) ||
    t.cluster.toLowerCase().includes(q) ||
    t.keywords.some(k => k.toLowerCase().includes(q)) ||
    t.shortDesc.toLowerCase().includes(q)
  );
}
