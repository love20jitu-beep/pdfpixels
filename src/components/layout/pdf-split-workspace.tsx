'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Split, FileText, Scissors, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PDFInfo {
  name: string;
  size: number;
  pageCount: number;
}

interface SplitResult {
  mode: string;
  totalPages: number;
  pages?: Array<{
    pageNumber: number;
    pdfUrl: string;
    fileName: string;
  }>;
  pdfUrl?: string;
  fileName?: string;
  extractedPages?: number[];
}

export function PDFSplitWorkspace() {
  const { activeTool, isProcessing, setIsProcessing, setProgress, reset } = useAppStore();

  const [file, setFile] = useState<File | null>(null);
  const [pdfInfo, setPdfInfo] = useState<PDFInfo | null>(null);
  const [result, setResult] = useState<SplitResult | null>(null);
  const [mode, setMode] = useState<'all' | 'range' | 'single'>('all');
  const [pageRange, setPageRange] = useState('');
  const [singlePage, setSinglePage] = useState('1');

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setFile(selectedFile);
      setPdfInfo({
        name: selectedFile.name,
        size: selectedFile.size,
        pageCount: 0, // Will be updated after processing
      });
      setResult(null);
      toast.success('PDF file added');
    } else if (selectedFile) {
      toast.error('Please select a PDF file');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.toLowerCase().endsWith('.pdf')) {
      setFile(droppedFile);
      setPdfInfo({
        name: droppedFile.name,
        size: droppedFile.size,
        pageCount: 0,
      });
      setResult(null);
      toast.success('PDF file added');
    } else {
      toast.error('Please drop a PDF file');
    }
  }, []);

  const handleProcess = useCallback(async () => {
    if (!file) {
      toast.error('Please upload a PDF file first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode);

    if (mode === 'range') {
      formData.append('pageRange', pageRange);
    } else if (mode === 'single') {
      formData.append('singlePage', singlePage);
    }

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 8, 90));
      }, 150);

      const response = await fetch('/api/pdf/split', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const data = await response.json();
      setResult(data);

      if (data.pages) {
        toast.success(`Split into ${data.pages.length} files!`);
      } else {
        toast.success(`Extracted ${data.extractedPages?.length || 0} pages!`);
      }
    } catch {
      toast.error('Failed to split PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [file, mode, pageRange, singlePage, setIsProcessing, setProgress]);

  const handleDownload = useCallback((pdfUrl?: string, fileName?: string) => {
    const url = pdfUrl || result?.pdfUrl;
    const name = fileName || result?.fileName;
    if (url && name) {
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      link.click();
    }
  }, [result]);

  const handleReset = useCallback(() => {
    reset();
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFile(null);
    setPdfInfo(null);
    setResult(null);
    setPageRange('');
    setSinglePage('1');
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/30">
              <Split className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{activeTool.name}</h1>
              <p className="text-sm text-muted-foreground">{activeTool.description}</p>
            </div>
          </div>
        </div>

        {result?.pdfUrl && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button onClick={() => handleDownload()} className="gap-2 btn-glow">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </motion.div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel - Upload & Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Drop Zone */}
          {!file ? (
            <motion.div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="drop-zone relative flex flex-col items-center justify-center p-12 rounded-2xl cursor-pointer"
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                <FileText className="w-10 h-10 text-primary" />
              </div>

              <p className="text-lg font-semibold">Upload PDF File</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drag & drop or click to select
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{pdfInfo?.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span>PDF</span>
                    <span>•</span>
                    <span>{formatSize(pdfInfo?.size || 0)}</span>
                    {result?.totalPages && (
                      <>
                        <span>•</span>
                        <span>{result.totalPages} pages</span>
                      </>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => {
                  setFile(null);
                  setPdfInfo(null);
                  setResult(null);
                }}>
                  Change
                </Button>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {result && result.pages && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium">Split Pages ({result.pages.length})</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 max-h-96 overflow-y-auto">
                  {result.pages.map((page, index) => (
                    <motion.div
                      key={page.pageNumber}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-xl border border-border bg-muted/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Page {page.pageNumber}</p>
                          <p className="text-xs text-muted-foreground">{page.fileName}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleDownload(page.pdfUrl, page.fileName)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - Settings */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
              <h3 className="font-semibold">Split Options</h3>
            </div>

            <div className="p-4 space-y-6">
              <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="all">All Pages</TabsTrigger>
                  <TabsTrigger value="range">Range</TabsTrigger>
                  <TabsTrigger value="single">Single</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Split PDF into individual pages. Each page will be saved as a separate file.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="range" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Page Range</Label>
                    <Input
                      placeholder="e.g., 1-3,5,7-9"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter pages to extract (e.g., 1-3,5,7-9)
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="single" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Page Number</Label>
                    <Input
                      type="number"
                      min={1}
                      value={singlePage}
                      onChange={(e) => setSinglePage(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Extract a single page from the PDF
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <Button
                  className="w-full btn-glow"
                  onClick={handleProcess}
                  disabled={!file || isProcessing || (mode === 'range' && !pageRange)}
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                      />
                      Splitting...
                    </>
                  ) : (
                    <>
                      <Scissors className="w-4 h-4 mr-2" />
                      Split PDF
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4" />
                  Start Over
                </Button>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-4 space-y-3">
            <h4 className="font-semibold">Split Options</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>All Pages:</strong> Split into separate files</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Range:</strong> Extract specific pages</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Single:</strong> Extract one page</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
