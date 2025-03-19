import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CurrencyInput } from '@/components/common/CurrencyInput';
import { YearPicker } from '@/components/common/YearPicker';
import { MultiSelect } from '@/components/common/MultiSelect';
import { 
  FRANCHISE_TYPES,
  AVAILABLE_TERRITORIES
} from '@/utils/constants';

const FranchiseForm = () => {
  const { control, watch } = useFormContext();
  
  return (
    <div className="space-y-8">
      {/* Franchise Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Franchise Information</CardTitle>
          <CardDescription>
            Basic details about the franchise opportunity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Franchise Brand */}
            <FormField
              control={control}
              name="franchiseDetails.franchiseBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Franchise Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter franchise brand name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Official name of the franchise system
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Franchise Type */}
            <FormField
              control={control}
              name="franchiseDetails.franchiseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Franchise Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select franchise type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FRANCHISE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Industry category of the franchise
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Franchise Since */}
            <FormField
              control={control}
              name="franchiseDetails.franchiseSince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Franchise Since</FormLabel>
                  <FormControl>
                    <YearPicker 
                      onChange={(year) => field.onChange(parseInt(year))} 
                      value={field.value}
                      maxYear={new Date().getFullYear()}
                      minYear={1900}
                    />
                  </FormControl>
                  <FormDescription>
                    Year the business began franchising
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand Established */}
            <FormField
              control={control}
              name="franchiseDetails.brandEstablished"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Brand Established</FormLabel>
                  <FormControl>
                    <YearPicker 
                      onChange={(year) => field.onChange(parseInt(year))} 
                      value={field.value}
                      maxYear={new Date().getFullYear()}
                      minYear={1900}
                    />
                  </FormControl>
                  <FormDescription>
                    Year the brand was originally founded
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Units */}
            <FormField
              control={control}
              name="franchiseDetails.totalUnits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Total Units</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      placeholder="Enter number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                    />
                  </FormControl>
                  <FormDescription>
                    Total number of locations operating
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Franchisee Count */}
            <FormField
              control={control}
              name="franchiseDetails.franchiseeCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Franchisee Count</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="Enter number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of franchise operators
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company-Owned Units */}
            <FormField
              control={control}
              name="franchiseDetails.companyOwnedUnits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Company-Owned Units</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="Enter number" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of corporate locations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Available Territories */}
          <FormField
            control={control}
            name="franchiseDetails.availableTerritories"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Available Territories</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={AVAILABLE_TERRITORIES}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select available regions"
                  />
                </FormControl>
                <FormDescription>
                  Geographic areas available for development
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Investment Details Section */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
          <CardDescription>
            Financial requirements for franchisees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Franchise Fee */}
            <FormField
              control={control}
              name="franchiseDetails.investment.franchiseFee.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Franchise Fee</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter initial franchise fee" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    One-time fee for joining the franchise system
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Initial Investment */}
            <FormField
              control={control}
              name="franchiseDetails.investment.totalInitialInvestment.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Total Initial Investment</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter total startup cost" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    All-in estimated startup costs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Royalty Fee */}
            <FormField
              control={control}
              name="franchiseDetails.investment.royaltyFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Royalty Fee</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number" 
                        min="0"
                        max="50"
                        step="0.1"
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
                    Ongoing fee as percentage of revenue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marketing Fee */}
            <FormField
              control={control}
              name="franchiseDetails.investment.marketingFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Marketing Fee</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number" 
                        min="0"
                        max="20"
                        step="0.1"
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
                    Brand marketing contribution percentage
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Royalty Structure */}
          <FormField
            control={control}
            name="franchiseDetails.investment.royaltyStructure"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Royalty Structure</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Explain how royalties are calculated and paid" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Payment calculation, frequency, and terms (50-300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recurring Fees */}
          <FormField
            control={control}
            name="franchiseDetails.investment.recurringFees"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Recurring Fees</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detail all ongoing financial obligations" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Other regular fees beyond royalty and marketing (50-300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Support & Training Section */}
      <Card>
        <CardHeader>
          <CardTitle>Support & Training</CardTitle>
          <CardDescription>
            Training, support, and resources provided to franchisees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Initial Training */}
          <FormField
            control={control}
            name="franchiseDetails.support.initialTraining"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Initial Training</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the initial training program" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Content areas and approach for onboarding (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Training Duration */}
            <FormField
              control={control}
              name="franchiseDetails.support.trainingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Training Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2 weeks, 10 days, 80 hours" {...field} />
                  </FormControl>
                  <FormDescription>
                    Length of initial training period
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Training Location */}
            <FormField
              control={control}
              name="franchiseDetails.support.trainingLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Training Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Corporate HQ in Mumbai, Online, Franchisee location" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where training is conducted
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Ongoing Support */}
          <FormField
            control={control}
            name="franchiseDetails.support.ongoingSupport"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Ongoing Support</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the continuing assistance provided after opening" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Types and frequency of support (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Field Support */}
            <FormField
              control={control}
              name="franchiseDetails.support.fieldSupport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Field Support</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Monthly visits, Quarterly reviews" {...field} />
                  </FormControl>
                  <FormDescription>
                    In-person assistance frequency
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Site Selection */}
            <FormField
              control={control}
              name="franchiseDetails.support.siteSelection"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel required>Site Selection Assistance</FormLabel>
                    <FormDescription>
                      Do you provide location finding help?
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

          {/* Marketing Support */}
          <FormField
            control={control}
            name="franchiseDetails.support.marketingSupport"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Marketing Support</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the promotional assistance provided" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Marketing tools and programs (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Technology Systems */}
          <FormField
            control={control}
            name="franchiseDetails.support.technologySystems"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Technology Systems</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the operational technology provided" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Software, POS, inventory systems, etc. (50-300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Performance Metrics Section */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Financial performance and franchisee requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Unit Sales */}
            <FormField
              control={control}
              name="franchiseDetails.performance.averageUnitSales.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Average Unit Sales</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter average annual sales per unit" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Typical yearly revenue per location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sales Growth */}
            <FormField
              control={control}
              name="franchiseDetails.performance.salesGrowth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Sales Growth</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 8% annually over the last 3 years" {...field} />
                  </FormControl>
                  <FormDescription>
                    System revenue trend with timeframe
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Breakeven */}
            <FormField
              control={control}
              name="franchiseDetails.performance.averageBreakeven"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Average Breakeven</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 12-18 months, 2 years" {...field} />
                  </FormControl>
                  <FormDescription>
                    Typical time to profitability
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Success Rate */}
            <FormField
              control={control}
              name="franchiseDetails.performance.successRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Success Rate</FormLabel>
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
                    Units still operating after 5 years
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Franchisee Requirements */}
          <FormField
            control={control}
            name="franchiseDetails.performance.franchiseeRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Franchisee Requirements</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detail qualification criteria for potential franchisees" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Financial, experience, and personal requirements (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Net Worth Requirement */}
            <FormField
              control={control}
              name="franchiseDetails.performance.netWorthRequirement.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Net Worth Requirement</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter minimum net worth required" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum financial position required
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Liquid Capital Required */}
            <FormField
              control={control}
              name="franchiseDetails.performance.liquidCapitalRequired.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Liquid Capital Required</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter available cash required" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum cash available for investment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FranchiseForm;