'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Sparkles, Eraser, ScanFace, Heart, Wand, ZoomIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { FileUpload } from './file-upload';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const AI_TOOLS: Record<string, { icon: React.ReactNode; label: string; prompt: string }> = {
    'remove-background': {
        icon: <Eraser className="w-6 h-6 text-primary" />,
        label: 'Remove Background',
        prompt: 'Remove the background from this image and make it transparent. Keep the main subject intact with clean edges.',
    },
    'enhance-image': {
        icon: <Sparkles className="w-6 h-6 text-primary" />,
        label: 'AI Enhance',
        prompt: 'Enhance this image quality. Improve lighting, sharpen details, reduce noise, and correct colors for a professional result.',
    },
    'blur-background': {
        icon: <ScanFace className="w-6 h-6 text-primary" />,
        label: 'Blur Background',
        prompt: 'Apply a professional bokeh/depth-of-field blur to the background while keeping the main subject sharply in focus.',
    },
    'blur-face': {
        icon: <ScanFace className="w-6 h-6 text-primary" />,
        label: 'Blur Face',
        prompt: 'Detect all faces in this image and blur them for privacy protection. Keep the rest of the image sharp.',
    },
    'beautify': {
        icon: <Heart className="w-6 h-6 text-primary" />,
        label: 'Beautify',
        prompt: 'Enhance this portrait photo. Smooth skin, brighten eyes, and apply subtle beauty enhancements while keeping a natural look.',
    },
    'retouch': {
        icon: <Wand className="w-6 h-6 text-primary" />,
        label: 'Retouch',
        prompt: 'Retouch this photo by removing blemishes, spots, and skin imperfections. Keep the result looking natural.',
    },
    'upscale': {
        icon: <ZoomIn className="w-6 h-6 text-primary" />,
        label: 'AI Upscale',
        prompt: 'Upscale this image to 2x resolution while preserving details and reducing artifacts. Produce a high-quality enlarged version.',
    },
};

export function AIWorkspace() {
    const { activeTool, uploadedFile, processedImage, isProcessing, reset, setIsProcessing, setProcessedImage, setProgress } = useAppStore();
    const [error, setError] = useState<string | null>(null);

    const toolConfig = AI_TOOLS[activeTool?.id || ''] || AI_TOOLS['enhance-image'];

    const handleProcess = useCallback(async () => {
        if (!uploadedFile) { toast.error('Please upload an image first'); return; }

        setIsProcessing(true);
        setProgress(10);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', uploadedFile);
            formData.append('tool', activeTool?.id || 'enhance-image');
            formData.append('prompt', toolConfig.prompt);

            setProgress(30);
            const response = await fetch('/api/ai', {
                method: 'POST',
                body: formData,
            });

            setProgress(70);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'AI processing failed');
            }

            const data = await response.json();
            setProgress(100);
            setProcessedImage(data.imageUrl);
            toast.success(`${toolConfig.label} completed!`);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to process image';
            setError(message);
            toast.error(message);
        } finally {
            setIsProcessing(false);
        }
    }, [uploadedFile, activeTool, toolConfig, setIsProcessing, setProcessedImage, setProgress]);

    const handleDownload = useCallback(() => {
        if (!processedImage) return;
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = `${activeTool?.id || 'ai'}-${Date.now()}.png`;
        link.click();
    }, [processedImage, activeTool]);

    const handleReset = useCallback(() => {
        setError(null);
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [reset]);

    if (!activeTool) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/" onClick={() => reset()} className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 w-10" aria-label="Back"><ArrowLeft className="w-5 h-5" /></Link>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/5 flex items-center justify-center">
                            {toolConfig.icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{activeTool.name}</h1>
                                <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0">AI Powered</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{activeTool.description}</p>
                        </div>
                    </div>
                </div>
                {processedImage && <Button onClick={handleDownload} className="gap-2"><Download className="w-4 h-4" />Download</Button>}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <FileUpload />

                    {isProcessing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-violet-200 dark:border-violet-800 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 p-8 text-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 mx-auto mb-4 rounded-full border-3 border-violet-500/30 border-t-violet-500" />
                            <h3 className="text-lg font-semibold mb-1">AI is Processing...</h3>
                            <p className="text-sm text-muted-foreground">This may take 10-30 seconds depending on image size</p>
                        </motion.div>
                    )}

                    {processedImage && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border overflow-hidden bg-card">
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <h3 className="font-medium">AI Result</h3>
                                <Badge variant="secondary" className="bg-green-500/10 text-green-600">Complete</Badge>
                            </div>
                            <div className="p-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')] flex items-center justify-center min-h-[300px]">
                                <img src={processedImage} alt={`${toolConfig.label} result`} className="max-w-full max-h-[500px] object-contain" />
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4">
                            <p className="text-sm text-red-600 dark:text-red-400"><strong>Error:</strong> {error}</p>
                            <p className="text-xs text-muted-foreground mt-1">Make sure your OpenAI API key is configured in the .env file.</p>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-border bg-card overflow-hidden">
                        <div className="p-4 border-b border-border"><h3 className="font-medium">AI Processing</h3></div>
                        <div className="p-4 space-y-4">
                            <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 p-3">
                                <p className="text-xs text-muted-foreground">{toolConfig.prompt}</p>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white" onClick={handleProcess} disabled={!uploadedFile || isProcessing}>
                                {isProcessing ? (<><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />Processing...</>) : (<><Sparkles className="w-4 h-4 mr-2" />Process with AI</>)}
                            </Button>
                            <Button variant="outline" className="w-full gap-2" onClick={handleReset}><RotateCcw className="w-4 h-4" />Start Over</Button>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-gradient-to-br from-violet-500/5 to-transparent p-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-500" />Powered by AI</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Uses OpenAI image processing</li>
                            <li>• Results in 10-30 seconds</li>
                            <li>• Best with high-quality inputs</li>
                            <li>• Max file size: 20MB</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
