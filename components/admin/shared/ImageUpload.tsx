'use client';

import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string[];
  onChange: (files: string[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  disabled?: boolean;
}

export function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
  maxSize = 5,
  disabled = false,
}: ImageUploadProps) {
  const [previews, setPreviews] = React.useState<string[]>(value);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const newPreviews: string[] = [];
      const newUrls: string[] = [];

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          newPreviews.push(dataUrl);

          // Mock URL - in real app this would be uploaded to server
          const mockUrl = `/uploads/${Date.now()}-${file.name}`;
          newUrls.push(mockUrl);

          if (newPreviews.length === acceptedFiles.length) {
            const combined = [...previews, ...newPreviews].slice(0, maxFiles);
            const combinedUrls = [...value, ...newUrls].slice(0, maxFiles);
            setPreviews(combined);
            onChange(combinedUrls);
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [previews, value, maxFiles, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxSize: maxSize * 1024 * 1024,
    maxFiles: maxFiles - previews.length,
    disabled: disabled || previews.length >= maxFiles,
  });

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newUrls = value.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onChange(newUrls);
  };

  return (
    <div className="space-y-4">
      {previews.length < maxFiles && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-[var(--javanese-gold)] bg-[var(--javanese-gold)]/5'
              : 'border-border hover:border-[var(--javanese-gold)]/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-[var(--javanese-gold)]/10 rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-[var(--javanese-brown-text)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--javanese-brown-text)]">
                {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
              </p>
              <p className="text-xs text-[var(--javanese-brown-text)]/60 mt-1">
                or click to browse (max {maxFiles} files, {maxSize}MB each)
              </p>
            </div>
          </div>
        </div>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {previews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
          <p className="text-sm">No images uploaded</p>
        </div>
      )}
    </div>
  );
}
