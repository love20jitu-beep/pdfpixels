'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Minimize2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { FileUpload } from './file-upload';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface CompressionResult {
  imageUrl: string;
  originalSize: number;
  processedSize: number;
  savedPercent: number;
  format?: string;
}

export function CompressWorkspace() {
  const { activeTool, uploadedFile, processedImage, isProcessing, reset, setIsProcessing, setProcessedImage, setProgress } = useAppStore();

  const [targetSize, setTargetSize] = useState<string>('100');
  const [result, setResult] = useState<CompressionResult | null>(null);

  // Get preset size from tool ID if matching
  useEffect(() => {
    const toolId = activeTool?.id || '';
    const sizeMatch = toolId.match(/(\d+)kb/);
    if (sizeMatch) {
      setTargetSize(sizeMatch[1]);
    }
  }, [activeTool]);

  const handleProcess = useCallback(async () => {
    if (!uploadedFile) {
      toast.error('Please upload an image first');
      return;
    }

    if (!targetSize || parseInt(targetSize) <= 0) {
      toast.error('Please enter a valid target size');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('targetSize', targetSize);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 8, 90));
      }, 150);

      const response = await fetch('/api/image/process', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const data = await response.json();

      const savedPercent = Math.round((1 - data.processedSize / data.originalSize) * 100);
      const newResult: CompressionResult = {
        imageUrl: data.imageUrl,
        originalSize: data.originalSize,
        processedSize: data.processedSize,
        savedPercent: savedPercent,
        format: data.format,
      };

      setResult(newResult);
      setProcessedImage(data.imageUrl);

      toast.success(`Compressed! Saved ${savedPercent}% file size.`);
    } catch {
      toast.error('Failed to compress image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile, targetSize, setIsProcessing, setProcessedImage, setProgress]);

  const handleDownload = useCallback(() => {
    if (processedImage && uploadedFile && result) {
      const link = document.createElement('a');
      link.href = processedImage;
      const originalName = uploadedFile.name;
      const baseName = originalName.includes('.') ? originalName.substring(0, originalName.lastIndexOf('.')) : originalName;
      const extension = result.format || 'jpg';
      link.download = `${baseName}-compressed.${extension}`;
      link.click();
    }
  }, [processedImage, uploadedFile, result]);

  const handleReset = useCallback(() => {
    reset();
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setResult(null);
  }, [reset]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  if (!activeTool) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-4xl"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-card/40 backdrop-blur-xl p-6 rounded-3xl border border-border/50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors hover:bg-white/60 dark:hover:bg-white/10 h-11 w-11 shadow-sm border border-border/40"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/20">
              <Minimize2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{activeTool.name}</h1>
              <p className="text-sm font-medium text-muted-foreground mt-1">{activeTool.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <FileUpload accept={activeTool?.id.includes('pdf') ? '.pdf' : 'image/*'} />

        {/* Action Row */}
        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 mt-8 mb-4 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-[15px] font-medium text-foreground mr-1">Size:</span>
              <Input
                id="targetSize"
                type="number"
                min="5"
                max="50000"
                value={targetSize}
                onChange={(e) => setTargetSize(e.target.value)}
                className="h-[38px] w-20 text-center text-[15px] bg-white rounded-sm border-gray-300 focus-visible:ring-primary shadow-none"
              />
              <div className="h-[38px] bg-gray-500 text-white flex items-center justify-center px-2 text-sm font-medium rounded-sm">Kb</div>

              <Button
                className="bg-[#5c5cb3] hover:bg-[#4d4d99] text-white h-[38px] px-5 rounded-sm ml-3 font-medium text-[15px] shadow-none"
                onClick={handleProcess}
                disabled={isProcessing}
              >
                {isProcessing ? 'Compressing...' : 'Reduce Size'}
              </Button>
            </div>

            <p className="text-[13px] font-semibold text-indigo-800/80 tracking-wide mt-2">
              Note:- You Can Compress Image Directly by Kb Target
            </p>
          </motion.div>
        )}

        {/* Result Tracking */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 pt-2"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="p-5 rounded-2xl border border-border bg-card/80 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Original Size</div>
                    <div className="text-2xl font-bold">{formatSize(result.originalSize)}</div>
                  </div>
                </div>

                {/* Compressed */}
                <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-primary/80 mb-1">Compressed Size</div>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-primary">{formatSize(result.processedSize)}</div>
                      <Badge className="bg-green-500/15 text-green-700 dark:text-green-400 hover:bg-green-500/20 text-sm py-1">
                        -{result.savedPercent}%
                      </Badge>
                    </div>
                  </div>
                  <Button onClick={handleDownload} className="gap-2 shadow-primary/25 h-12 px-6 rounded-xl">
                    <Download className="w-5 h-5" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
