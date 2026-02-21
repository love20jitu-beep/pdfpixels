'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, Merge, FileText, Plus, X, ChevronDown, ChevronUp, Trash2, GripVertical, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { ToolPageHeader } from './tool-page-header';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface PDFFile {
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

export function PDFMergeWorkspace() {
  const { activeTool, isProcessing, setIsProcessing, setProgress, reset } = useAppStore();

  const [files, setFiles] = useState<PDFFile[]>([]);
  const [result, setResult] = useState<{ pdfUrl: string; fileName: string; pageCount: number } | null>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles: PDFFile[] = Array.from(selectedFiles)
        .filter(f => f.name.toLowerCase().endsWith('.pdf'))
        .map(f => ({
          file: f,
          name: f.name,
          size: f.size,
        }));

      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`Added ${newFiles.length} PDF file(s)`);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    const newFiles: PDFFile[] = Array.from(droppedFiles)
      .filter(f => f.name.toLowerCase().endsWith('.pdf'))
      .map(f => ({
        file: f,
        name: f.name,
        size: f.size,
      }));

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`Added ${newFiles.length} PDF file(s)`);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const moveFile = useCallback((index: number, direction: 'up' | 'down') => {
    setFiles(prev => {
      const newFiles = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newFiles.length) return prev;
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      return newFiles;
    });
  }, []);

  const handleProcess = useCallback(async () => {
    if (files.length < 2) {
      toast.error('Please add at least 2 PDF files to merge');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    const formData = new FormData();
    files.forEach((f) => {
      formData.append('files', f.file);
    });

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 8, 90));
      }, 150);

      const response = await fetch('/api/pdf/merge', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const data = await response.json();
      setResult({
        pdfUrl: data.pdfUrl,
        fileName: data.fileName,
        pageCount: data.pageCount,
      });
      toast.success(`Merged ${files.length} PDFs into ${data.pageCount} pages!`);
    } catch {
      toast.error('Failed to merge PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [files, setIsProcessing, setProgress]);

  const handleDownload = useCallback(() => {
    if (result) {
      const link = document.createElement('a');
      link.href = result.pdfUrl;
      link.download = result.fileName;
      link.click();
    }
  }, [result]);

  const handleReset = useCallback(() => {
    reset();
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFiles([]);
    setResult(null);
  }, [reset]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (!activeTool) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 lg:px-8 py-8"
    >
      <ToolPageHeader
        title={activeTool.name}
        description={activeTool.description}
        icon={Merge}
        onReset={handleReset}
      >
        {result && (
          <Button onClick={handleDownload} className="gap-2 btn-premium rounded-xl">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        )}
      </ToolPageHeader>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel - Upload & File List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Drop Zone */}
          <motion.div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="drop-zone relative flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer"
          >
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>

            <p className="text-lg font-semibold">Add PDF Files</p>
            <p className="text-sm text-muted-foreground mt-1">
              Drag & drop or click to select PDFs
            </p>

            <Badge variant="secondary" className="mt-3">PDF Only</Badge>
          </motion.div>

          {/* File List */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden shadow-lg"
            >
              <div className="p-4 border-b border-border">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Files to Merge ({files.length})
                </h3>
              </div>

              <div className="divide-y divide-border">
                {files.map((file, index) => (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-muted-foreground cursor-grab">
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-red-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => moveFile(index, 'up')}
                        disabled={index === 0}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => moveFile(index, 'down')}
                        disabled={index === files.length - 1}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeFile(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-600 dark:text-green-400">
                      PDF Merged Successfully!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {result.pageCount} pages • Ready for download
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - Settings */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden shadow-premium">
            <div className="p-5 border-b border-border/40 bg-gradient-to-r from-primary/10 to-transparent">
              <h3 className="font-bold flex items-center gap-2.5 tracking-tight text-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                Merge Settings
              </h3>
            </div>

            <div className="p-5 space-y-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Total Files</span>
                  <span className="text-lg font-bold text-primary">{files.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Size</span>
                  <span className="text-sm text-muted-foreground">
                    {formatSize(files.reduce((acc, f) => acc + f.size, 0))}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Drag files to reorder them. The merged PDF will combine files in the order shown.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <Button
                  className="w-full btn-premium py-6 rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
                  onClick={handleProcess}
                  disabled={files.length < 2 || isProcessing}
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-3"
                      />
                      Merging...
                    </>
                  ) : (
                    <>
                      <Merge className="w-5 h-5 mr-3" />
                      Merge {files.length} PDFs
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-xl py-6 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-colors bg-background/50"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-primary/5 to-transparent p-5 space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              How to Use
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Add two or more PDF files</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Drag to reorder the files</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Click Merge to combine</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Download your merged PDF</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div >
  );
}
