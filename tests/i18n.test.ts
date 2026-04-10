import i18n, {loadLocale} from '@/utils/i18n';

const originalEnv = process.env.NEXT_PUBLIC_BASE_PATH;

describe('i18n initialization', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('initializes with fallbackLng: en', () => {
        expect(i18n.options.fallbackLng).toBe('en');
    });

    it('uses localStorage value if available', () => {
        const localStorageSpy = jest.spyOn(window.localStorage, 'getItem');
        localStorageSpy.mockReturnValue('zh');

        const testI18n = require('@/utils/i18n').default;
        expect(testI18n.options.lng).toBe('zh');
    });

    it('initializes with empty resources', () => {
        expect(i18n.options.resources).toEqual({});
    });
});

describe('loadLocale', () => {
    const fetchMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = fetchMock;
    });

    afterEach(() => {
        process.env.NEXT_PUBLIC_BASE_PATH = originalEnv;
    });

    it('fetches correct path for locale', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({common: {footer: 'footer'}}),
        });

        await loadLocale('en');

        expect(fetchMock).toHaveBeenCalledWith('/locales/en.json');
    });

    it('uses NEXT_PUBLIC_BASE_PATH when set', async () => {
        process.env.NEXT_PUBLIC_BASE_PATH = '/my-app';
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({common: {footer: 'footer'}}),
        });

        await loadLocale('en');

        expect(fetchMock).toHaveBeenCalledWith('/my-app/locales/en.json');
    });

    it('adds resource bundle after successful fetch', async () => {
        const resourceData = {common: {footer: 'footer', sidebar: 'sidebar'}};
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(resourceData),
        });

        await loadLocale('fr');

        const resources = i18n.getResourceBundle('fr', 'translation');
        expect(resources).toEqual(resourceData);
    });

    it('changes language after loading', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({common: {footer: 'footer'}}),
        });

        await loadLocale('de');

        expect(i18n.language).toBe('de');
    });

    it('handles fetch failure gracefully', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await loadLocale('invalid-lang');

        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
