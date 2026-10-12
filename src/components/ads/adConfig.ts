export interface AdConfiguration {
  enabled: boolean;
  adsterraDirectLink: string;
  adsterraDirectLink2: string;
  adsterraDirectLink3: string;
  adsterraBannerCode: string;
  adsterraPopunderCode: string;
  interstitialDelaySeconds: number;
  twoClickUnlockEnabled: boolean;
  activeNiche: 'tech' | 'finance' | 'crypto' | 'hosting';
}

const STORAGE_KEY = 'anyshift_ad_config_v2';

export const ADSTERRA_KEYS = {
  BANNER_728x90: {
    key: '1c78bd265bd802ac4255c398698bd9d6',
    width: 728,
    height: 90,
    url: 'https://bauval.org/22/1c78bd265bd802ac4255c398698bd9d6'
  },
  BANNER_300x250: {
    key: '1PDx4Vtw4YF6XfduRwwS6nKZ6sPAC9nCeR',
    width: 300,
    height: 250,
    url: 'https://bauval.org/22/1PDx4Vtw4YF6XfduRwwS6nKZ6sPAC9nCeR'
  },
  BANNER_160x600: {
    key: 'd18a14a1ece8b1aa92f8607b47a5c5b8',
    width: 160,
    height: 600,
    url: 'https://bauval.org/22/d18a14a1ece8b1aa92f8607b47a5c5b8'
  },
  BANNER_160x300: {
    key: '498d81a32aae952c83a598850b26b34f',
    width: 160,
    height: 300,
    url: 'https://bauval.org/22/498d81a32aae952c83a598850b26b34f'
  },
  BANNER_468x60: {
    key: '065f7cffd4091b02a37c38918916a40c',
    width: 468,
    height: 60,
    url: 'https://bauval.org/22/065f7cffd4091b02a37c38918916a40c'
  },
  BANNER_320x50: {
    key: '162ae34ef718651e6e977e760527808a',
    width: 320,
    height: 50,
    url: 'https://bauval.org/22/162ae34ef718651e6e977e760527808a'
  },
  NATIVE_BANNER: {
    containerId: 'container-a9ab4dc37c9b6750f7bb87e000559a57',
    src: 'https://bauval.org/21/a9ab4dc37c9b6750f7bb87e000559a57'
  },
  POPUNDER_SRC: 'https://abscloud.org/1/0e2269b6eaf345c438470b953fc2408c',
  SOCIAL_BAR_SRC: 'https://bauval.org/14/809a5e30aa99de1285a97cb8b2b666f1',
  SMARTLINKS: [
    'https://auctionr.org/4/aee37c6e23620c7bc64427f62ec7841c',
    'https://auctionr.org/4/94190a1PDx4Vtw4YF6XfduRwwS6nKZ6sPAC9nCeR',
    'https://araplhn.org/4/e4c9064c8e0f4c2964141cde833bdf0c'
  ]
};

export const defaultAdConfig: AdConfiguration = {
  enabled: true,
  adsterraDirectLink: ADSTERRA_KEYS.SMARTLINKS[0],
  adsterraDirectLink2: ADSTERRA_KEYS.SMARTLINKS[1],
  adsterraDirectLink3: ADSTERRA_KEYS.SMARTLINKS[2],
  adsterraBannerCode: '',
  adsterraPopunderCode: ADSTERRA_KEYS.POPUNDER_SRC,
  interstitialDelaySeconds: 4,
  twoClickUnlockEnabled: true,
  activeNiche: 'tech'
};

export function getAdConfig(): AdConfiguration {
  if (typeof window === 'undefined') return defaultAdConfig;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAdConfig;
    return { ...defaultAdConfig, ...JSON.parse(raw) };
  } catch {
    return defaultAdConfig;
  }
}

export function saveAdConfig(cfg: AdConfiguration): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  window.dispatchEvent(new CustomEvent('anyshift_ads_updated', { detail: cfg }));
}

// Function to trigger direct link in new tab or popup
export function triggerSmartlink(urlIndex: number = 0): void {
  if (typeof window === 'undefined') return;
  const cfg = getAdConfig();
  const links = [cfg.adsterraDirectLink, cfg.adsterraDirectLink2, cfg.adsterraDirectLink3].filter(Boolean);
  const target = links[urlIndex % links.length] || ADSTERRA_KEYS.SMARTLINKS[0];
  window.open(target, '_blank', 'noopener,noreferrer');
}

export interface SponsorAd {
  title: string;
  headline: string;
  badge: string;
  cpcValue: string;
  cta: string;
  image: string;
  url: string;
  category: string;
}

export const SPONSOR_ADS: SponsorAd[] = [
  {
    title: 'Adsterra High CPM Sponsor',
    headline: 'Unlock premium high-speed downloads, unlimited file batching, and cloud acceleration.',
    badge: 'Sponsored • US / Global Partner',
    cpcValue: '$18.40 CPC',
    cta: 'Claim Free Access',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    url: ADSTERRA_KEYS.SMARTLINKS[0],
    category: 'hosting'
  },
  {
    title: 'Special Merchant Sponsor',
    headline: 'Top eCommerce and digital seller rewards for United States, UK, and Canada users.',
    badge: 'Sponsored • Verified Offer',
    cpcValue: '$24.50 CPC',
    cta: 'Unlock Special Deal',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=600&auto=format&fit=crop&q=80',
    url: ADSTERRA_KEYS.SMARTLINKS[1],
    category: 'ecommerce'
  },
  {
    title: 'Secure Cloud Network',
    headline: 'Encrypted private connection, anti-tracking protection, and fast downloads.',
    badge: 'Sponsored • Cyber Security',
    cpcValue: '$14.20 CPC',
    cta: 'Get 68% Off Deal',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    url: ADSTERRA_KEYS.SMARTLINKS[2],
    category: 'security'
  }
];
