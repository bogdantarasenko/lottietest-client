import Head from 'next/head';
import { NextPage } from 'next';
import AllLoties from '@/components/pages/lotties/all';

type Props = {};

const HomePage: NextPage<Props> = props => {
  return (
    <>
      <Head>
        <title>Lottie Files</title>
      </Head>
      <AllLoties />
    </>
  );
};

export default HomePage;
