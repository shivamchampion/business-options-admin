import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import Button from '../../ui/Button';

const ReviewSubmit = ({ formData, handleSubmit, goToPreviousStep, errors }) => {
  // Check if any required fields are missing
  const hasMissingFields = (
    !formData.businessName ||
    !formData.category ||
    !formData.description ||
    !formData.askingPrice ||
    !formData.location ||
    !formData.contactEmail
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Your Listing</h3>
        
        {hasMissingFields && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Attention Required</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>Some required information is missing. Please go back and complete all required fields.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Details Section */}
          <div className="space-y-4">
            <h4 className="font-medium border-b pb-2">Business Details</h4>
            
            <div>
              <p className="text-sm text-gray-500">Business Name</p>
              <p className="font-medium">{formData.businessName || '(Not provided)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{formData.category || '(Not provided)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium text-sm">
                {formData.description ? (
                  formData.description.length > 100 ? 
                    `${formData.description.substring(0, 100)}...` : 
                    formData.description
                ) : '(Not provided)'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Years in Business</p>
              <p className="font-medium">{formData.yearsInBusiness || '(Not provided)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Number of Employees</p>
              <p className="font-medium">{formData.employees || '(Not provided)'}</p>
            </div>
          </div>
          
          {/* Financial & Location Details */}
          <div className="space-y-4">
            <h4 className="font-medium border-b pb-2">Financial & Location</h4>
            
            <div>
              <p className="text-sm text-gray-500">Asking Price</p>
              <p className="font-medium">
                {formData.askingPrice ? `$${parseInt(formData.askingPrice).toLocaleString()}` : '(Not provided)'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Gross Revenue (Annual)</p>
              <p className="font-medium">
                {formData.grossRevenue ? `$${parseInt(formData.grossRevenue).toLocaleString()}` : '(Not provided)'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Net Profit (Annual)</p>
              <p className="font-medium">
                {formData.netProfit ? `$${parseInt(formData.netProfit).toLocaleString()}` : '(Not provided)'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{formData.location || '(Not provided)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Reason for Selling</p>
              <p className="font-medium">{formData.reasonForSelling || '(Not provided)'}</p>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mt-6">
          <h4 className="font-medium border-b pb-2">Contact Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-sm text-gray-500">Contact Name</p>
              <p className="font-medium">{formData.contactName || '(Not provided)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Contact Email</p>
              <p className="font-medium">{formData.contactEmail || '(Not provided)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Contact Phone</p>
              <p className="font-medium">{formData.contactPhone || '(Not provided)'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Preferred Contact Method</p>
              <p className="font-medium">{formData.preferredContact || '(Not provided)'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Terms & Conditions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              By submitting this listing, you confirm that all provided information is accurate 
              and you have the authority to list this business for sale. You also agree to our 
              Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
        >
          Back
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={hasMissingFields}
        >
          Submit Listing
        </Button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
