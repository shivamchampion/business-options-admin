import React, { useState } from 'react';
import { Save, Mail, Edit, Clipboard, Check, Clock, ArrowUpDown, Tag, Plus, Trash2 } from 'lucide-react';

// Components
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const EmailTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  const [templates, setTemplates] = useState([
    {
      id: 'welcome',
      name: 'Welcome Email',
      subject: 'Welcome to Business Options!',
      content: '<h1>Welcome to Business Options!</h1><p>Thank you for joining our platform. We\'re excited to have you as part of our community of business buyers and sellers.</p><p>Here are a few things you can do to get started:</p><ul><li>Complete your profile</li><li>Browse available listings</li><li>Set up your preferences</li></ul><p>If you have any questions, feel free to contact our support team.</p><p>Best regards,<br>The Business Options Team</p>',
      variables: ['{{user_name}}', '{{login_link}}', '{{support_email}}'],
      lastEdited: '2025-01-15',
      editor: 'Admin User',
      category: 'user',
      status: 'active'
    },
    {
      id: 'password-reset',
      name: 'Password Reset',
      subject: 'Reset Your Business Options Password',
      content: '<h1>Password Reset Request</h1><p>We received a request to reset your password. If you didn\'t make this request, you can safely ignore this email.</p><p>To reset your password, click the link below:</p><p><a href="{{reset_link}}" style="background-color: #1e40af; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a></p><p>This link will expire in 24 hours.</p><p>Best regards,<br>The Business Options Team</p>',
      variables: ['{{user_name}}', '{{reset_link}}', '{{expires_in}}'],
      lastEdited: '2025-01-18',
      editor: 'Admin User',
      category: 'user',
      status: 'active'
    },
    {
      id: 'listing-approved',
      name: 'Listing Approved',
      subject: 'Your Business Listing Has Been Approved',
      content: '<h1>Congratulations!</h1><p>Your business listing <strong>{{listing_name}}</strong> has been reviewed and approved by our team.</p><p>Your listing is now live and visible to potential buyers on our platform.</p><p>View your listing: <a href="{{listing_link}}">{{listing_name}}</a></p><p>Best regards,<br>The Business Options Team</p>',
      variables: ['{{user_name}}', '{{listing_name}}', '{{listing_link}}', '{{listing_id}}'],
      lastEdited: '2025-01-22',
      editor: 'Admin User',
      category: 'listing',
      status: 'active'
    },
    {
      id: 'new-message',
      name: 'New Message Notification',
      subject: 'You have a new message on Business Options',
      content: '<h1>New Message Received</h1><p>You have received a new message from <strong>{{sender_name}}</strong> regarding <strong>{{subject}}</strong>.</p><p>Message preview:</p><blockquote style="border-left: 4px solid #e5e7eb; padding-left: 16px; color: #4b5563;">{{message_preview}}</blockquote><p><a href="{{message_link}}" style="background-color: #1e40af; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">View Full Message</a></p><p>Best regards,<br>The Business Options Team</p>',
      variables: ['{{recipient_name}}', '{{sender_name}}', '{{subject}}', '{{message_preview}}', '{{message_link}}'],
      lastEdited: '2025-01-25',
      editor: 'Sarah Johnson',
      category: 'messaging',
      status: 'active'
    },
    {
      id: 'payment-receipt',
      name: 'Payment Receipt',
      subject: 'Receipt for your payment to Business Options',
      content: '<h1>Payment Receipt</h1><p>Dear {{user_name}},</p><p>Thank you for your payment. This email confirms that your payment has been processed successfully.</p><p><strong>Payment Details:</strong></p><ul><li><strong>Date:</strong> {{payment_date}}</li><li><strong>Amount:</strong> {{payment_amount}}</li><li><strong>Transaction ID:</strong> {{transaction_id}}</li><li><strong>Payment Method:</strong> {{payment_method}}</li></ul><p>If you have any questions about this payment, please contact our support team at {{support_email}}.</p><p>Best regards,<br>The Business Options Team</p>',
      variables: ['{{user_name}}', '{{payment_date}}', '{{payment_amount}}', '{{transaction_id}}', '{{payment_method}}', '{{support_email}}'],
      lastEdited: '2025-02-01',
      editor: 'Admin User',
      category: 'billing',
      status: 'active'
    },
    {
      id: 'listing-inquiry',
      name: 'Listing Inquiry',
      subject: 'New inquiry about your business listing',
      content: '<h1>New Listing Inquiry</h1><p>Dear {{recipient_name}},</p><p>You have received a new inquiry about your listing <strong>{{listing_name}}</strong> from a potential buyer.</p><p><strong>Inquiry Details:</strong></p><p><strong>From:</strong> {{sender_name}}<br><strong>Email:</strong> {{sender_email}}<br><strong>Phone:</strong> {{sender_phone}}</p><blockquote style="border-left: 4px solid #e5e7eb; padding-left: 16px; color: #4b5563;">{{inquiry_message}}</blockquote><p><a href="{{response_link}}" style="background-color: #1e40af; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Respond to Inquiry</a></p><p>Best regards,<br>The Business Options Team</p>',
      variables: ['{{recipient_name}}', '{{listing_name}}', '{{listing_id}}', '{{sender_name}}', '{{sender_email}}', '{{sender_phone}}', '{{inquiry_message}}', '{{response_link}}'],
      lastEdited: '2025-02-05',
      editor: 'Sarah Johnson',
      category: 'listing',
      status: 'active'
    },
    {
      id: 'subscription-expiry',
      name: 'Subscription Expiry Warning',
      subject: 'Your Business Options subscription is expiring soon',
      content: '<h1>Subscription Expiring Soon</h1><p>Dear {{user_name}},</p><p>This is a friendly reminder that your <strong>{{plan_name}}</strong> subscription will expire on <strong>{{expiry_date}}</strong>.</p><p>To ensure uninterrupted access to our services, please renew your subscription before the expiry date.</p><p><a href="{{renewal_link}}" style="background-color: #1e40af; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Renew Subscription</a></p><p>If you have any questions or need assistance, please contact our support team.</p><p>Best regards,<br>The Business Options Team</p>',
      variables: ['{{user_name}}', '{{plan_name}}', '{{expiry_date}}', '{{days_remaining}}', '{{renewal_link}}', '{{support_email}}'],
      lastEdited: '2025-02-08',
      editor: 'Admin User',
      category: 'billing',
      status: 'active'
    },
    {
      id: 'advisor-assigned',
      name: 'Business Advisor Assigned',
      subject: 'Your Business Advisor has been assigned',
      content: '<h1>Meet Your Business Advisor</h1><p>Dear {{user_name}},</p><p>We\'re pleased to inform you that a business advisor has been assigned to assist you throughout your journey with us.</p><p><strong>Your Advisor:</strong></p><p><strong>Name:</strong> {{advisor_name}}<br><strong>Specialization:</strong> {{advisor_specialization}}<br><strong>Contact:</strong> {{advisor_email}}</p><p>Your advisor will be reaching out to schedule an initial consultation within the next 48 hours. They\'ll help you with listing optimization, potential buyer screening, and negotiation guidance.</p><p><a href="{{advisor_profile_link}}" style="background-color: #1e40af; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">View Advisor Profile</a></p><p>Best regards,<br>The Business Options Team</p>',
      variables: ['{{user_name}}', '{{advisor_name}}', '{{advisor_specialization}}', '{{advisor_email}}', '{{advisor_profile_link}}'],
      lastEdited: '2025-02-12',
      editor: 'Michael Thompson',
      category: 'advisors',
      status: 'draft'
    },
  ]);
  
  // Current template being edited
  const [currentTemplate, setCurrentTemplate] = useState(() => {
    return templates.find(template => template.id === selectedTemplate);
  });
  
  // Filter state
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Apply filters
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    return matchesCategory && matchesStatus;
  });
  
  // Handle selecting a template
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    setCurrentTemplate(templates.find(template => template.id === templateId));
  };
  
  // Handle saving the template
  const handleSaveTemplate = () => {
    // Update the template in the templates array
    const updatedTemplates = templates.map(template => 
      template.id === currentTemplate.id ? 
        {...currentTemplate, lastEdited: new Date().toISOString().split('T')[0], editor: 'Admin User'} : 
        template
    );
    
    setTemplates(updatedTemplates);
    
    // Show success message
    alert('Template saved successfully!');
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTemplate({
      ...currentTemplate,
      [name]: value
    });
  };
  
  // Unique categories
  const categories = ['all', ...new Set(templates.map(template => template.category))];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Email Templates"
        description="Manage and customize email templates for various notifications"
        action={
          <Button onClick={handleSaveTemplate}>
            <Save className="h-4 w-4 mr-2" /> Save Template
          </Button>
        }
      />
      
      <div className="grid grid-cols-12 gap-6">
        {/* Templates List */}
        <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-6">
          <Card className="overflow-hidden">
            <div className="border-b px-4 py-3 bg-gray-50 flex justify-between items-center">
              <h3 className="font-medium">Email Templates</h3>
              <button className="text-gray-500 hover:text-gray-700">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select
                    className="w-full pl-8 pr-3 py-1.5 border rounded-md text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category === 'all' ? 'All Categories' : 
                          category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <Tag className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
                </div>
                
                <div className="relative flex-1">
                  <select
                    className="w-full pl-8 pr-3 py-1.5 border rounded-md text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ArrowUpDown className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div 
                  key={template.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedTemplate === template.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{template.subject}</p>
                    </div>
                    <span 
                      className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium
                        ${template.status === 'active' ? 'bg-green-100 text-green-800' : 
                          template.status === 'draft' ? 'bg-amber-100 text-amber-800' : 
                          'bg-gray-100 text-gray-800'}`}
                    >
                      {template.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="inline-flex items-center text-xs text-gray-500">
                      <Tag className="h-3 w-3 mr-1" /> 
                      {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                    </span>
                    <span className="inline-flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" /> 
                      {template.lastEdited}
                    </span>
                  </div>
                </div>
              ))}
              
              {filteredTemplates.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  <p>No templates match your filters.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Template Editor */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-6">
          {currentTemplate ? (
            <>
              <Card className="overflow-hidden">
                <div className="border-b px-4 py-3 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-medium flex items-center">
                    <Edit className="h-4 w-4 mr-2" /> 
                    Edit Template
                  </h3>
                  <div className="flex items-center gap-3">
                    <button 
                      className="text-gray-500 hover:text-blue-500"
                      onClick={() => navigator.clipboard.writeText(currentTemplate.id)}
                      title="Copy template ID"
                    >
                      <Clipboard className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-red-500"
                      title="Delete template"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                      <input
                        type="text"
                        name="name"
                        value={currentTemplate.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        name="category"
                        value={currentTemplate.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="user">User</option>
                        <option value="listing">Listing</option>
                        <option value="messaging">Messaging</option>
                        <option value="billing">Billing</option>
                        <option value="advisors">Advisors</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="subject"
                        value={currentTemplate.subject}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={currentTemplate.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
                    <textarea
                      name="content"
                      value={currentTemplate.content}
                      onChange={handleInputChange}
                      rows="12"
                      className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-500">
                      Use HTML formatting for rich text emails.
                    </p>
                  </div>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden">
                  <div className="border-b px-4 py-3 bg-gray-50">
                    <h3 className="font-medium">Available Variables</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-3">
                      Use these variables in your template. They will be replaced with actual values when the email is sent.
                    </p>
                    <div className="space-y-2">
                      {currentTemplate.variables.map((variable, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-2 bg-gray-50 rounded border"
                        >
                          <code className="text-xs font-mono">{variable}</code>
                          <button 
                            className="text-gray-500 hover:text-blue-500 text-xs"
                            onClick={() => navigator.clipboard.writeText(variable)}
                            title="Copy variable"
                          >
                            <Clipboard className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="border-b px-4 py-3 bg-gray-50">
                    <h3 className="font-medium">Preview</h3>
                  </div>
                  <div className="p-4">
                    <div className="border rounded-md p-4 bg-white">
                      <div className="mb-2 pb-2 border-b">
                        <p className="text-sm font-medium">Subject: {currentTemplate.subject}</p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Mail className="h-3 w-3 mr-1" /> 
                          From: Business Options &lt;no-reply@businessoptions.com&gt;
                        </div>
                      </div>
                      <div 
                        className="text-sm email-preview"
                        dangerouslySetInnerHTML={{ __html: currentTemplate.content }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500 flex items-center">
                      <Check className="h-3 w-3 mr-1 text-green-500" />
                      Sample preview with placeholder variables
                    </p>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Mail className="h-10 w-10 text-gray-400 mx-auto" />
                <p className="mt-2 text-gray-500">Select a template to edit</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;
