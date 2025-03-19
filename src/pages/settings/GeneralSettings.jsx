import React, { useState } from 'react';
import { Save, Globe, Clock, PenTool, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

// Components
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const GeneralSettings = () => {
  // General site settings state
  const [settings, setSettings] = useState({
    siteName: 'Business Options',
    tagline: 'Your Marketplace for Business Buying and Selling',
    logo: '/assets/images/logo.svg', // Default logo path
    favicon: '/assets/images/favicon.ico', // Default favicon path
    adminEmail: 'admin@businessoptions.com',
    supportEmail: 'support@businessoptions.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, San Francisco, CA 94107',
    timeZone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    currency: 'USD',
    maintenanceMode: false,
    maintenanceMessage: 'Our site is currently undergoing scheduled maintenance. We\'ll be back shortly.',
    enableRegistration: true,
    enableContactForm: true,
    requireEmailVerification: true,
    enableBlog: true,
    enableTestimonials: true,
    facebookUrl: 'https://facebook.com/businessoptions',
    twitterUrl: 'https://twitter.com/businessoptions',
    linkedinUrl: 'https://linkedin.com/company/businessoptions',
    instagramUrl: 'https://instagram.com/businessoptions',
    googleAnalyticsId: 'UA-12345678-9'
  });
  
  // Site appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    fontFamily: 'Inter, sans-serif',
    headerLayout: 'centered',
    footerLayout: 'standard',
    buttonStyle: 'rounded',
    heroStyle: 'image-left',
    enableDarkMode: true,
    customCss: ''
  });
  
  // Handle input changes for general settings
  const handleSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle input changes for appearance settings
  const handleAppearanceChange = (e) => {
    const { name, value } = e.target;
    setAppearance({
      ...appearance,
      [name]: value
    });
  };
  
  // Mocked save function
  const handleSaveSettings = () => {
    // In a real implementation, this would send data to an API
    console.log('Saving settings:', { ...settings, ...appearance });
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="General Settings"
        description="Configure global settings for your application"
        action={
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        }
      />
      
      <div className="grid grid-cols-12 gap-6">
        {/* Main column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Site Information */}
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50">
              <h3 className="font-medium">Site Information</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    name="tagline"
                    value={settings.tagline}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="adminEmail"
                      value={settings.adminEmail}
                      onChange={handleSettingChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="supportEmail"
                      value={settings.supportEmail}
                      onChange={handleSettingChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="phone"
                    value={settings.phone}
                    onChange={handleSettingChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="address"
                    value={settings.address}
                    onChange={handleSettingChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </Card>
          
          {/* Localization */}
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50">
              <h3 className="font-medium">Localization</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Globe className="inline h-4 w-4 mr-1" />
                    Time Zone
                  </label>
                  <select
                    name="timeZone"
                    value={settings.timeZone}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                    <option value="Australia/Sydney">Sydney</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Date Format
                  </label>
                  <select
                    name="dateFormat"
                    value={settings.dateFormat}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                  <select
                    name="timeFormat"
                    value={settings.timeFormat}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="12">12-hour (1:30 PM)</option>
                    <option value="24">24-hour (13:30)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                    <option value="CAD">Canadian Dollar (C$)</option>
                    <option value="AUD">Australian Dollar (A$)</option>
                    <option value="JPY">Japanese Yen (¥)</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Site Features */}
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50">
              <h3 className="font-medium">Site Features</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableRegistration"
                    name="enableRegistration"
                    checked={settings.enableRegistration}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enableRegistration" className="ml-2 block text-sm text-gray-700">
                    Enable User Registration
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="requireEmailVerification"
                    name="requireEmailVerification"
                    checked={settings.requireEmailVerification}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-gray-700">
                    Require Email Verification
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableContactForm"
                    name="enableContactForm"
                    checked={settings.enableContactForm}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enableContactForm" className="ml-2 block text-sm text-gray-700">
                    Enable Contact Form
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableBlog"
                    name="enableBlog"
                    checked={settings.enableBlog}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enableBlog" className="ml-2 block text-sm text-gray-700">
                    Enable Blog
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableTestimonials"
                    name="enableTestimonials"
                    checked={settings.enableTestimonials}
                    onChange={handleSettingChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enableTestimonials" className="ml-2 block text-sm text-gray-700">
                    Enable Testimonials
                  </label>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Maintenance Mode */}
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50">
              <h3 className="font-medium">Maintenance Mode</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleSettingChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                  Enable Maintenance Mode
                </label>
              </div>
              
              {settings.maintenanceMode && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Message</label>
                  <textarea
                    name="maintenanceMessage"
                    value={settings.maintenanceMessage}
                    onChange={handleSettingChange}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-md"
                  ></textarea>
                  <p className="mt-1 text-sm text-amber-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> 
                    Note: When maintenance mode is active, only administrators can access the site.
                  </p>
                </div>
              )}
            </div>
          </Card>
          
          {/* Social Media */}
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50">
              <h3 className="font-medium">Social Media</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                  <input
                    type="url"
                    name="facebookUrl"
                    value={settings.facebookUrl}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                  <input
                    type="url"
                    name="twitterUrl"
                    value={settings.twitterUrl}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={settings.linkedinUrl}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                  <input
                    type="url"
                    name="instagramUrl"
                    value={settings.instagramUrl}
                    onChange={handleSettingChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Appearance */}
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50">
              <h3 className="font-medium">Appearance</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <select
                  name="theme"
                  value={appearance.theme}
                  onChange={handleAppearanceChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System Preference)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <PenTool className="inline h-4 w-4 mr-1" />
                  Primary Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    name="primaryColor"
                    value={appearance.primaryColor}
                    onChange={handleAppearanceChange}
                    className="h-8 w-8 rounded-md border cursor-pointer mr-2"
                  />
                  <input
                    type="text"
                    name="primaryColor"
                    value={appearance.primaryColor}
                    onChange={handleAppearanceChange}
                    className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    name="secondaryColor"
                    value={appearance.secondaryColor}
                    onChange={handleAppearanceChange}
                    className="h-8 w-8 rounded-md border cursor-pointer mr-2"
                  />
                  <input
                    type="text"
                    name="secondaryColor"
                    value={appearance.secondaryColor}
                    onChange={handleAppearanceChange}
                    className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                <select
                  name="fontFamily"
                  value={appearance.fontFamily}
                  onChange={handleAppearanceChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Inter, sans-serif">Inter</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="Lato, sans-serif">Lato</option>
                  <option value="Poppins, sans-serif">Poppins</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Style</label>
                <select
                  name="buttonStyle"
                  value={appearance.buttonStyle}
                  onChange={handleAppearanceChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="rounded">Rounded</option>
                  <option value="square">Square</option>
                  <option value="pill">Pill</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableDarkMode"
                  name="enableDarkMode"
                  checked={appearance.enableDarkMode}
                  onChange={(e) => setAppearance({...appearance, enableDarkMode: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableDarkMode" className="ml-2 block text-sm text-gray-700">
                  Allow Dark Mode Toggle
                </label>
              </div>
            </div>
          </Card>
          
          {/* Analytics */}
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50">
              <h3 className="font-medium">Analytics</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Analytics ID</label>
                <input
                  type="text"
                  name="googleAnalyticsId"
                  value={settings.googleAnalyticsId}
                  onChange={handleSettingChange}
                  placeholder="UA-XXXXXXXXX-X"
                  className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter your tracking ID to enable Google Analytics
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
