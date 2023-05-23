import GlobalStyle from '@/styles/global';
import type { AppProps } from 'next/app';
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps }: AppProps) {

  return (
    <main className={montserrat.className}>
      <GlobalStyle />
      <Component {...pageProps} />
    </main>
  )
}
