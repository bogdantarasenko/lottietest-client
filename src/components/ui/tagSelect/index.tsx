import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Tag, TagLabel, TagCloseButton, Flex, Select, Center, Spinner } from '@chakra-ui/react';
import { QUERY_ALL_TAGS } from '@/services/graphql/allTags';

interface TagSelectProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const TagSelect = ({ tags, onChange }: TagSelectProps) => {
  const { data, loading, error } = useQuery(QUERY_ALL_TAGS);

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

  if (!data || !data.getTags) {
    return <p>Not found</p>;
  }

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(newTags);
  };

  const addTag = (value: string) => {
    if (value && !tags.includes(value)) {
      const newTags = [...tags, value];
      onChange(newTags);
    }
  };

  return (
    <Box width="100%">
      <Flex flexWrap="wrap" gap={2}>
        {tags.map((tag, index) => (
          <Tag size="lg" key={index} borderRadius="full">
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(index)} />
          </Tag>
        ))}
      </Flex>
      <Select
        mt={2}
        placeholder="Select to add tags"
        onChange={(e) => addTag(e.target.value)}
      >
        {data.getTags.filter((tag: string) => !tags.includes(tag)).map((tag: string) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </Select>
    </Box>
  );
};
