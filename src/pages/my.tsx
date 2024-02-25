import Head from 'next/head';
import { Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { GetServerSideProps, NextPage } from 'next';
import { authOptions } from './api/auth/[...nextauth]';
import SessionType from '@/types/declaration/session';
import MyLotties from '@/components/pages/lotties/my';

type Props = {
  session: SessionType;
};

const MyPage: NextPage<Props> = props => {
  const { status } = useSession();

  if (status === 'loading') return <Spinner />;

  return (
    <>
      <Head>
        <title>Lottie Files</title>
      </Head>
      <MyLotties />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session || !session.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {
      user: session.user || null
    },
  };
};


export default MyPage;
