import React, { useEffect, Fragment } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Store, DollarSign, Users, Trophy, CalendarDays, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Listbox, Disclosure, RadioGroup, Combobox, Switch } from '@headlessui/react';


// UI Components
import Card from '../../ui/Card';

const ListingDetails = ({ listingType }) => {
  const { control, setValue, formState: { errors }, register, watch } = useFormContext();
  
  // Custom Field Components using Headless UI
  const FormSection = ({ title, icon, description, children }) => {
    return (
      <Disclosure as="div" className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 focus:outline-none">
              <div className="flex items-center">
                {icon && <span className="mr-3 text-gray-500">{icon}</span>}
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              </div>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-6 py-4 bg-white">
              {description && (
                <p className="mb-4 text-sm text-gray-500">{description}</p>
              )}
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  };

  const FormField = ({ label, name, error, children }) => {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        {children}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error.message}</p>
        )}
      </div>
    );
  };

  const FormSelect = ({ options, onChange, value, name, placeholder }) => {
    return (
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <span className="block truncate">
              {options.find(option => option.value === value)?.label || placeholder || "Select an option"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                  cursor-pointer select-none relative py-2 pl-10 pr-4`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                      {option.label}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    );
  };

  const FormRadio = ({ options, onChange, value }) => {
    return (
      <RadioGroup value={value} onChange={onChange} className="mt-2">
        <div className="space-y-2">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              className={({ checked }) =>
                `${checked ? 'bg-blue-50 border-blue-500 text-blue-900' : 'bg-white border-gray-200'}
                relative rounded-lg border px-5 py-3 cursor-pointer flex focus:outline-none`
              }
            >
              {({ checked }) => (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label className={`font-medium ${checked ? 'text-blue-900' : 'text-gray-900'}`}>
                        {option.label}
                      </RadioGroup.Label>
                    </div>
                  </div>
                  <div className={`${checked ? 'bg-blue-600' : 'bg-white border-gray-300'} w-4 h-4 rounded-full border flex items-center justify-center`}>
                    {checked && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    );
  };

  const FormCheckbox = ({ options, onChange, value = [] }) => {
    const handleChange = (optionValue) => {
      const newValues = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue];
      onChange(newValues);
    };

    return (
      <div className="space-y-2 mt-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <Switch
              checked={value.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className={`${
                value.includes(option.value) ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-5 w-10 items-center rounded-full`}
            >
              <span
                className={`${
                  value.includes(option.value) ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-3 w-3 transform rounded-full bg-white transition`}
              />
            </Switch>
            <label className="ml-3 text-sm text-gray-700 cursor-pointer" onClick={() => handleChange(option.value)}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  };

  const FormTextarea = ({ placeholder, rows = 3, onChange, value }) => {
    return (
      <textarea
        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };

  const FormCurrencyInput = ({ placeholder, onChange, value }) => {
    const handleChange = (e) => {
      // Remove non-numeric characters except decimal point
      const cleanValue = e.target.value.replace(/[^0-9.]/g, '');
      onChange(cleanValue);
    };

    return (
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
        />
      </div>
    );
  };

  const NumberInput = ({ placeholder, min, max, onChange, value, addon }) => {
    const handleChange = (e) => {
      const numValue = parseInt(e.target.value, 10);
      if (!isNaN(numValue)) {
        if (min !== undefined && numValue < min) {
          onChange(min);
        } else if (max !== undefined && numValue > max) {
          onChange(max);
        } else {
          onChange(numValue);
        }
      } else {
        onChange('');
      }
    };

    return (
      <div className="relative rounded-md shadow-sm">
        <input
          type="number"
          className="block w-full pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          min={min}
          max={max}
          value={value || ''}
          onChange={handleChange}
        />
        {addon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{addon}</span>
          </div>
        )}
      </div>
    );
  };

  // Business-specific sections based on listing type
  const renderBusinessDetails = () => (
    <>
      <FormSection
        title="Business Information"
        icon={<Store className="h-5 w-5" />}
        description="Provide details about the business operations"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Business Category"
            name="businessCategory"
            error={errors.businessCategory}
          >
            <FormSelect
              options={[
                { value: '', label: 'Select a Category' },
                { value: 'retail', label: 'Retail' },
                { value: 'hospitality', label: 'Hospitality' },
                { value: 'service', label: 'Service' },
                { value: 'manufacturing', label: 'Manufacturing' },
                { value: 'technology', label: 'Technology' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'education', label: 'Education' },
                { value: 'other', label: 'Other' },
              ]}
              value={watch('businessCategory')}
              onChange={(value) => setValue('businessCategory', value)}
            />
          </FormField>
          <FormField
            label="Years Established"
            name="yearsEstablished"
            error={errors.yearsEstablished}
          >
            <NumberInput
              placeholder="e.g., 5"
              min={0}
              max={200}
              value={watch('yearsEstablished')}
              onChange={(value) => setValue('yearsEstablished', value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Number of Employees"
            name="employeeCount"
            error={errors.employeeCount}
          >
            <NumberInput
              placeholder="e.g., 10"
              min={0}
              max={9999}
              value={watch('employeeCount')}
              onChange={(value) => setValue('employeeCount', value)}
            />
          </FormField>
          <FormField
            label="Operating Hours"
            name="operatingHours"
            error={errors.operatingHours}
          >
            <FormSelect
              options={[
                { value: '', label: 'Select Operating Hours' },
                { value: 'business_hours', label: 'Standard Business Hours (9-5)' },
                { value: 'extended_hours', label: 'Extended Hours' },
                { value: '24_hours', label: '24 Hours' },
                { value: 'custom', label: 'Custom Hours' },
              ]}
              value={watch('operatingHours')}
              onChange={(value) => setValue('operatingHours', value)}
            />
          </FormField>
        </div>

        <FormField
          label="Reason for Sale"
          name="reasonForSale"
          error={errors.reasonForSale}
        >
          <FormTextarea
            placeholder="Explain why the business is being sold"
            rows={3}
            value={watch('reasonForSale')}
            onChange={(value) => setValue('reasonForSale', value)}
          />
        </FormField>
      </FormSection>

      <FormSection
        title="Financial Information"
        icon={<DollarSign className="h-5 w-5" />}
        description="Provide financial details about the business"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Asking Price"
            name="askingPrice"
            error={errors.askingPrice}
          >
            <FormCurrencyInput
              placeholder="Enter asking price"
              value={watch('askingPrice')}
              onChange={(value) => setValue('askingPrice', value)}
            />
          </FormField>
          <FormField
            label="Annual Revenue"
            name="annualRevenue"
            error={errors.annualRevenue}
          >
            <FormCurrencyInput
              placeholder="Enter annual revenue"
              value={watch('annualRevenue')}
              onChange={(value) => setValue('annualRevenue', value)}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Annual Profit"
            name="annualProfit"
            error={errors.annualProfit}
          >
            <FormCurrencyInput
              placeholder="Enter annual profit"
              value={watch('annualProfit')}
              onChange={(value) => setValue('annualProfit', value)}
            />
          </FormField>
          <FormField
            label="Inventory Value"
            name="inventoryValue"
            error={errors.inventoryValue}
          >
            <FormCurrencyInput
              placeholder="Enter inventory value"
              value={watch('inventoryValue')}
              onChange={(value) => setValue('inventoryValue', value)}
            />
          </FormField>
        </div>

        <FormField
          label="Financial Documentation Available"
          name="financialDocsAvailable"
          error={errors.financialDocsAvailable}
        >
          <FormCheckbox
            options={[
              { value: 'profit_loss', label: 'Profit & Loss Statements' },
              { value: 'tax_returns', label: 'Tax Returns' },
              { value: 'balance_sheets', label: 'Balance Sheets' },
              { value: 'cash_flow', label: 'Cash Flow Statements' },
              { value: 'sales_records', label: 'Sales Records' },
            ]}
            value={watch('financialDocsAvailable') || []}
            onChange={(values) => setValue('financialDocsAvailable', values)}
          />
        </FormField>
      </FormSection>
    </>
  );

  // Franchise-specific section
  const renderFranchiseDetails = () => (
    <FormSection
      title="Franchise Information"
      icon={<Trophy className="h-5 w-5" />}
      description="Provide details about the franchise opportunity"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Franchise Brand"
          name="franchiseBrand"
          error={errors.franchiseBrand}
        >
          <FormSelect
            options={[
              { value: '', label: 'Select a Brand' },
              { value: 'established', label: 'Established Brand' },
              { value: 'emerging', label: 'Emerging Brand' },
              { value: 'new', label: 'New Brand' },
            ]}
            value={watch('franchiseBrand')}
            onChange={(value) => setValue('franchiseBrand', value)}
          />
        </FormField>
        <FormField
          label="Initial Franchise Fee"
          name="franchiseFee"
          error={errors.franchiseFee}
        >
          <FormCurrencyInput
            placeholder="Enter franchise fee"
            value={watch('franchiseFee')}
            onChange={(value) => setValue('franchiseFee', value)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Royalty Fee Percentage"
          name="royaltyPercentage"
          error={errors.royaltyPercentage}
        >
          <NumberInput
            placeholder="e.g., 5"
            min={0}
            max={100}
            value={watch('royaltyPercentage')}
            onChange={(value) => setValue('royaltyPercentage', value)}
            addon="%"
          />
        </FormField>
        <FormField
          label="Contract Term (Years)"
          name="contractTerm"
          error={errors.contractTerm}
        >
          <NumberInput
            placeholder="e.g., 10"
            min={1}
            max={99}
            value={watch('contractTerm')}
            onChange={(value) => setValue('contractTerm', value)}
            addon="Years"
          />
        </FormField>
      </div>

      <FormField
        label="Training & Support Provided"
        name="trainingSupport"
        error={errors.trainingSupport}
      >
        <FormCheckbox
          options={[
            { value: 'initial_training', label: 'Initial Training' },
            { value: 'ongoing_training', label: 'Ongoing Training' },
            { value: 'marketing_support', label: 'Marketing Support' },
            { value: 'operational_support', label: 'Operational Support' },
            { value: 'technology_systems', label: 'Technology Systems' },
          ]}
          value={watch('trainingSupport') || []}
          onChange={(values) => setValue('trainingSupport', values)}
        />
      </FormField>
    </FormSection>
  );

  // Startup-specific section
  const renderStartupDetails = () => (
    <FormSection
      title="Startup Information"
      icon={<CalendarDays className="h-5 w-5" />}
      description="Provide details about the startup venture"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Startup Stage"
          name="startupStage"
          error={errors.startupStage}
        >
          <FormSelect
            options={[
              { value: '', label: 'Select a Stage' },
              { value: 'idea', label: 'Idea Stage' },
              { value: 'prototype', label: 'Prototype/MVP' },
              { value: 'pre_seed', label: 'Pre-Seed' },
              { value: 'seed', label: 'Seed' },
              { value: 'series_a', label: 'Series A' },
              { value: 'series_b', label: 'Series B or Later' },
              { value: 'profitable', label: 'Profitable' },
            ]}
            value={watch('startupStage')}
            onChange={(value) => setValue('startupStage', value)}
          />
        </FormField>
        <FormField
          label="Funding Raised To Date"
          name="fundingRaised"
          error={errors.fundingRaised}
        >
          <FormCurrencyInput
            placeholder="Enter amount raised"
            value={watch('fundingRaised')}
            onChange={(value) => setValue('fundingRaised', value)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Current Valuation"
          name="currentValuation"
          error={errors.currentValuation}
        >
          <FormCurrencyInput
            placeholder="Enter current valuation"
            value={watch('currentValuation')}
            onChange={(value) => setValue('currentValuation', value)}
          />
        </FormField>
        <FormField
          label="Monthly Burn Rate"
          name="burnRate"
          error={errors.burnRate}
        >
          <FormCurrencyInput
            placeholder="Enter monthly burn rate"
            value={watch('burnRate')}
            onChange={(value) => setValue('burnRate', value)}
          />
        </FormField>
      </div>

      <FormField
        label="Intellectual Property"
        name="intellectualProperty"
        error={errors.intellectualProperty}
      >
        <FormCheckbox
          options={[
            { value: 'patents', label: 'Patents' },
            { value: 'trademarks', label: 'Trademarks' },
            { value: 'copyrights', label: 'Copyrights' },
            { value: 'trade_secrets', label: 'Trade Secrets' },
            { value: 'none', label: 'None' },
          ]}
          value={watch('intellectualProperty') || []}
          onChange={(values) => setValue('intellectualProperty', values)}
        />
      </FormField>
    </FormSection>
  );

  // Investor-specific section
  const renderInvestorDetails = () => (
    <FormSection
      title="Investment Opportunity"
      icon={<Users className="h-5 w-5" />}
      description="Provide details about the investment opportunity"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Investment Type"
          name="investmentType"
          error={errors.investmentType}
        >
          <FormSelect
            options={[
              { value: '', label: 'Select Investment Type' },
              { value: 'equity', label: 'Equity Investment' },
              { value: 'debt', label: 'Debt Investment' },
              { value: 'convertible_note', label: 'Convertible Note' },
              { value: 'revenue_share', label: 'Revenue Share' },
              { value: 'partnership', label: 'Partnership' },
            ]}
            value={watch('investmentType')}
            onChange={(value) => setValue('investmentType', value)}
          />
        </FormField>
        <FormField
          label="Minimum Investment"
          name="minimumInvestment"
          error={errors.minimumInvestment}
        >
          <FormCurrencyInput
            placeholder="Enter minimum amount"
            value={watch('minimumInvestment')}
            onChange={(value) => setValue('minimumInvestment', value)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Expected ROI (%)"
          name="expectedRoi"
          error={errors.expectedRoi}
        >
          <NumberInput
            placeholder="e.g., 15"
            min={0}
            max={1000}
            value={watch('expectedRoi')}
            onChange={(value) => setValue('expectedRoi', value)}
            addon="%"
          />
        </FormField>
        <FormField
          label="Investment Term"
          name="investmentTerm"
          error={errors.investmentTerm}
        >
          <FormSelect
            options={[
              { value: '', label: 'Select Investment Term' },
              { value: 'short', label: 'Short Term (< 1 year)' },
              { value: 'medium', label: 'Medium Term (1-3 years)' },
              { value: 'long', label: 'Long Term (3-5 years)' },
              { value: 'very_long', label: 'Very Long Term (5+ years)' },
            ]}
            value={watch('investmentTerm')}
            onChange={(value) => setValue('investmentTerm', value)}
          />
        </FormField>
      </div>

      <FormField
        label="Risk Level"
        name="riskLevel"
        error={errors.riskLevel}
      >
        <FormRadio
          options={[
            { value: 'low', label: 'Low Risk' },
            { value: 'medium', label: 'Medium Risk' },
            { value: 'high', label: 'High Risk' },
            { value: 'very_high', label: 'Very High Risk' },
          ]}
          value={watch('riskLevel')}
          onChange={(value) => setValue('riskLevel', value)}
        />
      </FormField>
    </FormSection>
  );

  // Digital asset-specific section
  const renderDigitalAssetDetails = () => (
    <FormSection
      title="Digital Asset Information"
      icon={<DollarSign className="h-5 w-5" />}
      description="Provide details about the digital asset"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Digital Asset Type"
          name="digitalAssetType"
          error={errors.digitalAssetType}
        >
          <FormSelect
            options={[
              { value: '', label: 'Select Asset Type' },
              { value: 'website', label: 'Website' },
              { value: 'app', label: 'Mobile App' },
              { value: 'saas', label: 'SaaS Platform' },
              { value: 'ecommerce', label: 'E-commerce Store' },
              { value: 'blog', label: 'Blog/Content Site' },
              { value: 'domain', label: 'Domain Name' },
              { value: 'social_media', label: 'Social Media Account' },
              { value: 'other', label: 'Other Digital Asset' },
            ]}
            value={watch('digitalAssetType')}
            onChange={(value) => setValue('digitalAssetType', value)}
          />
        </FormField>
        <FormField
          label="Monthly Traffic"
          name="monthlyTraffic"
          error={errors.monthlyTraffic}
        >
          <NumberInput
            placeholder="e.g., 10000"
            min={0}
            value={watch('monthlyTraffic')}
            onChange={(value) => setValue('monthlyTraffic', value)}
            addon="visitors"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Monetization Method"
          name="monetizationMethod"
          error={errors.monetizationMethod}
        >
          <FormCheckbox
            options={[
              { value: 'advertising', label: 'Advertising' },
              { value: 'subscriptions', label: 'Subscriptions' },
              { value: 'ecommerce', label: 'E-commerce Sales' },
              { value: 'affiliate', label: 'Affiliate Marketing' },
              { value: 'leads', label: 'Lead Generation' },
              { value: 'donations', label: 'Donations' },
              { value: 'other', label: 'Other' },
            ]}
            value={watch('monetizationMethod') || []}
            onChange={(values) => setValue('monetizationMethod', values)}
          />
        </FormField>
        <FormField
          label="Platform/Technology"
          name="platform"
          error={errors.platform}
        >
          <FormSelect
            options={[
              { value: '', label: 'Select Platform' },
              { value: 'wordpress', label: 'WordPress' },
              { value: 'shopify', label: 'Shopify' },
              { value: 'wix', label: 'Wix' },
              { value: 'custom', label: 'Custom Development' },
              { value: 'react', label: 'React' },
              { value: 'angular', label: 'Angular' },
              { value: 'vue', label: 'Vue.js' },
              { value: 'ios', label: 'iOS' },
              { value: 'android', label: 'Android' },
              { value: 'other', label: 'Other' },
            ]}
            value={watch('platform')}
            onChange={(value) => setValue('platform', value)}
          />
        </FormField>
      </div>

      <FormField
        label="Additional Assets Included"
        name="additionalAssets"
        error={errors.additionalAssets}
      >
        <FormCheckbox
          options={[
            { value: 'source_code', label: 'Source Code' },
            { value: 'design_files', label: 'Design Files' },
            { value: 'customer_database', label: 'Customer Database' },
            { value: 'email_list', label: 'Email List' },
            { value: 'social_accounts', label: 'Social Media Accounts' },
            { value: 'content_library', label: 'Content Library' },
          ]}
          value={watch('additionalAssets') || []}
          onChange={(values) => setValue('additionalAssets', values)}
        />
      </FormField>
    </FormSection>
  );

  // Render different sections based on listing type
  const renderDetailsByType = () => {
    switch(listingType) {
      case 'business':
        return renderBusinessDetails();
      case 'franchise':
        return (
          <>
            {renderBusinessDetails()}
            {renderFranchiseDetails()}
          </>
        );
      case 'startup':
        return (
          <>
            {renderBusinessDetails()}
            {renderStartupDetails()}
          </>
        );
      case 'investor':
        return renderInvestorDetails();
      case 'digital_asset':
        return (
          <>
            {renderBusinessDetails()}
            {renderDigitalAssetDetails()}
          </>
        );
      default:
        return renderBusinessDetails();
    }
  };

  return (
    <div className="space-y-6">
      {renderDetailsByType()}
    </div>
  );
};

export default ListingDetails;