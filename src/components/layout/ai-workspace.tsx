'use client';

import { motion } from 'framer-motion';
import { Download, RotateCcw, Sparkles, Eraser, ScanFace, Heart, Wand, ZoomIn, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { FileUpload } from './file-upload';
import { ToolPageHeader } from './tool-page-header';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const AI_TOOLS: Record<string, { icon: React.ReactNode; label: string; prompt: string }> = {
    'remove-background': {
        icon: <Eraser className="w-7 h-7 text-white" />,
        label: 'Remove Background',
        prompt: 'Remove the background from this image and make it transparent. Keep the main subject intact with clean edges.',
    },
    'enhance-image': {
        icon: <Sparkles className="w-7 h-7 text-white" />,
        label: 'AI Enhance',
        prompt: 'Enhance this image quality. Improve lighting, sharpen details, reduce noise, and correct colors for a professional result.',
    },
    'blur-background': {
        icon: <ScanFace className="w-7 h-7 text-white" />,
        label: 'Blur Background',
        prompt: 'Apply a professional bokeh/depth-of-field blur to the background while keeping the main subject sharply in focus.',
    },
    'blur-face': {
        icon: <ScanFace className="w-7 h-7 text-white" />,
        label: 'Blur Face',
        prompt: 'Detect all faces in this image and blur them for privacy protection. Keep the rest of the image sharp.',
    },
    'beautify': {
        icon: <Heart className="w-7 h-7 text-white" />,
        label: 'Beautify',
        prompt: 'Enhance this portrait photo. Smooth skin, brighten eyes, and apply subtle beauty enhancements while keeping a natural look.',
    },
    'retouch': {
        icon: <Wand className="w-7 h-7 text-white" />,
        label: 'Retouch',
        prompt: 'Retouch this photo by removing blemishes, spots, and skin imperfections. Keep the result looking natural.',
    },
    'upscale': {
        icon: <ZoomIn className="w-7 h-7 text-white" />,
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
            <ToolPageHeader
                title={activeTool.name}
                description={activeTool.description}
                icon={toolConfig.icon}
                onReset={handleReset}
                isAI={true}
            >
                {processedImage && (
                    <Button onClick={handleDownload} className="gap-2 btn-premium rounded-xl">
                        <Download className="w-4 h-4" />Download
                    </Button>
                )}
            </ToolPageHeader>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <FileUpload />

                    {isProcessing && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-violet-200/50 dark:border-violet-800/50 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 p-8 text-center backdrop-blur-sm shadow-lg">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 mx-auto mb-4 rounded-full border-3 border-violet-500/30 border-t-violet-500" />
                            <h3 className="text-lg font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">AI is Processing...</h3>
                            <p className="text-sm text-muted-foreground font-medium">This may take 10-30 seconds depending on image size</p>
                        </motion.div>
                    )}

                    {processedImage && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-primary/30 bg-primary/5 overflow-hidden shadow-lg">
                            <div className="p-4 border-b border-primary/20 flex items-center justify-between">
                                <h3 className="font-semibold text-foreground">AI Result</h3>
                                <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">Complete</Badge>
                            </div>
                            <div className="p-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')] dark:bg-zinc-900 flex items-center justify-center min-h-[300px]">
                                <img src={processedImage} alt={`${toolConfig.label} result`} className="max-w-full max-h-[500px] object-contain rounded-lg" />
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
                    <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden shadow-premium">
                        <div className="p-5 border-b border-border/40 bg-gradient-to-r from-violet-500/10 to-transparent">
                            <h3 className="font-bold flex items-center gap-2.5 tracking-tight text-foreground">
                                <Sparkles className="w-4 h-4 text-violet-500" />
                                AI Processing
                            </h3>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 p-3 border border-violet-200/50 dark:border-violet-800/30">
                                <p className="text-xs text-muted-foreground">{toolConfig.prompt}</p>
                            </div>
                            <Button
                                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-6 rounded-xl font-bold shadow-xl shadow-violet-500/25 transition-all"
                                onClick={handleProcess}
                                disabled={!uploadedFile || isProcessing}
                                size="lg"
                            >
                                {isProcessing ? (
                                    <>
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 mr-3" />
                                        Process with AI
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

                    <div className="rounded-2xl border border-border/40 bg-gradient-to-br from-violet-500/5 to-transparent p-5 space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-violet-500" />
                            Powered by AI
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Uses OpenAI image processing</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Results in 10-30 seconds</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Best with high-quality inputs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ChevronRight className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
                                <span>Max file size: 20MB</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
