import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Text, Box, Center, Heading, VStack } from '@chakra-ui/react';
import { Spinner, PopUp, TagSelect, GridList, Pagination } from '@/components/ui';
import { QUERY_ALL_LOTTIES } from '@/services/graphql/allLotties';
import { GetAllLottiesQuery, GetAllLottiesQueryVariables, Lottie } from 'src/types/gql/graphql';
import LottieFile from '@/components/lottieFile';

const AllLotiesPageComponent: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedLottie, setSelectedLottie] = useState<Lottie | null>(null);
  const { data, loading, error } = useQuery<GetAllLottiesQuery, GetAllLottiesQueryVariables>(
    QUERY_ALL_LOTTIES,
    {
      variables: {
        tags,
        page,
        pageSize: 8
      }
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
    return <p>ERROR: {error.message}</p>;
  }

  if (!data || !data.getAll || !data.getAll.results.length) {
    return (
      <Center h="calc(100vh - 58px)">
        <Text>Not found</Text>
      </Center>
    );
  }

  const { results, hasPreviousPage, hasNextPage, totalPages } = data.getAll;

  const handleLottieClick = (lottie: Lottie) => {
    setSelectedLottie(lottie);
  };

  return (
    <Box w="full" py={10}>
      <VStack>
        <Heading size="md" color="gray.500" mb={3}>
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
