import { create } from 'zustand';

export type ActiveTool = {
  id: string;
  name: string;
  description: string;
};

type AppState = {
  activeTool: ActiveTool | null;
  uploadedFile: File | null;
  processedImage: string | null;
  isProcessing: boolean;
  progress: number;

  setActiveTool: (tool: ActiveTool | null) => void;
  setUploadedFile: (file: File | null) => void;
  setProcessedImage: (image: string | null) => void;
  setIsProcessing: (processing: boolean) => void;
  setProgress: (progress: number | ((prev: number) => number)) => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeTool: null,
  uploadedFile: null,
  processedImage: null,
  isProcessing: false,
  progress: 0,

  setActiveTool: (tool) => set({ activeTool: tool }),
  setUploadedFile: (file) => set({ uploadedFile: file, processedImage: null }),
  setProcessedImage: (image) => set({ processedImage: image, isProcessing: false }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setProgress: (progress) => set((state) => ({
    progress: typeof progress === 'function' ? progress(state.progress) : progress
  })),
  reset: () => set({
    activeTool: null,
    uploadedFile: null,
    processedImage: null,
    isProcessing: false,
    progress: 0,
  }),
}));
