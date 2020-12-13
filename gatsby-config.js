const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Tweni Tweni',
    description: 'Calendrier Restrospectif',
    author: 'Eunice Tchitchiama',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
      resolve:'gatsby-plugin-root-import',
      options: {
        assets: path.join(__dirname, 'src/assets'),
        components: path.join(__dirname, 'src/components'),
        hooks: path.join(__dirname, 'src/hooks'),
        styles: path.join(__dirname, 'src/styles'),
        utils: path.join(__dirname, 'src/utils'),
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    },
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
