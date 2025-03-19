import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';

const Faqs = () => {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: 'What is Business Options?',
      answer: 'Business Options is a platform connecting business sellers with potential buyers and investors, streamlining the process of business acquisition.',
      category: 'General',
      isExpanded: false
    },
    {
      id: 2,
      question: 'How do I list my business for sale?',
      answer: 'You can list your business by creating an account, selecting "List a Business" from your dashboard, and following the step-by-step process to provide details about your business.',
      category: 'Listings',
      isExpanded: false
    },
    {
      id: 3,
      question: 'What fees are associated with using the platform?',
      answer: 'We offer different subscription tiers with varying features. Basic listing is free, while premium listings with enhanced visibility and tools are available for a monthly fee.',
      category: 'Pricing',
      isExpanded: false
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const toggleFaq = (id) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isExpanded: !faq.isExpanded } : faq
    ));
  };
  
  const categories = ['All', 'General', 'Listings', 'Pricing', 'Advisors', 'Legal'];
  
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="FAQs Management"
        description="Manage frequently asked questions displayed on the website"
        action={<Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add New FAQ</Button>}
      />
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="pl-10 pr-4 py-2 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <select
          className="px-3 py-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      
      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(faq => (
            <Card key={faq.id} className="overflow-hidden">
              <div className="p-4 cursor-pointer hover:bg-gray-50 flex items-start justify-between"
                   onClick={() => toggleFaq(faq.id)}>
                <div>
                  <h3 className="font-medium text-lg">{faq.question}</h3>
                  <span className="text-xs px-2 py-0.5 bg-light-blue rounded-full">{faq.category}</span>
                </div>
                <div className="flex items-center">
                  <button className="text-gray-500 hover:text-brand-blue mr-2">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-500 hover:text-destructive mr-4">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {faq.isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>
              
              {faq.isExpanded && (
                <div className="p-4 pt-0 border-t">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No FAQs found matching your search criteria.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Faqs;
