const withNextra = require('nextra')({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx',
    latex: true
  })

  
let nextraConfig = withNextra()
nextraConfig.assetPrefix = './'
module.exports = nextraConfig
