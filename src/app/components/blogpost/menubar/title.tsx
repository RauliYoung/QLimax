import React from 'react';
import {
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  IconButton,
  Tooltip,
  useEditableControls,
  useColorModeValue
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const EditableControls: React.FC = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : null;
};

export const EditableTitle: React.FC = () => {
  return (
    <Editable
      defaultValue="Title"
      isPreviewFocusable={true}
      selectAllOnFocus={false}
    >
      <Tooltip label="Click to edit" shouldWrapChildren={true}>
        <EditablePreview
          py={2}
          px={4}
          _hover={{
            background: useColorModeValue('gray.100', 'gray.700'),
          }}
        />
      </Tooltip>
      <EditableInput py={2} px={2} />
      <EditableControls />
    </Editable>
  );
};

