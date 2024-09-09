import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import { DocsThemeConfig } from 'nextra-theme-docs'


export default {
     docsRepositoryBase: 'https://github.com/tobotis/discmath',
    logo: <p className='font-serif'>Discrete Mathematics</p>,
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
      
    primaryHue: {dark: 73, light:73 },
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