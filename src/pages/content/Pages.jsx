import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Calendar, Filter } from 'lucide-react';

// Components
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
// import Pagination from '../../components/common/Pagination';

const Pages = () => {
  const [pages, setPages] = useState([
    {
      id: 1,
      title: 'Home',
      slug: 'home',
      status: 'published',
      updatedAt: '2025-01-15',
      updatedBy: 'Admin User',
      sections: 8,
      type: 'core'
    },
    {
      id: 2,
      title: 'About Us',
      slug: 'about-us',
      status: 'published',
      updatedAt: '2025-01-20',
      updatedBy: 'Admin User',
      sections: 5,
      type: 'core'
    },
    {
      id: 3,
      title: 'Services',
      slug: 'services',
      status: 'published',
      updatedAt: '2025-01-22',
      updatedBy: 'Admin User',
      sections: 6,
      type: 'core'
    },
    {
      id: 4,
      title: 'How It Works',
      slug: 'how-it-works',
      status: 'published',
      updatedAt: '2025-01-25',
      updatedBy: 'Admin User',
      sections: 4,
      type: 'core'
    },
    {
      id: 5,
      title: 'FAQs',
      slug: 'faqs',
      status: 'published',
      updatedAt: '2025-01-28',
      updatedBy: 'Sarah Johnson',
      sections: 3,
      type: 'core'
    },
    {
      id: 6,
      title: 'Contact Us',
      slug: 'contact-us',
      status: 'published',
      updatedAt: '2025-02-01',
      updatedBy: 'Admin User',
      sections: 3,
      type: 'core'
    },
    {
      id: 7,
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      status: 'published',
      updatedAt: '2025-02-10',
      updatedBy: 'Admin User',
      sections: 5,
      type: 'legal'
    },
    {
      id: 8,
      title: 'Terms of Service',
      slug: 'terms-of-service',
      status: 'published',
      updatedAt: '2025-02-10',
      updatedBy: 'Admin User',
      sections: 7,
      type: 'legal'
    },
    {
      id: 9,
      title: 'Seller Success Stories',
      slug: 'seller-success-stories',
      status: 'draft',
      updatedAt: '2025-02-15',
      updatedBy: 'Sarah Johnson',
      sections: 4,
      type: 'marketing'
    },
    {
      id: 10,
      title: 'Buyer Resources',
      slug: 'buyer-resources',
      status: 'draft',
      updatedAt: '2025-02-18',
      updatedBy: 'Sarah Johnson',
      sections: 0,
      type: 'marketing'
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Apply filters
  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    const matchesType = typeFilter === 'all' || page.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Pages"
        description="Manage website pages and content"
        action={<Button size="sm"><Plus className="h-4 w-4 mr-2" /> Create Page</Button>}
      />
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search pages..."
            className="pl-10 pr-4 py-2 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="px-3 py-2 border rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <select
            className="px-3 py-2 border rounded-md"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="core">Core</option>
            <option value="marketing">Marketing</option>
            <option value="legal">Legal</option>
          </select>
        </div>
      </div>
      
      {/* Pages Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sections</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium">{page.title}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600 font-mono">{page.slug}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${page.type === 'core' ? 'bg-blue-100 text-blue-800' : 
                            page.type === 'marketing' ? 'bg-purple-100 text-purple-800' : 
                            'bg-gray-100 text-gray-800'}`}
                      >
                        {page.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${page.status === 'published' ? 'bg-green-100 text-green-800' : 
                            page.status === 'draft' ? 'bg-amber-100 text-amber-800' : 
                            'bg-gray-100 text-gray-800'}`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">{page.sections}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          {page.updatedAt}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">by {page.updatedBy}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-500">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-500">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No pages found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Pagination */}
      {filteredPages.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          {/* <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          /> */}
        </div>
      )}
    </div>
  );
};

export default Pages;
