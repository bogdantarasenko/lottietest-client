import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { getServerSession } from 'next-auth';
import { GetServerSideProps } from 'next';
import { Box, Button, Container, Flex, Text, VStack, useToast } from '@chakra-ui/react';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { UPLOAD_MUTATION } from '@/services/graphql/uploadLottie';
import { TagInput } from '@/components/ui';

type Props = {
  onUploaded: () => void;
};

const LottieUpload: React.FC<Props> = ({ onUploaded }) => {
  const toast = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const [uploadFileMutation, { loading, error }] = useMutation(UPLOAD_MUTATION);

  const onDrop = useCallback(async ([file]: File[]) => {
    try {
      await uploadFileMutation({
        variables: {
          file,
          input: {
            tags
          }
        },
        refetchQueries: [
          'GetMyLotties',
          'GetAllLotties',
          'GetAllUniqueTags'
        ]
      });
      onUploaded();
      toast({
        title: 'File uploaded successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error uploading file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [uploadFileMutation, toast, tags]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Flex height="calc(50vh - 58px)" alignItems="center" justifyContent="center">
      <Container centerContent>
        <VStack spacing={4}>
          <TagInput tags={tags} onChange={setTags} />
          <Box {...getRootProps()} p={5} border="2px dashed" borderColor="gray.200" borderRadius="md" cursor="pointer">
            <input {...getInputProps()} />
            <Text textAlign="center">Drag 'n' drop lottie files here, or click to select files</Text>
            <Button mt={4} isLoading={loading} isDisabled={loading}>Upload</Button>
            {error && <Text color="red.500">{error.message}</Text>}
          </Box>
        </VStack>
      </Container>
    </Flex>
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

export default LottieUpload;
