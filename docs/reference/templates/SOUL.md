# SOUL Workspace Template

name: Tool Workspace
version: 1.0

layout:
  uploader: true
  preview: true
  progress: true
  result: true
  download: true

components:
  - FileUploader
  - ProcessingBar
  - ResultPreview
  - DownloadButton

states:
  idle:
    message: "Upload your file to begin."

  uploading:
    message: "Uploading file..."

  processing:
    message: "Processing file..."

  completed:
    message: "Your file is ready!"

  error:
    message: "Something went wrong. Please try again."
