import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/common/MultiSelect';
import { CurrencyInput } from '@/components/common/CurrencyInput';
import { 
  DEVELOPMENT_STAGES,
  PRODUCT_STAGES,
  INTELLECTUAL_PROPERTY_TYPES,
  FUNDING_STAGES
} from '@/utils/constants';
import { Plus, Trash2 } from 'lucide-react';

const StartupForm = () => {
  const { control, watch } = useFormContext();
  const developmentStage = watch('startupDetails.developmentStage');
  
  // Use field array for founders
  const { fields, append, remove } = useFieldArray({
    control,
    name: "startupDetails.team.founders"
  });

  // Add a new founder
  const addFounder = () => {
    append({
      name: '',
      role: '',
      experience: '',
      linkedin: ''
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Startup Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Startup Information</CardTitle>
          <CardDescription>
            Basic details about your startup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Development Stage */}
            <FormField
              control={control}
              name="startupDetails.developmentStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Development Stage</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select development stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEVELOPMENT_STAGES.map((stage) => (
                          <SelectItem key={stage.value} value={stage.value}>
                            {stage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Current growth phase of your startup
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Registered Name */}
            <FormField
              control={control}
              name="startupDetails.registeredName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Registered Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Legal entity name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Official registered company name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Founded Date */}
            <FormField
              control={control}
              name="startupDetails.foundedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Founded Date</FormLabel>
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
                    When the company was established
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Launch Date */}
            <FormField
              control={control}
              name="startupDetails.launchDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Launch Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="month"
                      placeholder="MM/YYYY (if applicable)" 
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().slice(0, 7) : ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        field.onChange(date);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    When product/service went to market (or expected)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Mission Statement */}
          <FormField
            control={control}
            name="startupDetails.missionStatement"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Mission Statement</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Core purpose of your startup" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Concise statement of purpose (50-300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Problem Statement */}
          <FormField
            control={control}
            name="startupDetails.problemStatement"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Problem Statement</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What market gap or customer pain point are you addressing?" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Specific problem being solved (50-300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Solution Description */}
          <FormField
            control={control}
            name="startupDetails.solutionDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Solution Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="How does your product/service solve the problem?" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Clear explanation of solution approach (100-500 characters)
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

      {/* Team & Product Section */}
      <Card>
        <CardHeader>
          <CardTitle>Team & Product</CardTitle>
          <CardDescription>
            Information about your team and product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Team Size */}
          <FormField
            control={control}
            name="startupDetails.team.size"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Team Size</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="1"
                    placeholder="Total number of team members" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormDescription>
                  Total personnel including founders, employees, and contractors
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Founders */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <FormLabel required>Founders</FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={addFounder}
                disabled={fields.length >= 10}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Founder
              </Button>
            </div>
            <FormDescription>
              Key people behind the startup (at least one required, maximum 10)
            </FormDescription>

            {fields.length === 0 && (
              <div className="p-8 text-center border border-dashed rounded-md">
                <p className="text-gray-500">No founders added. Click "Add Founder" to add at least one founder.</p>
              </div>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Founder {index + 1}</h4>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => fields.length > 1 && remove(index)}
                    disabled={fields.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Founder Name */}
                    <FormField
                      control={control}
                      name={`startupDetails.team.founders.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Founder Role */}
                    <FormField
                      control={control}
                      name={`startupDetails.team.founders.${index}.role`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., CEO, CTO, COO" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Founder Experience */}
                  <FormField
                    control={control}
                    name={`startupDetails.team.founders.${index}.experience`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Relevant background and experience" 
                            className="min-h-[80px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Founder LinkedIn */}
                  <FormField
                    control={control}
                    name={`startupDetails.team.founders.${index}.linkedin`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input placeholder="LinkedIn URL (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Product Stage */}
          <FormField
            control={control}
            name="startupDetails.product.stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Product Stage</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_STAGES.map((stage) => (
                        <SelectItem key={stage.value} value={stage.value}>
                          {stage.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Current development status of your product/service
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Intellectual Property */}
          <FormField
            control={control}
            name="startupDetails.product.intellectualProperty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intellectual Property</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={INTELLECTUAL_PROPERTY_TYPES}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select applicable IP protections"
                  />
                </FormControl>
                <FormDescription>
                  Patents, trademarks, or other IP assets
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Technology Stack */}
          <FormField
            control={control}
            name="startupDetails.product.technologyStack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technology Stack</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Key technologies, frameworks, and platforms used" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Technical foundation (up to 300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Unique Selling Points */}
          <FormField
            control={control}
            name="startupDetails.product.uniqueSellingPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Unique Selling Points</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What makes your product/service stand out from competitors?" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Key differentiators and competitive advantages (100-500 characters)
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

      {/* Market & Traction Section */}
      <Card>
        <CardHeader>
          <CardTitle>Market & Traction</CardTitle>
          <CardDescription>
            Market information and current performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Traction Metrics (conditional based on stage) */}
          {developmentStage && ['mvp', 'pre_seed', 'seed', 'series_a', 'series_b_plus'].includes(developmentStage) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Total Users */}
              <FormField
                control={control}
                name="startupDetails.traction.totalUsers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Users</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="Total user base" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Total registered/acquired users
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Active Users */}
              <FormField
                control={control}
                name="startupDetails.traction.activeUsers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active Users</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0"
                        placeholder="Monthly active users" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Users actively engaging with product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Revenue Model */}
          <FormField
            control={control}
            name="startupDetails.traction.revenueModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Revenue Model</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="How do you generate revenue? (e.g., subscription, freemium, transaction fees)" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Monetization approach (50-300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Monthly Revenue (conditional based on stage) */}
          {developmentStage && ['seed', 'series_a', 'series_b_plus'].includes(developmentStage) && (
            <FormField
              control={control}
              name="startupDetails.traction.monthlyRevenue.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Revenue</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Current monthly revenue" 
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
          )}

          {/* Growth Rate */}
          <FormField
            control={control}
            name="startupDetails.traction.growthRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Growth Rate</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="number" 
                      min="0"
                      max="1000"
                      placeholder="Monthly growth percentage" 
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      %
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Monthly user or revenue growth percentage
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Target Market */}
          <FormField
            control={control}
            name="startupDetails.market.targetMarket"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Target Market</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Who are your customers? Define your target audience." 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Customer profile description (50-300 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 300
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Market Size */}
          <FormField
            control={control}
            name="startupDetails.market.marketSize.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Total Addressable Market (TAM)</FormLabel>
                <FormControl>
                  <CurrencyInput 
                    placeholder="Total market opportunity size" 
                    value={field.value}
                    onChange={field.onChange}
                    currency="INR"
                  />
                </FormControl>
                <FormDescription>
                  Total potential market size in currency
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Competitive Analysis */}
          <FormField
            control={control}
            name="startupDetails.market.competitiveAnalysis"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Competitive Analysis</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Who are your competitors and how do you differentiate?" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Key competitors and differentiation points (100-500 characters)
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

      {/* Funding Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Funding Information</CardTitle>
          <CardDescription>
            Investment history and current fundraising goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Funding Stage */}
            <FormField
              control={control}
              name="startupDetails.funding.fundingStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Funding Stage</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {FUNDING_STAGES.map((stage) => (
                          <SelectItem key={stage.value} value={stage.value}>
                            {stage.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Current investment round or phase
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Raised to Date */}
            <FormField
              control={control}
              name="startupDetails.funding.totalRaised.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Raised to Date</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Total funding raised so far" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Sum of all previous funding rounds
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Raising Amount */}
            <FormField
              control={control}
              name="startupDetails.funding.currentRaisingAmount.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Current Raising Amount</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Target investment amount" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Amount seeking to raise in current round
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Equity Offered */}
            <FormField
              control={control}
              name="startupDetails.funding.equityOffered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Equity Offered</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number" 
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="Percentage of equity available" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        %
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Percentage of company offered in this round
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pre-money Valuation */}
          <FormField
            control={control}
            name="startupDetails.funding.preMoneyValuation.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Pre-money Valuation</FormLabel>
                <FormControl>
                  <CurrencyInput 
                    placeholder="Company valuation before investment" 
                    value={field.value}
                    onChange={field.onChange}
                    currency="INR"
                  />
                </FormControl>
                <FormDescription>
                  Company valuation prior to new investment
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Use of Funds */}
          <FormField
            control={control}
            name="startupDetails.funding.useOfFunds"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Use of Funds</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="How will the investment be used? Provide specific allocations if possible." 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Capital allocation plan with percentages (100-500 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 500
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Previous Investors */}
          <FormField
            control={control}
            name="startupDetails.funding.previousInvestors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Investors</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Notable investors who have backed your startup" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    List notable backers with permission (up to 300 characters)
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
            {/* Burn Rate */}
            <FormField
              control={control}
              name="startupDetails.funding.burnRate.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Burn Rate</FormLabel>
                  <FormControl>
                    <CurrencyInput 
                      placeholder="Monthly expenditure" 
                      value={field.value}
                      onChange={field.onChange}
                      currency="INR"
                    />
                  </FormControl>
                  <FormDescription>
                    Current monthly spending
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Runway */}
            <FormField
              control={control}
              name="startupDetails.funding.runway"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Runway</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      max="60"
                      placeholder="Months of operation remaining" 
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>
                    Months remaining at current burn rate
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

export default StartupForm;