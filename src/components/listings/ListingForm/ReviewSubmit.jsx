import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  CalendarIcon,
  PenToolIcon,
  ImageIcon,
  FileIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  AlertCircleIcon,
  CheckCircleIcon
} from 'lucide-react';

import {
  LISTING_TYPES,
  INDUSTRIES_MAP,
  PLANS_MAP
} from '@/utils/constants';

const ReviewSubmit = ({ formData }) => {
  const { formState } = useFormContext();
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const { errors } = formState;
  const hasErrors = Object.keys(errors).length > 0;
  
  // Format currency values
  const formatCurrency = (value, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Format date values
  const formatDate = (date) => {
    if (!date) return 'Not specified';
    
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  // Get listing type label
  const getListingTypeLabel = (type) => {
    const listingType = LISTING_TYPES.find(t => t.value === type);
    return listingType ? listingType.label : type;
  };
  
  // Get industry labels
  const getIndustryLabels = (industries) => {
    if (!industries || !industries.length) return 'Not specified';
    
    return industries.map(industry => INDUSTRIES_MAP[industry] || industry).join(', ');
  };

  // Get plan label
  const getPlanLabel = (plan) => {
    return PLANS_MAP[plan] || plan;
  };
  
  // Get document count
  const getDocumentCount = () => {
    return formData.documents?.length || 0;
  };
  
  // Render section errors
  const renderSectionErrors = (sectionPath) => {
    const sectionErrors = Object.keys(errors)
      .filter(key => key.startsWith(sectionPath))
      .map(key => errors[key].message);
    
    if (sectionErrors.length === 0) return null;
    
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Please fix the following issues:</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-5 space-y-1">
            {sectionErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    );
  };
  
  // Sections for review
  const sections = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      icon: <PenToolIcon className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Listing Type</p>
              <p className="mt-1">{getListingTypeLabel(formData.type)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Listing Name</p>
              <p className="mt-1">{formData.name}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Industries</p>
            <p className="mt-1">{getIndustryLabels(formData.industries)}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <p className="mt-1 text-sm">{formData.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Plan Type</p>
              <p className="mt-1">{getPlanLabel(formData.plan)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge>Pending Review</Badge>
            </div>
          </div>

          {renderSectionErrors('name') || 
           renderSectionErrors('type') || 
           renderSectionErrors('industries') || 
           renderSectionErrors('description') || 
           renderSectionErrors('plan')}
        </div>
      )
    },
    {
      id: 'location',
      title: 'Location Information',
      icon: <MapPinIcon className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Country</p>
              <p className="mt-1">{formData.location?.country || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">State</p>
              <p className="mt-1">{formData.location?.state || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">City</p>
              <p className="mt-1">{formData.location?.city || 'Not specified'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="mt-1">{formData.location?.address || 'Not specified'}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Pincode</p>
            <p className="mt-1">{formData.location?.pincode || 'Not specified'}</p>
          </div>

          {renderSectionErrors('location')}
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <PhoneIcon className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Contact Email</p>
              <p className="mt-1">{formData.contactInfo?.email || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact Phone</p>
              <p className="mt-1">{formData.contactInfo?.phone || 'Not specified'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Contact Person</p>
              <p className="mt-1">{formData.contactInfo?.contactName || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Website</p>
              <p className="mt-1">{formData.contactInfo?.website || 'Not specified'}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Preferred Contact Method</p>
            <p className="mt-1">
              {formData.contactInfo?.preferredContactMethod ? 
                formData.contactInfo.preferredContactMethod.charAt(0).toUpperCase() + 
                formData.contactInfo.preferredContactMethod.slice(1) : 
                'Not specified'}
            </p>
          </div>

          {renderSectionErrors('contactInfo')}
        </div>
      )
    },
    {
      id: 'media',
      title: 'Media',
      icon: <ImageIcon className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Gallery Images</p>
            <p className="mt-1">{formData.media?.galleryImages?.length || 0} images uploaded</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {formData.media?.galleryImages?.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image.url} 
                  alt={image.alt || `Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                {formData.media?.featuredImage?.path === image.path && (
                  <div className="absolute top-1 left-1">
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          {renderSectionErrors('media')}
        </div>
      )
    },
    {
      id: 'details',
      title: 'Listing Details',
      icon: <FileIcon className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          {formData.type === 'business' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Business Type</p>
                  <p className="mt-1">{formData.businessDetails?.businessType || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Entity Type</p>
                  <p className="mt-1">{formData.businessDetails?.entityType || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Year Established</p>
                  <p className="mt-1">{formData.businessDetails?.establishedYear || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Asking Price</p>
                  <p className="mt-1">
                    {formData.businessDetails?.sale?.askingPrice?.value ? 
                      formatCurrency(formData.businessDetails.sale.askingPrice.value) : 
                      'Not specified'}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <p className="mt-1">{formData.businessDetails?.operations?.employees?.count || 0}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Annual Revenue</p>
                <p className="mt-1">
                  {formData.businessDetails?.financials?.annualRevenue?.value ? 
                    formatCurrency(formData.businessDetails.financials.annualRevenue.value) : 
                    'Not specified'}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Profit Margin</p>
                <p className="mt-1">
                  {formData.businessDetails?.financials?.profitMargin?.percentage ? 
                    `${formData.businessDetails.financials.profitMargin.percentage}%` : 
                    'Not specified'}
                </p>
              </div>
            </>
          )}
          
          {formData.type === 'franchise' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Franchise Brand</p>
                  <p className="mt-1">{formData.franchiseDetails?.franchiseBrand || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Franchise Type</p>
                  <p className="mt-1">{formData.franchiseDetails?.franchiseType || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Franchise Since</p>
                  <p className="mt-1">{formData.franchiseDetails?.franchiseSince || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Brand Established</p>
                  <p className="mt-1">{formData.franchiseDetails?.brandEstablished || 'Not specified'}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium text-gray-500">Total Units</p>
                <p className="mt-1">{formData.franchiseDetails?.totalUnits || 0}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Franchise Fee</p>
                <p className="mt-1">
                  {formData.franchiseDetails?.investment?.franchiseFee?.value ? 
                    formatCurrency(formData.franchiseDetails.investment.franchiseFee.value) : 
                    'Not specified'}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Royalty Fee</p>
                <p className="mt-1">
                  {formData.franchiseDetails?.investment?.royaltyFee ? 
                    `${formData.franchiseDetails.investment.royaltyFee}%` : 
                    'Not specified'}
                </p>
              </div>
            </>
          )}
          
          {formData.type === 'startup' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Development Stage</p>
                  <p className="mt-1">{formData.startupDetails?.developmentStage || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Registered Name</p>
                  <p className="mt-1">{formData.startupDetails?.registeredName || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Founded Date</p>
                  <p className="mt-1">{formatDate(formData.startupDetails?.foundedDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Launch Date</p>
                  <p className="mt-1">{formatDate(formData.startupDetails?.launchDate)}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium text-gray-500">Team Size</p>
                <p className="mt-1">{formData.startupDetails?.team?.size || 0}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Funding Stage</p>
                <p className="mt-1">{formData.startupDetails?.funding?.fundingStage || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Current Raising Amount</p>
                <p className="mt-1">
                  {formData.startupDetails?.funding?.currentRaisingAmount?.value ? 
                    formatCurrency(formData.startupDetails.funding.currentRaisingAmount.value) : 
                    'Not specified'}
                </p>
              </div>
            </>
          )}
          
          {formData.type === 'investor' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Investor Type</p>
                  <p className="mt-1">{formData.investorDetails?.investorType || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Years of Experience</p>
                  <p className="mt-1">{formData.investorDetails?.yearsOfExperience || 'Not specified'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Investment Philosophy</p>
                <p className="mt-1 text-sm">{formData.investorDetails?.investmentPhilosophy || 'Not specified'}</p>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium text-gray-500">Annual Investment Target</p>
                <p className="mt-1">
                  {formData.investorDetails?.investment?.annualInvestmentTarget?.value ? 
                    formatCurrency(formData.investorDetails.investment.annualInvestmentTarget.value) : 
                    'Not specified'}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Preferred Rounds</p>
                <p className="mt-1">
                  {formData.investorDetails?.investment?.preferredRounds?.join(', ') || 'Not specified'}
                </p>
              </div>
            </>
          )}
          
          {formData.type === 'digital_asset' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Asset Type</p>
                  <p className="mt-1">{formData.digitalAssetDetails?.assetType || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Platform/Framework</p>
                  <p className="mt-1">{formData.digitalAssetDetails?.platformFramework || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Niche/Industry</p>
                  <p className="mt-1">{formData.digitalAssetDetails?.nicheIndustry || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Creation Date</p>
                  <p className="mt-1">{formatDate(formData.digitalAssetDetails?.creationDate)}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Visitors</p>
                <p className="mt-1">{formData.digitalAssetDetails?.traffic?.monthlyVisitors?.toLocaleString() || 0}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="mt-1">
                  {formData.digitalAssetDetails?.financials?.monthlyRevenue?.value ? 
                    formatCurrency(formData.digitalAssetDetails.financials.monthlyRevenue.value) : 
                    'Not specified'}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Asking Price</p>
                <p className="mt-1">
                  {formData.digitalAssetDetails?.sale?.askingPrice?.value ? 
                    formatCurrency(formData.digitalAssetDetails.sale.askingPrice.value) : 
                    'Not specified'}
                </p>
              </div>
            </>
          )}

          {renderSectionErrors(formData.type + 'Details')}
        </div>
      )
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: <FileIcon className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Documents</p>
            <p className="mt-1">{getDocumentCount()} documents uploaded</p>
          </div>
          
          {formData.documents && formData.documents.length > 0 ? (
            <div className="space-y-2">
              {formData.documents.map((document, index) => (
                <div key={index} className="flex items-center p-2 border rounded-md">
                  <div className="mr-3 text-lg text-gray-400">
                    <FileIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{document.name}</p>
                    <p className="text-xs text-gray-500">{document.type}</p>
                  </div>
                  <Badge 
                    variant={document.isPublic ? "secondary" : "outline"}
                    className="ml-auto"
                  >
                    {document.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-amber-600">
              No documents uploaded. Adding supporting documents improves listing credibility.
            </p>
          )}

          {renderSectionErrors('documents')}
        </div>
      )
    }
  ];
  
  return (
    <div className="space-y-8">
      <div className="text-lg font-semibold">Step 5: Review & Submit</div>
      <p className="text-gray-600">
        Please review your listing information carefully before submission. Once submitted, your listing will be reviewed by our team.
      </p>
      
      {hasErrors && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Unable to submit listing</AlertTitle>
          <AlertDescription>
            There are errors in your listing information. Please review each section and fix the highlighted issues.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Listing Summary</CardTitle>
          <CardDescription>
            Review the details of your {getListingTypeLabel(formData.type).toLowerCase()} listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="group">
                  <div className="flex items-center">
                    <div className="mr-2 text-blue-600">
                      {section.icon}
                    </div>
                    <span>{section.title}</span>
                    {Object.keys(errors).some(key => key.startsWith(section.id)) && (
                      <div className="ml-3 text-red-500">
                        <AlertCircleIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I confirm that all information provided is accurate and complete, and I agree to the Terms and Conditions.
            </label>
          </div>
          
          <div className="w-full flex flex-col space-y-2">
            <Alert variant={hasErrors ? "destructive" : "success"}>
              {hasErrors ? (
                <>
                  <AlertCircleIcon className="h-4 w-4" />
                  <AlertTitle>Action Required</AlertTitle>
                  <AlertDescription>
                    Please fix all errors before submitting your listing.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-4 w-4" />
                  <AlertTitle>Ready to Submit</AlertTitle>
                  <AlertDescription>
                    Your listing information is complete. You can now submit it for review.
                  </AlertDescription>
                </>
              )}
            </Alert>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReviewSubmit;