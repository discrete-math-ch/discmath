const withNextra = require('nextra')({
  output: 'export',
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  latex: true
})
 
module.exports = withNextra()
