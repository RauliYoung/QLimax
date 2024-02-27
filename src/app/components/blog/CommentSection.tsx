'use client';
import {useContext, useState} from 'react';
import {UserContext} from '@/app/contexts/usercontext';
import {useToast} from '@chakra-ui/react';
import {Box, Text, Textarea, Button, VStack, Divider} from '@chakra-ui/react';
import {useMutation, useQuery} from '@apollo/client';
import {CREATE_COMMENT, FETCH_COMMENTS} from '@/app/lib/constants';
import {useEffect} from 'react';

interface Comment {
  id: string;
  user: string;
  text: string;
}

interface CommentSectionProps {
  postId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({postId}) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();

  const [createCommentMutation] = useMutation(CREATE_COMMENT);
 

  console.log(postId);

  const handleCommentSubmit = async () => {
    if (comment.length < 1) {
      toast({
        title: 'Comment cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await createCommentMutation({
        variables: {postId, content: comment},
      });
      setComment('');
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
    </Box>
  );
};
