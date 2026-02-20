'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/store/app-store';
import { FileUpload } from './file-upload';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

const EFFECT_CONFIG: Record<string, { emoji: string; hasIntensity: boolean; label: string }> = {
  'blur-image': { emoji: '🌫️', hasIntensity: true, label: 'Blur Intensity' },
  'pixelate': { emoji: '🔲', hasIntensity: true, label: 'Pixel Size' },
  'grayscale': { emoji: '🖤', hasIntensity: false, label: '' },
  'black-white': { emoji: '⬛', hasIntensity: true, label: 'Threshold' },
  'sepia': { emoji: '🟤', hasIntensity: true, label: 'Sepia Strength' },
  'invert': { emoji: '🔄', hasIntensity: false, label: '' },
  'motion-blur': { emoji: '💨', hasIntensity: true, label: 'Motion Amount' },
  'censor-photo': { emoji: '🚫', hasIntensity: true, label: 'Censor Strength' },
  'pixel-art': { emoji: '🎮', hasIntensity: true, label: 'Pixel Block Size' },
};

export function EffectWorkspace() {
  const { activeTool, uploadedFile, processedImage, isProcessing, reset, setIsProcessing, setProcessedImage, setProgress } = useAppStore();
  const [intensity, setIntensity] = useState(50);
  const [angle, setAngle] = useState(0); // For motion blur direction

  const config = EFFECT_CONFIG[activeTool?.id || ''] || { emoji: '✨', hasIntensity: true, label: 'Intensity' };

  const handleProcess = useCallback(async () => {
    if (!uploadedFile) { toast.error('Please upload an image first'); return; }
    setIsProcessing(true);
    setProgress(0);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { toast.error('Failed to process'); setIsProcessing(false); return; }

      ctx.drawImage(img, 0, 0);
      const toolId = activeTool?.id || '';

      try {
        if (toolId === 'grayscale') {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imageData.data;
          for (let i = 0; i < d.length; i += 4) {
            const gray = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
            d[i] = d[i + 1] = d[i + 2] = gray;
          }
          ctx.putImageData(imageData, 0, 0);

        } else if (toolId === 'black-white') {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imageData.data;
          const threshold = (intensity / 100) * 255;
          for (let i = 0; i < d.length; i += 4) {
            const gray = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
            const bw = gray > threshold ? 255 : 0;
            d[i] = d[i + 1] = d[i + 2] = bw;
          }
          ctx.putImageData(imageData, 0, 0);

        } else if (toolId === 'sepia') {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imageData.data;
          const strength = intensity / 100;
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i], g = d[i + 1], b = d[i + 2];
            const tr = Math.min(255, (r * 0.393 + g * 0.769 + b * 0.189));
            const tg = Math.min(255, (r * 0.349 + g * 0.686 + b * 0.168));
            const tb = Math.min(255, (r * 0.272 + g * 0.534 + b * 0.131));
            d[i] = r + (tr - r) * strength;
            d[i + 1] = g + (tg - g) * strength;
            d[i + 2] = b + (tb - b) * strength;
          }
          ctx.putImageData(imageData, 0, 0);

        } else if (toolId === 'invert') {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imageData.data;
          for (let i = 0; i < d.length; i += 4) {
            d[i] = 255 - d[i]; d[i + 1] = 255 - d[i + 1]; d[i + 2] = 255 - d[i + 2];
          }
          ctx.putImageData(imageData, 0, 0);

        } else if (toolId === 'blur-image') {
          ctx.filter = `blur(${intensity / 10}px)`;
          ctx.drawImage(img, 0, 0);
          ctx.filter = 'none';

        } else if (toolId === 'pixelate' || toolId === 'censor-photo') {
          const pixelSize = Math.max(2, Math.floor(intensity / 3));
          ctx.imageSmoothingEnabled = false;
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx) {
            tempCanvas.width = Math.ceil(canvas.width / pixelSize);
            tempCanvas.height = Math.ceil(canvas.height / pixelSize);
            tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
            ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
          }

        } else if (toolId === 'motion-blur') {
          const amount = intensity / 10;
          const rad = (angle * Math.PI) / 180;
          const steps = Math.max(3, Math.round(amount));
          ctx.globalAlpha = 1 / steps;
          for (let i = 0; i < steps; i++) {
            const dx = Math.cos(rad) * (i - steps / 2) * (amount / steps);
            const dy = Math.sin(rad) * (i - steps / 2) * (amount / steps);
            ctx.drawImage(img, dx, dy);
          }
          ctx.globalAlpha = 1;

        } else if (toolId === 'pixel-art') {
          const blockSize = Math.max(4, Math.floor(intensity / 2));
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          if (tempCtx) {
            const sw = Math.ceil(canvas.width / blockSize);
            const sh = Math.ceil(canvas.height / blockSize);
            tempCanvas.width = sw;
            tempCanvas.height = sh;
            tempCtx.imageSmoothingEnabled = false;
            tempCtx.drawImage(img, 0, 0, sw, sh);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
            // Add grid lines for pixel art look
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.lineWidth = 0.5;
            for (let x = 0; x < canvas.width; x += blockSize) {
              ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += blockSize) {
              ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }
          }
        }

        setProgress(100);
        setProcessedImage(canvas.toDataURL('image/png'));
        toast.success('Effect applied!');
      } catch {
        toast.error('Failed to apply effect');
      }
      setIsProcessing(false);
    };
    img.onerror = () => { toast.error('Failed to load image'); setIsProcessing(false); };
    img.src = URL.createObjectURL(uploadedFile);
  }, [uploadedFile, activeTool, intensity, angle, setIsProcessing, setProcessedImage, setProgress]);

  const handleDownload = useCallback(() => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `${activeTool?.id || 'effect'}-${Date.now()}.png`;
    link.click();
  }, [processedImage, activeTool]);

  const handleReset = useCallback(() => {
    reset();
    setIntensity(50);
    setAngle(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [reset]);

  if (!activeTool) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" onClick={() => reset()} className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 w-10" aria-label="Back"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl">{config.emoji}</div>
            <div><h1 className="text-2xl font-bold">{activeTool.name}</h1><p className="text-sm text-muted-foreground">{activeTool.description}</p></div>
          </div>
        </div>
        {processedImage && <Button onClick={handleDownload} className="gap-2"><Download className="w-4 h-4" />Download</Button>}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <FileUpload />
          {processedImage && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border overflow-hidden bg-card">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-medium">Result</h3>
                <Badge variant="secondary" className="bg-green-500/10 text-green-600">Applied</Badge>
              </div>
              <div className="aspect-video bg-muted/50 flex items-center justify-center">
                <img src={processedImage} alt="Processed" className="max-w-full max-h-full object-contain" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="p-4 border-b border-border"><h3 className="font-medium">Effect Settings</h3></div>
            <div className="p-4 space-y-6">
              {config.hasIntensity && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>{config.label}</Label>
                    <span className="text-sm font-mono text-primary">{intensity}%</span>
                  </div>
                  <Slider value={[intensity]} onValueChange={([v]) => setIntensity(v)} min={1} max={100} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Subtle</span><span>Strong</span></div>
                </div>
              )}

              {activeTool.id === 'motion-blur' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Direction</Label>
                    <span className="text-sm font-mono text-primary">{angle}°</span>
                  </div>
                  <Slider value={[angle]} onValueChange={([v]) => setAngle(v)} min={0} max={360} step={15} />
                </div>
              )}

              <div className="pt-2 space-y-3">
                <Button className="w-full" onClick={handleProcess} disabled={!uploadedFile || isProcessing}>
                  {isProcessing ? 'Processing...' : 'Apply Effect'}
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={handleReset}><RotateCcw className="w-4 h-4" />Start Over</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
