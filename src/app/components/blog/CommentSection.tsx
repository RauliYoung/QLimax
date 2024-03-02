'use client';
import { useContext, useState } from 'react';
import { UserContext } from '@/app/contexts/usercontext';
import { useToast } from '@chakra-ui/react';
import { Box, Text, Textarea, Button, VStack, Divider } from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COMMENT, FETCH_COMMENTS } from '@/app/lib/constants';
import { useEffect } from 'react';

interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: string;
}

interface CommentSectionProps {
  postId: string;
  authorId: string;
}
interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToast();
  const { user } = useContext(UserContext);

  const [createCommentMutation] = useMutation(CREATE_COMMENT);
  const { data, loading } = useQuery(FETCH_COMMENTS, {
    variables: { postId },
  });
  useEffect(() => {
    if (!loading && data) {
      setComments(data.post.comments);
    }
  }, [loading, data]);

  const userStamp = user?.id.slice(-6);

  const handleCommentSubmit = async () => {
    if (comment.length < 1) {
      toast({
        title: 'Comment cannot be empty',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsSubmitting(true);
    try {
      await createCommentMutation({
        variables: { postId, content: comment, authorId: userStamp },
        update: (cache, { data: { createComment } }) => {
          const existingComments = cache.readQuery<{ post: Post }>({
            query: FETCH_COMMENTS,
            variables: { postId },
          });
          const newComments = existingComments?.post?.comments
            ? [...existingComments.post.comments, createComment]
            : [createComment];

          cache.writeQuery({
            query: FETCH_COMMENTS,
            variables: { postId },
            data: {
              post: {
                ...existingComments?.post,
                comments: newComments,
              },
            },
          });
        },
      });

      setComment('');
      toast({
        title: 'Comment submitted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Text fontSize="sm" color="gray.500">
              {comment.authorId}
            </Text>
            <Text fontWeight="bold">{comment.content}</Text>
            <Divider />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
