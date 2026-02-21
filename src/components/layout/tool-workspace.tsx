'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, Settings, Sparkles, ChevronRight, RotateCw, FlipHorizontal, FlipVertical, Crop, Type, Stamp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAppStore } from '@/store/app-store';
import { FileUpload } from './file-upload';
import { ToolPageHeader } from './tool-page-header';
import { useState, useCallback, useEffect } from 'react';
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
import { SpotlightCard } from '@/components/ui/spotlight-card';

export function ToolWorkspace() {
  const { activeTool, uploadedFile, processedImage, isProcessing, reset, setIsProcessing, setProcessedImage, setProgress } = useAppStore();

  // Tool-specific states
  const [rotate, setRotate] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [outputFormat, setOutputFormat] = useState('jpg');
  const [quality, setQuality] = useState(90);
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkOpacity, setWatermarkOpacity] = useState(50);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [activeTab, setActiveTab] = useState('transform');

  // Get original dimensions when file is uploaded
  useEffect(() => {
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(uploadedFile);
    } else if (uploadedFile) {
      setOriginalDimensions({ width: 0, height: 0 });
    }
  }, [uploadedFile]);

  const handleProcess = useCallback(async () => {
    if (!uploadedFile) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('format', outputFormat);
    formData.append('quality', quality.toString());
    formData.append('rotate', rotate.toString());
    formData.append('flip', flipV.toString());
    formData.append('flop', flipH.toString());

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
      setProcessedImage(data.imageUrl);
      toast.success('Image processed successfully!');
    } catch {
      toast.error('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [uploadedFile, rotate, flipH, flipV, outputFormat, quality, setIsProcessing, setProcessedImage, setProgress]);

  const handleDownload = useCallback(() => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `processed-${Date.now()}.${outputFormat === 'jpg' ? 'jpg' : outputFormat}`;
      link.click();
    }
  }, [processedImage, outputFormat]);

  const handleReset = useCallback(() => {
    reset();
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRotate(0);
    setFlipH(false);
    setFlipV(false);
  }, [reset]);

  const getToolIcon = () => {
    const toolId = activeTool?.id.toLowerCase() || '';
    if (toolId.includes('rotate')) return RotateCw;
    if (toolId.includes('flip')) return FlipHorizontal;
    if (toolId.includes('crop')) return Crop;
    if (toolId.includes('watermark')) return Stamp;
    if (toolId.includes('text')) return Type;
    return Settings;
  };

  const ToolIcon = getToolIcon();

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
        icon={<ToolIcon className="w-7 h-7 text-white" />}
        onReset={handleReset}
      >
        {processedImage && (
          <Button onClick={handleDownload} className="gap-2 btn-premium rounded-xl">
            <Download className="w-4 h-4" />
            Download
          </Button>
        )}
      </ToolPageHeader>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel - Upload & Preview */}
        <div className="lg:col-span-2 space-y-6">
          <FileUpload accept={activeTool?.id.includes('pdf-') ? '.pdf' : 'image/*'} />

          {/* Image Info */}
          {originalDimensions.width > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ToolIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Original Size</p>
                  <p className="text-sm text-muted-foreground">
                    {originalDimensions.width} × {originalDimensions.height} px
                  </p>
                </div>
              </div>

              {(rotate !== 0 || flipH || flipV) && (
                <div className="flex items-center gap-2">
                  {rotate !== 0 && (
                    <Badge variant="secondary" className="gap-1">
                      <RotateCw className="w-3 h-3" />
                      {rotate}°
                    </Badge>
                  )}
                  {flipH && (
                    <Badge variant="secondary" className="gap-1">
                      <FlipHorizontal className="w-3 h-3" />
                      Horizontal
                    </Badge>
                  )}
                  {flipV && (
                    <Badge variant="secondary" className="gap-1">
                      <FlipVertical className="w-3 h-3" />
                      Vertical
                    </Badge>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {processedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border overflow-hidden bg-card"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-medium">Processed Image</h3>
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20">
                  Complete
                </Badge>
              </div>
              <div className="aspect-video bg-muted/50 flex items-center justify-center">
                <img
                  src={processedImage}
                  alt="Processed"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Panel - Settings */}
        <div className="space-y-6">
          <SpotlightCard className="h-full rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-border/40 bg-gradient-to-r from-primary/10 to-transparent">
              <h3 className="font-bold flex items-center gap-2.5 tracking-tight text-foreground">
                <Settings className="w-4 h-4 text-primary" />
                Tool Settings
              </h3>
            </div>

            <div className="p-4 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="transform">Transform</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>

                <TabsContent value="transform" className="space-y-4 mt-4">
                  {/* Rotation */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <RotateCw className="w-4 h-4" />
                        Rotation
                      </Label>
                      <span className="text-sm font-mono text-primary">{rotate}°</span>
                    </div>
                    <Slider
                      value={[rotate]}
                      onValueChange={([v]) => setRotate(v)}
                      min={-180}
                      max={180}
                      step={1}
                    />
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRotate(0)}
                        className={rotate === 0 ? 'border-primary' : ''}
                      >
                        0°
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRotate(90)}
                        className={rotate === 90 ? 'border-primary' : ''}
                      >
                        90°
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRotate(180)}
                        className={rotate === 180 ? 'border-primary' : ''}
                      >
                        180°
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRotate(-90)}
                        className={rotate === -90 ? 'border-primary' : ''}
                      >
                        -90°
                      </Button>
                    </div>
                  </div>

                  {/* Flip */}
                  <div className="space-y-2">
                    <Label>Flip Image</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={flipH ? "default" : "outline"}
                        onClick={() => setFlipH(!flipH)}
                        className="gap-2"
                      >
                        <FlipHorizontal className="w-4 h-4" />
                        Horizontal
                      </Button>
                      <Button
                        variant={flipV ? "default" : "outline"}
                        onClick={() => setFlipV(!flipV)}
                        className="gap-2"
                      >
                        <FlipVertical className="w-4 h-4" />
                        Vertical
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="output" className="space-y-4 mt-4">
                  {/* Output Format */}
                  <div className="space-y-2">
                    <Label>Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpg">JPG/JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quality */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Quality</Label>
                      <span className="text-sm font-mono text-primary">{quality}%</span>
                    </div>
                    <Slider
                      value={[quality]}
                      onValueChange={([v]) => setQuality(v)}
                      min={10}
                      max={100}
                      step={5}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="pt-6 space-y-4">
                <Button
                  className="w-full btn-premium py-6 rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
                  onClick={handleProcess}
                  disabled={!uploadedFile || isProcessing}
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full mr-3"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3" />
                      Apply Changes
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
          </SpotlightCard>

          {/* Info Card */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-4 space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Tips
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Combine rotation and flip for different orientations</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Use PNG for images with transparency</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>All processing happens in your browser</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
