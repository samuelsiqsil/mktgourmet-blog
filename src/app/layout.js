import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import Image from 'next/image'
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const PlayfairDisplay = Playfair_Display({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'Blog Marketing Gourmet: Marketing Digital para Restaurantes',
    template: '%s | Marketing Gourmet',
  },
  description: 'Estratégias de marketing digital para restaurantes: Google Meu Negócio, Instagram, iFood, anúncios patrocinados e como aparecer no ChatGPT.',
  metadataBase: new URL('https://blog.marketinggourmet.com.br'),
  openGraph: {
    siteName: 'Marketing Gourmet',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },

}
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Marketing Gourmet',
  url: 'https://marketinggourmet.com.br',
  logo: 'https://marketinggourmet.com.br/logo.png',
  description: 'Agência de marketing digital especializada em restaurantes em Brasília. Ajudamos restaurantes a aumentar vendas com Google Meu Negócio, Instagram, iFood e anúncios patrocinados.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Brasília',
    addressRegion: 'DF',
    addressCountry: 'BR',
  },
  sameAs: [
    'https://www.instagram.com/mkt_gourmet/',
    'https://blog.marketinggourmet.com.br',
  ],
}

function MobileMenu() {
  return (
    <details className="sm:hidden relative">
      <summary className="list-none cursor-pointer flex items-center justify-center w-11 h-11">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 7H20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M4 12H20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M4 17H20"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </summary>

      <div className="absolute -right-[30px] top-[58px] w-[100dvw] border border-[#1f2937] bg-[#0B0B0B] p-5 shadow-2xl z-50">
        <nav className="flex flex-col gap-5 text-white">
          <Link
            href="https://marketinggourmet.com.br/"
            className="hover:text-green-400 transition-colors"
          >
            Início
          </Link>

          <Link
            href="https://marketinggourmet.com.br/estudos-de-caso"
            className="hover:text-green-400 transition-colors"
          >
            Estudos de Caso
          </Link>

          <Link
            href="/"
            className="hover:text-green-400 transition-colors"
          >
            Blog
          </Link>

          <Link
            href="https://api.whatsapp.com/send/?phone=5561998489959&text=Ol%C3%A1%2C+gostaria+de+solicitar+meu+diagn%C3%B3stico+gratuito+para+o+meu+restaurante.&type=phone_number&app_absent=0"
            className="bg-[#16a34a] hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 text-center mt-2"
          >
            Diagnóstico Gratuito
          </Link>
        </nav>
      </div>
    </details>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
        <header className="fixed top-0 left-0 right-0 z-20 border-b bg-black/96 border-[#1f2937] py-1 font-[16px]">
          <div className="max-w-[1368px] mx-auto h-16 px-4 flex items-center justify-between">
            <div></div>

            {/* Desktop */}
            <nav className="hidden sm:flex items-center gap-6 text-white self-center">
              <Link
                href="https://marketinggourmet.com.br/"
                className="hover:text-green-400 transition-colors"
              >
                Início
              </Link>

              <Link
                href="https://marketinggourmet.com.br/estudos-de-caso"
                className="hover:text-green-400 transition-colors"
              >
                Estudos de Caso
              </Link>

              <Link
                href="/"
                className="hover:text-green-400 transition-colors"
              >
                Blog
              </Link>
            </nav>

            {/* Desktop botão */}
            <Link
              className="hidden sm:flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium bg-[#16a34a] hover:bg-green-700 text-white px-6 py-[10px] rounded-full transition-all duration-300 hover:scale-105"
              href="https://api.whatsapp.com/send/?phone=5561998489959&text=Ol%C3%A1%2C+gostaria+de+solicitar+meu+diagn%C3%B3stico+gratuito+para+o+meu+restaurante.&type=phone_number&app_absent=0"
            >
              Diagnóstico Gratuito
            </Link>

            {/* Mobile menu */}
            <MobileMenu />
          </div>
        </header>

        <main className="flex-1 pt-20">
          {children}
        </main>

        <footer className="flex flex-col items-center w-fit mx-auto py-13 text-gray-400 gap-3 text-center px-4">


          <div className="flex items-center gap-3">
            <div>
              © 2025 Marketing Gourmet. Todos os direitos reservados.
            </div>

            <a
              href="https://www.instagram.com/mkt_gourmet/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  width="20"
                  height="20"
                  x="2"
                  y="2"
                  rx="5"
                  ry="5"
                ></rect>

                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>

                <line
                  x1="17.5"
                  x2="17.51"
                  y1="6.5"
                  y2="6.5"
                ></line>
              </svg>
            </a>
          </div>


            <div className="flex gap-3 items-center">
              <p>Desenvolvido por</p>
              <a href="https://ateliepixel.com/">
                <Image src={'/logo-atelie.webp'} width={20} height={20} alt="Atelie Pixel"/>
              </a>
            </div>
        </footer>
      </body>
    </html>
  );
}
