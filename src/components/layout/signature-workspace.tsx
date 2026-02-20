'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, PenTool, Type, Upload, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store/app-store';
import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

export function SignatureWorkspace() {
    const { activeTool, reset } = useAppStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [penColor, setPenColor] = useState('#000000');
    const [penSize, setPenSize] = useState(3);
    const [typedText, setTypedText] = useState('');
    const [selectedFont, setSelectedFont] = useState('Dancing Script');
    const [fontSize, setFontSize] = useState(48);
    const lastPos = useRef<{ x: number; y: number } | null>(null);

    // Initialize canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = 600;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'transparent';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }, []);

    const getPos = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        if ('touches' in e) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY,
            };
        }
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        };
    };

    const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setIsDrawing(true);
        lastPos.current = getPos(e);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !lastPos.current) return;
        e.preventDefault();
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        const pos = getPos(e);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penSize;
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastPos.current = pos;
    };

    const stopDraw = () => {
        setIsDrawing(false);
        lastPos.current = null;
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        setSignatureData(null);
    };

    const generateFromText = () => {
        if (!typedText.trim()) { toast.error('Please type your signature'); return; }
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = penColor;
        ctx.font = `${fontSize}px '${selectedFont}', cursive`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(typedText, canvas.width / 2, canvas.height / 2);
    };

    const saveSignature = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const data = canvas.toDataURL('image/png');
        setSignatureData(data);
        toast.success('Signature saved!');
    };

    const handleDownload = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `signature-${Date.now()}.png`;
        link.click();
        toast.success('Signature downloaded!');
    }, []);

    const handleReset = useCallback(() => {
        clearCanvas();
        setTypedText('');
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [reset]);

    if (!activeTool) return null;

    const fonts = [
        'Dancing Script', 'Great Vibes', 'Pacifico', 'Sacramento',
        'Satisfy', 'Alex Brush', 'Allura', 'Caveat',
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/" onClick={() => reset()} className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 w-10" aria-label="Back to home">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center"><PenTool className="w-6 h-6 text-primary" /></div>
                        <div>
                            <h1 className="text-2xl font-bold">{activeTool.name}</h1>
                            <p className="text-sm text-muted-foreground">{activeTool.description}</p>
                        </div>
                    </div>
                </div>
                {signatureData && (
                    <Button onClick={handleDownload} className="gap-2"><Download className="w-4 h-4" />Download PNG</Button>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Canvas */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-2xl border border-border overflow-hidden bg-card">
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h3 className="font-medium">Draw Your Signature</h3>
                            <Button variant="ghost" size="sm" onClick={clearCanvas}><Trash2 className="w-4 h-4 mr-1" />Clear</Button>
                        </div>
                        <div className="bg-white dark:bg-gray-50 p-2">
                            <canvas
                                ref={canvasRef}
                                className="w-full cursor-crosshair border-2 border-dashed border-gray-200 rounded-lg"
                                style={{ touchAction: 'none', aspectRatio: '3/1' }}
                                onMouseDown={startDraw}
                                onMouseMove={draw}
                                onMouseUp={stopDraw}
                                onMouseLeave={stopDraw}
                                onTouchStart={startDraw}
                                onTouchMove={draw}
                                onTouchEnd={stopDraw}
                            />
                        </div>
                        <div className="p-3 border-t border-border flex justify-center">
                            <Button onClick={saveSignature} className="gap-2"><PenTool className="w-4 h-4" />Save Signature</Button>
                        </div>
                    </div>

                    {signatureData && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border overflow-hidden bg-card">
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <h3 className="font-medium">Preview</h3>
                                <Badge variant="secondary" className="bg-green-500/10 text-green-600">Ready</Badge>
                            </div>
                            <div className="p-6 bg-white dark:bg-gray-50 flex items-center justify-center">
                                <img src={signatureData} alt="Signature" className="max-w-full max-h-32 object-contain" />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Settings */}
                <div className="space-y-6">
                    <Tabs defaultValue="draw">
                        <TabsList className="w-full">
                            <TabsTrigger value="draw" className="flex-1"><PenTool className="w-3 h-3 mr-1" />Draw</TabsTrigger>
                            <TabsTrigger value="type" className="flex-1"><Type className="w-3 h-3 mr-1" />Type</TabsTrigger>
                        </TabsList>

                        <TabsContent value="draw" className="space-y-4 mt-4">
                            <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
                                <div className="space-y-2">
                                    <Label>Pen Color</Label>
                                    <div className="flex gap-2">
                                        {['#000000', '#1e40af', '#dc2626', '#059669', '#7c3aed'].map(c => (
                                            <button key={c} onClick={() => setPenColor(c)} className={`w-8 h-8 rounded-full border-2 ${penColor === c ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200'}`} style={{ backgroundColor: c }} />
                                        ))}
                                        <input type="color" value={penColor} onChange={(e) => setPenColor(e.target.value)} className="w-8 h-8 rounded-full cursor-pointer" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between"><Label>Pen Size</Label><span className="text-sm font-mono text-primary">{penSize}px</span></div>
                                    <Slider value={[penSize]} onValueChange={([v]) => setPenSize(v)} min={1} max={10} step={1} />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="type" className="space-y-4 mt-4">
                            <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
                                <div className="space-y-2">
                                    <Label>Your Name</Label>
                                    <Input value={typedText} onChange={(e) => setTypedText(e.target.value)} placeholder="Type your name..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Font Style</Label>
                                    <Select value={selectedFont} onValueChange={setSelectedFont}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {fonts.map(f => (<SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between"><Label>Font Size</Label><span className="text-sm font-mono text-primary">{fontSize}px</span></div>
                                    <Slider value={[fontSize]} onValueChange={([v]) => setFontSize(v)} min={20} max={80} step={2} />
                                </div>
                                <Button onClick={generateFromText} className="w-full"><Type className="w-4 h-4 mr-2" />Generate Signature</Button>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="pt-2">
                        <Button variant="outline" className="w-full gap-2" onClick={handleReset}><RotateCcw className="w-4 h-4" />Start Over</Button>
                    </div>

                    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-4">
                        <h4 className="font-medium mb-2">How to use</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Draw or type your signature</li>
                            <li>• Customize color and style</li>
                            <li>• Click Save Signature</li>
                            <li>• Download as transparent PNG</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
