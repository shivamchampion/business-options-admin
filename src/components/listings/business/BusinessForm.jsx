import { useFormContext, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Info, HelpCircle } from 'lucide-react';

// Business types for select options
const businessTypes = [
  { value: 'retail', label: 'Retail' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'service', label: 'Service' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'distribution', label: 'Distribution' },
  { value: 'technology', label: 'Technology/IT' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'construction', label: 'Construction' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'professional', label: 'Professional Services' },
  { value: 'other', label: 'Other' }
];

// Entity types for select options
const entityTypes = [
  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'llc', label: 'Limited Liability Company (LLC)' },
  { value: 'private_limited', label: 'Private Limited Company' },
  { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
  { value: 'corporation', label: 'Corporation' }
];

// Location types for select options
const locationTypes = [
  { value: 'leased_commercial', label: 'Leased Commercial' },
  { value: 'owned_property', label: 'Owned Property' },
  { value: 'home_based', label: 'Home-based' },
  { value: 'virtual', label: 'Virtual' },
  { value: 'mobile', label: 'Mobile' }
];

// Revenue trend options
const revenueTrendOptions = [
  { value: 'growing', label: 'Growing (>10%)' },
  { value: 'stable', label: 'Stable (±10%)' },
  { value: 'declining', label: 'Declining (<-10%)' }
];

const BusinessForm = () => {
  const { control, watch, setValue, formState: { errors } } = useFormContext();
  
  // Watch location type to conditionally show lease information
  const locationType = watch('businessDetails.operations.locationType');
  
  // Watch seller financing to conditionally show down payment
  const sellerFinancing = watch('businessDetails.sale.sellerFinancing.isAvailable');
  
  return (
    <div className="space-y-8">
      {/* Business Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Enter essential details about your business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Type */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="businessType" className="text-base font-medium">
                  Business Type <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Business Type</h4>
                      <p className="text-sm text-muted-foreground">
                        Select the category that best describes your business operations.
                        This helps buyers find businesses matching their interests.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Controller
                name="businessDetails.businessType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className={errors.businessDetails?.businessType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.businessDetails?.businessType && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.businessType.message}
                </p>
              )}
            </div>
            
            {/* Entity Type */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="entityType" className="text-base font-medium">
                  Entity Type <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Entity Type</h4>
                      <p className="text-sm text-muted-foreground">
                        The legal structure of your business affects tax implications
                        and the complexity of the transfer process.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Controller
                name="businessDetails.entityType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className={errors.businessDetails?.entityType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.businessDetails?.entityType && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.entityType.message}
                </p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Year Established */}
            <div className="space-y-2">
              <Label htmlFor="establishedYear" className="text-base font-medium">
                Year Established <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="businessDetails.establishedYear"
                control={control}
                render={({ field }) => (
                  <Input
                    id="establishedYear"
                    type="number"
                    placeholder="YYYY"
                    min="1900"
                    max={new Date().getFullYear()}
                    className={errors.businessDetails?.establishedYear ? 'border-red-500' : ''}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                )}
              />
              {errors.businessDetails?.establishedYear ? (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.establishedYear.message}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Enter a 4-digit year (1900 - present)
                </p>
              )}
            </div>
            
            {/* Registration Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="registrationNumber" className="text-base font-medium">
                  Registration Number <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Registration Number</h4>
                      <p className="text-sm text-muted-foreground">
                        The official business identifier issued by the government.
                        For example: Company Registration Number, Business License, etc.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Controller
                name="businessDetails.registrationNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    id="registrationNumber"
                    placeholder="Official registration number"
                    className={errors.businessDetails?.registrationNumber ? 'border-red-500' : ''}
                    {...field}
                  />
                )}
              />
              {errors.businessDetails?.registrationNumber && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.registrationNumber.message}
                </p>
              )}
            </div>
            
            {/* GST Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="gstNumber" className="text-base font-medium">
                  GST/Tax Number (Optional)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About GST/Tax Number</h4>
                      <p className="text-sm text-muted-foreground">
                        Your tax registration number (GST, VAT, EIN, etc.) 
                        used for tax filing purposes.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Controller
                name="businessDetails.gstNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    id="gstNumber"
                    placeholder="Tax identification number"
                    {...field}
                  />
                )}
              />
              <p className="text-xs text-muted-foreground mt-1">
                This helps verify your business's fiscal legitimacy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Operations Section */}
      <Card>
        <CardHeader>
          <CardTitle>Operations</CardTitle>
          <CardDescription>
            Details about your business operations and infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Employees */}
          <div>
            <h3 className="text-sm font-medium mb-3">Staff Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Employees */}
              <div className="space-y-2">
                <Label htmlFor="totalEmployees" className="text-base font-medium">
                  Total Employees <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="businessDetails.operations.employees.count"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="totalEmployees"
                      type="number"
                      min="0"
                      placeholder="Total number of employees"
                      className={errors.businessDetails?.operations?.employees?.count ? 'border-red-500' : ''}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                {errors.businessDetails?.operations?.employees?.count && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.businessDetails.operations.employees.count.message}
                  </p>
                )}
              </div>
              
              {/* Full-time Employees */}
              <div className="space-y-2">
                <Label htmlFor="fullTimeEmployees" className="text-base font-medium">
                  Full-time Employees <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="businessDetails.operations.employees.fullTime"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="fullTimeEmployees"
                      type="number"
                      min="0"
                      placeholder="Number of full-time staff"
                      className={errors.businessDetails?.operations?.employees?.fullTime ? 'border-red-500' : ''}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                {errors.businessDetails?.operations?.employees?.fullTime && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.businessDetails.operations.employees.fullTime.message}
                  </p>
                )}
              </div>
              
              {/* Part-time Employees */}
              <div className="space-y-2">
                <Label htmlFor="partTimeEmployees" className="text-base font-medium">
                  Part-time Employees (Optional)
                </Label>
                <Controller
                  name="businessDetails.operations.employees.partTime"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="partTimeEmployees"
                      type="number"
                      min="0"
                      placeholder="Number of part-time staff"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Should match total employees when combined with full-time
                </p>
              </div>
            </div>
          </div>
          
          {/* Location Information */}
          <div className="pt-2">
            <h3 className="text-sm font-medium mb-3">Location & Property</h3>
            
            <div className="space-y-6">
              {/* Location Type */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="locationType" className="text-base font-medium">
                    Location Type <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Info className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">About Location Type</h4>
                        <p className="text-sm text-muted-foreground">
                          This indicates whether your business operates from a leased space,
                          owned property, or other arrangement. Important for location-dependent
                          businesses.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Controller
                  name="businessDetails.operations.locationType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <SelectTrigger className={errors.businessDetails?.operations?.locationType ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select location type" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.businessDetails?.operations?.locationType && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.businessDetails.operations.locationType.message}
                  </p>
                )}
              </div>
              
              {/* Lease Information - Conditionally rendered */}
              {locationType === 'leased_commercial' && (
                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  <h4 className="text-sm font-medium">Lease Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Lease Expiry Date */}
                    <div className="space-y-2">
                      <Label htmlFor="leaseExpiry" className="text-sm font-medium">
                        Lease Expiry Date <span className="text-red-500">*</span>
                      </Label>
                      <Controller
                        name="businessDetails.operations.leaseInformation.expiryDate"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="leaseExpiry"
                            type="date"
                            className={errors.businessDetails?.operations?.leaseInformation?.expiryDate ? 'border-red-500' : ''}
                            {...field}
                            value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                          />
                        )}
                      />
                      {errors.businessDetails?.operations?.leaseInformation?.expiryDate && (
                        <p className="text-xs font-medium text-red-500 mt-1">
                          {errors.businessDetails.operations.leaseInformation.expiryDate.message}
                        </p>
                      )}
                    </div>
                    
                    {/* Monthly Rent */}
                    <div className="space-y-2">
                      <Label htmlFor="monthlyRent" className="text-sm font-medium">
                        Monthly Rent <span className="text-red-500">*</span>
                      </Label>
                      <Controller
                        name="businessDetails.operations.leaseInformation.monthlyCost.value"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="monthlyRent"
                            type="number"
                            min="0"
                            placeholder="Monthly rent amount"
                            className={errors.businessDetails?.operations?.leaseInformation?.monthlyCost?.value ? 'border-red-500' : ''}
                            {...field}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          />
                        )}
                      />
                      {errors.businessDetails?.operations?.leaseInformation?.monthlyCost?.value && (
                        <p className="text-xs font-medium text-red-500 mt-1">
                          {errors.businessDetails.operations.leaseInformation.monthlyCost.value.message}
                        </p>
                      )}
                      
                      {/* Setting default values for currency */}
                      <Controller
                        name="businessDetails.operations.leaseInformation.monthlyCost.currency"
                        control={control}
                        defaultValue="INR"
                        render={({ field }) => <input type="hidden" {...field} />}
                      />
                    </div>
                    
                    {/* Lease Transferable */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="isTransferable" className="text-sm font-medium">
                          Lease Transferable
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <HelpCircle className="h-3.5 w-3.5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <p className="text-sm text-muted-foreground">
                              Indicates whether the lease can be transferred to the new owner
                              without renegotiation.
                            </p>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Controller
                        name="businessDetails.operations.leaseInformation.isTransferable"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="isTransferable"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="isTransferable" className="text-sm cursor-pointer">
                              {field.value ? 'Yes' : 'No'}
                            </Label>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Operation Description */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="operationDescription" className="text-base font-medium">
                    Operation Description <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Info className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">About Operation Description</h4>
                        <p className="text-sm text-muted-foreground">
                          Explain the day-to-day activities of the business. Describe what the
                          business does, typical tasks, and operational workflow.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Controller
                  name="businessDetails.operations.operationDescription"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="operationDescription"
                      placeholder="Describe the typical daily operations of the business..."
                      rows={4}
                      className={errors.businessDetails?.operations?.operationDescription ? 'border-red-500' : ''}
                      {...field}
                    />
                  )}
                />
                {errors.businessDetails?.operations?.operationDescription ? (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.businessDetails.operations.operationDescription.message}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">
                    100-1000 characters. Explain how the business operates on a daily basis.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Financial Section */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Information</CardTitle>
          <CardDescription>
            Details about your business financial performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Annual Revenue */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="annualRevenue" className="text-base font-medium">
                  Annual Revenue <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Annual Revenue</h4>
                      <p className="text-sm text-muted-foreground">
                        The total gross sales or income generated by the business
                        over the past 12 months, before any expenses or taxes.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Controller
                name="businessDetails.financials.annualRevenue.value"
                control={control}
                render={({ field }) => (
                  <Input
                    id="annualRevenue"
                    type="number"
                    min="0"
                    placeholder="Annual revenue amount"
                    className={errors.businessDetails?.financials?.annualRevenue?.value ? 'border-red-500' : ''}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                )}
              />
              {errors.businessDetails?.financials?.annualRevenue?.value && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.financials.annualRevenue.value.message}
                </p>
              )}
              
              {/* Setting default values for currency */}
              <Controller
                name="businessDetails.financials.annualRevenue.currency"
                control={control}
                defaultValue="INR"
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </div>
            
            {/* Monthly Revenue */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="monthlyRevenue" className="text-base font-medium">
                  Monthly Revenue <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Monthly Revenue</h4>
                      <p className="text-sm text-muted-foreground">
                        The average monthly revenue. Should be approximately
                        1/12 of the annual revenue, accounting for seasonality.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Controller
                name="businessDetails.financials.monthlyRevenue.value"
                control={control}
                render={({ field }) => (
                  <Input
                    id="monthlyRevenue"
                    type="number"
                    min="0"
                    placeholder="Average monthly revenue"
                    className={errors.businessDetails?.financials?.monthlyRevenue?.value ? 'border-red-500' : ''}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                )}
              />
              {errors.businessDetails?.financials?.monthlyRevenue?.value && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.financials.monthlyRevenue.value.message}
                </p>
              )}
              
              {/* Setting default values for currency */}
              <Controller
                name="businessDetails.financials.monthlyRevenue.currency"
                control={control}
                defaultValue="INR"
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profit Margin */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="profitMargin" className="text-base font-medium">
                  Profit Margin <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Profit Margin</h4>
                      <p className="text-sm text-muted-foreground">
                        The percentage of revenue that is profit after all expenses.
                        Calculated as (Revenue - Expenses) / Revenue × 100%.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center">
                <Controller
                  name="businessDetails.financials.profitMargin.percentage"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="profitMargin"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Profit margin percentage"
                      className={`${errors.businessDetails?.financials?.profitMargin?.percentage ? 'border-red-500' : ''} pr-12`}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                <span className="ml-[-40px] text-gray-500">%</span>
              </div>
              {errors.businessDetails?.financials?.profitMargin?.percentage && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.financials.profitMargin.percentage.message}
                </p>
              )}
              
              {/* Setting default values for profit margin trend */}
              <Controller
                name="businessDetails.financials.profitMargin.trend"
                control={control}
                defaultValue="stable"
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </div>
            
            {/* Revenue Trend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="revenueTrend" className="text-base font-medium">
                  Revenue Trend <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Revenue Trend</h4>
                      <p className="text-sm text-muted-foreground">
                        The overall direction of revenue over the past year.
                        Helps buyers understand the business trajectory.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Controller
                name="businessDetails.financials.revenueTrend"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className={errors.businessDetails?.financials?.revenueTrend ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select revenue trend" />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueTrendOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.businessDetails?.financials?.revenueTrend && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.financials.revenueTrend.message}
                </p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Inventory Value */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="inventoryValue" className="text-base font-medium">
                  Inventory Value
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Inventory Value</h4>
                      <p className="text-sm text-muted-foreground">
                        The current value of product stock. Required for retail, 
                        manufacturing, and distribution businesses. Optional for others.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col space-y-3">
                <Controller
                  name="businessDetails.financials.inventory.isIncluded"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="inventoryIncluded"
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          
                          // If inventory is not included, clear the value and description
                          if (!checked) {
                            setValue('businessDetails.financials.inventory.value.value', null);
                            setValue('businessDetails.financials.inventory.description', '');
                          }
                        }}
                      />
                      <Label htmlFor="inventoryIncluded" className="text-sm">
                        Inventory included in sale
                      </Label>
                    </div>
                  )}
                />
                
                {watch('businessDetails.financials.inventory.isIncluded') && (
                  <div className="space-y-3">
                    <Controller
                      name="businessDetails.financials.inventory.value.value"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="inventoryValue"
                          type="number"
                          min="0"
                          placeholder="Inventory value amount"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      )}
                    />
                    
                    <Controller
                      name="businessDetails.financials.inventory.description"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          id="inventoryDescription"
                          placeholder="Brief description of inventory items..."
                          rows={2}
                          {...field}
                        />
                      )}
                    />
                    
                    {/* Setting default values for currency */}
                    <Controller
                      name="businessDetails.financials.inventory.value.currency"
                      control={control}
                      defaultValue="INR"
                      render={({ field }) => <input type="hidden" {...field} />}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Equipment Value */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="equipmentValue" className="text-base font-medium">
                  Equipment Value <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Equipment Value</h4>
                      <p className="text-sm text-muted-foreground">
                        The value of machinery, tools, and physical assets included
                        in the sale. This is a component of the asking price.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col space-y-3">
                <Controller
                  name="businessDetails.financials.equipment.isIncluded"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="equipmentIncluded"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="equipmentIncluded" className="text-sm">
                        Equipment included in sale
                      </Label>
                    </div>
                  )}
                />
                
                <Controller
                  name="businessDetails.financials.equipment.value.value"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="equipmentValue"
                      type="number"
                      min="0"
                      placeholder="Equipment value amount"
                      className={errors.businessDetails?.financials?.equipment?.value?.value ? 'border-red-500' : ''}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                {errors.businessDetails?.financials?.equipment?.value?.value && (
                  <p className="text-sm font-medium text-red-500 mt-1">
                    {errors.businessDetails.financials.equipment.value.value.message}
                  </p>
                )}
                
                <Controller
                  name="businessDetails.financials.equipment.description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="equipmentDescription"
                      placeholder="Brief description of major equipment included..."
                      rows={2}
                      {...field}
                    />
                  )}
                />
                
                {/* Setting default values for currency */}
                <Controller
                  name="businessDetails.financials.equipment.value.currency"
                  control={control}
                  defaultValue="INR"
                  render={({ field }) => <input type="hidden" {...field} />}
                />
              </div>
            </div>
          </div>
          
          {/* Customer Concentration */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="customerConcentration" className="text-base font-medium">
                Customer Concentration <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Customer Concentration</h4>
                    <p className="text-sm text-muted-foreground">
                      The percentage of revenue that comes from your top 3 clients.
                      A high percentage indicates higher dependency risk.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center">
              <Controller
                name="businessDetails.financials.customerConcentration"
                control={control}
                render={({ field }) => (
                  <Input
                    id="customerConcentration"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Percentage from top 3 clients"
                    className={`${errors.businessDetails?.financials?.customerConcentration ? 'border-red-500' : ''} pr-12`}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                )}
              />
              <span className="ml-[-40px] text-gray-500">%</span>
            </div>
            {errors.businessDetails?.financials?.customerConcentration ? (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.businessDetails.financials.customerConcentration.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Enter percentage of revenue from top 3 clients (0-100%)
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Sale Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sale Information</CardTitle>
          <CardDescription>
            Details about the terms of the sale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asking Price */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="askingPrice" className="text-base font-medium">
                  Asking Price <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Asking Price</h4>
                      <p className="text-sm text-muted-foreground">
                        The total requested amount for the business. This should
                        include all assets being sold with the business.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Controller
                name="businessDetails.sale.askingPrice.value"
                control={control}
                render={({ field }) => (
                  <Input
                    id="askingPrice"
                    type="number"
                    min="0"
                    placeholder="Asking price amount"
                    className={errors.businessDetails?.sale?.askingPrice?.value ? 'border-red-500' : ''}
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                )}
              />
              {errors.businessDetails?.sale?.askingPrice?.value && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.sale.askingPrice.value.message}
                </p>
              )}
              
              {/* Price Negotiable */}
              <Controller
                name="businessDetails.sale.askingPrice.isNegotiable"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch
                      id="priceNegotiable"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="priceNegotiable" className="text-sm">
                      Price is negotiable
                    </Label>
                  </div>
                )}
              />
              
              {/* Setting default values for currency */}
              <Controller
                name="businessDetails.sale.askingPrice.currency"
                control={control}
                defaultValue="INR"
                render={({ field }) => <input type="hidden" {...field} />}
              />
            </div>
            
            {/* Price Multiple (Optional) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="priceMultiple" className="text-base font-medium">
                  Price Multiple (Optional)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Price Multiple</h4>
                      <p className="text-sm text-muted-foreground">
                        The valuation metric based on profit or revenue. Typically
                        1-10× annual profit or 0.5-3× annual revenue.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center">
                <Controller
                  name="businessDetails.sale.priceMultiple"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="priceMultiple"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Multiple of earnings/revenue"
                      className="pr-12"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                <span className="ml-[-40px] text-gray-500">×</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enter the multiple of annual profit/revenue used for valuation
              </p>
            </div>
          </div>
          
          {/* Reason for Selling */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="reasonForSelling" className="text-base font-medium">
                Reason for Selling <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Reason for Selling</h4>
                    <p className="text-sm text-muted-foreground">
                      Explain why you're selling the business. Be honest but positive.
                      This is a critical decision factor for buyers.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Controller
              name="businessDetails.sale.reasonForSelling"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="reasonForSelling"
                  placeholder="Explain why you are selling the business..."
                  rows={3}
                  className={errors.businessDetails?.sale?.reasonForSelling ? 'border-red-500' : ''}
                  {...field}
                />
              )}
            />
            {errors.businessDetails?.sale?.reasonForSelling ? (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.businessDetails.sale.reasonForSelling.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                50-500 characters. Be specific rather than generic (e.g., "retirement" rather than "personal reasons").
              </p>
            )}
          </div>
          
          {/* Seller Financing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="sellerFinancing" className="text-base font-medium">
                Seller Financing
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Seller Financing</h4>
                    <p className="text-sm text-muted-foreground">
                      Indicates if you're willing to accept partial payment over time.
                      This can broaden your buyer pool but involves more risk.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Controller
              name="businessDetails.sale.sellerFinancing.isAvailable"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sellerFinancing"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      
                      // If financing is not available, clear the details and down payment
                      if (!checked) {
                        setValue('businessDetails.sale.sellerFinancing.details', '');
                        setValue('businessDetails.sale.sellerFinancing.downPaymentPercentage', null);
                      }
                    }}
                  />
                  <Label htmlFor="sellerFinancing" className="text-sm">
                    Seller financing available
                  </Label>
                </div>
              )}
            />
            
            {/* Conditional fields for Seller Financing */}
            {sellerFinancing && (
              <div className="pt-3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="financingDetails" className="text-sm font-medium">
                    Financing Terms
                  </Label>
                  <Controller
                    name="businessDetails.sale.sellerFinancing.details"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="financingDetails"
                        placeholder="Describe the financing terms you're offering..."
                        rows={2}
                        {...field}
                      />
                    )}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Example: "Will finance up to 50% for 3 years at 8% interest"
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="downPayment" className="text-sm font-medium">
                    Down Payment Required <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center">
                    <Controller
                      name="businessDetails.sale.sellerFinancing.downPaymentPercentage"
                      control={control}
                      rules={{ required: sellerFinancing }}
                      render={({ field }) => (
                        <Input
                          id="downPayment"
                          type="number"
                          min="10"
                          max="100"
                          placeholder="Minimum down payment"
                          className={`${errors.businessDetails?.sale?.sellerFinancing?.downPaymentPercentage ? 'border-red-500' : ''} pr-12`}
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      )}
                    />
                    <span className="ml-[-40px] text-gray-500">%</span>
                  </div>
                  {errors.businessDetails?.sale?.sellerFinancing?.downPaymentPercentage ? (
                    <p className="text-sm font-medium text-red-500 mt-1">
                      {errors.businessDetails.sale.sellerFinancing.downPaymentPercentage.message}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 10%, maximum 100%
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transition Period */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="transitionPeriod" className="text-base font-medium">
                  Transition Period <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Info className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">About Transition Period</h4>
                      <p className="text-sm text-muted-foreground">
                        How long you'll commit to helping the new owner after sale.
                        Typically 1-3 months, 0 means immediate handover.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center">
                <Controller
                  name="businessDetails.sale.transitionPeriod"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="transitionPeriod"
                      type="number"
                      min="0"
                      max="12"
                      placeholder="Number of months"
                      className={`${errors.businessDetails?.sale?.transitionPeriod ? 'border-red-500' : ''} pr-16`}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
                <span className="ml-[-72px] text-gray-500">months</span>
              </div>
              {errors.businessDetails?.sale?.transitionPeriod ? (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.businessDetails.sale.transitionPeriod.message}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Enter 0-12 months (0 means no transition period)
                </p>
              )}
            </div>
          </div>
          
          {/* Training Included */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="trainingIncluded" className="text-base font-medium">
                Training Included <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Training</h4>
                    <p className="text-sm text-muted-foreground">
                      Specify what training and knowledge transfer you will provide
                      to the new owner. Be specific about format, hours, and topics.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Controller
              name="businessDetails.sale.trainingIncluded"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="trainingIncluded"
                  placeholder="Describe the training and knowledge transfer you will provide..."
                  rows={3}
                  className={errors.businessDetails?.sale?.trainingIncluded ? 'border-red-500' : ''}
                  {...field}
                />
              )}
            />
            {errors.businessDetails?.sale?.trainingIncluded ? (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.businessDetails.sale.trainingIncluded.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                50-500 characters. Specify hours, duration, and format of training.
              </p>
            )}
          </div>
          
          {/* Assets Included */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="assetsIncluded" className="text-base font-medium">
                Assets Included <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Info className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">About Assets Included</h4>
                    <p className="text-sm text-muted-foreground">
                      List all tangible and intangible assets that will transfer
                      with the sale. Be comprehensive to avoid misunderstandings.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Controller
              name="businessDetails.sale.assetsIncluded"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="assetsIncluded"
                  placeholder="List all tangible and intangible assets included in the sale..."
                  rows={4}
                  className={errors.businessDetails?.sale?.assetsIncluded ? 'border-red-500' : ''}
                  {...field}
                />
              )}
            />
            {errors.businessDetails?.sale?.assetsIncluded ? (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.businessDetails.sale.assetsIncluded.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                100-1000 characters. Include all physical assets, intellectual property, contracts, customer lists, etc.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessForm;