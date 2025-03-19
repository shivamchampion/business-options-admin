import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MultiSelect } from '@/components/common/MultiSelect';
import { CurrencyInput } from '@/components/common/CurrencyInput';
import { 
  INVESTOR_TYPES,
  INVESTMENT_ROUNDS,
  BUSINESS_STAGES,
  INDUSTRIES,
  GEOGRAPHIC_REGIONS,
  BOARD_INVOLVEMENT_OPTIONS
} from '@/utils/constants';

const InvestorForm = () => {
  const { control, watch } = useFormContext();
  const investorType = watch('investorDetails.investorType');
  
  return (
    <div className="space-y-8">
      {/* Investor Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Investor Information</CardTitle>
          <CardDescription>
            Basic details about you as an investor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Investor Type */}
          <FormField
            control={control}
            name="investorDetails.investorType"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Investor Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investor type" />
                    </SelectTrigger>
                    <SelectContent>
                      {INVESTOR_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Category of investor you represent
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Years of Experience */}
            <FormField
              control={control}
              name="investorDetails.yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Years of Experience</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      max="100"
                      placeholder="Enter number of years" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Duration of investment experience
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Investment Team Size (conditional) */}
            {['venture_capital', 'private_equity', 'family_office', 'corporate'].includes(investorType) && (
              <FormField
                control={control}
                name="investorDetails.investmentTeamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Team Size</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        placeholder="Number of team members" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormDescription>
                      Number of people involved in investment decisions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Investment Philosophy */}
          <FormField
            control={control}
            name="investorDetails.investmentPhilosophy"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Investment Philosophy</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your overall approach and values as an investor" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Articulation of investment principles (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Background Summary */}
          <FormField
            control={control}
            name="investorDetails.backgroundSummary"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Background Summary</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide an overview of your professional background and experience" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Relevant background information (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Key Achievements */}
          <FormField
            control={control}
            name="investorDetails.keyAchievements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Achievements</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Highlight notable investment successes or exits" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Specific successful investments (up to 500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Investment Capacity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Capacity</CardTitle>
          <CardDescription>
            Details about your investment capabilities and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Annual Investment Target */}
          <FormField
            control={control}
            name="investorDetails.investment.annualInvestmentTarget.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Investment Target</FormLabel>
                <FormControl>
                  <CurrencyInput 
                    placeholder="Target yearly deployment" 
                    value={field.value}
                    onChange={field.onChange}
                    currency="INR"
                  />
                </FormControl>
                <FormDescription>
                  Yearly capital deployment goal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Rounds */}
          <FormField
            control={control}
            name="investorDetails.investment.preferredRounds"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Preferred Rounds</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={INVESTMENT_ROUNDS}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select funding stages of interest"
                  />
                </FormControl>
                <FormDescription>
                  Funding stages you typically invest in
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lead Investor Status */}
          <FormField
            control={control}
            name="investorDetails.investment.leadInvestorStatus"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel required>Lead Investor</FormLabel>
                  <FormDescription>
                    Are you willing to lead investment rounds?
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
            {/* Preferred Equity Stake Range */}
            <FormField
              control={control}
              name="investorDetails.investment.preferredEquityStake.min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Equity Stake</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number" 
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="Minimum ownership percentage" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        %
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Minimum ownership target
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="investorDetails.investment.preferredEquityStake.max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Equity Stake</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number" 
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="Maximum ownership percentage" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        %
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Maximum ownership target
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Decision Timeline */}
          <FormField
            control={control}
            name="investorDetails.investment.decisionTimeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Decision Timeline</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 4-8 weeks, 30-60 days" {...field} />
                </FormControl>
                <FormDescription>
                  Typical timeframe from pitch to funding decision
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Investment Focus Section */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Focus</CardTitle>
          <CardDescription>
            Details about your investment preferences and focus areas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Industries */}
            <FormField
              control={control}
              name="investorDetails.focus.primaryIndustries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Primary Industries</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={INDUSTRIES}
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Select main focus industries"
                      maxSelected={5}
                    />
                  </FormControl>
                  <FormDescription>
                    Main sectors of focus (maximum 5)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Secondary Industries */}
            <FormField
              control={control}
              name="investorDetails.focus.secondaryIndustries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Industries</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={INDUSTRIES}
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Select additional areas of interest"
                    />
                  </FormControl>
                  <FormDescription>
                    Additional sectors of interest
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Business Stage Preference */}
          <FormField
            control={control}
            name="investorDetails.focus.businessStagePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Business Stage Preference</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={BUSINESS_STAGES}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select preferred business maturity stages"
                  />
                </FormControl>
                <FormDescription>
                  Company development stages you prefer
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Geographic Focus */}
          <FormField
            control={control}
            name="investorDetails.focus.geographicFocus"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Geographic Focus</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={GEOGRAPHIC_REGIONS}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select regions for investment"
                  />
                </FormControl>
                <FormDescription>
                  Regions where you prefer to invest
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Investment Criteria */}
          <FormField
            control={control}
            name="investorDetails.focus.investmentCriteria"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Investment Criteria</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your key requirements for potential investments" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Specific criteria used for evaluation (100-500 characters)
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
            {/* Minimum Revenue */}
            <FormField
              control={control}
              name="investorDetails.focus.minimumRevenue.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Revenue</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Minimum revenue requirement" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum revenue threshold for consideration
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Minimum Traction */}
            <FormField
              control={control}
              name="investorDetails.focus.minimumTraction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Traction</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., 10,000 MAU, 20% MoM growth" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Specific metrics besides revenue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Portfolio & Process Section */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio & Process</CardTitle>
          <CardDescription>
            Details about your investment process and portfolio management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Portfolio Size */}
            <FormField
              control={control}
              name="investorDetails.portfolio.portfolioSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Size</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="Number of investments to date" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Total investments made to date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active Investments */}
            <FormField
              control={control}
              name="investorDetails.portfolio.activeInvestments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Investments</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="Current active portfolio companies" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Current ongoing investments
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Success Stories */}
          <FormField
            control={control}
            name="investorDetails.portfolio.successStories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Success Stories</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Highlight notable exits or high-performing investments" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Specific examples of successful investments (up to 500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Investment Process */}
          <FormField
            control={control}
            name="investorDetails.portfolio.investmentProcess"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Investment Process</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your evaluation and decision process from pitch to funding" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Clear outline of process steps (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post-Investment Support */}
          <FormField
            control={control}
            name="investorDetails.portfolio.postInvestmentSupport"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Post-Investment Support</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the assistance and resources you provide beyond capital" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Value-add beyond funding (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Reporting Requirements */}
          <FormField
            control={control}
            name="investorDetails.portfolio.reportingRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reporting Requirements</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Outline the frequency and content of required progress reports" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Update expectations from portfolio companies (up to 300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Board Involvement */}
          <FormField
            control={control}
            name="investorDetails.portfolio.boardInvolvement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board Involvement</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select governance level preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {BOARD_INVOLVEMENT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Preferred level of governance participation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorForm;