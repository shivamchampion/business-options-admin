import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import { Toast } from '@/components/ui/use-toast';
import { uploadDocument, deleteDocument } from '@/services/storage';
import { v4 as uuidv4 } from 'uuid';
import {
  DOCUMENT_CATEGORIES_BY_TYPE,
  DOCUMENT_TYPES_BY_CATEGORY
} from '@/utils/constants';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const Documents = ({ listingType }) => {
  const { control, setValue, watch } = useFormContext();
  const documents = watch('documents') || [];
  const [activeTab, setActiveTab] = useState('essential');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('');
  const [docDescription, setDocDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  
  const categories = DOCUMENT_CATEGORIES_BY_TYPE[listingType] || [];
  const documentTypes = selectedCategory ? 
    DOCUMENT_TYPES_BY_CATEGORY[listingType]?.[selectedCategory] || [] : [];
  
  const onDrop = async (acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(file => {
        if (file.errors.some(e => e.code === 'file-too-large')) {
          Toast({
            title: "File too large",
            description: `${file.file.name} exceeds the 10MB limit.`,
            variant: "destructive",
          });
        } else if (file.errors.some(e => e.code === 'file-invalid-type')) {
          Toast({
            title: "Invalid file type",
            description: `${file.file.name} is not a supported document type.`,
            variant: "destructive",
          });
        }
      });
      return;
    }
    
    if (acceptedFiles.length === 0 || !selectedDocType) return;
    
    const file = acceptedFiles[0]; // Only process one file at a time
    const id = uuidv4();
    
    setUploading(true);
    setUploadProgress({ [id]: 0 });
    
    try {
      // Upload to Firebase Storage
      const { url, path } = await uploadDocument(
        file,
        `listings/${listingType}/documents`,
        (progress) => {
          setUploadProgress({ [id]: progress });
        }
      );
      
      // Add to form state
      const newDocument = {
        id,
        type: selectedDocType,
        name: file.name,
        description: docDescription,
        url,
        path,
        format: file.type,
        size: file.size,
        isPublic,
        uploadedAt: new Date(),
        verificationStatus: 'pending',
      };
      
      const updatedDocuments = [...documents, newDocument];
      setValue('documents', updatedDocuments, { shouldValidate: true });
      
      // Reset form fields
      setSelectedDocType('');
      setDocDescription('');
      setIsPublic(false);
      
      Toast({
        title: "Document uploaded",
        description: `${file.name} has been added.`,
        variant: "success",
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      Toast({
        title: "Upload failed",
        description: `Failed to upload ${file.name}.`,
        variant: "destructive",
      });
    }
    
    setUploading(false);
    setUploadProgress({});
  };
  
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: MAX_FILE_SIZE,
    disabled: uploading || !selectedDocType,
    noClick: true,
    noKeyboard: true,
  });
  
  const handleRemoveDocument = async (docId) => {
    const docToRemove = documents.find(doc => doc.id === docId);
    
    try {
      // Delete from storage
      await deleteDocument(docToRemove.path);
      
      // Update form state
      const updatedDocuments = documents.filter(doc => doc.id !== docId);
      setValue('documents', updatedDocuments, { shouldValidate: true });
      
      Toast({
        title: "Document removed",
        variant: "success",
      });
    } catch (error) {
      console.error('Error removing document:', error);
      Toast({
        title: "Removal failed",
        description: "Could not delete the document. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const getDocumentsForCategory = (category) => {
    if (!documents) return [];
    
    return documents.filter(doc => {
      const docType = DOCUMENT_TYPES_BY_CATEGORY[listingType]?.[category] || [];
      return docType.some(type => type.value === doc.type);
    });
  };
  
  const renderDocumentsByCategory = (category) => {
    const categoryDocs = getDocumentsForCategory(category);
    
    if (categoryDocs.length === 0) {
      return (
        <div className="p-8 text-center border border-dashed rounded-md">
          <p className="text-gray-500">No documents uploaded in this category</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {categoryDocs.map((doc) => (
          <div key={doc.id} className="flex items-center p-4 border rounded-md">
            <div className="mr-3 text-2xl text-gray-400">
              {getDocumentIcon(doc.format)}
            </div>
            <div className="flex-grow">
              <div className="font-medium">{doc.name}</div>
              <div className="text-sm text-gray-500">
                {doc.description || getDocumentTypeLabel(doc.type)}
              </div>
              <div className="flex space-x-2 mt-1">
                <Badge variant={doc.isPublic ? "secondary" : "outline"}>
                  {doc.isPublic ? "Public" : "Private"}
                </Badge>
                <Badge variant="outline">
                  {formatBytes(doc.size)}
                </Badge>
                <Badge variant={getVerificationBadgeVariant(doc.verificationStatus)}>
                  {doc.verificationStatus}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => window.open(doc.url, '_blank')}
              >
                View
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleRemoveDocument(doc.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const getDocumentIcon = (format) => {
    if (format.includes('pdf')) {
      return <span>📄</span>;
    } else if (format.includes('word')) {
      return <span>📝</span>;
    } else if (format.includes('excel') || format.includes('sheet')) {
      return <span>📊</span>;
    } else if (format.includes('image')) {
      return <span>🖼️</span>;
    }
    return <span>📁</span>;
  };
  
  const getDocumentTypeLabel = (value) => {
    for (const category in DOCUMENT_TYPES_BY_CATEGORY[listingType]) {
      const found = DOCUMENT_TYPES_BY_CATEGORY[listingType][category].find(
        type => type.value === value
      );
      if (found) return found.label;
    }
    return value;
  };
  
  const getVerificationBadgeVariant = (status) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'rejected':
        return 'destructive';
      case 'pending':
      default:
        return 'outline';
    }
  };
  
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  if (!listingType) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-medium text-gray-600">Please select a listing type first</h2>
        <p className="mt-2 text-gray-500">The document requirements depend on your listing type.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="text-lg font-semibold">Step 4: Documents</div>
      <p className="text-gray-600">
        Upload documents to support your listing information and establish credibility.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>
            Add supporting documents such as financial statements, business registration, and other relevant materials.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTitle>Document Guidelines</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 text-sm">
                <li>Supported file types: PDF, Word, Excel, JPG, PNG</li>
                <li>Maximum file size: 10MB per document</li>
                <li>Essential documents improve listing credibility and verification</li>
                <li>Financial documents can be marked private (visible only to qualified buyers)</li>
                <li>All documents are reviewed by our team for compliance</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Document Category */}
            <div>
              <FormLabel>Document Category</FormLabel>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the appropriate category
              </FormDescription>
            </div>
            
            {/* Document Type */}
            <div>
              <FormLabel>Document Type</FormLabel>
              <Select
                value={selectedDocType}
                onValueChange={setSelectedDocType}
                disabled={!selectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder={selectedCategory ? "Select document type" : "Select category first"} />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Specific document being uploaded
              </FormDescription>
            </div>
            
            {/* Document Description */}
            <div>
              <FormLabel>Description (Optional)</FormLabel>
              <Input
                placeholder="Brief description of this document"
                value={docDescription}
                onChange={(e) => setDocDescription(e.target.value)}
              />
              <FormDescription>
                Add context for this document
              </FormDescription>
            </div>
          </div>
          
          {/* Public/Private Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="public-doc"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
            <label 
              htmlFor="public-doc"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Make this document visible to all potential buyers
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Private documents (default) are only shown to qualified buyers. Public documents are visible to anyone viewing your listing.
          </p>
          
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-8 text-center
              ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
              ${uploading || !selectedDocType ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300 cursor-pointer'}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div className="text-lg font-medium">Drag and drop your document here</div>
              <div className="text-sm text-gray-500">or</div>
              <Button 
                type="button" 
                onClick={open}
                disabled={uploading || !selectedDocType}
              >
                Browse Files
              </Button>
              {!selectedDocType && (
                <p className="text-sm text-amber-600">Please select a document type first</p>
              )}
            </div>
          </div>
          
          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Uploading document...</div>
              {Object.entries(uploadProgress).map(([id, progress]) => (
                <div key={id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Uploading...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
          <CardDescription>
            Review and manage documents you've added to your listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue={categories.length > 0 ? categories[0].value : ""}
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              {categories.map(category => (
                <TabsTrigger key={category.value} value={category.value}>
                  {category.label}
                  <Badge 
                    variant="secondary" 
                    className="ml-2"
                  >
                    {getDocumentsForCategory(category.value).length}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category.value} value={category.value}>
                {renderDocumentsByCategory(category.value)}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;