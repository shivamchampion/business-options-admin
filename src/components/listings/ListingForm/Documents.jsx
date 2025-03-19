import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  File, 
  FileText, 
  UploadCloud, 
  X, 
  Info, 
  AlertTriangle,
  FileCheck,
  FilePlus
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { LISTING_TYPES } from '../../../utils/constants';
import { formatFileSize } from '../../../utils/formatters';

const Documents = ({ documents = [], setDocuments, listingType }) => {
  const { formState: { errors } } = useFormContext();
  const [uploadErrors, setUploadErrors] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  
  // Define document types based on listing type
  const getDocumentTypes = () => {
    switch (listingType) {
      case LISTING_TYPES.BUSINESS:
        return [
          { id: 'business_registration', label: 'Business Registration', required: true },
          { id: 'financial_summary', label: 'Financial Summary', required: true },
          { id: 'profit_loss', label: 'Profit & Loss Statement', required: false },
          { id: 'balance_sheet', label: 'Balance Sheet', required: false },
          { id: 'inventory_list', label: 'Inventory List', required: false },
          { id: 'equipment_list', label: 'Equipment List', required: false },
          { id: 'lease_agreement', label: 'Lease Agreement', required: false },
          { id: 'business_process', label: 'Business Process Manual', required: false },
          { id: 'sale_memorandum', label: 'Sale Memorandum', required: false },
          { id: 'other', label: 'Other Document', required: false }
        ];
      case LISTING_TYPES.FRANCHISE:
        return [
          { id: 'franchise_disclosure', label: 'Franchise Disclosure Document', required: true },
          { id: 'franchise_agreement', label: 'Franchise Agreement Sample', required: false },
          { id: 'unit_economics', label: 'Unit Economics Model', required: true },
          { id: 'brand_standards', label: 'Brand Standards Manual', required: false },
          { id: 'training_program', label: 'Training Program Overview', required: false },
          { id: 'marketing_materials', label: 'Marketing Materials', required: false },
          { id: 'locations_map', label: 'Franchise Locations Map', required: false },
          { id: 'store_design', label: 'Store Design Specifications', required: false },
          { id: 'equipment_package', label: 'Equipment Package Details', required: false },
          { id: 'other', label: 'Other Document', required: false }
        ];
      case LISTING_TYPES.STARTUP:
        return [
          { id: 'pitch_deck', label: 'Pitch Deck', required: true },
          { id: 'business_plan', label: 'Business Plan', required: false },
          { id: 'executive_summary', label: 'Executive Summary', required: true },
          { id: 'financial_projections', label: 'Financial Projections', required: false },
          { id: 'financial_history', label: 'Financial History', required: false },
          { id: 'product_demo', label: 'Product Demo', required: false },
          { id: 'technical_architecture', label: 'Technical Architecture', required: false },
          { id: 'market_research', label: 'Market Research', required: false },
          { id: 'team_profiles', label: 'Team Profiles', required: false },
          { id: 'traction_metrics', label: 'Traction Metrics', required: false },
          { id: 'product_roadmap', label: 'Product Roadmap', required: false },
          { id: 'other', label: 'Other Document', required: false }
        ];
      case LISTING_TYPES.INVESTOR:
        return [
          { id: 'investment_thesis', label: 'Investment Thesis', required: true },
          { id: 'portfolio_summary', label: 'Portfolio Summary', required: false },
          { id: 'investor_bio', label: 'Investor Bio', required: true },
          { id: 'term_sheet', label: 'Term Sheet Template', required: false },
          { id: 'due_diligence', label: 'Due Diligence Checklist', required: false },
          { id: 'investment_process', label: 'Investment Process Map', required: false },
          { id: 'value_add', label: 'Value Add Documentation', required: false },
          { id: 'success_cases', label: 'Success Case Studies', required: false },
          { id: 'industry_focus', label: 'Industry Focus Report', required: false },
          { id: 'other', label: 'Other Document', required: false }
        ];
      case LISTING_TYPES.DIGITAL_ASSET:
        return [
          { id: 'traffic_analytics', label: 'Traffic Analytics Proof', required: true },
          { id: 'revenue_proof', label: 'Revenue Proof', required: true },
          { id: 'domain_registration', label: 'Domain Registration', required: false },
          { id: 'content_inventory', label: 'Content Inventory', required: false },
          { id: 'financial_history', label: 'Financial History', required: false },
          { id: 'expense_documentation', label: 'Expense Documentation', required: false },
          { id: 'seo_analysis', label: 'SEO Analysis', required: false },
          { id: 'content_process', label: 'Content Process Documentation', required: false },
          { id: 'other', label: 'Other Document', required: false }
        ];
      default:
        return [];
    }
  };
  
  const documentTypes = getDocumentTypes();
  const requiredDocumentTypes = documentTypes.filter(type => type.required);
  
  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    const errors = [];
    
    // Handle rejected files
    if (rejectedFiles && rejectedFiles.length > 0) {
      rejectedFiles.forEach(rejected => {
        const error = {
          file: rejected.file.name,
          errors: rejected.errors.map(err => err.message)
        };
        errors.push(error);
      });
    }
    
    // Update error state
    setUploadErrors(errors);
    
    // Process accepted files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Take only the first file
      
      // Create document object
      const doc = {
        id: `doc_${Date.now()}`,
        type: documentType,
        name: documentName || file.name,
        description: documentDescription,
        file: file,
        size: file.size,
        format: file.type,
        isNew: true
      };
      
      // Add to documents array
      setDocuments(prevDocs => [...prevDocs, doc]);
      
      // Reset form fields
      setDocumentType('');
      setDocumentName('');
      setDocumentDescription('');
    }
  }, [documentType, documentName, documentDescription, setDocuments]);
  
  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 10485760, // 10MB
    multiple: false,
  });
  
  // Remove document
  const removeDocument = (docId) => {
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== docId));
  };
  
  // Get document icon based on format
  const getDocumentIcon = (doc) => {
    if (doc.format?.includes('pdf')) {
      return <FileText size={24} className="text-error" />;
    } else if (doc.format?.includes('word') || doc.format?.includes('document')) {
      return <File size={24} className="text-brand-blue" />;
    } else if (doc.format?.includes('excel') || doc.format?.includes('sheet')) {
      return <File size={24} className="text-success" />;
    } else if (doc.format?.includes('image')) {
      return <File size={24} className="text-warning" />;
    } else {
      return <File size={24} className="text-gray" />;
    }
  };
  
  // Check if a document type has been uploaded
  const hasDocumentType = (type) => {
    return documents.some(doc => doc.type === type);
  };
  
  // Check if all required documents have been uploaded
  const hasAllRequiredDocuments = () => {
    return requiredDocumentTypes.every(type => hasDocumentType(type.id));
  };
  
  return (
    <div className="space-y-6">
      <div className="form-section">
        <h2 className="form-section-title">Supporting Documents</h2>
        <p className="text-gray text-sm mb-6">
          Upload supporting documents to strengthen your listing and provide necessary verification.
          {requiredDocumentTypes.length > 0 && (
            ` Some document types are required for ${
              listingType === LISTING_TYPES.BUSINESS ? 'business' :
              listingType === LISTING_TYPES.FRANCHISE ? 'franchise' :
              listingType === LISTING_TYPES.STARTUP ? 'startup' :
              listingType === LISTING_TYPES.INVESTOR ? 'investor' :
              'digital asset'
            } listings.`
          )}
        </p>
        
        {/* Document requirements */}
        <div className="bg-light-blue bg-opacity-70 rounded-md p-4 border border-brand-blue border-opacity-20 mb-6">
          <div className="flex items-start">
            <Info size={20} className="text-brand-blue flex-shrink-0 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-dark-gray mb-1">Document requirements</h3>
              <ul className="text-sm text-gray space-y-1 list-disc list-inside">
                <li>Maximum file size: 10MB per document</li>
                <li>Accepted formats: PDF, Word (DOC/DOCX), Excel (XLS/XLSX), Images (JPG/PNG)</li>
                <li>Required documents are marked with an asterisk (*)</li>
                <li>Confidential information should be redacted where appropriate</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Error summary if validation fails */}
        {errors.documents && (
          <div className="bg-error bg-opacity-10 text-error text-sm p-4 rounded-md mb-6">
            <div className="flex items-start">
              <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <p>{errors.documents.message}</p>
            </div>
          </div>
        )}
        
        {/* Required documents warning */}
        {!hasAllRequiredDocuments() && (
          <div className="bg-warning bg-opacity-10 text-warning text-sm p-4 rounded-md mb-6">
            <div className="flex items-start">
              <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Required documents missing:</p>
                <ul className="list-disc list-inside">
                  {requiredDocumentTypes.map(type => !hasDocumentType(type.id) && (
                    <li key={type.id}>{type.label}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Upload errors */}
        {uploadErrors.length > 0 && (
          <div className="bg-error bg-opacity-10 text-error text-sm p-4 rounded-md mb-6">
            <div className="flex items-start">
              <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Some files couldn't be uploaded:</p>
                <ul className="list-disc list-inside">
                  {uploadErrors.map((error, index) => (
                    <li key={index}>
                      <span className="font-medium">{error.file}</span>: {error.errors.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Document upload form */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-md font-medium text-dark-gray mb-3">
            Upload New Document
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Document Type */}
            <div>
              <label htmlFor="documentType" className="form-label">
                Document Type
              </label>
              <select
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full rounded-md border border-gray-300 focus:ring-brand-blue focus:outline-none focus:ring-2 px-3 py-2"
              >
                <option value="">Select Document Type</option>
                {documentTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.label} {type.required ? '*' : ''}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Document Name */}
            <div>
              <label htmlFor="documentName" className="form-label">
                Document Name (Optional)
              </label>
              <input
                id="documentName"
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Custom name for this document"
                className="w-full rounded-md border border-gray-300 focus:ring-brand-blue focus:outline-none focus:ring-2 px-3 py-2"
              />
            </div>
          </div>
          
          {/* Document Description */}
          <div className="mb-4">
            <label htmlFor="documentDescription" className="form-label">
              Description (Optional)
            </label>
            <textarea
              id="documentDescription"
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
              placeholder="Brief description of this document's contents"
              rows={2}
              className="w-full rounded-md border border-gray-300 focus:ring-brand-blue focus:outline-none focus:ring-2 px-3 py-2"
            ></textarea>
          </div>
          
          {/* Dropzone for file upload */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-brand-blue bg-light-blue bg-opacity-50' : 'border-gray-300 hover:border-gray-400'
            } ${!documentType ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} disabled={!documentType} />
            
            <UploadCloud 
              size={40} 
              className={`mx-auto mb-2 ${isDragActive ? 'text-brand-blue' : 'text-gray-400'}`} 
            />
            
            {isDragActive ? (
              <p className="text-md font-medium text-brand-blue">Drop your file here</p>
            ) : (
              <>
                <p className="text-md font-medium text-dark-gray mb-1">
                  {!documentType 
                    ? 'Please select a document type first' 
                    : 'Drag and drop your file here, or click to select'
                  }
                </p>
                <p className="text-sm text-gray">
                  PDF, Word, Excel, or image files up to 10MB
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* Uploaded documents list */}
        {documents.length > 0 && (
          <div>
            <h3 className="text-md font-medium text-dark-gray mb-3">
              Uploaded Documents ({documents.length})
            </h3>
            
            <div className="space-y-3">
              {documents.map((doc) => {
                // Find document type info
                const typeInfo = documentTypes.find(type => type.id === doc.type) || 
                  { id: doc.type, label: doc.type, required: false };
                
                return (
                  <div 
                    key={doc.id} 
                    className="flex items-center bg-white border border-gray-200 rounded-lg p-3"
                  >
                    <div className="mr-3">
                      {getDocumentIcon(doc)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-dark-gray truncate">
                        {doc.name || `Document ${doc.id}`}
                      </h4>
                      <div className="flex items-center text-xs text-gray">
                        <span className="mr-2">
                          {typeInfo.label} {typeInfo.required ? '*' : ''}
                        </span>
                        {doc.size && (
                          <span className="mr-2">
                            {formatFileSize(doc.size)}
                          </span>
                        )}
                        {doc.description && (
                          <span className="truncate">
                            {doc.description}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-3 flex items-center">
                      {doc.isNew ? (
                        <span className="mr-3 px-2 py-0.5 text-xs bg-success bg-opacity-10 text-success rounded-full">
                          New
                        </span>
                      ) : (
                        <span className="mr-3 px-2 py-0.5 text-xs bg-brand-blue bg-opacity-10 text-brand-blue rounded-full">
                          Uploaded
                        </span>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => removeDocument(doc.id)}
                        className="p-1 rounded-md text-gray hover:text-error hover:bg-gray-100"
                        title="Remove document"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;