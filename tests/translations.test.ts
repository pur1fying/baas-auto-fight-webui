import en from '../public/locales/en.json';
import zh from '../public/locales/zh.json';
import zhTw from '../public/locales/zh-tw.json';
import de from '../public/locales/de.json';
import fr from '../public/locales/fr.json';
import ka from '../public/locales/ka.json';
import ko from '../public/locales/ko.json';
import ru from '../public/locales/ru.json';

const locales = {en, zh, 'zh-tw': zhTw, de, fr, ka, ko, ru};
const supportedLocales = Object.keys(locales);
const requiredKeys = Object.keys(en);

function getAllKeys(obj: Record<string, unknown>, prefix = ''): string[] {
    const keys: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            keys.push(...getAllKeys(value as Record<string, unknown>, fullKey));
        } else {
            keys.push(fullKey);
        }
    }
    return keys;
}

function isCamelCase(key: string): boolean {
    const parts = key.split('.');
    for (const part of parts) {
        if (part.length > 0 && !/^[a-zA-Z][a-zA-Z0-9]*$/.test(part)) {
            return false;
        }
    }
    return true;
}

describe('Translation validation', () => {
    describe('Key naming uses camelCase', () => {
        it('all English keys use camelCase', () => {
            const enKeys = getAllKeys(en);
            const nonCamelCaseKeys = enKeys.filter((key) => !isCamelCase(key));

            expect(nonCamelCaseKeys).toEqual([]);
        });
    });

    describe('English locale has all required keys', () => {
        it('has common namespace', () => {
            expect(en.common).toBeDefined();
        });

        it('has languageSwitcher namespace', () => {
            expect(en.languageSwitcher).toBeDefined();
        });

        it('has settings namespace', () => {
            expect(en.settings).toBeDefined();
        });
    });

    describe('No empty string values', () => {
        it('English locale has no empty values', () => {
            const enKeys = getAllKeys(en);

            for (const key of enKeys) {
                const value = key.split('.').reduce((obj: unknown, k) => {
                    if (obj && typeof obj === 'object') {
                        return (obj as Record<string, unknown>)[k];
                    }
                    return undefined;
                }, en as unknown);

                expect(value).not.toBe('');
                expect(value).toBeTruthy();
            }
        });
    });

    describe('All translation keys exist in all locale files', () => {
        const enKeys = getAllKeys(en);

        supportedLocales.forEach((localeCode) => {
            if (localeCode === 'en') return;

            it(`locale "${localeCode}" has all keys from English`, () => {
                const localeKeys = getAllKeys(locales[localeCode as keyof typeof locales] as Record<string, unknown>);
                const missingKeys = enKeys.filter((key) => !localeKeys.includes(key));

                expect(missingKeys).toEqual([]);
            });
        });
    });

    describe('All locale files have no empty strings', () => {
        supportedLocales.forEach((localeCode) => {
            it(`locale "${localeCode}" has no empty values`, () => {
                const localeData = locales[localeCode as keyof typeof locales];
                const keys = getAllKeys(localeData as Record<string, unknown>);

                for (const key of keys) {
                    const value = key.split('.').reduce((obj: unknown, k) => {
                        if (obj && typeof obj === 'object') {
                            return (obj as Record<string, unknown>)[k];
                        }
                        return undefined;
                    }, localeData as unknown);

                    expect(value).not.toBe('');
                }
            });
        });
    });
});
