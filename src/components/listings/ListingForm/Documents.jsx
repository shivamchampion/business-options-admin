import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { File, Upload, X, Eye, FileText, FilePdf, FileSpreadsheet, Download, Info, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { uploadDocument, removeDocument } from '@/services/storage';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FORMATS = [
  'application/pdf', 
  'application/msword', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/jpeg',
  'image/png'
];

// Document type definitions based on listing type
const documentTypes = {
  business: [
    { category: 'Essential', types: [
      { id: 'business_registration', name: 'Business Registration', description: 'Official registration certificates or incorporation documents' },
      { id: 'financial_summary', name: 'Financial Summary', description: 'Overview of revenue, profit, and expenses' }
    ]},
    { category: 'Financial', types: [
      { id: 'profit_loss', name: 'Profit & Loss Statement', description: 'Detailed income, expenses, and profitability' },
      { id: 'balance_sheet', name: 'Balance Sheet', description: 'Assets, liabilities, and equity position' },
      { id: 'tax_returns', name: 'Tax Returns', description: 'Business tax filings (redacted as needed)' }
    ]},
    { category: 'Operational', types: [
      { id: 'inventory_list', name: 'Inventory List', description: 'Itemized product stock with valuation' },
      { id: 'equipment_list', name: 'Equipment List', description: 'Details of machinery, tools, and physical assets' },
      { id: 'lease_agreement', name: 'Lease Agreement', description: 'Property terms and conditions (redacted as needed)' },
      { id: 'business_process', name: 'Business Process Manual', description: 'Documentation of operational procedures' }
    ]},
    { category: 'Marketing', types: [
      { id: 'sale_memorandum', name: 'Sale Memorandum', description: 'Comprehensive business overview' },
      { id: 'marketing_materials', name: 'Marketing Materials', description: 'Samples of promotional content' },
      { id: 'customer_analysis', name: 'Customer Analysis', description: 'Breakdown of customer demographics and behavior' }
    ]}
  ],
  franchise: [
    { category: 'Essential', types: [
      { id: 'fdd', name: 'Franchise Disclosure Document', description: 'Legal disclosure with comprehensive franchise system information' },
      { id: 'franchise_agreement', name: 'Franchise Agreement Sample', description: 'Sample contract showing legal relationship terms' }
    ]},
    { category: 'Financial', types: [
      { id: 'unit_economics', name: 'Unit Economics Model', description: 'Financial performance projection showing potential ROI' },
      { id: 'investment_breakdown', name: 'Investment Breakdown', description: 'Detailed breakdown of initial investment requirements' }
    ]},
    { category: 'Operational', types: [
      { id: 'brand_standards', name: 'Brand Standards Manual', description: 'Operational guidelines and quality control standards' },
      { id: 'training_program', name: 'Training Program Overview', description: 'Training curriculum summary and methodology' },
      { id: 'store_design', name: 'Store Design Specifications', description: 'Facility requirements and layout details' },
      { id: 'equipment_package', name: 'Equipment Package Details', description: 'Required equipment list with specifications' }
    ]},
    { category: 'Marketing', types: [
      { id: 'marketing_materials', name: 'Marketing Materials', description: 'Brand collateral examples and positioning' },
      { id: 'locations_map', name: 'Franchise Locations Map', description: 'Geographic distribution visualization' }
    ]}
  ],
  startup: [
    { category: 'Essential', types: [
      { id: 'pitch_deck', name: 'Pitch Deck', description: 'Investor presentation summarizing the opportunity' },
      { id: 'executive_summary', name: 'Executive Summary', description: 'Brief overview of key investment points' }
    ]},
    { category: 'Financial', types: [
      { id: 'financial_projections', name: 'Financial Projections', description: '3-5 year forecast showing growth potential' },
      { id: 'financial_history', name: 'Financial History', description: 'Past performance if operating' },
      { id: 'funding_history', name: 'Funding History', description: 'Previous investment rounds and valuation progression' }
    ]},
    { category: 'Product', types: [
      { id: 'product_demo', name: 'Product Demo', description: 'Product demonstration or prototype visuals' },
      { id: 'technical_architecture', name: 'Technical Architecture', description: 'High-level system design documentation' },
      { id: 'product_roadmap', name: 'Product Roadmap', description: 'Development timeline and vision' }
    ]},
    { category: 'Market', types: [
      { id: 'market_research', name: 'Market Research', description: 'Industry analysis and market validation' },
      { id: 'competitor_analysis', name: 'Competitor Analysis', description: 'Assessment of competitive landscape' },
      { id: 'traction_metrics', name: 'Traction Metrics', description: 'User/revenue growth data and adoption metrics' }
    ]},
    { category: 'Team', types: [
      { id: 'team_profiles', name: 'Team Profiles', description: 'Key personnel backgrounds and capabilities' },
      { id: 'org_structure', name: 'Organizational Structure', description: 'Team organization and reporting structure' }
    ]}
  ],
  investor: [
    { category: 'Essential', types: [
      { id: 'investment_thesis', name: 'Investment Thesis', description: 'Detailed investment approach and strategy' },
      { id: 'investor_bio', name: 'Investor Bio', description: 'Professional background and credentials' }
    ]},
    { category: 'Track Record', types: [
      { id: 'portfolio_summary', name: 'Portfolio Summary', description: 'Overview of current/past investments' },
      { id: 'success_cases', name: 'Success Case Studies', description: 'Examples of successful investments and exits' }
    ]},
    { category: 'Process', types: [
      { id: 'term_sheet', name: 'Term Sheet Template', description: 'Sample term sheet with standard terms' },
      { id: 'due_diligence', name: 'Due Diligence Checklist', description: 'Information requirements for evaluation' },
      { id: 'investment_process', name: 'Investment Process Map', description: 'Decision workflow and timeline expectations' }
    ]},
    { category: 'Value Add', types: [
      { id: 'value_add', name: 'Value Add Documentation', description: 'Support offerings beyond capital' },
      { id: 'industry_focus', name: 'Industry Focus Report', description: 'Analysis of focus industries and market trends' }
    ]}
  ],
  digital_asset: [
    { category: 'Verification', types: [
      { id: 'traffic_analytics', name: 'Traffic Analytics', description: 'Analytics reports showing visitor data and sources' },
      { id: 'revenue_proof', name: 'Revenue Proof', description: 'Documentation of income and earnings' }
    ]},
    { category: 'Technical', types: [
      { id: 'domain_registration', name: 'Domain Registration', description: 'Proof of domain ownership and registration details' },
      { id: 'technical_overview', name: 'Technical Overview', description: 'Architecture, platforms, and technologies used' },
      { id: 'content_inventory', name: 'Content Inventory', description: 'Catalog of content assets included in the sale' }
    ]},
    { category: 'Financial', types: [
      { id: 'financial_history', name: 'Financial History', description: 'Revenue and profit history by month/year' },
      { id: 'expense_documentation', name: 'Expense Documentation', description: 'Breakdown of operating costs' }
    ]},
    { category: 'Operational', types: [
      { id: 'seo_analysis', name: 'SEO Analysis', description: 'Search ranking performance and keyword positioning' },
      { id: 'content_process', name: 'Content Process', description: 'Content creation and management workflows' },
      { id: 'monetization_details', name: 'Monetization Details', description: 'How the asset generates revenue' }
    ]}
  ]
};

// Helper function to get file icon based on file type
const getFileIcon = (fileType) => {
  if (fileType.includes('pdf')) return FilePdf;
  if (fileType.includes('sheet') || fileType.includes('excel')) return FileSpreadsheet;
  if (fileType.includes('word') || fileType.includes('document')) return FileText;
  return File;
};

const Documents = () => {
  const { control, watch, setValue, formState: { errors } } = useFormContext();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadError, setUploadError] = useState(null);
  const [currentTab, setCurrentTab] = useState('upload');
  const [previewDocument, setPreviewDocument] = useState(null);
  const [documentToUpload, setDocumentToUpload] = useState({
    type: '',
    name: '',
    description: '',
    isPublic: false
  });
  
  const listingType = watch('type');
  const documents = watch('documents') || [];
  
  // Filter document types based on listing type
  const getDocumentTypesForListing = () => {
    if (!listingType || !documentTypes[listingType]) {
      return [];
    }
    return documentTypes[listingType];
  };
  
  // Handle file drop
  const onDrop = async (acceptedFiles) => {
    if (!documentToUpload.type) {
      setUploadError('Please select a document type before uploading');
      return;
    }
    
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0]; // Only take the first file
    
    setUploading(true);
    setUploadError(null);
    
    try {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File ${file.name} exceeds the maximum size of 10MB`);
      }
      
      // Check file type
      if (!ACCEPTED_FORMATS.includes(file.type)) {
        throw new Error(`File ${file.name} is not a supported format`);
      }
      
      // Initialize progress for this file
      setUploadProgress({
        [file.name]: 0
      });
      
      // Upload the file
      const docData = await uploadDocument(file, (progress) => {
        setUploadProgress({
          [file.name]: progress
        });
      });
      
      // Get the document type details
      const docType = getDocumentTypeById(documentToUpload.type);
      
      // Create the document record
      const newDocument = {
        id: Date.now().toString(),
        type: documentToUpload.type,
        name: documentToUpload.name || file.name,
        description: documentToUpload.description || (docType ? docType.description : ''),
        url: docData.url,
        path: docData.path,
        format: file.type,
        size: file.size,
        isPublic: documentToUpload.isPublic,
        uploadedAt: new Date(),
        verificationStatus: 'pending'
      };
      
      // Add to documents array
      setValue('documents', [...documents, newDocument]);
      
      // Reset the document to upload
      setDocumentToUpload({
        type: '',
        name: '',
        description: '',
        isPublic: false
      });
      
      // Switch to the document list tab
      setCurrentTab('documents');
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };
  
  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: MAX_FILE_SIZE,
    disabled: uploading || !documentToUpload.type,
    maxFiles: 1,
    noClick: true, // Disable click to open file dialog
    noKeyboard: false // Enable keyboard navigation
  });
  
  // Get document type by ID
  const getDocumentTypeById = (id) => {
    for (const category of getDocumentTypesForListing()) {
      const type = category.types.find(t => t.id === id);
      if (type) return type;
    }
    return null;
  };
  
  // Remove a document
  const handleRemoveDocument = async (documentToRemove, index) => {
    try {
      // Remove from storage
      await removeDocument(documentToRemove.path);
      
      // Remove from form state
      const updatedDocuments = documents.filter((_, i) => i !== index);
      setValue('documents', updatedDocuments);
    } catch (error) {
      console.error('Error removing document:', error);
      setUploadError('Failed to remove document. Please try again.');
    }
  };
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Open document preview
  const handlePreviewDocument = (document) => {
    setPreviewDocument(document);
  };
  
  // Close document preview
  const handleClosePreview = () => {
    setPreviewDocument(null);
  };
  
  // Get the appropriate document categories for the current listing type
  const documentCategories = getDocumentTypesForListing();
  
  // Group documents by category
  const groupedDocuments = documents.reduce((acc, doc) => {
    // Find the category of this document type
    let category = 'Other';
    for (const cat of documentCategories) {
      if (cat.types.some(t => t.id === doc.type)) {
        category = cat.category;
        break;
      }
    }
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push(doc);
    return acc;
  }, {});
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            Upload supporting documents to enhance your listing's credibility and provide additional information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Document Requirements */}
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
            <h3 className="text-sm font-medium text-blue-800 flex items-center mb-2">
              <Info className="h-4 w-4 mr-2" />
              Document Guidelines
            </h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Upload documents to provide additional information and increase listing credibility</li>
              <li>Supported formats: PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, JPG, PNG</li>
              <li>Maximum file size: 10MB per document</li>
              <li>Only public documents will be visible to all users; private documents are shared only with qualified inquiries</li>
              <li>Redact any sensitive information before uploading (e.g., personal information, exact financials)</li>
            </ul>
          </div>
          
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="upload">Upload Document</TabsTrigger>
              <TabsTrigger value="documents">
                Document List
                {documents.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {documents.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-6">
              <Controller
                name="documents"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div className="space-y-6">
                    {/* Document Type Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="documentType" className="text-base font-medium">
                        Document Type
                      </Label>
                      
                      <Select
                        value={documentToUpload.type}
                        onValueChange={(value) => setDocumentToUpload({...documentToUpload, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentCategories.map((category) => (
                            <React.Fragment key={category.category}>
                              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                                {category.category}
                              </div>
                              {category.types.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </React.Fragment>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {documentToUpload.type && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {getDocumentTypeById(documentToUpload.type)?.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Document Name */}
                    <div className="space-y-2">
                      <Label htmlFor="documentName" className="text-base font-medium">
                        Document Name (Optional)
                      </Label>
                      <Input
                        id="documentName"
                        placeholder="Enter a descriptive name for this document"
                        value={documentToUpload.name}
                        onChange={(e) => setDocumentToUpload({...documentToUpload, name: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        If left blank, the file name will be used
                      </p>
                    </div>
                    
                    {/* Document Description */}
                    <div className="space-y-2">
                      <Label htmlFor="documentDescription" className="text-base font-medium">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="documentDescription"
                        placeholder="Briefly describe what this document contains"
                        value={documentToUpload.description}
                        onChange={(e) => setDocumentToUpload({...documentToUpload, description: e.target.value})}
                      />
                    </div>
                    
                    {/* Public/Private Toggle */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="isPublic" className="text-base font-medium">
                            Make Document Public
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Public documents are visible to all users. Private documents are shared only with qualified inquiries.
                          </p>
                        </div>
                        <Switch
                          id="isPublic"
                          checked={documentToUpload.isPublic}
                          onCheckedChange={(checked) => setDocumentToUpload({...documentToUpload, isPublic: checked})}
                        />
                      </div>
                    </div>
                    
                    {/* Upload Dropzone */}
                    <div className="pt-4">
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          isDragActive 
                            ? 'border-brand-blue bg-blue-50' 
                            : !documentToUpload.type
                              ? 'border-gray-200 bg-gray-50 opacity-70'
                              : 'border-gray-300 hover:border-gray-400'
                        } ${uploading ? 'opacity-75 pointer-events-none' : ''}`}
                      >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className={`p-3 rounded-full ${
                            isDragActive 
                              ? 'bg-brand-blue text-white' 
                              : !documentToUpload.type
                                ? 'bg-gray-100 text-gray-400'
                                : 'bg-gray-100 text-gray-500'
                          }`}>
                            <Upload className="h-6 w-6" />
                          </div>
                          
                          {isDragActive ? (
                            <p className="text-brand-blue font-medium">Drop the file here...</p>
                          ) : !documentToUpload.type ? (
                            <p className="text-gray-500">Please select a document type first</p>
                          ) : (
                            <div>
                              <p className="font-medium text-gray-700">
                                Drag & drop a file here, or
                              </p>
                              <Button 
                                type="button" 
                                variant="link" 
                                onClick={open}
                                className="text-brand-blue p-0 h-auto text-sm"
                              >
                                click to select a file
                              </Button>
                            </div>
                          )}
                          
                          <p className="text-xs text-muted-foreground">
                            Max file size: 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Error Message */}
                    {uploadError && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{uploadError}</AlertDescription>
                      </Alert>
                    )}
                    
                    {/* Upload Progress */}
                    {uploading && Object.keys(uploadProgress).length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Uploading...</p>
                        {Object.entries(uploadProgress).map(([fileName, progress]) => (
                          <div key={fileName} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="truncate max-w-md">{fileName}</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-1" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <Controller
                name="documents"
                control={control}
                render={({ field }) => (
                  <div>
                    {documents.length === 0 ? (
                      <div className="text-center py-8 border border-dashed rounded-lg">
                        <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No Documents Yet</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                          Upload supporting documents to enhance your listing's credibility.
                        </p>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setCurrentTab('upload')}
                        >
                          Upload Document
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Documents By Category */}
                        {Object.entries(groupedDocuments).map(([category, docs]) => (
                          <div key={category} className="space-y-3">
                            <h3 className="text-sm font-medium">{category} Documents</h3>
                            
                            <div className="border rounded-md divide-y">
                              {docs.map((doc, index) => {
                                const FileIcon = getFileIcon(doc.format);
                                return (
                                  <div key={doc.id} className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="bg-gray-100 p-2 rounded">
                                        <FileIcon className="h-6 w-6 text-gray-600" />
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium flex items-center gap-2">
                                          {doc.name || 'Unnamed Document'}
                                          {doc.isPublic && (
                                            <Badge variant="secondary" className="ml-1 text-xs">
                                              Public
                                            </Badge>
                                          )}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                          <span>
                                            {getDocumentTypeById(doc.type)?.name || 'Other'}
                                          </span>
                                          <span>•</span>
                                          <span>{formatFileSize(doc.size)}</span>
                                          <span>•</span>
                                          <span>
                                            {new Date(doc.uploadedAt).toLocaleDateString()}
                                          </span>
                                        </div>
                                        {doc.description && (
                                          <p className="text-xs text-muted-foreground mt-1 max-w-md">
                                            {doc.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handlePreviewDocument(doc)}
                                        title="Preview document"
                                        className="h-8 w-8 p-0"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => window.open(doc.url, '_blank')}
                                        title="Download document"
                                        className="h-8 w-8 p-0"
                                      >
                                        <Download className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveDocument(doc, index)}
                                        title="Remove document"
                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                        
                        <div className="pt-2 flex justify-center">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setCurrentTab('upload')}
                            className="flex items-center gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Upload Another Document
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Document Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={handleClosePreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewDocument?.name}</DialogTitle>
            <DialogDescription>
              {getDocumentTypeById(previewDocument?.type)?.name || 'Document'} - {formatFileSize(previewDocument?.size || 0)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {previewDocument && (
              previewDocument.format.includes('pdf') ? (
                <div className="h-96 border rounded-md overflow-hidden">
                  <iframe 
                    src={`${previewDocument.url}#toolbar=0`} 
                    title={previewDocument.name}
                    className="w-full h-full"
                  />
                </div>
              ) : previewDocument.format.includes('image') ? (
                <div className="border rounded-md overflow-hidden">
                  <img 
                    src={previewDocument.url} 
                    alt={previewDocument.name}
                    className="max-h-96 mx-auto"
                  />
                </div>
              ) : (
                <div className="text-center py-12 border rounded-md">
                  <FileIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Preview not available</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This document type cannot be previewed directly.
                  </p>
                  <Button
                    onClick={() => window.open(previewDocument.url, '_blank')}
                    className="flex items-center mx-auto gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download to View
                  </Button>
                </div>
              )
            )}
          </div>
          
          {previewDocument?.description && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm">
              <p className="font-medium mb-1">Description:</p>
              <p className="text-muted-foreground">{previewDocument.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;