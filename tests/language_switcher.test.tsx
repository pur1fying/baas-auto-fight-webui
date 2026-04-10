import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSwitcher from '@/components/i18n/language_switcher';
import {I18nProvider} from '@/components/i18n/i18n_provider';

jest.mock('@/utils/i18n', () => ({
    loadLocale: jest.fn().mockResolvedValue(undefined),
}));

const languages = [
    {code: 'en', label: 'English'},
    {code: 'zh', label: '简体中文'},
    {code: 'zh-tw', label: '繁體中文'},
    {code: 'de', label: 'Deutsch'},
    {code: 'fr', label: 'Français'},
    {code: 'ka', label: 'ქართული'},
    {code: 'ko', label: '한국어'},
    {code: 'ru', label: 'Русский'},
];

const renderLanguageSwitcher = () => {
    return render(
        <I18nProvider>
            <LanguageSwitcher />
        </I18nProvider>
    );
};

describe('LanguageSwitcher', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('renders with default language', () => {
        renderLanguageSwitcher();

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('clicking opens select panel', async () => {
        renderLanguageSwitcher();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('English')).toBeInTheDocument();
        });
    });

    it('displays all supported languages', async () => {
        renderLanguageSwitcher();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            languages.forEach((lang) => {
                expect(screen.getByText(lang.label)).toBeInTheDocument();
            });
        });
    });

    it('current language shows as selected', async () => {
        renderLanguageSwitcher();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            const selectedItem = screen.getByRole('option', {selected: true});
            expect(selectedItem).toHaveTextContent('English');
        });
    });

    it('loadLocale is called when changing language', async () => {
        const {loadLocale} = require('@/utils/i18n');
        renderLanguageSwitcher();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => screen.getByText('简体中文'));

        const chineseOption = screen.getByRole('option', {name: '简体中文'});
        fireEvent.click(chineseOption);

        await waitFor(() => {
            expect(loadLocale).toHaveBeenCalledWith('zh');
        });
    });

    it('saves language preference to localStorage', async () => {
        renderLanguageSwitcher();

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => screen.getByText('Deutsch'));

        const germanOption = screen.getByRole('option', {name: 'Deutsch'});
        fireEvent.click(germanOption);

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('i18nextLng', 'de');
        });
    });
});
