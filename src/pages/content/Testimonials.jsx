import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Star, Filter } from 'lucide-react';

// Components
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
// import Pagination from '../../components/common/Pagination';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'John Smith',
      company: 'Coastal Café',
      role: 'Owner',
      content: 'Business Options helped me sell my café quickly and for a great price. The whole process was smooth and professional.',
      rating: 5,
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'published',
      businessType: 'Food & Beverage',
      date: '2025-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'TechNow',
      role: 'Founder',
      content: 'As a tech entrepreneur looking to exit my startup, I found the perfect buyer through Business Options. Their platform connected me with serious investors who understood my industry.',
      rating: 4,
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'published',
      businessType: 'Technology',
      date: '2025-02-03'
    },
    {
      id: 3,
      name: 'Michael Davis',
      company: 'Urban Fitness',
      role: 'Director',
      content: 'The Business Options team was incredibly helpful throughout the listing and selling process. Their guidance on valuation was spot on.',
      rating: 5,
      imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
      status: 'pending',
      businessType: 'Health & Fitness',
      date: '2025-02-28'
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          testimonial.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || testimonial.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Testimonials"
        description="Manage customer testimonials displayed on the website"
        action={<Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add Testimonial</Button>}
      />
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search testimonials..."
            className="pl-10 pr-4 py-2 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="px-3 py-2 border rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTestimonials.length > 0 ? (
          filteredTestimonials.map(testimonial => (
            <Card key={testimonial.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${testimonial.status === 'published' ? 'bg-green-100 text-green-800' : testimonial.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                      {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700">"{testimonial.content}"</p>
                </div>
                
                <div className="mt-4 pt-3 border-t flex justify-between items-center">
                  <span className="text-xs text-gray-500">{testimonial.businessType} • {new Date(testimonial.date).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-2">
            <Card className="p-8 text-center">
              <p className="text-gray-500">No testimonials found matching your search criteria.</p>
            </Card>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredTestimonials.length > 0 && (
        <div className="flex justify-center mt-6">
          {/* <Pagination 
            currentPage={currentPage} 
            totalPages={3} 
            onPageChange={setCurrentPage} 
          /> */}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
