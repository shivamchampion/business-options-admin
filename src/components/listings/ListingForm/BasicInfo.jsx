import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Info, AlertCircle } from 'lucide-react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect } from '@/components/common/MultiSelect';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LISTING_TYPES, INDUSTRIES, STATES, CITIES, LISTING_STATUSES, PLAN_TYPES } from '@/utils/constants';

const BasicInfo = () => {
  const { control, watch, formState: { errors } } = useFormContext();
  const selectedState = watch('location.state');

  // Filter cities based on selected state
  const filteredCities = selectedState 
    ? CITIES.filter(city => city.state === selectedState)
    : [];

  return (
    <div className="space-y-8">
      {/* Listing Type Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Type Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <div className="flex items-center gap-2">
                  <FormLabel className="text-base">Listing Type</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Choose the category that best describes your listing. This determines the specific information required in later steps.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {LISTING_TYPES.map((type) => (
                      <div
                        key={type.value}
                        className={`
                          relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                          ${field.value === type.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'}
                        `}
                        onClick={() => field.onChange(type.value)}
                      >
                        <div className="p-2 rounded-full bg-primary/10 mb-3">
                          {type.icon}
                        </div>
                        <span className="font-medium text-center">{type.label}</span>
                        <span className="text-xs text-muted-foreground text-center mt-1">{type.description}</span>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Basic Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Listing Name */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Listing Name</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>The official name of your listing. This will be the primary identifier used for search and display.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Input placeholder="Enter the name of your listing" {...field} />
                </FormControl>
                <FormDescription>
                  3-100 characters. Use the official business or project name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Industries */}
          <FormField
            control={control}
            name="industries"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Industries</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Select up to 3 industries that best represent your listing. These help potential buyers find your listing.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <MultiSelect
                    placeholder="Select up to 3 industries"
                    options={INDUSTRIES.map(industry => ({
                      label: industry.name,
                      value: industry.id
                    }))}
                    maxItems={3}
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Select 1-3 industries that accurately represent your listing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Description</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Provide a comprehensive overview of your listing. This is the first detailed information potential buyers will see.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your listing in detail" 
                    className="min-h-[150px]"
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    100-5000 characters. Provide a detailed overview.
                  </FormDescription>
                  <span className={`text-xs ${
                    field.value?.length > 5000 ? 'text-destructive' : 
                    field.value?.length > 4500 ? 'text-amber-500' : 
                    'text-muted-foreground'
                  }`}>
                    {field.value?.length || 0}/5000
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Status</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>The current stage of your listing. Draft listings are not visible to others.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <Select 
                    defaultValue={field.value || 'draft'} 
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {LISTING_STATUSES.map(status => (
                        <SelectItem 
                          key={status.value} 
                          value={status.value}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${status.colorClass}`}></div>
                            {status.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  All new listings start as drafts and require approval before publishing.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Plan Type */}
          <FormField
            control={control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Plan Type</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>The visibility tier determines your listing's exposure and available features.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormControl>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {PLAN_TYPES.map((plan) => (
                      <div
                        key={plan.value}
                        className={`
                          relative flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all
                          ${field.value === plan.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-gray-300'}
                        `}
                        onClick={() => field.onChange(plan.value)}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">{plan.label}</span>
                          {plan.highlight && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground mb-2">{plan.description}</span>
                        <span className="font-bold text-sm">{plan.price}</span>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>
                  Choose the plan that best fits your needs. You can upgrade anytime.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Location Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State */}
            <FormField
              control={control}
              name="location.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select 
                      value={field.value || ""} 
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATES.map(state => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The state where the listing is primarily located.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select 
                      value={field.value || ""} 
                      onValueChange={field.onChange}
                      disabled={!selectedState}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={selectedState ? "Select city" : "Select state first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCities.map(city => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The city where the listing is primarily located.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <FormField
              control={control}
              name="contactInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This email will be used for inquiries about your listing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={control}
              name="contactInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-1">
                    <FormLabel>Contact Phone</FormLabel>
                    <span className="text-sm text-muted-foreground">(Optional)</span>
                  </div>
                  <FormControl>
                    <Input type="tel" placeholder="+91 9876543210" {...field} />
                  </FormControl>
                  <FormDescription>
                    Include country code for international contacts.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Help section at the bottom */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-amber-800 mb-1">Need help with your listing?</h4>
          <p className="text-sm text-amber-700">
            Complete all required fields to proceed to the next step. If you're unsure about any field, 
            hover over the information icon for guidance or refer to our <a href="/help/listings" className="text-blue-600 underline">listing guide</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;