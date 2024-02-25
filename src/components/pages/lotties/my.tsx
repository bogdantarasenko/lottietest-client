import localforage from 'localforage';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Text, Box, Center, Heading, VStack } from '@chakra-ui/react';
import { Spinner, PopUp, TagSelect, GridList, Pagination } from '@/components/ui';
import { QUERY_MY_LOTTIES } from '@/services/graphql/myLotties';
import { DELETE_LOTTIE_MUTATION } from '@/services/graphql/deleteLottie';
import { GetMyLottiesQuery, GetMyLottiesQueryVariables, Lottie } from 'src/types/gql/graphql';
import LottieFile from '@/components/lottieFile';

const MyLotiesPageComponent: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedLottie, setSelectedLottie] = useState<Lottie | null>(null);
  const { data, loading, error } = useQuery<GetMyLottiesQuery, GetMyLottiesQueryVariables>(
    QUERY_MY_LOTTIES,
    {
      variables: {
        tags,
        page,
        pageSize: 8
      }
    }
  );

  const [deleteLottie] = useMutation(DELETE_LOTTIE_MUTATION, {
    update(cache) {
      if (selectedLottie) {
        cache.evict({ id: cache.identify({ __typename: 'Lottie', id: selectedLottie.id }) });
        cache.gc();
      }
    },
  });

  const handleLottieClick = (lottie: Lottie) => {
    setSelectedLottie(lottie);
  };

  const handleLottieDelete = async (lottieId: string) => {
    await deleteLottie({
      variables: {
        input: {
          lottieId,
        },
      },
    });
    await localforage.removeItem(lottieId);
    setSelectedLottie(null);
  }

  if (loading) {
    return (
      <Center h="calc(100vh - 58px)">
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return <p>ERROR: {error.message}</p>;
  }

  if (!data || !data.getMy || !data.getMy.results.length) {
    return (
      <Center h="calc(100vh - 58px)">
        <Text>Not found</Text>
      </Center>
    );
  }

  const { results, hasPreviousPage, hasNextPage, totalPages } = data.getMy;

  return (
    <Box w="full" py={10}>
      <VStack>
        <Heading size="md" color="gray.500">
          <TagSelect tags={tags} onChange={setTags} />
        </Heading>
        <GridList>
          {results.map((lottie) => (
            <LottieFile
              key={lottie.id}
              lottie={lottie}
              isAuthor={false}
              onSelect={() => handleLottieClick(lottie)}
            />
          ))}
        </GridList>
      </VStack>
      <Pagination
        page={page}
        changePage={setPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
      {selectedLottie && (
        <PopUp
          isOpen={selectedLottie !== null}
          onClose={() => setSelectedLottie(null)}
        >
          <LottieFile
            isFull
            isAuthor
            key={selectedLottie.id}
            lottie={selectedLottie}
            onDelete={handleLottieDelete}
          />
        </PopUp>
      )}
    </Box>
  );
};

export default MyLotiesPageComponent;
