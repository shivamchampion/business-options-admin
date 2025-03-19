import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { MultiSelect } from '@/components/common/MultiSelect';
import { LISTING_TYPES, INDUSTRIES, PLANS, COUNTRIES, STATES_BY_COUNTRY } from '@/utils/constants';

const BasicInfo = () => {
  const { control, watch } = useFormContext();
  const selectedCountry = watch('location.country');
  const listingType = watch('type');
  
  return (
    <div className="space-y-8">
      <div className="text-lg font-semibold">Step 1: Basic Information</div>
      <p className="text-gray-600">
        Provide essential details about your listing. Fields marked with an asterisk (*) are required.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Listing Type & Details</CardTitle>
          <CardDescription>
            Select the type of listing and provide basic information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Listing Type */}
          <FormField
            control={control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel required>Listing Type</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {LISTING_TYPES.map((type) => (
                      <FormItem key={type.value} className="relative"> {/* Ensure key is a string */}
                        <RadioGroupItem
                          value={type.value}
                          id={type.value}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={type.value}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 [&:has([data-state=checked])]:border-blue-600"
                        >
                          <span className="text-2xl mb-2">{type.icon}</span>
                          <span className="font-medium">{type.label}</span>
                          <span className="text-xs text-gray-500 mt-1 text-center">{type.description}</span>
                        </Label>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  This determines the specific information we'll collect for your listing
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Listing Name */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Listing Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the name of your listing" {...field} />
                </FormControl>
                <FormDescription>
                  This will be the main title displayed for your listing (3-100 characters)
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
                <FormLabel required>Industries</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={INDUSTRIES}
                    value={field.value || []}
                    onChange={field.onChange}
                    placeholder="Select up to 3 industries"
                    maxSelected={3}
                  />
                </FormControl>
                <FormDescription>
                  Select up to 3 industries that best represent this listing
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
                <FormLabel required>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide a comprehensive overview of your listing" 
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormDescription>
                    Detailed description of the opportunity (100-5000 characters)
                  </FormDescription>
                  <span className="text-xs text-muted-foreground">
                    {field.value?.length || 0} / 5000
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location & Plan Information</CardTitle>
          <CardDescription>
            Provide location details and select your visibility plan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Type */}
          <FormField
            control={control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Plan Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLANS.map((plan) => (
                        <SelectItem key={plan.value} value={plan.value}>
                          {plan.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Determines visibility level and premium features
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country */}
          <FormField
            control={control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Country</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value || 'India'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* State and City - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* State */}
            <FormField
              control={control}
              name="location.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>State</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {(STATES_BY_COUNTRY[selectedCountry] || []).map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                  <FormLabel required>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <FormField
            control={control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter street address (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pincode */}
          <FormField
            control={control}
            name="location.pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode/ZIP</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pincode (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            How potential buyers or investors can reach you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Email and Phone - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Email */}
            <FormField
              control={control}
              name="contactInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Phone */}
            <FormField
              control={control}
              name="contactInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Name */}
          <FormField
            control={control}
            name="contactInfo.contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Name of contact person (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Website */}
          <FormField
            control={control}
            name="contactInfo.website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website URL (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Contact Method */}
          <FormField
            control={control}
            name="contactInfo.preferredContactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Contact Method</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfo;