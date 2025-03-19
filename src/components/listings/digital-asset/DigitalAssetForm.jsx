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
  DIGITAL_ASSET_TYPES, 
  EASE_OF_MANAGEMENT_OPTIONS,
  REVENUE_TRENDS,
  ASSET_TRANSFER_METHODS
} from '@/utils/constants';

const DigitalAssetForm = () => {
  const { control, watch } = useFormContext();
  const sellerFinancingAvailable = watch('digitalAssetDetails.sale.sellerFinancing.isAvailable');
  
  return (
    <div className="space-y-8">
      {/* Asset Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Information</CardTitle>
          <CardDescription>
            Basic details about the digital asset
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Asset Type */}
            <FormField
              control={control}
              name="digitalAssetDetails.assetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Asset Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIGITAL_ASSET_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The primary category of the digital asset
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Platform/Framework */}
            <FormField
              control={control}
              name="digitalAssetDetails.platformFramework"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Platform/Framework</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., WordPress, Shopify, Custom" {...field} />
                  </FormControl>
                  <FormDescription>
                    Technical platform the asset runs on
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Niche/Industry */}
            <FormField
              control={control}
              name="digitalAssetDetails.nicheIndustry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Niche/Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Health & Fitness, Finance, Technology" {...field} />
                  </FormControl>
                  <FormDescription>
                    Specific market segment the asset serves
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Creation Date */}
            <FormField
              control={control}
              name="digitalAssetDetails.creationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Creation Date</FormLabel>
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
                    When the digital asset was first created
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Business Model */}
          <FormField
            control={control}
            name="digitalAssetDetails.businessModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Business Model</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe how the asset generates revenue" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Explain the monetization approach in detail (100-500 characters)
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
            {/* Ease of Management */}
            <FormField
              control={control}
              name="digitalAssetDetails.easeOfManagement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Ease of Management</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {EASE_OF_MANAGEMENT_OPTIONS.map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    How much active management the asset requires
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Owner Time Required */}
            <FormField
              control={control}
              name="digitalAssetDetails.ownerTimeRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Weekly Hours Required</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      max="168"
                      placeholder="Enter hours per week" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Average time commitment needed per week (0-168 hours)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Technical Details Section */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Details</CardTitle>
          <CardDescription>
            Information about the technical aspects of the asset
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Domain Name */}
            <FormField
              control={control}
              name="digitalAssetDetails.technical.domainName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Domain Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Primary web address for the asset
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Domain Authority */}
            <FormField
              control={control}
              name="digitalAssetDetails.technical.domainAuthority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain Authority</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      max="100"
                      placeholder="Enter score (0-100)" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    SEO metric indicating search ranking potential
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Domain Age */}
            <FormField
              control={control}
              name="digitalAssetDetails.technical.domainAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      max="30"
                      placeholder="Enter age in years" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    How long the domain has been registered (years)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hosting Provider */}
            <FormField
              control={control}
              name="digitalAssetDetails.technical.hostingProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Hosting Provider</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AWS, BlueHost, SiteGround" {...field} />
                  </FormControl>
                  <FormDescription>
                    Company hosting the website or application
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Monthly Hosting Cost */}
          <FormField
            control={control}
            name="digitalAssetDetails.technical.monthlyHostingCost.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Monthly Hosting Cost</FormLabel>
                <FormControl>
                  <CurrencyInput 
                    placeholder="Enter monthly cost" 
                    value={field.value}
                    onChange={field.onChange}
                    currency="INR"
                  />
                </FormControl>
                <FormDescription>
                  Monthly infrastructure expense
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Technology Stack */}
          <FormField
            control={control}
            name="digitalAssetDetails.technical.technologyStack"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Technology Stack</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the technologies used (languages, frameworks, databases)" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Technical components and architecture (50-300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mobile Responsiveness */}
            <FormField
              control={control}
              name="digitalAssetDetails.technical.mobileResponsiveness"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Mobile Responsive</FormLabel>
                    <FormDescription>
                      Is the site optimized for mobile devices?
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

            {/* SSL/Security */}
            <FormField
              control={control}
              name="digitalAssetDetails.technical.sslSecurity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>SSL Certificate/HTTPS</FormLabel>
                    <FormDescription>
                      Is the site secured with SSL/HTTPS?
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

          {/* Content Management */}
          <FormField
            control={control}
            name="digitalAssetDetails.technical.contentManagement"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Content Management</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., WordPress Admin, Custom CMS, Direct FTP" {...field} />
                </FormControl>
                <FormDescription>
                  How content is added and updated
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Traffic & Analytics Section */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic & Analytics</CardTitle>
          <CardDescription>
            Information about visitor traffic and audience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Visitors */}
            <FormField
              control={control}
              name="digitalAssetDetails.traffic.monthlyVisitors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Monthly Unique Visitors</FormLabel>
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
                    Average monthly unique users
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Monthly Pageviews */}
            <FormField
              control={control}
              name="digitalAssetDetails.traffic.monthlyPageviews"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Monthly Pageviews</FormLabel>
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
                    Total monthly page visits
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Traffic Trend */}
          <FormField
            control={control}
            name="digitalAssetDetails.traffic.trafficTrend"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Traffic Trend</FormLabel>
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
                  Direction of traffic growth over time
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-semibold">Traffic Sources (must total 100%)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Organic Traffic */}
              <FormField
                control={control}
                name="digitalAssetDetails.traffic.organicTrafficPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Organic Traffic</FormLabel>
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
                      From search engines
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Direct Traffic */}
              <FormField
                control={control}
                name="digitalAssetDetails.traffic.directTrafficPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Direct Traffic</FormLabel>
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
                      Direct URL entry
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Referral Traffic */}
              <FormField
                control={control}
                name="digitalAssetDetails.traffic.referralTrafficPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Referral Traffic</FormLabel>
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
                      From external links
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Social Traffic */}
              <FormField
                control={control}
                name="digitalAssetDetails.traffic.socialTrafficPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Social Traffic</FormLabel>
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
                      From social media
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Other Traffic */}
              <FormField
                control={control}
                name="digitalAssetDetails.traffic.otherTrafficPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Other Traffic</FormLabel>
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
                      All other sources
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Total percentage calculation */}
            <div className="mt-2">
              {(() => {
                const organicTraffic = parseFloat(watch('digitalAssetDetails.traffic.organicTrafficPercentage') || 0);
                const directTraffic = parseFloat(watch('digitalAssetDetails.traffic.directTrafficPercentage') || 0);
                const referralTraffic = parseFloat(watch('digitalAssetDetails.traffic.referralTrafficPercentage') || 0);
                const socialTraffic = parseFloat(watch('digitalAssetDetails.traffic.socialTrafficPercentage') || 0);
                const otherTraffic = parseFloat(watch('digitalAssetDetails.traffic.otherTrafficPercentage') || 0);
                
                const total = organicTraffic + directTraffic + referralTraffic + socialTraffic + otherTraffic;
                
                if (Math.abs(total - 100) < 0.1) {
                  return (
                    <p className="text-sm text-green-600">
                      Total: 100% ✓
                    </p>
                  );
                } else {
                  return (
                    <p className="text-sm text-red-600">
                      Total: {total.toFixed(1)}% (must equal 100%)
                    </p>
                  );
                }
              })()}
            </div>
          </div>

          {/* Analytics Verification */}
          <FormField
            control={control}
            name="digitalAssetDetails.traffic.analyticsVerification"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel required>Analytics Verification</FormLabel>
                  <FormDescription>
                    Do you agree to provide access to analytics for verification?
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Subscribers */}
            <FormField
              control={control}
              name="digitalAssetDetails.traffic.emailSubscribers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Subscribers</FormLabel>
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
                    Size of email list included in sale
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Media Accounts */}
            <FormField
              control={control}
              name="digitalAssetDetails.traffic.socialMediaAccounts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Media Accounts</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List social accounts with follower counts" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Social accounts included in sale
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Financials & Sale Section */}
      <Card>
        <CardHeader>
          <CardTitle>Financials & Sale</CardTitle>
          <CardDescription>
            Financial performance and sale details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Revenue */}
            <FormField
              control={control}
              name="digitalAssetDetails.financials.monthlyRevenue.value"
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
                    Average monthly income
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Annual Revenue */}
            <FormField
              control={control}
              name="digitalAssetDetails.financials.annualRevenue.value"
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
                    Total yearly income
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Profit */}
            <FormField
              control={control}
              name="digitalAssetDetails.financials.monthlyProfit.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Monthly Profit</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter monthly profit" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Average monthly profit after expenses
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Monthly Expenses */}
            <FormField
              control={control}
              name="digitalAssetDetails.financials.monthlyExpenses.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Monthly Expenses</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Enter monthly expenses" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Average monthly costs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Expense Breakdown */}
          <FormField
            control={control}
            name="digitalAssetDetails.financials.expenseBreakdown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Breakdown</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detail main expense categories and costs" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Breakdown of monthly expenses
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-semibold">Revenue Sources (should total 100%)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ads Revenue */}
              <FormField
                control={control}
                name="digitalAssetDetails.financials.revenueSources.adsPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ads Revenue</FormLabel>
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
                      Display/PPC advertising
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Affiliate Revenue */}
              <FormField
                control={control}
                name="digitalAssetDetails.financials.revenueSources.affiliatePercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliate Revenue</FormLabel>
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
                      Affiliate commissions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Revenue */}
              <FormField
                control={control}
                name="digitalAssetDetails.financials.revenueSources.productPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Revenue</FormLabel>
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
                      Product sales
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Subscription Revenue */}
              <FormField
                control={control}
                name="digitalAssetDetails.financials.revenueSources.subscriptionPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Revenue</FormLabel>
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
                      Recurring memberships
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Services Revenue */}
              <FormField
                control={control}
                name="digitalAssetDetails.financials.revenueSources.servicesPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Revenue</FormLabel>
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
                      Service fees
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Other Revenue */}
              <FormField
                control={control}
                name="digitalAssetDetails.financials.revenueSources.otherPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Revenue</FormLabel>
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
                      All other sources
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Total percentage calculation */}
            <div className="mt-2">
              {(() => {
                const adsRevenue = parseFloat(watch('digitalAssetDetails.financials.revenueSources.adsPercentage') || 0);
                const affiliateRevenue = parseFloat(watch('digitalAssetDetails.financials.revenueSources.affiliatePercentage') || 0);
                const productRevenue = parseFloat(watch('digitalAssetDetails.financials.revenueSources.productPercentage') || 0);
                const subscriptionRevenue = parseFloat(watch('digitalAssetDetails.financials.revenueSources.subscriptionPercentage') || 0);
                const servicesRevenue = parseFloat(watch('digitalAssetDetails.financials.revenueSources.servicesPercentage') || 0);
                const otherRevenue = parseFloat(watch('digitalAssetDetails.financials.revenueSources.otherPercentage') || 0);
                
                const total = adsRevenue + affiliateRevenue + productRevenue + subscriptionRevenue + servicesRevenue + otherRevenue;
                
                if (Math.abs(total - 100) < 0.1) {
                  return (
                    <p className="text-sm text-green-600">
                      Total: 100% ✓
                    </p>
                  );
                } else if (total === 0) {
                  return (
                    <p className="text-sm text-amber-600">
                      Total: 0% (Leave all at 0 if not applicable)
                    </p>
                  );
                } else {
                  return (
                    <p className="text-sm text-red-600">
                      Total: {total.toFixed(1)}% (should equal 100%)
                    </p>
                  );
                }
              })()}
            </div>
          </div>

          {/* Revenue Growth */}
          <FormField
            control={control}
            name="digitalAssetDetails.financials.revenueGrowth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revenue Growth</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="number" 
                      min="-100"
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
                  Year-over-year growth rate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monetization Details */}
          <FormField
            control={control}
            name="digitalAssetDetails.financials.monetizationDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Monetization Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Explain the revenue streams in detail" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Detailed explanation of revenue generation (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Asking Price */}
          <FormField
            control={control}
            name="digitalAssetDetails.sale.askingPrice.value"
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
                  Total amount requested for the asset
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Multiple */}
            <FormField
              control={control}
              name="digitalAssetDetails.sale.askingPrice.priceMultiple"
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
                    Multiple of monthly profit (e.g., 36x = 3 years)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Price Negotiable */}
            <FormField
              control={control}
              name="digitalAssetDetails.sale.askingPrice.isNegotiable"
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
            name="digitalAssetDetails.sale.reasonForSelling"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Reason for Selling</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Explain why you are selling the digital asset" 
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

          {/* Assets Included */}
          <FormField
            control={control}
            name="digitalAssetDetails.sale.assetsIncluded"
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

          {/* Training Support */}
          <FormField
            control={control}
            name="digitalAssetDetails.sale.trainingSupport"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Training & Support</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the training and support you will provide to the new owner" 
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

          {/* Transfer Method */}
          <FormField
            control={control}
            name="digitalAssetDetails.sale.transferMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Transfer Method</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transfer method" />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSET_TRANSFER_METHODS.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  How the asset will be transferred to the buyer
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Seller Financing */}
          <FormField
            control={control}
            name="digitalAssetDetails.sale.sellerFinancing.isAvailable"
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
                name="digitalAssetDetails.sale.sellerFinancing.downPaymentPercentage"
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
                name="digitalAssetDetails.sale.sellerFinancing.details"
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalAssetForm;