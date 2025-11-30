'use client';

import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import clsx from 'clsx';
import Button from './Button';

type UploadZoneProps = {
  accept?: string;
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  isLoading?: boolean;
  label?: string;
  description?: string;
  className?: string;
};

export default function UploadZone({
  accept = '.csv',
  onFileSelect,
  selectedFile,
  isLoading = false,
  label = 'Upload file',
  description,
  className,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null as any);
  };

  return (
    <div className={clsx('space-y-4', className)}>
      <div>
        <label className="text-sm font-semibold text-slate-900">{label}</label>
        {description && (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={clsx(
          'relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all',
          isDragging
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50',
          selectedFile && 'border-emerald-200 bg-emerald-50/50',
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

          {selectedFile ? (
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 border-2 border-emerald-300">
              <File className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-slate-900">{selectedFile.name}</p>
              <p className="text-sm text-slate-600">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
              <Upload className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                Drag and drop your file here
              </p>
              <p className="mt-1 text-sm text-slate-600">or click to browse</p>
            </div>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClick}
            disabled={isLoading}
          >
            Choose another file
          </Button>
        </div>
      )}
    </div>
  );
}

