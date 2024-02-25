import React, { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { Text, Box, Center, Heading, VStack } from '@chakra-ui/react';
import { Spinner, PopUp, TagSelect, GridList, Pagination } from '@/components/ui';
import { QUERY_ALL_LOTTIES } from '@/services/graphql/allLotties';
import { GetAllLottiesQuery, GetAllLottiesQueryVariables, Lottie } from 'src/types/gql/graphql';
import { filterLottiesOfflineWithTags, useNetworkStatus } from '@/lib/utils';
import LottieFile from '@/components/lottieFile';

const AllLotiesPageComponent: React.FC = () => {
  const pageSize = 8;
  const apolloClient = useApolloClient();
  const networkStatus = useNetworkStatus();
  const [page, setPage] = useState<number>(1);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedLottie, setSelectedLottie] = useState<Lottie | null>(null);

  const { data, loading, error } = useQuery<GetAllLottiesQuery, GetAllLottiesQueryVariables>(
    QUERY_ALL_LOTTIES,
    {
      variables: { tags: networkStatus.online ? tags : [], page, pageSize },
      fetchPolicy: networkStatus.online ? 'cache-and-network' : 'cache-first',
    }
  );

  if (loading) {
    return (
      <Center h="calc(100vh - 58px)">
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="calc(100vh - 58px)">
        <Text>Error: {error.message}</Text>
      </Center>
    );
  }

  if (!data || !data.getAll || !data.getAll.results.length) {
    return (
      <Center h="calc(100vh - 58px)">
        <Text>Not found</Text>
      </Center>
    );
  }

  const handleLottieClick = (lottie: Lottie) => {
    setSelectedLottie(lottie);
  };

  const { results, hasPreviousPage, hasNextPage, totalPages } = networkStatus.online ? data.getAll : filterLottiesOfflineWithTags(
    apolloClient,
    QUERY_ALL_LOTTIES,
    tags,
    page,
    pageSize,
    data.getAll.totalPages
  );

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
            key={selectedLottie.id}
            lottie={selectedLottie}
          />
        </PopUp>
      )}
    </Box>
  );
};

export default AllLotiesPageComponent;
