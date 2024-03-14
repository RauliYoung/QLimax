import React from 'react';
import './menubar.scss';
import {EditableTitle} from './title';
import {
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import {IconButton} from '@chakra-ui/react';
import {BsInfo} from 'react-icons/bs';

const Menubar = () => {
  return (
    <>
      <Flex className="popoverContainer" align="center" mr={4}>
        <Popover placement="auto" closeOnBlur={true}>
          <PopoverTrigger>
            <IconButton
              aria-label="Info"
              isRound={true}
              colorScheme="blue"
              icon={<BsInfo />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Blog editor</PopoverHeader>
            <PopoverBody>
              The text editor is a WYSIWYG editor, which means that the text you
              write here will look the same when it is published. The editor has
              a spell checker and a toolbar with formatting options so you can
              write with confidence.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <div className="menubar">
        <div className="title">
          <EditableTitle />
        </div>
      </div>
    </>
  );
};
export default Menubar;
