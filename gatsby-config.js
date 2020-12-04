module.exports = {
  siteMetadata: {
    title: 'Tweni Tweni',
    description: 'Calendrier Restrospectif',
    author: 'Eunice Tchitchiama',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true,
      }
    },
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'twenitweni',
        schemas: {
          article: require('./src/schemas/article.json'),
          genesis: require('./src/schemas/genesis.json'),
          inspiration_page: require('./src/schemas/inspiration_page.json'),
          inspiration: require('./src/schemas/inspiration.json'),
          legal_notice: require('./src/schemas/legal_notice.json'),
          mix_page: require('./src/schemas/mix_page.json'),
          mix: require('./src/schemas/mix.json'),
        }
      }
    }
  ],
}
