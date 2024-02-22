import { Button, HStack } from "@chakra-ui/react";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  changePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  changePage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}) => {
  const handlePrevious = () => {
    if (hasPreviousPage) {
      const prevPage = Math.max(page - 1, 1);
      changePage(prevPage);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      const nextPage = page + 1;
      changePage(nextPage);
    }
  };

  return (
    <HStack spacing={4} justify="center" p={4}>
      <Button onClick={handlePrevious} isDisabled={!hasPreviousPage}>
        Previous
      </Button>
      <span>Page {page} of {totalPages}</span>
      <Button onClick={handleNext} isDisabled={!hasNextPage}>
        Next
      </Button>
    </HStack>
  );
};
