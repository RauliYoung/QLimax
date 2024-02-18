'use client';
import { useContext, useState } from 'react';
import { UserContext } from '@/app/contexts/usercontext';
import { useToast } from '@chakra-ui/react';
import { Box, Text, Textarea, Button, VStack, Divider } from '@chakra-ui/react';

interface Comment {
  id: string;
  user: string;
  text: string;
}

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  postId,
}) => {
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const toast = useToast();

  const handleCommentSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Box w="full">
      <Textarea
        resize="none"
        placeholder="Write a comment..."
        mb={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isLoading={isSubmitting}
        loadingText="Submitting"
        spinnerPlacement="start"
        onClick={handleCommentSubmit}
        aria-label="submit comment"
      >
        Submit
      </Button>
        <VStack spacing={4} alignItems="flex-start" w="full">
          {comments.map((comment) => (
            <Box key={comment.id}>
              <Text fontWeight="bold">{comment.user}</Text>
              <Text>{comment.text}</Text>
              <Divider />
            </Box>
        ))}
    </VStack>
    </Box >
  );
};
