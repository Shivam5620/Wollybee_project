import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Footer from './components/footer/Footer';
import StoreProvider from './StoreProvider';
import Provider from './Provider';
import HeaderContainer from './components/header/HeaderContainer';
import MobileBottomNavContainer from './MobileBottomNavContainer';
import { Toaster } from '../ui/components/ui/toaster';
import RefreshTokenErrorTracker from './components/header/RefreshTokenErrorTracker';
import FooterContainer from './components/footer/FooterContainer';
import { keywords } from '@repo/ui/lib';
import Head from 'next/head';
import Whatsapp from './components/header/Whatsapp';

const heyComicFont = localFont({
  src: '../../public/fonts/HeyComic.ttf',
  variable: '--font-heycomic',
});

const cheriFont = localFont({
  src: '../../public/fonts/CheriV2.ttf',
  variable: '--font-cheri',
});

const helveticaFont = localFont({
  src: '../../public/fonts/Helvetica.ttf',
  variable: '--font-helvetica',
});

const helveticaRoundedBoldFont = localFont({
  src: '../../public/fonts/helvetica-rounded-bold.ttf',
  variable: '--font-helvetica-rounded-bold',
});

const helveticaObliqueFont = localFont({
  src: '../../public/fonts/Helvetica-Oblique.ttf',
  variable: '--font-helvetica-oblique',
});

export const metadata: Metadata = {
  title: {
    default: 'Fun & Educational Games for Kids | Learn & Play | wollybee',
    template: '%s | wollybee',
  },
  description:
    'Discover engaging educational games at Wollybee! Our games are designed to spark curiosity, develop critical thinking skills, and make learning enjoyable for children of all ages.',
  twitter: {
    card: 'summary_large_image',
  },
  keywords: keywords,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <StoreProvider>
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
        </Head>

        <body
          className={`${heyComicFont.variable} ${cheriFont.variable} ${helveticaFont.variable} ${helveticaObliqueFont.variable} ${helveticaRoundedBoldFont.variable}`}
        >
          <Provider>
            <RefreshTokenErrorTracker />
            <HeaderContainer />
            {children}
            <MobileBottomNavContainer />
            <Whatsapp />
            <FooterContainer />
            <Toaster />
          </Provider>
        </body>
      </html>
    </StoreProvider>
  );
}
