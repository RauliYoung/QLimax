import React, {useEffect} from 'react';
import {
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  IconButton,
  Tooltip,
  useEditableControls,
  useColorModeValue,
} from '@chakra-ui/react';
import {CheckIcon, CloseIcon} from '@chakra-ui/icons';
import {useEditorContext} from '@/app/contexts/editorContext';

const EditableControls: React.FC = () => {
  const {isEditing, getSubmitButtonProps, getCancelButtonProps} =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
        aria-label="Submit"
      />
      <IconButton
        icon={<CloseIcon boxSize={3} />}
        {...getCancelButtonProps()}
        aria-label="Cancel"
      />
    </ButtonGroup>
  ) : null;
};

export const EditableTitle: React.FC = () => {
  const {setTitle, draft} = useEditorContext();
  useEffect(() => {
    if (draft) {
      setTitle(draft.title);
    }
  }, [draft]);

  return (
    <Editable
      defaultValue={draft && draft.title ? draft.title : 'Title'}
      isPreviewFocusable={true}
      selectAllOnFocus={false}
      onSubmit={setTitle}
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
