'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Eye, Trash2, Pencil } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { FileUpload } from './file-upload';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface MetadataEntry {
    key: string;
    value: string;
    category: string;
}

function parseImageMetadata(file: File): Promise<MetadataEntry[]> {
    return new Promise((resolve) => {
        const entries: MetadataEntry[] = [
            { key: 'File Name', value: file.name, category: 'File' },
            { key: 'File Size', value: formatBytes(file.size), category: 'File' },
            { key: 'File Type', value: file.type, category: 'File' },
            { key: 'Last Modified', value: new Date(file.lastModified).toLocaleString(), category: 'File' },
        ];

        const img = new Image();
        img.onload = () => {
            entries.push(
                { key: 'Width', value: `${img.width} px`, category: 'Dimensions' },
                { key: 'Height', value: `${img.height} px`, category: 'Dimensions' },
                { key: 'Aspect Ratio', value: `${(img.width / img.height).toFixed(2)}`, category: 'Dimensions' },
                { key: 'Megapixels', value: `${((img.width * img.height) / 1000000).toFixed(2)} MP`, category: 'Dimensions' },
            );

            // Try reading EXIF from ArrayBuffer
            const reader = new FileReader();
            reader.onload = (e) => {
                const buffer = e.target?.result as ArrayBuffer;
                if (buffer) {
                    const exif = extractBasicExif(new Uint8Array(buffer));
                    entries.push(...exif);
                }
                resolve(entries);
            };
            reader.onerror = () => resolve(entries);
            reader.readAsArrayBuffer(file);
        };
        img.onerror = () => resolve(entries);
        img.src = URL.createObjectURL(file);
    });
}

function extractBasicExif(data: Uint8Array): MetadataEntry[] {
    const entries: MetadataEntry[] = [];

    // Check for PNG
    if (data[0] === 0x89 && data[1] === 0x50) {
        entries.push({ key: 'Format', value: 'PNG', category: 'Format' });
        return entries;
    }

    // Check for JPEG with EXIF
    if (data[0] !== 0xFF || data[1] !== 0xD8) return entries;

    let offset = 2;
    while (offset < data.length - 1) {
        if (data[offset] !== 0xFF) break;
        const marker = data[offset + 1];
        if (marker === 0xE1) { // APP1 = EXIF
            const length = (data[offset + 2] << 8) | data[offset + 3];
            // Check for "Exif\0\0"
            if (data[offset + 4] === 0x45 && data[offset + 5] === 0x78) {
                entries.push({ key: 'EXIF Data', value: 'Present', category: 'EXIF' });
                entries.push({ key: 'EXIF Size', value: `${length} bytes`, category: 'EXIF' });
            }
            break;
        }
        const len = (data[offset + 2] << 8) | data[offset + 3];
        offset += 2 + len;
    }

    return entries;
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function MetadataWorkspace() {
    const { activeTool, uploadedFile, reset } = useAppStore();
    const [metadata, setMetadata] = useState<MetadataEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [processedImage, setProcessedImage] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        if (!uploadedFile) { toast.error('Please upload an image first'); return; }
        setIsLoading(true);
        try {
            const data = await parseImageMetadata(uploadedFile);
            setMetadata(data);
            toast.success(`Found ${data.length} metadata entries`);
        } catch {
            toast.error('Failed to read metadata');
        }
        setIsLoading(false);
    }, [uploadedFile]);

    const handleRemoveMetadata = useCallback(() => {
        if (!uploadedFile) return;
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.drawImage(img, 0, 0);
            const cleanData = canvas.toDataURL('image/png');
            setProcessedImage(cleanData);
            toast.success('All metadata removed!');
        };
        img.src = URL.createObjectURL(uploadedFile);
    }, [uploadedFile]);

    const handleDownload = useCallback(() => {
        if (!processedImage) return;
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = `clean-${Date.now()}.png`;
        link.click();
    }, [processedImage]);

    const handleReset = useCallback(() => {
        setMetadata([]);
        setProcessedImage(null);
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [reset]);

    if (!activeTool) return null;

    const toolIcon = activeTool.id === 'remove-metadata' ? '🗑️' : activeTool.id === 'edit-metadata' ? '✏️' : '🔍';
    const categories = [...new Set(metadata.map(m => m.category))];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/" onClick={() => reset()} className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 w-10" aria-label="Back">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl">{toolIcon}</div>
                        <div><h1 className="text-2xl font-bold">{activeTool.name}</h1><p className="text-sm text-muted-foreground">{activeTool.description}</p></div>
                    </div>
                </div>
                {processedImage && <Button onClick={handleDownload} className="gap-2"><Download className="w-4 h-4" />Download Clean Image</Button>}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <FileUpload />
                    {metadata.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card overflow-hidden">
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <h3 className="font-medium">Image Metadata</h3>
                                <Badge variant="secondary">{metadata.length} entries</Badge>
                            </div>
                            <div className="divide-y divide-border">
                                {categories.map(cat => (
                                    <div key={cat}>
                                        <div className="px-4 py-2 bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{cat}</div>
                                        {metadata.filter(m => m.category === cat).map(m => (
                                            <div key={m.key} className="px-4 py-3 flex justify-between items-center">
                                                <span className="text-sm text-muted-foreground">{m.key}</span>
                                                <span className="text-sm font-medium font-mono">{m.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="rounded-2xl border border-border bg-card overflow-hidden">
                        <div className="p-4 border-b border-border"><h3 className="font-medium">Actions</h3></div>
                        <div className="p-4 space-y-3">
                            <Button className="w-full gap-2" onClick={handleAnalyze} disabled={!uploadedFile || isLoading}>
                                <Eye className="w-4 h-4" />{isLoading ? 'Analyzing...' : 'View Metadata'}
                            </Button>
                            {activeTool.id !== 'view-metadata' && (
                                <Button variant="secondary" className="w-full gap-2" onClick={handleRemoveMetadata} disabled={!uploadedFile}>
                                    <Trash2 className="w-4 h-4" />Remove All Metadata
                                </Button>
                            )}
                            <Button variant="outline" className="w-full gap-2" onClick={handleReset}><RotateCcw className="w-4 h-4" />Start Over</Button>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-4">
                        <h4 className="font-medium mb-2">About Metadata</h4>
                        <p className="text-sm text-muted-foreground">Image metadata (EXIF) contains information about your camera, location, date, and more. Remove it to protect your privacy before sharing images online.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
