'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || '';

export async function loadLocale(lang: string) {
  try {
    const res = await fetch(`${baseUrl}/locales/${lang}.json`);
    if (!res.ok) throw new Error(`Failed to load locale: ${lang}`);
    const data = await res.json();
    i18n.addResourceBundle(lang, 'translation', data, true, true);
    await i18n.changeLanguage(lang);
  } catch (err) {
    console.error(`[i18n] failed to load ${lang}:`, err);
  }
}

i18n.use(initReactI18next).init({
  lng: typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'en' : 'en',
  fallbackLng: 'en',
  resources: {},
  interpolation: { escapeValue: false },
});

export default i18n;
