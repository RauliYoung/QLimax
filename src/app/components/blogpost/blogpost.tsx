'use client';
import React from 'react';
import {Label} from '@/app/components/ui/blogpost-label/label';
import {Input} from '@/app/components/ui/blogpost-input/input';
import {Textarea} from '@/app/components/ui/blogpost-textarea/textarea';
import {Button} from '@/app/components/ui/common/button/button';
import PlusIcon from '@/app/components/ui/icons/plusicon';
import './blogpost.scss';
import Switch from '@/app/components/ui/theme-toggle/toggle';

const handleFileChange = (event: any) => {};

export function BlogPostComponent() {
  return (
    <div className="component-container">
      <div className="header">
        <Switch id="theme-toggle" />
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
  );
}
