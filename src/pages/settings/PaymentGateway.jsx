import React, { useState } from 'react';
import { Save, CreditCard, Lock, Check, AlertCircle, Shield, DollarSign, Info } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const PaymentGateway = () => {
  const [activeTab, setActiveTab] = useState('stripe');
  
  // Stripe gateway settings
  const [stripeSettings, setStripeSettings] = useState({
    enabled: true,
    testMode: true,
    publishableKey: 'pk_test_51MzY...',
    secretKey: 'sk_test_51MzY...',
    webhookSecret: 'whsec_...',
    allowCreditCards: true,
    allowDebitCards: true,
    statementDescriptor: 'Business Options',
  });
  
  // PayPal gateway settings
  const [paypalSettings, setPaypalSettings] = useState({
    enabled: false,
    testMode: true,
    clientId: 'AZDxjD...',
    clientSecret: 'EGDxjD...',
    webhookId: 'WH-...',
  });
  
  // Bank transfer settings
  const [bankSettings, setBankSettings] = useState({
    enabled: true,
    accountName: 'Business Options Inc.',
    accountNumber: '1234567890',
    routingNumber: '021000021',
    bankName: 'Chase Bank',
    instructions: 'Please include your invoice number in the transfer description.',
  });
  
  // Handle input changes for Stripe settings
  const handleStripeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStripeSettings({
      ...stripeSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle input changes for PayPal settings
  const handlePaypalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaypalSettings({
      ...paypalSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle input changes for bank settings
  const handleBankChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBankSettings({
      ...bankSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle save settings
  const handleSaveSettings = () => {
    // In a real implementation, this would send data to an API
    console.log('Saving payment gateway settings:', {
      stripe: stripeSettings,
      paypal: paypalSettings,
      bank: bankSettings
    });
    alert('Payment gateway settings saved successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Payment Gateway"
        description="Configure payment processing for your business"
        action={
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" /> Save Settings
          </Button>
        }
      />
      
      {/* Payment Gateway Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'stripe' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('stripe')}
        >
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Stripe
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'paypal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('paypal')}
        >
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            PayPal
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'bank' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('bank')}
        >
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Bank Transfer
          </div>
        </button>
      </div>
      
      {/* Stripe Settings */}
      {activeTab === 'stripe' && (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50 flex justify-between items-center">
              <h3 className="font-medium">Stripe Configuration</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stripeEnabled"
                  name="enabled"
                  checked={stripeSettings.enabled}
                  onChange={handleStripeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="stripeEnabled" className="ml-2 block text-sm text-gray-700">
                  Enable Stripe
                </label>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded border border-blue-100">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-blue-700">
                  Stripe is a popular payment gateway that allows you to accept credit card payments directly on your site.
                </p>
              </div>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="stripeTestMode"
                  name="testMode"
                  checked={stripeSettings.testMode}
                  onChange={handleStripeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="stripeTestMode" className="ml-2 block text-sm text-gray-700">
                  Test Mode
                </label>
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                  No real charges
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publishable Key</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="publishableKey"
                      value={stripeSettings.publishableKey}
                      onChange={handleStripeChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-md font-mono text-sm"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {stripeSettings.testMode ? 'Use your test publishable key' : 'Use your live publishable key'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="password"
                      name="secretKey"
                      value={stripeSettings.secretKey}
                      onChange={handleStripeChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-md font-mono text-sm"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {stripeSettings.testMode ? 'Use your test secret key' : 'Use your live secret key'}
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Webhook Secret</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    name="webhookSecret"
                    value={stripeSettings.webhookSecret}
                    onChange={handleStripeChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md font-mono text-sm"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Used to verify the authenticity of webhook events from Stripe
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statement Descriptor</label>
                  <input
                    type="text"
                    name="statementDescriptor"
                    value={stripeSettings.statementDescriptor}
                    onChange={handleStripeChange}
                    maxLength="22"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    How it appears on customer's credit card statement (max 22 characters)
                  </p>
                </div>
                
                <div className="flex items-end pb-1.5">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="allowCreditCards"
                      name="allowCreditCards"
                      checked={stripeSettings.allowCreditCards}
                      onChange={handleStripeChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowCreditCards" className="ml-2 block text-sm text-gray-700">
                      Credit Cards
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowDebitCards"
                      name="allowDebitCards"
                      checked={stripeSettings.allowDebitCards}
                      onChange={handleStripeChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowDebitCards" className="ml-2 block text-sm text-gray-700">
                      Debit Cards
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Stripe Checkout Integration</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your Stripe integration is ready to use with Checkout. This provides a secure, Stripe-hosted payment page for your customers.
                </p>
                <div className="mt-3">
                  <a href="https://dashboard.stripe.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-500">
                    Open Stripe Dashboard →
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* PayPal Settings */}
      {activeTab === 'paypal' && (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50 flex justify-between items-center">
              <h3 className="font-medium">PayPal Configuration</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="paypalEnabled"
                  name="enabled"
                  checked={paypalSettings.enabled}
                  onChange={handlePaypalChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="paypalEnabled" className="ml-2 block text-sm text-gray-700">
                  Enable PayPal
                </label>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded border border-blue-100">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-blue-700">
                  PayPal allows your customers to pay using their PayPal account or credit/debit cards without sharing financial information.
                </p>
              </div>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="paypalTestMode"
                  name="testMode"
                  checked={paypalSettings.testMode}
                  onChange={handlePaypalChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="paypalTestMode" className="ml-2 block text-sm text-gray-700">
                  Sandbox Mode
                </label>
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                  Testing environment
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="clientId"
                      value={paypalSettings.clientId}
                      onChange={handlePaypalChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-md font-mono text-sm"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {paypalSettings.testMode ? 'Use your sandbox client ID' : 'Use your live client ID'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="password"
                      name="clientSecret"
                      value={paypalSettings.clientSecret}
                      onChange={handlePaypalChange}
                      className="w-full pl-10 pr-3 py-2 border rounded-md font-mono text-sm"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {paypalSettings.testMode ? 'Use your sandbox client secret' : 'Use your live client secret'}
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Webhook ID</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="webhookId"
                    value={paypalSettings.webhookId}
                    onChange={handlePaypalChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md font-mono text-sm"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  For receiving notifications about payment events
                </p>
              </div>
            </div>
          </Card>
          
          {!paypalSettings.enabled && (
            <div className="p-4 border-l-4 border-amber-400 bg-amber-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-amber-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    PayPal gateway is currently disabled. Enable it to allow customers to pay with PayPal.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Bank Transfer Settings */}
      {activeTab === 'bank' && (
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50 flex justify-between items-center">
              <h3 className="font-medium">Bank Transfer Configuration</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="bankEnabled"
                  name="enabled"
                  checked={bankSettings.enabled}
                  onChange={handleBankChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="bankEnabled" className="ml-2 block text-sm text-gray-700">
                  Enable Bank Transfer
                </label>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded border border-blue-100">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-blue-700">
                  Bank transfer allows customers to pay directly to your bank account. Payments will need to be manually verified.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
                  <input
                    type="text"
                    name="accountName"
                    value={bankSettings.accountName}
                    onChange={handleBankChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={bankSettings.bankName}
                    onChange={handleBankChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={bankSettings.accountNumber}
                    onChange={handleBankChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                  <input
                    type="text"
                    name="routingNumber"
                    value={bankSettings.routingNumber}
                    onChange={handleBankChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Instructions</label>
                <textarea
                  name="instructions"
                  value={bankSettings.instructions}
                  onChange={handleBankChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md"
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">
                  These instructions will be shown to customers who choose bank transfer as their payment method.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Manual Verification Required</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Bank transfers require manual verification. You'll need to check your bank account for incoming transfers and mark orders as paid once payment is confirmed.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
