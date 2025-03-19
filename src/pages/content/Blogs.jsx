import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Calendar, Filter, Tag, UserCircle, ArrowUp, ArrowDown } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
// import Pagination from '../../components/common/Pagination';

const Blogs = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Top 10 Tips When Selling Your Business',
      slug: 'top-10-tips-selling-business',
      status: 'published',
      category: 'Business Selling',
      author: 'Robert Davis',
      publishDate: '2025-01-15',
      tags: ['selling tips', 'business valuation', 'preparation'],
      views: 1243,
      commentCount: 8
    },
    {
      id: 2,
      title: 'How to Value Your Small Business: A Comprehensive Guide',
      slug: 'how-to-value-small-business-guide',
      status: 'published',
      category: 'Business Valuation',
      author: 'Jennifer Wilson',
      publishDate: '2025-01-22',
      tags: ['valuation', 'small business', 'financial planning'],
      views: 987,
      commentCount: 12
    },
    {
      id: 3,
      title: 'Finding the Perfect Business to Buy: 5 Essential Steps',
      slug: 'finding-perfect-business-buy-steps',
      status: 'published',
      category: 'Business Buying',
      author: 'Michael Thompson',
      publishDate: '2025-01-28',
      tags: ['buying tips', 'due diligence', 'market research'],
      views: 876,
      commentCount: 6
    },
    {
      id: 4,
      title: 'The Importance of Due Diligence When Acquiring a Business',
      slug: 'importance-due-diligence-acquiring-business',
      status: 'published',
      category: 'Business Buying',
      author: 'Jennifer Wilson',
      publishDate: '2025-02-05',
      tags: ['due diligence', 'risk management', 'acquisition'],
      views: 745,
      commentCount: 4
    },
    {
      id: 5,
      title: 'Preparing Your Business for Sale: Maximizing Value',
      slug: 'preparing-business-sale-maximizing-value',
      status: 'published',
      category: 'Business Selling',
      author: 'Robert Davis',
      publishDate: '2025-02-10',
      tags: ['exit strategy', 'business value', 'selling preparation'],
      views: 1102,
      commentCount: 15
    },
    {
      id: 6,
      title: 'Negotiation Tactics for Business Buyers',
      slug: 'negotiation-tactics-business-buyers',
      status: 'published',
      category: 'Business Buying',
      author: 'Sarah Johnson',
      publishDate: '2025-02-18',
      tags: ['negotiation', 'buying strategy', 'deal making'],
      views: 834,
      commentCount: 9
    },
    {
      id: 7,
      title: 'Understanding Business Broker Fees and Commissions',
      slug: 'understanding-business-broker-fees-commissions',
      status: 'draft',
      category: 'Industry Insights',
      author: 'Michael Thompson',
      publishDate: null,
      tags: ['broker fees', 'commissions', 'service costs'],
      views: 0,
      commentCount: 0
    },
    {
      id: 8,
      title: 'Key Financial Metrics Every Business Seller Should Know',
      slug: 'key-financial-metrics-business-seller-know',
      status: 'draft',
      category: 'Business Selling',
      author: 'Jennifer Wilson',
      publishDate: null,
      tags: ['financial metrics', 'business health', 'accounting'],
      views: 0,
      commentCount: 0
    },
    {
      id: 9,
      title: 'Post-Acquisition Integration: Best Practices',
      slug: 'post-acquisition-integration-best-practices',
      status: 'scheduled',
      category: 'Business Buying',
      author: 'Robert Davis',
      publishDate: '2025-03-01',
      tags: ['acquisition', 'integration', 'business transition'],
      views: 0,
      commentCount: 0
    },
    {
      id: 10,
      title: 'The Role of Business Advisors in Mergers and Acquisitions',
      slug: 'role-business-advisors-mergers-acquisitions',
      status: 'scheduled',
      category: 'Industry Insights',
      author: 'Sarah Johnson',
      publishDate: '2025-03-05',
      tags: ['advisors', 'M&A', 'professional services'],
      views: 0,
      commentCount: 0
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Apply filters
  const filteredBlogs = blogs
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0);
        const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortBy === 'views') {
        return sortDirection === 'asc' ? a.views - b.views : b.views - a.views;
      } else if (sortBy === 'comments') {
        return sortDirection === 'asc' ? a.commentCount - b.commentCount : b.commentCount - a.commentCount;
      }
      return 0;
    });
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  
  // Get unique categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];
  
  // Handle sort
  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to desc when changing fields
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Blog Posts"
        description="Manage your blog content and publications"
        action={<Button size="sm"><Plus className="h-4 w-4 mr-2" /> Create Post</Button>}
      />
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search blog posts..."
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
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <select
            className="px-3 py-2 border rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category === 'all' ? 'all' : category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Blog Posts Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    <span>Published</span>
                    {sortBy === 'date' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp className="h-3 w-3 ml-1" /> : 
                        <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('views')}
                >
                  <div className="flex items-center">
                    <span>Views</span>
                    {sortBy === 'views' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp className="h-3 w-3 ml-1" /> : 
                        <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('comments')}
                >
                  <div className="flex items-center">
                    <span>Comments</span>
                    {sortBy === 'comments' && (
                      sortDirection === 'asc' ? 
                        <ArrowUp className="h-3 w-3 ml-1" /> : 
                        <ArrowDown className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium">{blog.title}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <UserCircle className="h-3 w-3" />
                          <span>{blog.author}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {blog.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${blog.status === 'published' ? 'bg-green-100 text-green-800' : 
                            blog.status === 'draft' ? 'bg-amber-100 text-amber-800' : 
                            blog.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`}
                      >
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        {blog.publishDate ? (
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                            {blog.publishDate}
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        {blog.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        {blog.commentCount}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
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
                    No blog posts found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Pagination */}
      {filteredBlogs.length > itemsPerPage && (
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

export default Blogs;
