module.exports = {
    input: ['src/**/*.{js,jsx,ts,tsx}'],
    output: 'public/locales/$LOCALE.json',
    indentation: 4,
    locales: ['en', 'zh', 'zh-tw', 'ja', 'ko'],
    sort: true,
    keySeparator: '.',
    namespaceSeparator: false,
    createOldCatalogs: false,
};
