import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import { DocsThemeConfig } from 'nextra-theme-docs'


export default {
     docsRepositoryBase: 'https://github.com/tobotis/discmath',
    logo: <p>discmath.ch</p>,
    project: {
      link: 'https://github.com/tobotis/discmath'
    },
    useNextSeoProps() {
        const { asPath } = useRouter()
        if (asPath !== '/') {
          return {
            titleTemplate: '%s – DiscMath'
          }
        }
      },
      head: function useHead() {
        const { title } = useConfig()
        const { route } = useRouter()
    
        return (
          <>
            <meta name="msapplication-TileColor" content="#fff" />
            <meta name="theme-color" content="#fff" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Language" content="en" />
            <meta
              name="description"
              content="Discrete Mathematics"
            />
            <meta
              name="og:description"
              content="Discrete Mathematics"
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content="" />
            <meta name="twitter:site:domain" content="discmath" />
            <meta name="twitter:url" content="discmath" />
            <meta
              name="og:title"
              content={title ? title + ' – discmath' : 'discmath'}
            />
            <meta name="og:image" content="" />
            <meta name="apple-mobile-web-app-title" content="discmath" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="icon" href="/favicon.png" type="image/png" />
            <link
              rel="icon"
              href="/favicon-dark.svg"
              type="image/svg+xml"
              media="(prefers-color-scheme: dark)"
            />
            <link
              rel="icon"
              href="/favicon-dark.png"
              type="image/png"
              media="(prefers-color-scheme: dark)"
            />
          </>
        )
      },
      editLink: {
        text: 'Edit this page on GitHub →'
      },
      feedback: {
        content: 'Question? Give us feedback →',
        labels: 'feedback'
      },
    primaryHue: {dark: 80, light:80 },
    search: {
      placeholder: "Search..."
    },
    primarySaturation: {dark: 100, light:100},
    footer: {
        text: (
          <div className="flex w-full flex-col items-center sm:items-start">
            <p className="mt-6 text-xs">
              © {new Date().getFullYear()} some student TAs
            </p>
          </div>
        )
      },
  }