import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, AlertTriangle, Edit, Image, FileText, ChevronRight, Ban } from 'lucide-react';
import { formatCurrency, formatDateString } from '@/utils/formatters';

const ReviewSubmit = () => {
  const { getValues, formState: { errors, isValid, isDirty } } = useFormContext();
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const formData = getValues();
  const { type, name, description, industries, status, plan, location, contactInfo, media, documents } = formData;
  
  // Extract type-specific details based on the listing type
  const typeDetails = type === 'business' ? formData.businessDetails :
                      type === 'franchise' ? formData.franchiseDetails :
                      type === 'startup' ? formData.startupDetails :
                      type === 'investor' ? formData.investorDetails :
                      type === 'digital_asset' ? formData.digitalAssetDetails : null;
  
  // Helper function to get formatted industry names
  const getIndustryNames = () => {
    // In a real app, you would fetch the industry names from your context or a service
    // This is a placeholder implementation
    return (industries || []).map(ind => ind).join(', ');
  };
  
  // Helper function to check if a section has errors
  const sectionHasErrors = (sectionKey) => {
    return Object.keys(errors).some(key => key.startsWith(sectionKey));
  };
  
  // Get a summary of all validation errors
  const getErrorSummary = () => {
    const errorSections = [];
    
    if (sectionHasErrors('')) errorSections.push('Basic Information');
    if (sectionHasErrors('media')) errorSections.push('Media');
    if (sectionHasErrors('businessDetails')) errorSections.push('Business Details');
    if (sectionHasErrors('franchiseDetails')) errorSections.push('Franchise Details');
    if (sectionHasErrors('startupDetails')) errorSections.push('Startup Details');
    if (sectionHasErrors('investorDetails')) errorSections.push('Investor Details');
    if (sectionHasErrors('digitalAssetDetails')) errorSections.push('Digital Asset Details');
    
    return errorSections;
  };
  
  const errorSections = getErrorSummary();
  
  return (
    <div className="space-y-6">
      {/* Validation Overview */}
      {errorSections.length > 0 ? (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Please fix the errors in the following sections before submitting:
            <ul className="mt-2 list-disc list-inside">
              {errorSections.map(section => (
                <li key={section}>{section}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="success" className="mb-6 bg-green-50 text-green-700 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Your listing information has been validated and is ready to submit!
          </AlertDescription>
        </Alert>
      )}
      
      {/* Basic Info Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Listing Overview</CardTitle>
            <CardDescription>Review the basic information for your listing</CardDescription>
          </div>
          <Button variant="ghost" asChild className="flex items-center gap-1" aria-label="Edit Basic Info">
            <Link to="#" onClick={() => document.getElementById('step-link-0').click()}>
              <Edit className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Edit</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 text-sm">
            <div>
              <dt className="font-medium text-gray-500">Listing Type</dt>
              <dd className="mt-1">
                <Badge variant="outline" className="capitalize">
                  {type === 'digital_asset' ? 'Digital Asset' : type}
                </Badge>
              </dd>
            </div>
            
            <div>
              <dt className="font-medium text-gray-500">Status</dt>
              <dd className="mt-1">
                <Badge 
                  className={
                    status === 'published' ? 'bg-green-100 text-green-800' :
                    status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-800'
                  }
                >
                  {status === 'published' ? 'Published' :
                   status === 'pending' ? 'Pending Review' : 
                   status === 'draft' ? 'Draft' : status}
                </Badge>
              </dd>
            </div>
            
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Listing Name</dt>
              <dd className="mt-1 font-medium text-base">{name}</dd>
            </div>
            
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Industries</dt>
              <dd className="mt-1">{getIndustryNames()}</dd>
            </div>
            
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Location</dt>
              <dd className="mt-1">
                {location?.city && location?.state ? 
                  `${location.city}, ${location.state}` : 
                  'Location not specified'}
              </dd>
            </div>
            
            <div className="sm:col-span-2">
              <dt className="font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-700 line-clamp-3">
                {description}
                {description && description.length > 150 && (
                  <Button variant="link" size="sm" className="ml-1 h-auto p-0">
                    Read more
                  </Button>
                )}
              </dd>
            </div>
            
            <div>
              <dt className="font-medium text-gray-500">Visibility Plan</dt>
              <dd className="mt-1 capitalize">{plan}</dd>
            </div>
            
            <div>
              <dt className="font-medium text-gray-500">Featured</dt>
              <dd className="mt-1">{formData.isFeatured ? 'Yes' : 'No'}</dd>
            </div>
            
            <div>
              <dt className="font-medium text-gray-500">Contact Email</dt>
              <dd className="mt-1">{contactInfo?.email}</dd>
            </div>
            
            <div>
              <dt className="font-medium text-gray-500">Contact Phone</dt>
              <dd className="mt-1">{contactInfo?.phone || 'Not provided'}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      {/* Media Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Media</CardTitle>
            <CardDescription>Review the images for your listing</CardDescription>
          </div>
          <Button variant="ghost" asChild className="flex items-center gap-1" aria-label="Edit Media">
            <Link to="#" onClick={() => document.getElementById('step-link-1').click()}>
              <Edit className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Edit</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Featured Image */}
            {media?.featuredImage ? (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Featured Image</h4>
                <div className="relative aspect-video w-full max-w-md rounded-md overflow-hidden border border-gray-200">
                  <img 
                    src={media.featuredImage.url} 
                    alt="Featured" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-100 rounded-md p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">No Featured Image</h4>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Please select a featured image to improve your listing's visibility.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Gallery Images */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-500">Gallery Images</h4>
                <span className="text-xs text-muted-foreground">
                  {media?.galleryImages?.length || 0} of {media?.galleryImages?.length >= 3 ? 10 : 3} images
                </span>
              </div>
              
              {media?.galleryImages && media.galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {media.galleryImages.slice(0, 5).map((image, index) => (
                    <div key={index} className="aspect-video rounded-md overflow-hidden border border-gray-200">
                      <img 
                        src={image.url} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ))}
                  {media.galleryImages.length > 5 && (
                    <div className="aspect-video rounded-md overflow-hidden border border-gray-200 relative bg-gray-100 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-medium">
                        +{media.galleryImages.length - 5} more
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-100 rounded-md p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">Missing Gallery Images</h4>
                      <p className="text-xs text-amber-700 mt-0.5">
                        Please upload at least 3 images to create your listing.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Listing Details Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Listing Details</CardTitle>
            <CardDescription>Review the specific details for your {type === 'digital_asset' ? 'Digital Asset' : type} listing</CardDescription>
          </div>
          <Button variant="ghost" asChild className="flex items-center gap-1" aria-label="Edit Details">
            <Link to="#" onClick={() => document.getElementById('step-link-2').click()}>
              <Edit className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Edit</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {typeDetails ? (
            <Accordion type="single" collapsible className="w-full">
              {/* Business Details */}
              {type === 'business' && (
                <>
                  <AccordionItem value="business-info">
                    <AccordionTrigger>Business Information</AccordionTrigger>
                    <AccordionContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Business Type</dt>
                          <dd className="mt-1">{typeDetails.businessType}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Entity Type</dt>
                          <dd className="mt-1">{typeDetails.entityType}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Year Established</dt>
                          <dd className="mt-1">{typeDetails.establishedYear}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Registration Number</dt>
                          <dd className="mt-1">{typeDetails.registrationNumber}</dd>
                        </div>
                        {typeDetails.gstNumber && (
                          <div>
                            <dt className="font-medium text-gray-500">GST Number</dt>
                            <dd className="mt-1">{typeDetails.gstNumber}</dd>
                          </div>
                        )}
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="operations">
                    <AccordionTrigger>Operations</AccordionTrigger>
                    <AccordionContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Total Employees</dt>
                          <dd className="mt-1">{typeDetails.operations?.employees?.count}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Full-time Employees</dt>
                          <dd className="mt-1">{typeDetails.operations?.employees?.fullTime}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Location Type</dt>
                          <dd className="mt-1">{typeDetails.operations?.locationType}</dd>
                        </div>
                        {typeDetails.operations?.leaseInformation?.expiryDate && (
                          <div>
                            <dt className="font-medium text-gray-500">Lease Expiry</dt>
                            <dd className="mt-1">{formatDateString(typeDetails.operations?.leaseInformation?.expiryDate)}</dd>
                          </div>
                        )}
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Operation Description</dt>
                          <dd className="mt-1">{typeDetails.operations?.operationDescription}</dd>
                        </div>
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="financials">
                    <AccordionTrigger>Financials</AccordionTrigger>
                    <AccordionContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Annual Revenue</dt>
                          <dd className="mt-1">
                            {formatCurrency(typeDetails.financials?.annualRevenue?.value, typeDetails.financials?.annualRevenue?.currency)}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Monthly Revenue</dt>
                          <dd className="mt-1">
                            {formatCurrency(typeDetails.financials?.monthlyRevenue?.value, typeDetails.financials?.monthlyRevenue?.currency)}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Profit Margin</dt>
                          <dd className="mt-1">{typeDetails.financials?.profitMargin?.percentage}%</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Revenue Trend</dt>
                          <dd className="mt-1">{typeDetails.financials?.revenueTrend}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Equipment Value</dt>
                          <dd className="mt-1">
                            {formatCurrency(typeDetails.financials?.equipment?.value?.value, typeDetails.financials?.equipment?.value?.currency)}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Customer Concentration</dt>
                          <dd className="mt-1">{typeDetails.financials?.customerConcentration}%</dd>
                        </div>
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="sale-info">
                    <AccordionTrigger>Sale Information</AccordionTrigger>
                    <AccordionContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Asking Price</dt>
                          <dd className="mt-1">
                            {formatCurrency(typeDetails.sale?.askingPrice?.value, typeDetails.sale?.askingPrice?.currency)}
                            {typeDetails.sale?.askingPrice?.isNegotiable && " (Negotiable)"}
                          </dd>
                        </div>
                        {typeDetails.sale?.priceMultiple && (
                          <div>
                            <dt className="font-medium text-gray-500">Price Multiple</dt>
                            <dd className="mt-1">{typeDetails.sale?.priceMultiple}x</dd>
                          </div>
                        )}
                        <div>
                          <dt className="font-medium text-gray-500">Transition Period</dt>
                          <dd className="mt-1">{typeDetails.sale?.transitionPeriod} month(s)</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Seller Financing</dt>
                          <dd className="mt-1">
                            {typeDetails.sale?.sellerFinancing?.isAvailable ? 'Available' : 'Not Available'}
                            {typeDetails.sale?.sellerFinancing?.isAvailable && typeDetails.sale?.sellerFinancing?.downPaymentPercentage && 
                              ` (${typeDetails.sale?.sellerFinancing?.downPaymentPercentage}% down payment required)`}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Reason for Selling</dt>
                          <dd className="mt-1">{typeDetails.sale?.reasonForSelling}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Training Included</dt>
                          <dd className="mt-1">{typeDetails.sale?.trainingIncluded}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Assets Included</dt>
                          <dd className="mt-1">{typeDetails.sale?.assetsIncluded}</dd>
                        </div>
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                </>
              )}
              
              {/* Franchise Details */}
              {type === 'franchise' && (
                <>
                  <AccordionItem value="franchise-info">
                    <AccordionTrigger>Franchise Information</AccordionTrigger>
                    <AccordionContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Franchise Brand</dt>
                          <dd className="mt-1">{typeDetails.franchiseBrand}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Franchise Type</dt>
                          <dd className="mt-1">{typeDetails.franchiseType}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Franchise Since</dt>
                          <dd className="mt-1">{typeDetails.franchiseSince}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Brand Established</dt>
                          <dd className="mt-1">{typeDetails.brandEstablished}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Total Units</dt>
                          <dd className="mt-1">{typeDetails.totalUnits}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Franchisee Count</dt>
                          <dd className="mt-1">{typeDetails.franchiseeCount}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Company-Owned Units</dt>
                          <dd className="mt-1">{typeDetails.companyOwnedUnits}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Available Territories</dt>
                          <dd className="mt-1">
                            {typeDetails.availableTerritories?.join(', ') || 'None specified'}
                          </dd>
                        </div>
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Add more accordion items for franchise sections */}
                </>
              )}
              
              {/* Startup Details */}
              {type === 'startup' && (
                <>
                  <AccordionItem value="startup-info">
                    <AccordionTrigger>Startup Information</AccordionTrigger>
                    <AccordionContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Development Stage</dt>
                          <dd className="mt-1">{typeDetails.developmentStage}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Registered Name</dt>
                          <dd className="mt-1">{typeDetails.registeredName}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Founded Date</dt>
                          <dd className="mt-1">{formatDateString(typeDetails.foundedDate)}</dd>
                        </div>
                        {typeDetails.launchDate && (
                          <div>
                            <dt className="font-medium text-gray-500">Launch Date</dt>
                            <dd className="mt-1">{formatDateString(typeDetails.launchDate)}</dd>
                          </div>
                        )}
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Mission Statement</dt>
                          <dd className="mt-1">{typeDetails.missionStatement}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Problem Statement</dt>
                          <dd className="mt-1">{typeDetails.problemStatement}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Solution Description</dt>
                          <dd className="mt-1">{typeDetails.solutionDescription}</dd>
                        </div>
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Add more accordion items for startup sections */}
                </>
              )}
              
              {/* Investor Details */}
              {type === 'investor' && (
                <>
                  <AccordionItem value="investor-info">
                    <AccordionTrigger>Investor Information</AccordionTrigger>
                    <AccordionContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Investor Type</dt>
                          <dd className="mt-1">{typeDetails.investorType}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Years of Experience</dt>
                          <dd className="mt-1">{typeDetails.yearsOfExperience}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Investment Philosophy</dt>
                          <dd className="mt-1">{typeDetails.investmentPhilosophy}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Background Summary</dt>
                          <dd className="mt-1">{typeDetails.backgroundSummary}</dd>
                        </div>
                        {typeDetails.keyAchievements && (
                          <div className="sm:col-span-2">
                            <dt className="font-medium text-gray-500">Key Achievements</dt>
                            <dd className="mt-1">{typeDetails.keyAchievements}</dd>
                          </div>
                        )}
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Add more accordion items for investor sections */}
                </>
              )}
              
              {/* Digital Asset Details */}
              {type === 'digital_asset' && (
                <>
                  <AccordionItem value="asset-info">
                    <AccordionTrigger>Asset Information</AccordionTrigger>
                    <AccordionContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Asset Type</dt>
                          <dd className="mt-1">{typeDetails.assetType}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Platform/Framework</dt>
                          <dd className="mt-1">{typeDetails.platformFramework}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Niche/Industry</dt>
                          <dd className="mt-1">{typeDetails.nicheIndustry}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Creation Date</dt>
                          <dd className="mt-1">{formatDateString(typeDetails.creationDate)}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Ease of Management</dt>
                          <dd className="mt-1">{typeDetails.easeOfManagement}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Owner Time Required</dt>
                          <dd className="mt-1">{typeDetails.ownerTimeRequired} hours/week</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-500">Business Model</dt>
                          <dd className="mt-1">{typeDetails.businessModel}</dd>
                        </div>
                      </dl>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Add more accordion items for digital asset sections */}
                </>
              )}
            </Accordion>
          ) : (
            <div className="bg-amber-50 border border-amber-100 rounded-md p-3">
              <div className="flex items-start gap-2">
                <Ban className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-amber-800">Missing Details</h4>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Please complete the listing details section.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Documents Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Review the supporting documents for your listing</CardDescription>
          </div>
          <Button variant="ghost" asChild className="flex items-center gap-1" aria-label="Edit Documents">
            <Link to="#" onClick={() => document.getElementById('step-link-3').click()}>
              <Edit className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Edit</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {documents && documents.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {documents.length} document{documents.length > 1 ? 's' : ''} uploaded
              </p>
              <ul className="border rounded-md divide-y">
                {documents.map((doc, index) => (
                  <li key={index} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                    <Badge variant={doc.isPublic ? 'outline' : 'secondary'}>
                      {doc.isPublic ? 'Public' : 'Private'}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-6">
              <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-500 mb-1">No Documents Uploaded</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Documents are optional but recommended to increase your listing's credibility.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => document.getElementById('step-link-3').click()}
                className="flex items-center gap-2 mx-auto"
              >
                <FileText className="h-4 w-4" />
                Add Documents
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Terms & Submission */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Submission</CardTitle>
          <CardDescription>
            Review terms and submit your listing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 border rounded-md p-4 text-sm">
            <h3 className="font-medium mb-2">Submission Guidelines</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>Ensure all information is accurate and truthful</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>You must have the legal right to sell/represent this listing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>You will be responsive to inquiries about this listing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>All uploaded content complies with our platform policies</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>You understand that listings are subject to review by our team</span>
              </li>
            </ul>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the terms and conditions
              </Label>
              <p className="text-xs text-muted-foreground">
                By checking this box, I confirm that I have read and agree to the{' '}
                <Link to="/terms" className="text-brand-blue hover:underline" target="_blank">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-brand-blue hover:underline" target="_blank">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
          
          <Alert className="bg-blue-50 border-blue-100">
            <AlertDescription className="text-blue-700">
              <span className="font-medium">What happens next?</span> After submission, our team will review your listing for compliance with our guidelines. This typically takes 1-2 business days.
            </AlertDescription>
          </Alert>
          
          {/* The final Submit button is in the parent component */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSubmit;