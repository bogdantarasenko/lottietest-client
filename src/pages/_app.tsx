import React from 'react';
import Head from 'next/head';
import theme from '@/styles/theme';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProviderWrapper } from '../components';
import Layout from '@/components/layout';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>LottieTest PWA</title>
        <meta name="description" content="Test task for lottiefiles." />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LottieTest PWA" />
        <meta property="og:description" content="Best PWA app in the world!" />
        <meta property="og:site_name" content="LottieTest PWA" />
        <meta property="og:url" content="https://lottietest-client.vercel.app" />
        <meta property="og:image" content="/icons/og.png" />
        {/* add the following only if you want to add a startup image for Apple devices. */}
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_2048.png"
          sizes="2048x2732"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1668.png"
          sizes="1668x2224"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1536.png"
          sizes="1536x2048"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1125.png"
          sizes="1125x2436"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1242.png"
          sizes="1242x2208"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_750.png"
          sizes="750x1334"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_640.png"
          sizes="640x1136"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <ApolloProviderWrapper>
            <Layout>
              <Head>
                <title>LottieTest</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </ApolloProviderWrapper>
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
