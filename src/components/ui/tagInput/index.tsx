import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Box, Tag, TagLabel, TagCloseButton, Input, Flex } from '@chakra-ui/react';

interface TagInput {
  onChange: (tags: string[]) => void
}

export const TagInput = ({ onChange }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [localTags, setLocalTags] = useState<string[]>([]);

  const removeTag = (indexToRemove: number) => {
    const newTags = localTags.filter((_, index) => index !== indexToRemove);

    setLocalTags(newTags);
    onChange(newTags);
  };

  const addTag = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const value = input.value.trim();

      if (value && !localTags.includes(value)) {
        const newTags = [...localTags, value];

        setLocalTags(newTags);
        onChange(newTags);
        setInputValue('');
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputValue(event.target.value);
  };

  return (
    <Box width="100%">
      <Flex flexWrap="wrap" gap={2}>
        {localTags.map((tag, index) => (
          <Tag size="lg" key={index} borderRadius="full">
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => removeTag(index)} />
          </Tag>
        ))}
      </Flex>
      <Input
        mt={2}
        value={inputValue}
        onKeyUp={addTag}
        onChange={handleInputChange}
        placeholder="Type and press enter to add tags"
      />
    </Box>
  );
};
