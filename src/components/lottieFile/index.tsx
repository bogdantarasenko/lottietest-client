import React from 'react';
import ReactLottie from 'react-lottie';
import localforage from 'localforage';
import { Lottie } from 'src/types/gql/graphql';
import { FaTrash, FaArrowAltCircleDown } from 'react-icons/fa';
import { Badge, Flex, Text, Box, Divider, IconButton } from '@chakra-ui/react';

type Props = {
  lottie: Lottie;
  isFull?: boolean;
  isAuthor?: boolean;
  onSelect?: () => void;
  onDelete?: (lottieId: string) => void;
};

const LottieFile: React.FC<Props> = ({ isAuthor, isFull, lottie, onSelect, onDelete }) => {
  if (!lottie) return null;

  const { id, path, tags, author } = lottie;

  const [animationData, setAnimationData] = React.useState<{} | null>(null);

  React.useEffect(() => {
    const fetchAndCacheLottie = async () => {
      const cacheKey = `lottie-${id}`;
      const cachedData = await localforage.getItem(cacheKey);

      if (cachedData) {
        setAnimationData(cachedData);
      } else {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/${path}`)
          .then(response => response.json())
          .then(data => {
            localforage.setItem(cacheKey, data).then(() => {
              setAnimationData(data);
            });
          })
          .catch(error => console.log(error));
      }
    };

    fetchAndCacheLottie();
  }, [id, path]);

  const handleDownload = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/files/${path}`;
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      const cachedData = await localforage.getItem(`lottie-${id}`);
      const blob = new Blob([JSON.stringify(cachedData)], { type: 'application/json' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(lottie.id);
    }
  }

  if (!animationData) {
    return null;
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Box onClick={onSelect} minW="xlg" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5" bg="cardBg">
      <Box display="flex" flexDirection={['column', 'row']}>
        <ReactLottie options={defaultOptions} height={200} width={200} />
      </Box>
      {isFull && (
        <Box>
          <Divider my="3" />
          <Flex align="center" justify="space-between">
            <Box>
              {tags.map((tag, index) => (
                <Badge key={index} px="2" py="1" borderRadius="full" colorScheme="teal" fontSize="xx-small">
                  {tag}
                </Badge>
              ))}
            </Box>
            <Box>
              {isAuthor && (
                <IconButton
                  colorScheme="red"
                  aria-label="Delete lottie file"
                  icon={<FaTrash />}
                  onClick={handleDelete}
                />
              )}
              <IconButton
                ml="2"
                colorScheme="green"
                aria-label="Download lottie file"
                icon={<FaArrowAltCircleDown />}
                onClick={handleDownload}
              />
            </Box>
          </Flex>
          <Divider my="3" />
          <Text fontSize='md'>{author.username}</Text>
        </Box>
      )}
    </Box>
  );
};

export default LottieFile;
