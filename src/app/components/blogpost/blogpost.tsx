'use client';
import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import {Label} from '@/app/components/ui/blogpost-label/label';
import {Input} from '@/app/components/ui/blogpost-input/input';
import {Textarea} from '@/app/components/ui/blogpost-textarea/textarea';
import {Button} from '@/app/components/ui/common/button/button';
import PlusIcon from '@/app/components/ui/icons/plusicon';
import './blogpost.scss';

const handleFileChange = (event: any) => {};

export function BlogPostComponent() {
  return (
    <div className="component-container">
      <div className="header">
        <h2>Create a blog post</h2>
      </div>
      <div className="form-container">
        <div className="input-group">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter the post title" />
        </div>
        <div className="input-group">
          <Label htmlFor="content">Content</Label>
          <Textarea placeholder="Enter the post content" />
        </div>
        <div className="input-group image-upload-container">
          <div className="image-upload">
            <PlusIcon className="plus-icon" />
            <p>Drag & drop or click to upload images</p>
            <Input
              id="image"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
            />
            <Label htmlFor="image" className="upload-label">
              Choose a file
            </Label>
          </div>
        </div>
        <Button
          className="submit-button"
          type="submit"
          variant="submit"
          size="sm"
        >
          Create Post
        </Button>
      </div>
    </div>
=======
>>>>>>> db890bdbcf485d92c4189197418e6c716a97a7c0
import './blogpost.scss';
import Editor from './textEditor/editor';
import Menubar from './menubar/menubar';

export function BlogPostComponent() {
  return (
    <>
      <div className="menubar">
        <Menubar />
      </div>
      <div className="editor">
        <Editor />
      </div>
    </>
<<<<<<< HEAD
=======
import {Label} from '@/app/components/ui/blogpost-label/label';
import {Input} from '@/app/components/ui/blogpost-input/input';
import {Textarea} from '@/app/components/ui/blogpost-textarea/textarea';
import {Button} from '@/app/components/ui/common/button/button';
import PlusIcon from '@/app/components/ui/icons/plusicon';
import './blogpost.scss';

const handleFileChange = (event: any) => {};

export function BlogPostComponent() {
  return (
    <div className="component-container">
      <div className="header">
        <h2>Create a blog post</h2>
      </div>
      <div className="form-container">
        <div className="input-group">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter the post title" />
        </div>
        <div className="input-group">
          <Label htmlFor="content">Content</Label>
          <Textarea placeholder="Enter the post content" />
        </div>
        <div className="input-group image-upload-container">
          <div className="image-upload">
            <PlusIcon className="plus-icon" />
            <p>Drag & drop or click to upload images</p>
            <Input
              id="image"
              type="file"
              className="sr-only"
              onChange={handleFileChange}
            />
            <Label htmlFor="image" className="upload-label">
              Choose a file
            </Label>
          </div>
        </div>
        <Button
          className="submit-button"
          type="submit"
          variant="submit"
          size="sm"
        >
          Create Post
        </Button>
      </div>
    </div>
>>>>>>> 750069c (Development (#3))
=======
>>>>>>> origin/development
>>>>>>> db890bdbcf485d92c4189197418e6c716a97a7c0
  );
}
