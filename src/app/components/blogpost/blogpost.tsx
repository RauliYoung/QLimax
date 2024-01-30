"use client";
import React from "react";
import { Label } from "@/app/components/ui/blogpost-label/label";
import { Input } from "@/app/components/ui/blogpost-input/input";
import { Textarea } from "@/app/components/ui/blogpost-textarea/textarea";
import { Button } from "@/app/components/ui/button/button";
import "./blogpost.scss";

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
        <div className="image-upload-container">
          <p>Upload an image for your post</p>
        
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
