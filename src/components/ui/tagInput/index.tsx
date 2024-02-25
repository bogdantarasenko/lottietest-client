import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Box, Tag, TagLabel, TagCloseButton, Input, Flex } from '@chakra-ui/react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange(newTags);
  };

  const addTag = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      const value = input.value.trim();
      if (value && !tags.includes(value)) {
        const newTags = [...tags, value];
        onChange(newTags);
        setInputValue('');
      }
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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
