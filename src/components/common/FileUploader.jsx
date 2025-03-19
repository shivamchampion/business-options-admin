import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Image, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useStorage } from '../../hooks/useStorage';

const FileUploader = ({
  onUploadComplete,
  onUploadError,
  maxFiles = 10,
  maxSize = 5242880, // 5MB
  acceptedFileTypes = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    'application/pdf': ['.pdf'],
  },
  storagePath = 'uploads',
  multiple = false,
  showPreview = true,
  previewType = 'list', // 'list' or 'grid'
  className = '',
}) => {
  const [files, setFiles] = useState([]);
  const [uploadErrors, setUploadErrors] = useState({});
  const { uploadFile, uploading, progress, error } = useStorage(storagePath);

  // Handle file drop
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      // Handle accepted files
      if (acceptedFiles?.length) {
        const newFiles = multiple
          ? [...files, ...acceptedFiles]
          : [...acceptedFiles];
        
        // Limit the number of files
        if (newFiles.length > maxFiles) {
          onUploadError?.({
            message: `Maximum ${maxFiles} files allowed`,
          });
          return;
        }
        
        setFiles(newFiles);
        
        // Auto upload if not using multiple uploads
        if (!multiple) {
          handleUpload(acceptedFiles);
        }
      }

      // Handle rejected files
      if (rejectedFiles?.length) {
        const errors = {};
        
        rejectedFiles.forEach((file) => {
          const errorMessages = file.errors.map((err) => err.message).join(', ');
          errors[file.file.name] = errorMessages;
        });
        
        setUploadErrors(errors);
        
        // Notify parent of errors
        onUploadError?.({
          message: 'Some files were rejected',
          errors,
        });
      }
    },
    [files, maxFiles, multiple, onUploadError]
  );

  // Setup dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize,
    multiple,
    maxFiles,
  });

  // Handle file upload
  const handleUpload = async (filesToUpload = files) => {
    if (!filesToUpload.length) return;
    
    try {
      // Upload files
      const uploadPromises = filesToUpload.map((file) => {
        const path = `${storagePath}/${Date.now()}_${file.name}`;
        return uploadFile(file, path);
      });
      
      const results = await Promise.all(uploadPromises);
      
      // Notify parent of successful upload
      onUploadComplete?.(multiple ? results : results[0]);
      
      // Clear files if not using multiple uploads
      if (!multiple) {
        setFiles([]);
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      // Notify parent of upload error
      onUploadError?.({
        message: 'Error uploading files',
        error,
      });
    }
  };

  // Remove a file from the list
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Render file preview icon based on type
  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <Image size={24} className="text-brand-blue" />;
    }
    
    return <FileText size={24} className="text-brand-blue" />;
  };

  // Render file size in human-readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`${className}`}>
      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-brand-blue bg-light-blue bg-opacity-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud
            size={36}
            className={`${
              isDragActive ? 'text-brand-blue' : 'text-gray-400'
            }`}
          />
          
          <div className="text-sm text-gray-500">
            {isDragActive ? (
              <p className="font-medium text-brand-blue">Drop files here</p>
            ) : (
              <>
                <p className="font-medium">
                  Drag & drop files here, or click to select files
                </p>
                <p className="mt-1 text-xs">
                  {Object.keys(acceptedFileTypes).map((type) => 
                    acceptedFileTypes[type].join(', ')
                  ).join(', ')} files up to {formatFileSize(maxSize)}
                </p>
                {multiple && (
                  <p className="mt-1 text-xs">
                    Maximum {maxFiles} files allowed
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upload button for multiple files */}
      {multiple && files.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => handleUpload()}
            disabled={uploading || files.length === 0}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              uploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-brand-blue hover:bg-medium-blue focus:ring-brand-blue'
            }`}
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading... {Math.round(progress)}%
              </>
            ) : (
              <>Upload {files.length} {files.length === 1 ? 'file' : 'files'}</>
            )}
          </button>
        </div>
      )}

      {/* File preview */}
      {showPreview && files.length > 0 && (
        <div className={`mt-4 ${previewType === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-2'}`}>
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className={`${
                previewType === 'grid'
                  ? 'relative bg-gray-50 rounded-lg p-2 flex flex-col items-center'
                  : 'flex items-center justify-between bg-gray-50 rounded-lg p-2'
              }`}
            >
              {/* Preview for grid layout */}
              {previewType === 'grid' && (
                <>
                  <div className="h-24 w-full flex items-center justify-center mb-2">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-full max-w-full object-contain"
                      />
                    ) : (
                      getFileIcon(file)
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate w-full text-center">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-white shadow-sm text-gray-400 hover:text-error"
                  >
                    <X size={14} />
                  </button>
                </>
              )}

              {/* Preview for list layout */}
              {previewType === 'list' && (
                <>
                  <div className="flex items-center">
                    {getFileIcon(file)}
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-700 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 rounded-full text-gray-400 hover:text-error hover:bg-gray-100"
                  >
                    <X size={18} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload errors */}
      {Object.keys(uploadErrors).length > 0 && (
        <div className="mt-4 bg-error bg-opacity-10 text-error text-sm p-3 rounded-md">
          <div className="flex items-start">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Some files couldn't be added:</p>
              <ul className="mt-1 list-disc list-inside">
                {Object.entries(uploadErrors).map(([fileName, errorMessage]) => (
                  <li key={fileName} className="text-xs">
                    <span className="font-medium">{fileName}</span>: {errorMessage}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Upload success message */}
      {progress === 100 && !error && (
        <div className="mt-4 bg-success bg-opacity-10 text-success text-sm p-3 rounded-md">
          <div className="flex items-center">
            <CheckCircle size={18} className="mr-2 flex-shrink-0" />
            <p>Files uploaded successfully!</p>
          </div>
        </div>
      )}

      {/* Upload error message */}
      {error && (
        <div className="mt-4 bg-error bg-opacity-10 text-error text-sm p-3 rounded-md">
          <div className="flex items-center">
            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
            <p>Error uploading files: {error.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;