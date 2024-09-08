export default {
     docsRepositoryBase: 'https://github.com/tobotis/discmath',
    logo: <span>DiscMath</span>,
    project: {
      link: 'https://github.com/tobotis/discmath'
    },
    primaryHue: {dark: 73, light:73 },
    primarySaturation: {dark: 60, light:60},
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