module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  output: 'public/locales/$LOCALE.json',
  indentation: 2,
  locales: ['en', 'zh', 'zh-tw', 'de', 'fr', 'ka', 'ko', 'ru'],
  sort: true,
  keySeparator: '.',
  namespaceSeparator: false,
  createOldCatalogs: false,
};