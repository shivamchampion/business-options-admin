import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CurrencyInput } from '@/components/common/CurrencyInput';
import { YearPicker } from '@/components/common/YearPicker';
import { 
  BUSINESS_TYPES, 
  ENTITY_TYPES, 
  LOCATION_TYPES,
  REVENUE_TRENDS 
} from '@/utils/constants';

const BusinessForm = () => {
  const { control, watch } = useFormContext();
  const locationType = watch('businessDetails.operations.locationType');
  const sellerFinancingAvailable = watch('businessDetails.sale.sellerFinancing.isAvailable');
  
  return (
    <div className="space-y-8">
      {/* Business Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Basic details about the business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Type */}
            <FormField
              control={control}
              name="businessDetails.businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Business Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The primary category of the business
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Entity Type */}
            <FormField
              control={control}
              name="businessDetails.entityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Entity Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select entity type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ENTITY_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Legal structure of the business
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Year Established */}
            <FormField
              control={control}
              name="businessDetails.establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Year Established</FormLabel>
                  <FormControl>
                    <YearPicker 
                      onChange={(year) => field.onChange(parseInt(year))} 
                      value={field.value}
                      maxYear={new Date().getFullYear()}
                      minYear={1900}
                    />
                  </FormControl>
                  <FormDescription>
                    The year the business was founded
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Registration Number */}
            <FormField
              control={control}
              name="businessDetails.registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter business registration number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Official business registration identifier
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GST Number */}
            <FormField
              control={control}
              name="businessDetails.gstNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter GST registration number (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PAN Number */}
            <FormField
              control={control}
              name="businessDetails.panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter PAN number (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Asking Price */}
          <FormField
            control={control}
            name="businessDetails.sale.askingPrice.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Asking Price</FormLabel>
                <FormControl>
                  <CurrencyInput 
                    placeholder="Enter asking price" 
                    value={field.value}
                    onChange={field.onChange}
                    currency="INR"
                  />
                </FormControl>
                <FormDescription>
                  The total amount requested for the business
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Operations Section */}
      <Card>
        <CardHeader>
          <CardTitle>Operations</CardTitle>
          <CardDescription>
            Information about how the business operates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Employees */}
            <FormField
              control={control}
              name="businessDetails.operations.employees.count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Total Employees</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="Enter number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full-time Employees */}
            <FormField
              control={control}
              name="businessDetails.operations.employees.fullTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Full-time Employees</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="Enter number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Part-time Employees */}
            <FormField
              control={control}
              name="businessDetails.operations.employees.partTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Part-time Employees</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="Enter number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Location Type */}
          <FormField
            control={control}
            name="businessDetails.operations.locationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Location Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Type of physical location for the business
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Conditional Lease Information */}
          {locationType === 'leased_commercial' && (
            <div className="space-y-6 p-4 bg-gray-50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lease Expiry */}
                <FormField
                  control={control}
                  name="businessDetails.operations.leaseInformation.expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Lease Expiry Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="month"
                          placeholder="MM/YYYY" 
                          {...field}
                          value={field.value ? new Date(field.value).toISOString().slice(0, 7) : ''}
                          onChange={(e) => {
                            const date = new Date(e.target.value);
                            field.onChange(date);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        When the current lease agreement ends
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Monthly Lease Cost */}
                <FormField
                  control={control}
                  name="businessDetails.operations.leaseInformation.monthlyCost.value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Monthly Rent</FormLabel>
                      <FormControl>
                        <CurrencyInput 
                          placeholder="Enter monthly rent" 
                          value={field.value}
                          onChange={field.onChange}
                          currency="INR"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Is Lease Transferable */}
              <FormField
                control={control}
                name="businessDetails.operations.leaseInformation.isTransferable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Lease Transferable</FormLabel>
                      <FormDescription>
                        Can the lease be transferred to a new owner?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Operation Description */}
          <FormField
            control={control}
            name="businessDetails.operations.operationDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Operation Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the day-to-day operations of the business" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Explain typical daily activities and management requirements
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 1000
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Financial Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Information</CardTitle>
          <CardDescription>
            Details about the business's financial performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Annual Revenue */}
            <FormField
              control={control}
              name="businessDetails.financials.annualRevenue.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Annual Revenue</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter annual revenue" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Total yearly revenue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Monthly Revenue */}
            <FormField
              control={control}
              name="businessDetails.financials.monthlyRevenue.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Monthly Revenue</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter monthly revenue" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Average monthly revenue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profit Margin */}
            <FormField
              control={control}
              name="businessDetails.financials.profitMargin.percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Profit Margin</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number" 
                        min="0"
                        max="100"
                        placeholder="Enter percentage" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        %
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Profit as a percentage of revenue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Revenue Trend */}
            <FormField
              control={control}
              name="businessDetails.financials.revenueTrend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Revenue Trend</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trend" />
                      </SelectTrigger>
                      <SelectContent>
                        {REVENUE_TRENDS.map((trend) => (
                          <SelectItem key={trend.value} value={trend.value}>
                            {trend.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Direction of revenue growth over time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Inventory */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-md">
            <FormField
              control={control}
              name="businessDetails.financials.inventory.isIncluded"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Inventory Included</FormLabel>
                    <FormDescription>
                      Is inventory included in the sale price?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {watch('businessDetails.financials.inventory.isIncluded') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="businessDetails.financials.inventory.value.value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inventory Value</FormLabel>
                      <FormControl>
                        <CurrencyInput 
                          placeholder="Enter inventory value" 
                          value={field.value}
                          onChange={field.onChange}
                          currency="INR"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="businessDetails.financials.inventory.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inventory Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Briefly describe the inventory" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Equipment */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-md">
            <FormField
              control={control}
              name="businessDetails.financials.equipment.isIncluded"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel required>Equipment Included</FormLabel>
                    <FormDescription>
                      Is equipment included in the sale price?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="businessDetails.financials.equipment.value.value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Equipment Value</FormLabel>
                    <FormControl>
                      <CurrencyInput 
                        placeholder="Enter equipment value" 
                        value={field.value}
                        onChange={field.onChange}
                        currency="INR"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="businessDetails.financials.equipment.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Equipment Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe key equipment included" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Customer Concentration */}
          <FormField
            control={control}
            name="businessDetails.financials.customerConcentration"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Customer Concentration</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="number" 
                      min="0"
                      max="100"
                      placeholder="Enter percentage" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      %
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Percentage of revenue from top 3 clients
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Sale Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sale Information</CardTitle>
          <CardDescription>
            Details about the business sale terms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Multiple */}
            <FormField
              control={control}
              name="businessDetails.sale.askingPrice.priceMultiple"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Multiple</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1"
                      min="0"
                      placeholder="Enter multiple (e.g., 3.5x)" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Multiple of yearly profit/revenue used for valuation
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Price Negotiable */}
            <FormField
              control={control}
              name="businessDetails.sale.askingPrice.isNegotiable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Price Negotiable</FormLabel>
                    <FormDescription>
                      Is the asking price negotiable?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Reason for Selling */}
          <FormField
            control={control}
            name="businessDetails.sale.reasonForSelling"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Reason for Selling</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Explain why you are selling the business" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Be specific about your motivation for selling (50-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seller Financing */}
          <FormField
            control={control}
            name="businessDetails.sale.sellerFinancing.isAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Seller Financing Available</FormLabel>
                  <FormDescription>
                    Are you willing to provide financing options to the buyer?
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Conditional Seller Financing Fields */}
          {sellerFinancingAvailable && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-md">
              <FormField
                control={control}
                name="businessDetails.sale.sellerFinancing.downPaymentPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Down Payment Percentage</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type="number" 
                          min="10"
                          max="100"
                          placeholder="Enter percentage" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 10)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          %
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Minimum percentage required as down payment (10-100%)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="businessDetails.sale.sellerFinancing.details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Financing Terms</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the financing terms you're offering" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Specify interest rate, duration, and other conditions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transition Period */}
            <FormField
              control={control}
              name="businessDetails.sale.transitionPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Transition Period</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      max="12"
                      placeholder="Enter number of months" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of months you'll assist with transition (0-12)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Training Included */}
          <FormField
            control={control}
            name="businessDetails.sale.trainingIncluded"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Training Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the training you will provide to the new owner" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Specify hours, duration, and format of training (50-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Assets Included */}
          <FormField
            control={control}
            name="businessDetails.sale.assetsIncluded"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Assets Included</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List all tangible and intangible assets included in the sale" 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Itemize what transfers in the sale (100-1000 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 1000
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessForm;