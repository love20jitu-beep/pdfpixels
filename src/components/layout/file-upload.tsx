'use client';

import { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, FileImage, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface FileUploadProps {
  accept?: string;
}

export function FileUpload({ accept = 'image/*' }: FileUploadProps) {
  const { uploadedFile, setUploadedFile, isProcessing, progress, processedImage } = useAppStore();
  const [dragOver, setDragOver] = useState(false);
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get preview URL and image info from uploaded file
  const previewUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : null;
  const isPDF = uploadedFile?.type === 'application/pdf' || uploadedFile?.name.toLowerCase().endsWith('.pdf');

  // Get image dimensions when file changes
  const getImageInfo = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      const img = new Image();
      img.onload = () => {
        setImageInfo({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    } else {
      setImageInfo(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      // Basic validation based on accept
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const isAccepted = acceptedTypes.some(type => {
        if (type === 'image/*') return file.type.startsWith('image/');
        if (type.startsWith('.')) return file.name.toLowerCase().endsWith(type.toLowerCase());
        return file.type === type;
      });

      if (isAccepted) {
        setUploadedFile(file);
        getImageInfo(file);
      }
    }
  }, [setUploadedFile, getImageInfo, accept]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      getImageInfo(file);
    }
  }, [setUploadedFile, getImageInfo]);

  const handleRemove = useCallback(() => {
    setUploadedFile(null);
    setImageInfo(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [setUploadedFile]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileType = (file: File) => {
    if (file.type === 'application/pdf') return 'PDF';
    const type = file.type.split('/')[1]?.toUpperCase();
    if (type === 'JPEG') return 'JPG';
    return type || file.name.split('.').pop()?.toUpperCase() || 'FILE';
  };

  const isImageAccept = accept.includes('image/');
  const isPDFAccept = accept.includes('.pdf') || accept.includes('pdf');

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`drop-zone relative flex flex-col items-center justify-center p-8 md:p-12 rounded-2xl cursor-pointer overflow-hidden
              ${dragOver ? 'drag-over' : ''}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {/* Background Animation */}
            <motion.div
              animate={{
                scale: dragOver ? 1.2 : 1,
                opacity: dragOver ? 0.1 : 0.05
              }}
              className="absolute inset-0 bg-primary"
            />

            <motion.div
              animate={{ y: dragOver ? -8 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-4 relative"
            >
              <motion.div
                animate={{
                  scale: dragOver ? 1.1 : 1,
                  rotate: dragOver ? [0, -5, 5, 0] : 0
                }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10"
              >
                {isPDFAccept && !isImageAccept ? (
                  <FileText className="w-10 h-10 text-primary" />
                ) : (
                  <Upload className="w-10 h-10 text-primary" />
                )}
              </motion.div>

              <div className="text-center">
                <p className="text-lg font-semibold">
                  {dragOver ? `Drop your ${isPDFAccept && !isImageAccept ? 'PDF' : 'file'} here` : `Drag & drop your ${isPDFAccept && !isImageAccept ? 'PDF' : 'file'}`}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to browse from your device
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {isPDFAccept && <Badge variant="secondary" className="font-normal">PDF</Badge>}
                {isImageAccept && (
                  <>
                    <Badge variant="secondary" className="font-normal">JPG</Badge>
                    <Badge variant="secondary" className="font-normal">PNG</Badge>
                    <Badge variant="secondary" className="font-normal">WebP</Badge>
                  </>
                )}
              </div>

              <Button size="lg" className="mt-2 gap-2" type="button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
                <Upload className="w-4 h-4" />
                Select {isPDFAccept && !isImageAccept ? 'PDF' : 'File'}
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative w-full max-w-2xl mx-auto border-2 border-dashed border-primary/40 rounded-xl p-4 md:p-8 flex items-center justify-center min-h-[300px] bg-transparent"
          >
            {/* Image/File Preview */}
            <div className="relative inline-block max-w-full rounded-md shadow-sm border border-border overflow-hidden bg-white min-w-[200px]">
              {isPDF ? (
                <div className="flex flex-col items-center justify-center p-12 bg-muted/10">
                  <FileText className="w-16 h-16 text-red-500 mb-2" />
                  <div className="text-sm font-semibold max-w-[200px] truncate">{uploadedFile.name}</div>
                </div>
              ) : (
                <img
                  src={previewUrl || ''}
                  alt="Preview"
                  className="max-w-full max-h-[350px] object-contain"
                />
              )}

              {/* Close Button Top Right */}
              <button
                onClick={handleRemove}
                disabled={isProcessing}
                className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-destructive hover:text-white rounded-md shadow-sm transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Change Button Top Left (Simulating "Resize Pixel / Crop" location on Pi7) */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                <button
                  onClick={() => inputRef.current?.click()}
                  disabled={isProcessing}
                  className="px-2 py-1 bg-primary/80 hover:bg-primary text-white text-[10px] font-medium rounded-sm shadow-sm flex items-center gap-1 transition-colors"
                >
                  <Upload className="w-3 h-3" />
                  Change
                </button>
              </div>

              {/* Info Box Bottom */}
              <div className="bg-[#467599] text-white text-xs p-2.5 w-full mt-0">
                <div className="font-semibold truncate mb-1 text-[11px]">{uploadedFile.name}</div>
                <div className="opacity-90 leading-tight">Size:- {formatFileSize(uploadedFile.size)}</div>
                {imageInfo && (
                  <>
                    <div className="opacity-90 leading-tight">Width:- {imageInfo.width} PX</div>
                    <div className="opacity-90 leading-tight">Height:- {imageInfo.height} PX</div>
                  </>
                )}
              </div>

              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 z-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full"
                  />
                  <div className="text-xs font-medium">Processing...</div>
                  <Progress value={progress} className="w-32 h-1.5" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
