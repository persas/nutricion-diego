'use client';

import { useCallback, useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  onImageSelect: (base64: string) => void;
  preview: string | null;
  onClear: () => void;
}

export default function PhotoUpload({ onImageSelect, preview, onClear }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 1024;
          let { width, height } = img;

          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = (height / width) * maxSize;
              width = maxSize;
            } else {
              width = (width / height) * maxSize;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const base64 = await compressImage(file);
    onImageSelect(base64);
  }, [compressImage, onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  if (preview) {
    return (
      <Card className="relative overflow-hidden py-0 gap-0">
        <img
          src={preview}
          alt="Preview"
          className="w-full h-64 object-cover"
        />
        <Button
          onClick={onClear}
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full size-9"
        >
          <X className="w-5 h-5" />
        </Button>
      </Card>
    );
  }

  return (
    <Card
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed cursor-pointer transition-all duration-200',
        isDragging
          ? 'border-[#6c5ce7] bg-[#6c5ce7]/10 shadow-[0_0_20px_rgba(108,92,231,0.1)]'
          : 'border-border hover:border-[#6c5ce7]/50 hover:bg-card/80'
      )}
    >
      <div className="flex gap-3">
        <div className="p-3 rounded-full bg-[#6c5ce7]/15">
          <Camera className="w-6 h-6 text-[#6c5ce7]" />
        </div>
        <div className="p-3 rounded-full bg-[#00b894]/15">
          <Upload className="w-6 h-6 text-[#00b894]" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-foreground font-medium">Haz una foto o arrastra una imagen</p>
        <p className="text-muted-foreground text-sm mt-1">JPG, PNG hasta 10MB</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </Card>
  );
}
