import { Metadata } from 'next';

// Complete tool definitions with SEO metadata
export interface ToolDefinition {
  id: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  keywords: string[];
  category: string;
  inputFormats: string[];
  outputFormats: string[];
  features: string[];
  useCases: string[];
  relatedTools: string[];
  priority: number;
}

// Comprehensive tool metadata for SEO
export const toolDefinitions: Record<string, ToolDefinition> = {
  // Image Compression Tools
  'compress': {
    id: 'compress',
    name: 'Compress Image Online Free',
    shortName: 'Compress Image',
    description: 'Free online image compressor. Reduce image file size by up to 90% while maintaining quality. Supports JPG, PNG, WebP, HEIC. No registration required.',
    longDescription: 'Compress images online for free with PdfPixels. Our advanced compression algorithm reduces file size by up to 90% while preserving visual quality. Perfect for web optimization, email attachments, and storage savings. Supports all major image formats including JPG, JPEG, PNG, WebP, HEIC, GIF, and BMP. No registration, no watermarks, instant results.',
    keywords: ['compress image', 'image compressor', 'reduce image size', 'compress jpg', 'compress png', 'shrink image', 'image optimization', 'free image compression'],
    category: 'Image Compression',
    inputFormats: ['JPG', 'JPEG', 'PNG', 'WebP', 'HEIC', 'GIF', 'BMP'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Quality slider', 'Target file size', 'Batch processing', 'Preview comparison'],
    useCases: ['Web optimization', 'Email attachments', 'Storage saving', 'Faster loading'],
    relatedTools: ['compress-10kb', 'compress-50kb', 'compress-100kb'],
    priority: 0.9,
  },
  'compress-10kb': {
    id: 'compress-10kb',
    name: 'Compress Image to 10KB Online Free',
    shortName: 'Compress to 10KB',
    description: 'Compress image to exactly 10KB online. Free tool to reduce image size to 10 kilobytes for thumbnails, avatars, and small web images.',
    longDescription: 'Compress any image to exactly 10KB with our free online tool. Perfect for creating thumbnails, profile pictures, and small web graphics. Automatic quality adjustment ensures your image hits the target size while maintaining the best possible quality. No registration required.',
    keywords: ['compress to 10kb', '10kb image', 'reduce image to 10kb', '10kb compressor', 'small image'],
    category: 'Image Compression',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Exact 10KB target', 'Auto quality adjustment', 'Instant processing'],
    useCases: ['Thumbnails', 'Avatars', 'Profile pictures', 'Small web images'],
    relatedTools: ['compress', 'compress-20kb', 'compress-50kb'],
    priority: 0.8,
  },
  'compress-50kb': {
    id: 'compress-50kb',
    name: 'Compress Image to 50KB Online Free',
    shortName: 'Compress to 50KB',
    description: 'Compress image to 50KB online free. Reduce photo size to exactly 50 kilobytes for form uploads, documents, and applications.',
    longDescription: 'Compress images to exactly 50KB with our free online tool. Ideal for form uploads, document attachments, and application submissions that require specific file sizes. Automatic optimization ensures the best quality at 50KB target.',
    keywords: ['compress to 50kb', '50kb image', 'reduce to 50kb', '50kb photo', 'form upload image'],
    category: 'Image Compression',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Exact 50KB target', 'Form-ready output', 'High quality retention'],
    useCases: ['Form uploads', 'Document attachments', 'Application photos', 'Email attachments'],
    relatedTools: ['compress', 'compress-10kb', 'compress-100kb'],
    priority: 0.8,
  },
  'compress-100kb': {
    id: 'compress-100kb',
    name: 'Compress Image to 100KB Online Free',
    shortName: 'Compress to 100KB',
    description: 'Compress image to 100KB online free. Reduce photo size to 100 kilobytes for email, web, and document uploads.',
    longDescription: 'Compress images to exactly 100KB with our free online tool. Perfect balance between file size and quality for email attachments, web uploads, and document submissions. Automatic optimization for best results.',
    keywords: ['compress to 100kb', '100kb image', 'reduce to 100kb', '100kb photo', 'email image size'],
    category: 'Image Compression',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Exact 100KB target', 'Email-optimized', 'Quality preservation'],
    useCases: ['Email attachments', 'Web uploads', 'Document submissions', 'Social media'],
    relatedTools: ['compress', 'compress-50kb', 'compress-200kb'],
    priority: 0.8,
  },

  // Image Resizing Tools
  'resize': {
    id: 'resize',
    name: 'Resize Image Online Free - Change Image Dimensions',
    shortName: 'Resize Image',
    description: 'Free online image resizer. Change image dimensions in pixels, cm, or inches. Maintain aspect ratio, set DPI for print. No registration required.',
    longDescription: 'Resize images online for free with PdfPixels. Change image dimensions to any size using pixels, centimeters, or inches. Lock aspect ratio to prevent distortion, set DPI for print-quality output. Perfect for social media, printing, web graphics, and document preparation.',
    keywords: ['resize image', 'image resizer', 'change image size', 'resize photo', 'image dimensions', 'pixel resizer'],
    category: 'Image Resizing',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC', 'GIF', 'BMP', 'TIFF'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Multiple units', 'Aspect ratio lock', 'DPI adjustment', 'Preset sizes'],
    useCases: ['Social media', 'Printing', 'Web graphics', 'Document preparation'],
    relatedTools: ['resize-pixel', 'resize-cm', 'dpi-300'],
    priority: 0.9,
  },
  'resize-pixel': {
    id: 'resize-pixel',
    name: 'Resize Image by Pixels Online Free',
    shortName: 'Resize by Pixels',
    description: 'Resize image by pixels online free. Set exact width and height in pixels. Perfect for web design, social media, and digital graphics.',
    longDescription: 'Resize images by exact pixel dimensions with our free online tool. Set precise width and height for web design, social media graphics, and digital applications. Aspect ratio lock available to prevent distortion.',
    keywords: ['resize by pixels', 'pixel resizer', 'image pixel size', 'resize width height', 'exact pixel size'],
    category: 'Image Resizing',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC', 'GIF'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Exact dimensions', 'Width x height', 'Aspect ratio lock', 'Common presets'],
    useCases: ['Web design', 'Social media', 'Digital graphics', 'App icons'],
    relatedTools: ['resize', 'resize-cm', 'resize-instagram'],
    priority: 0.8,
  },

  // Format Conversion Tools
  'png-to-jpg': {
    id: 'png-to-jpg',
    name: 'Convert PNG to JPG Online Free',
    shortName: 'PNG to JPG',
    description: 'Free online PNG to JPG converter. Convert PNG images to JPG format with adjustable quality. Handle transparency with background color options.',
    longDescription: 'Convert PNG to JPG online for free with PdfPixels. Our converter handles transparency with customizable background colors. Adjust quality settings for optimal file size. Perfect for reducing file size, web optimization, and compatibility.',
    keywords: ['png to jpg', 'convert png', 'png converter', 'png to jpeg', 'change png to jpg'],
    category: 'Format Conversion',
    inputFormats: ['PNG'],
    outputFormats: ['JPG', 'JPEG'],
    features: ['Transparency handling', 'Background color', 'Quality adjustment', 'Batch conversion'],
    useCases: ['File size reduction', 'Web compatibility', 'Email attachments', 'Document insertion'],
    relatedTools: ['jpg-to-png', 'webp-to-jpg', 'heic-to-jpg'],
    priority: 0.9,
  },
  'jpg-to-png': {
    id: 'jpg-to-png',
    name: 'Convert JPG to PNG Online Free',
    shortName: 'JPG to PNG',
    description: 'Free online JPG to PNG converter. Convert JPG images to PNG format with transparency support. Lossless conversion for high quality.',
    longDescription: 'Convert JPG to PNG online for free with PdfPixels. Lossless conversion preserves image quality. Add transparency support for overlays and graphics. Perfect for graphic design, web development, and image editing.',
    keywords: ['jpg to png', 'convert jpg', 'jpeg to png', 'jpg converter', 'change jpg to png'],
    category: 'Format Conversion',
    inputFormats: ['JPG', 'JPEG'],
    outputFormats: ['PNG'],
    features: ['Lossless conversion', 'Transparency support', 'Quality preservation', 'High quality output'],
    useCases: ['Graphic design', 'Web development', 'Image editing', 'Transparency needed'],
    relatedTools: ['png-to-jpg', 'webp-to-png', 'to-avif'],
    priority: 0.9,
  },
  'heic-to-jpg': {
    id: 'heic-to-jpg',
    name: 'Convert HEIC to JPG Online Free - iPhone Photos',
    shortName: 'HEIC to JPG',
    description: 'Free HEIC to JPG converter. Convert iPhone HEIC photos to JPG format. Works on Windows, Mac, and mobile. No software installation needed.',
    longDescription: 'Convert HEIC to JPG online for free with PdfPixels. Our converter handles iPhone HEIC photos without requiring any software installation. Works on Windows, Mac, and mobile devices. Batch conversion supported for multiple photos. Perfect for sharing iPhone photos on any device.',
    keywords: ['heic to jpg', 'convert heic', 'iphone photo converter', 'heic converter', 'heic to jpeg'],
    category: 'Format Conversion',
    inputFormats: ['HEIC', 'HEIF'],
    outputFormats: ['JPG', 'JPEG'],
    features: ['No software needed', 'Batch conversion', 'Cross-platform', 'Quality preservation'],
    useCases: ['iPhone photos', 'Windows compatibility', 'Sharing photos', 'Email attachments'],
    relatedTools: ['heic-to-png', 'png-to-jpg', 'webp-to-jpg'],
    priority: 0.9,
  },
  'webp-to-jpg': {
    id: 'webp-to-jpg',
    name: 'Convert WebP to JPG Online Free',
    shortName: 'WebP to JPG',
    description: 'Free WebP to JPG converter. Convert WebP images to JPG format for maximum compatibility. Fast, free, no registration required.',
    longDescription: 'Convert WebP to JPG online for free with PdfPixels. Our converter transforms modern WebP images into widely compatible JPG format. Perfect for older software, email clients, and platforms that don\'t support WebP.',
    keywords: ['webp to jpg', 'convert webp', 'webp converter', 'webp to jpeg', 'change webp to jpg'],
    category: 'Format Conversion',
    inputFormats: ['WebP'],
    outputFormats: ['JPG', 'JPEG'],
    features: ['Wide compatibility', 'Fast conversion', 'Quality preservation', 'Batch support'],
    useCases: ['Legacy software', 'Email compatibility', 'Universal sharing', 'Older devices'],
    relatedTools: ['webp-to-png', 'png-to-jpg', 'heic-to-jpg'],
    priority: 0.8,
  },

  // PDF Tools
  'pdf-merge': {
    id: 'pdf-merge',
    name: 'Merge PDF Files Online Free - Combine Multiple PDFs',
    shortName: 'Merge PDF',
    description: 'Free online PDF merger. Combine multiple PDF files into one document. Drag to reorder, no file limits, no registration required.',
    longDescription: 'Merge PDF files online for free with PdfPixels. Combine multiple PDF documents into a single file with drag-and-drop reordering. No file size limits up to 500MB total. No registration, no watermarks, instant results. Perfect for combining reports, contracts, and presentations.',
    keywords: ['merge pdf', 'combine pdf', 'pdf merger', 'join pdf files', 'merge multiple pdf', 'pdf combiner'],
    category: 'PDF Processing',
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    features: ['Drag to reorder', 'Multiple files', 'No size limits', 'Instant merge'],
    useCases: ['Combining reports', 'Merging contracts', 'Joining presentations', 'Document compilation'],
    relatedTools: ['pdf-split', 'pdf-compress', 'image-to-pdf'],
    priority: 0.9,
  },
  'pdf-split': {
    id: 'pdf-split',
    name: 'Split PDF Online Free - Extract PDF Pages',
    shortName: 'Split PDF',
    description: 'Free online PDF splitter. Split PDF into individual pages or extract specific pages. No registration, no watermarks, instant results.',
    longDescription: 'Split PDF files online for free with PdfPixels. Extract all pages into separate PDFs or select specific page ranges. Perfect for extracting contracts, separating chapters, or isolating specific content. No registration required.',
    keywords: ['split pdf', 'pdf splitter', 'extract pdf pages', 'separate pdf', 'pdf page extractor'],
    category: 'PDF Processing',
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    features: ['Extract all pages', 'Page range selection', 'Single page extraction', 'No limits'],
    useCases: ['Extracting contracts', 'Separating chapters', 'Isolating content', 'Document management'],
    relatedTools: ['pdf-merge', 'pdf-to-image', 'pdf-compress'],
    priority: 0.9,
  },
  'pdf-compress': {
    id: 'pdf-compress',
    name: 'Compress PDF Online Free - Reduce PDF File Size',
    shortName: 'Compress PDF',
    description: 'Free online PDF compressor. Reduce PDF file size while maintaining quality. Choose compression level, no registration required.',
    longDescription: 'Compress PDF files online for free with PdfPixels. Reduce PDF file size for easier sharing via email and faster uploads. Choose between low, medium, and high compression levels. Perfect for email attachments, web uploads, and storage optimization.',
    keywords: ['compress pdf', 'pdf compressor', 'reduce pdf size', 'shrink pdf', 'pdf file size reducer'],
    category: 'PDF Processing',
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    features: ['Multiple compression levels', 'Quality preservation', 'Image optimization', 'Font subsetting'],
    useCases: ['Email attachments', 'Web uploads', 'Storage saving', 'Faster sharing'],
    relatedTools: ['pdf-merge', 'pdf-split', 'image-to-pdf'],
    priority: 0.9,
  },

  // AI-Powered Tools
  'background-remover': {
    id: 'background-remover',
    name: 'Remove Background from Image Online Free - AI Powered',
    shortName: 'Remove Background',
    description: 'Free AI background remover. Remove background from image automatically. Perfect for product photos, portraits, and graphics. No registration.',
    longDescription: 'Remove background from images online for free with PdfPixels AI. Our advanced AI detects subjects and removes backgrounds with precision, handling complex edges like hair and fur. Download as transparent PNG. Perfect for product photos, portraits, marketing materials, and graphic design.',
    keywords: ['remove background', 'background remover', 'transparent background', 'remove background from image', 'ai background removal'],
    category: 'AI Tools',
    inputFormats: ['JPG', 'PNG', 'WebP'],
    outputFormats: ['PNG'],
    features: ['AI-powered detection', 'Hair/fur handling', 'Transparent PNG', 'Edge refinement'],
    useCases: ['Product photos', 'Portraits', 'Marketing materials', 'Graphic design', 'E-commerce'],
    relatedTools: ['image-enhance', 'upscale', 'crop'],
    priority: 0.9,
  },
  'image-enhance': {
    id: 'image-enhance',
    name: 'AI Image Enhancer Online Free - Improve Photo Quality',
    shortName: 'AI Image Enhance',
    description: 'Free AI image enhancer. Improve photo quality with AI-powered enhancement. Fix lighting, reduce noise, sharpen details automatically.',
    longDescription: 'Enhance images online for free with PdfPixels AI. Our AI-powered image enhancement improves photo quality by adjusting lighting, reducing noise, and sharpening details. Perfect for fixing underexposed photos, improving old images, and preparing photos for print.',
    keywords: ['image enhance', 'ai image enhancer', 'improve photo quality', 'photo enhancement', 'ai photo editor'],
    category: 'AI Tools',
    inputFormats: ['JPG', 'PNG', 'WebP'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['AI enhancement', 'Noise reduction', 'Detail sharpening', 'Color correction'],
    useCases: ['Fixing photos', 'Improving old images', 'Print preparation', 'Social media'],
    relatedTools: ['background-remover', 'upscale', 'sharpen'],
    priority: 0.9,
  },
  'upscale': {
    id: 'upscale',
    name: 'AI Image Upscaler Online Free - Increase Resolution',
    shortName: 'AI Upscale',
    description: 'Free AI image upscaler. Increase image resolution up to 4x with AI. Perfect for printing, large displays, and improving low-res images.',
    longDescription: 'Upscale images online for free with PdfPixels AI. Our AI-powered upscaler increases image resolution by 2x or 4x while preserving details and reducing artifacts. Perfect for preparing images for print, large displays, and improving low-resolution photos.',
    keywords: ['image upscale', 'ai upscaler', 'increase resolution', 'image upscaling', 'enlarge image'],
    category: 'AI Tools',
    inputFormats: ['JPG', 'PNG', 'WebP'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['2x and 4x upscaling', 'Detail preservation', 'Artifact removal', 'Print-ready output'],
    useCases: ['Printing', 'Large displays', 'Low-res improvement', 'Professional use'],
    relatedTools: ['image-enhance', 'dpi-300', 'resize'],
    priority: 0.9,
  },

  // Passport Photo Tool
  'passport-photo': {
    id: 'passport-photo',
    name: 'Passport Photo Maker Online Free - Create Passport Size Photos',
    shortName: 'Passport Photo Maker',
    description: 'Free passport photo maker online. Create passport size photos for US, UK, India, and more. Auto-crop to official dimensions, print-ready output.',
    longDescription: 'Create passport photos online for free with PdfPixels. Our passport photo maker automatically crops and resizes your photo to official dimensions for US passport, UK passport, Indian passport, visa photos, and ID photos. Supports 35x45mm, 51x51mm, and custom sizes. Print-ready output at 300 DPI.',
    keywords: ['passport photo', 'passport photo maker', 'passport size photo', 'visa photo', 'id photo maker', '35x45mm photo'],
    category: 'Document Tools',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG'],
    features: ['Country presets', 'Auto face detection', 'Official dimensions', '300 DPI output'],
    useCases: ['US passport', 'UK passport', 'Indian passport', 'Visa photos', 'ID cards'],
    relatedTools: ['resize-35x45', 'resize-51x51', 'dpi-300'],
    priority: 0.9,
  },

  // Social Media Tools
  'resize-instagram': {
    id: 'resize-instagram',
    name: 'Instagram Photo Size Resizer - 1080x1080 Post',
    shortName: 'Instagram Size',
    description: 'Free Instagram photo resizer. Resize images to Instagram post size 1080x1080, story size 1080x1920. Perfect for feed posts and stories.',
    longDescription: 'Resize images for Instagram online for free with PdfPixels. Our Instagram resizer creates perfectly sized images for feed posts (1080x1080), stories (1080x1920), and reels. Optimize your photos for maximum engagement on Instagram.',
    keywords: ['instagram size', 'instagram photo resizer', 'instagram post size', '1080x1080', 'instagram story size'],
    category: 'Social Media',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Post size 1080x1080', 'Story size 1080x1920', 'Reel size', 'Optimal quality'],
    useCases: ['Instagram posts', 'Instagram stories', 'Instagram reels', 'Social media marketing'],
    relatedTools: ['resize-youtube', 'resize-twitter', 'resize-facebook'],
    priority: 0.8,
  },
  'resize-youtube': {
    id: 'resize-youtube',
    name: 'YouTube Thumbnail Resizer - 1280x720 HD',
    shortName: 'YouTube Thumbnail',
    description: 'Free YouTube thumbnail resizer. Create thumbnails at 1280x720 HD resolution. Perfect size for YouTube video thumbnails.',
    longDescription: 'Resize images for YouTube thumbnails online for free with PdfPixels. Create perfectly sized thumbnails at 1280x720 HD resolution. Optimized for YouTube\'s thumbnail requirements and maximum click-through rate.',
    keywords: ['youtube thumbnail', 'youtube thumbnail size', '1280x720', 'youtube resizer', 'video thumbnail'],
    category: 'Social Media',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['1280x720 HD', 'YouTube optimized', 'High quality', 'CTR optimized'],
    useCases: ['YouTube thumbnails', 'Video thumbnails', 'Channel art', 'YouTube marketing'],
    relatedTools: ['resize-instagram', 'resize-twitter', 'resize-linkedin'],
    priority: 0.8,
  },

  // Basic Editing Tools
  'crop': {
    id: 'crop',
    name: 'Crop Image Online Free - Custom Image Cropping',
    shortName: 'Crop Image',
    description: 'Free online image cropper. Crop images to custom dimensions with aspect ratio presets. Rotate during crop, grid overlay available.',
    longDescription: 'Crop images online for free with PdfPixels. Our image cropper lets you select custom dimensions with aspect ratio presets for social media, printing, and documents. Rotate during crop and use grid overlay for perfect composition.',
    keywords: ['crop image', 'image cropper', 'photo crop', 'crop online', 'custom crop'],
    category: 'Image Editing',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC', 'GIF'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Custom dimensions', 'Aspect ratio presets', 'Rotation', 'Grid overlay'],
    useCases: ['Social media', 'Printing', 'Documents', 'Composition'],
    relatedTools: ['resize', 'rotate', 'passport-photo'],
    priority: 0.8,
  },
  'rotate': {
    id: 'rotate',
    name: 'Rotate Image Online Free - Rotate Photos Any Angle',
    shortName: 'Rotate Image',
    description: 'Free online image rotator. Rotate images 90°, 180°, 270° or custom angle. Lossless rotation for JPG, PNG, WebP.',
    longDescription: 'Rotate images online for free with PdfPixels. Rotate photos by 90°, 180°, 270° or any custom angle. Lossless rotation preserves image quality. Perfect for fixing sideways photos and adjusting orientation.',
    keywords: ['rotate image', 'image rotator', 'rotate photo', 'turn image', 'rotate jpg'],
    category: 'Image Editing',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC', 'GIF'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['90°, 180°, 270° presets', 'Custom angle', 'Lossless rotation', 'Instant preview'],
    useCases: ['Fixing orientation', 'Sideways photos', 'Landscape/portrait', 'Composition'],
    relatedTools: ['flip', 'crop', 'resize'],
    priority: 0.8,
  },
  'flip': {
    id: 'flip',
    name: 'Flip Image Online Free - Mirror Image Horizontally & Vertically',
    shortName: 'Flip Image',
    description: 'Free online image flipper. Flip images horizontally or vertically. Create mirror images instantly for photos and graphics.',
    longDescription: 'Flip images online for free with PdfPixels. Mirror images horizontally or vertically with instant preview. Perfect for creating reflections, fixing mirrored photos, and graphic design effects.',
    keywords: ['flip image', 'mirror image', 'image flipper', 'horizontal flip', 'vertical flip'],
    category: 'Image Editing',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC', 'GIF'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Horizontal flip', 'Vertical flip', 'Both directions', 'Instant preview'],
    useCases: ['Mirror effect', 'Reflections', 'Fixing mirrored photos', 'Graphic design'],
    relatedTools: ['rotate', 'crop', 'resize'],
    priority: 0.8,
  },
  'watermark': {
    id: 'watermark',
    name: 'Add Watermark to Image Online Free',
    shortName: 'Add Watermark',
    description: 'Free online watermark tool. Add text or image watermarks to photos. Customize position, opacity, and style. Protect your images.',
    longDescription: 'Add watermarks to images online for free with PdfPixels. Add text watermarks or image watermarks with customizable position, opacity, font, and style. Protect your photos and brand your images for social media and websites.',
    keywords: ['watermark', 'add watermark', 'image watermark', 'photo watermark', 'text watermark'],
    category: 'Image Editing',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Text watermarks', 'Image watermarks', 'Position control', 'Opacity adjustment'],
    useCases: ['Image protection', 'Branding', 'Copyright', 'Social media'],
    relatedTools: ['crop', 'resize', 'compress'],
    priority: 0.8,
  },

  // Filter Tools
  'grayscale': {
    id: 'grayscale',
    name: 'Convert Image to Grayscale Online Free',
    shortName: 'Grayscale',
    description: 'Free online grayscale converter. Convert images to black and white. Adjust luminosity and contrast for perfect grayscale output.',
    longDescription: 'Convert images to grayscale online for free with PdfPixels. Transform color photos into beautiful black and white images with adjustable luminosity and contrast. Perfect for artistic effects, professional photography, and document preparation.',
    keywords: ['grayscale', 'black and white', 'convert to grayscale', 'bw image', 'monochrome'],
    category: 'Filters & Effects',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Luminosity adjustment', 'Contrast control', 'Quality preservation', 'Instant preview'],
    useCases: ['Artistic effect', 'Professional photography', 'Documents', 'Vintage look'],
    relatedTools: ['sepia', 'invert', 'blur-image'],
    priority: 0.7,
  },
  'blur-image': {
    id: 'blur-image',
    name: 'Blur Image Online Free - Gaussian Blur Effect',
    shortName: 'Blur Image',
    description: 'Free online image blur tool. Apply Gaussian blur effect to images. Adjust blur radius for privacy protection or artistic effect.',
    longDescription: 'Blur images online for free with PdfPixels. Apply Gaussian blur effect with adjustable radius. Perfect for privacy protection, background blur, and artistic effects. Control blur intensity for desired effect.',
    keywords: ['blur image', 'image blur', 'gaussian blur', 'blur photo', 'blur effect'],
    category: 'Filters & Effects',
    inputFormats: ['JPG', 'PNG', 'WebP', 'HEIC'],
    outputFormats: ['JPG', 'PNG', 'WebP'],
    features: ['Gaussian blur', 'Radius control', 'Privacy protection', 'Artistic effect'],
    useCases: ['Privacy protection', 'Background blur', 'Artistic effect', 'Focus effect'],
    relatedTools: ['pixelate', 'face-blur', 'sharpen'],
    priority: 0.7,
  },

  // DPI Tool
  'dpi-300': {
    id: 'dpi-300',
    name: 'Convert Image to 300 DPI Online Free - Print Ready',
    shortName: '300 DPI Converter',
    description: 'Free online 300 DPI converter. Convert images to 300 DPI for print quality. Perfect for printing, publishing, and professional use.',
    longDescription: 'Convert images to 300 DPI online for free with PdfPixels. Prepare images for high-quality printing at 300 DPI standard. Perfect for professional printing, publishing, and print-ready documents. Maintain dimensions while optimizing resolution.',
    keywords: ['300 dpi', 'dpi converter', 'print resolution', 'image dpi', 'convert to 300 dpi'],
    category: 'Document Tools',
    inputFormats: ['JPG', 'PNG', 'WebP', 'TIFF', 'BMP'],
    outputFormats: ['JPG', 'PNG', 'WebP', 'TIFF'],
    features: ['300 DPI output', 'Print quality', 'Dimension preservation', 'Professional standard'],
    useCases: ['Printing', 'Publishing', 'Professional use', 'Print documents'],
    relatedTools: ['resize', 'upscale', 'resize-a4'],
    priority: 0.8,
  },
};

// Generate metadata for a specific tool
export function generateToolMetadata(toolId: string): Metadata {
  const tool = toolDefinitions[toolId];
  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool could not be found.',
    };
  }

  const baseUrl = 'https://www.pdfpixels.com';
  const toolUrl = `${baseUrl}/?tool=${tool.id}`;
  const ogImageUrl = `${baseUrl}/opengraph-image`;

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.name,
      description: tool.description,
      url: toolUrl,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.name,
      description: tool.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `/?tool=${tool.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Get all tool IDs for sitemap generation
export function getAllToolIds(): string[] {
  return Object.keys(toolDefinitions);
}

// Get tools by category
export function getToolsByCategory(): Record<string, ToolDefinition[]> {
  const categories: Record<string, ToolDefinition[]> = {};
  
  Object.values(toolDefinitions).forEach((tool) => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  
  return categories;
}

// Get related tools for recommendations
export function getRelatedTools(toolId: string): ToolDefinition[] {
  const tool = toolDefinitions[toolId];
  if (!tool) return [];
  
  return tool.relatedTools
    .map((id) => toolDefinitions[id])
    .filter(Boolean);
}
