import {AddIcon, EditIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import PlusIcon from '../../../ui/icons/plusicon';
import {BsSave, BsTag} from 'react-icons/bs';
import {PublishModal} from './publishModal';
import {TagModal} from './tagModal';
import {useEditorContext} from '@/app/contexts/editorContext';
import {CREATE_POST} from '@/app/lib/constants';
import {UPDATE_POST_PUBLISHED_STATUS} from '@/app/lib/constants';
import {useMutation} from '@apollo/client';
import {useToast} from '@chakra-ui/react';

export const ActionsMenu = () => {
  const publishModal = useDisclosure();
  const tagModal = useDisclosure();
  const {content, tags, title} = useEditorContext();
  const [createPost] = useMutation(CREATE_POST);
  const toast = useToast();
  const [updatePublishedStatus] = useMutation(UPDATE_POST_PUBLISHED_STATUS); // maybe use later for updating post status
  const {postId} = useEditorContext();
  const {saveAsDraft} = useEditorContext();

  const showSaveToast = () => {
    toast({
      title: 'Post' + title + ' saved',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const showDraftToast = () => {
    toast({
      title: 'Post ' + title + ' saved as draft',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  }

  const showPublishToast = () => {
    toast({
      title: 'Post ' + title + ' published',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleSaveAsDraft = () => {
    saveAsDraft({
      title: title,
      content: content,
      tags: tags,
      isPublished: false,
    });
    console.log('draft saved');
    console.log('draft', saveAsDraft);
    showDraftToast();
  };

  const handleSave = async () => {
    try {
      await createPost({
        variables: {
          input: {
            title: title,
            content: content,
            tags: tags,
            isPublished: false,
          },
        },
      });
      showSaveToast();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async () => {
    try {
      if (postId) {
        await updatePublishedStatus({
          variables: {
            id: postId,
            isPublished: true,
          },
        });
      } else {
        await createPost({
          variables: {
            input: {
              title: title,
              content: content,
              tags: tags,
              isPublished: true,
            },
          },
        });
      }
      publishModal.onClose();
      showPublishToast();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<PlusIcon />}
          size="lg"
          variant="outline"
          rounded="full"
          margin="1rem"
        />
        <MenuList>
          <MenuItem icon={<AddIcon />}>New</MenuItem>
          <MenuItem onClick={handleSaveAsDraft} icon={<ExternalLinkIcon />}>
            Save as draft
          </MenuItem>
          <MenuItem icon={<BsSave />} onClick={handleSave}>
            Save
          </MenuItem>
          <MenuItem icon={<BsTag />} onClick={tagModal.onOpen}>
            Add Tag
          </MenuItem>
          <MenuItem icon={<EditIcon />} onClick={publishModal.onOpen}>
            Publish
          </MenuItem>
        </MenuList>
      </Menu>
      <PublishModal
        isOpen={publishModal.isOpen}
        onClose={publishModal.onClose}
        onPublish={handlePublish}
      />
      <TagModal isOpen={tagModal.isOpen} onClose={tagModal.onClose} />
    </>
  );
};
