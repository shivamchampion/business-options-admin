import React, { useState } from 'react';
import { Upload, Grid, List, Search, Filter, Trash2, Download, Plus } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';
// import Pagination from '../../components/common/Pagination';

const MediaLibrary = () => {
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      name: 'business-hero-image.jpg',
      type: 'image',
      size: '1.2 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Admin User',
      uploadDate: '2025-02-10',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
      tags: ['hero', 'business'],
      usage: 'Homepage'
    },
    {
      id: 2,
      name: 'team-photo.jpg',
      type: 'image',
      size: '2.4 MB',
      dimensions: '2400x1600',
      uploadedBy: 'Admin User',
      uploadDate: '2025-02-12',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
      tags: ['team', 'people'],
      usage: 'About page'
    },
    {
      id: 3,
      name: 'intro-video.mp4',
      type: 'video',
      size: '24.7 MB',
      dimensions: '1920x1080',
      uploadedBy: 'Admin User',
      uploadDate: '2025-02-15',
      url: 'https://example.com/videos/intro.mp4',
      tags: ['intro', 'business'],
      usage: 'Homepage'
    },
    {
      id: 4,
      name: 'services-icon-1.svg',
      type: 'svg',
      size: '12 KB',
      dimensions: 'vector',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2025-02-18',
      url: 'https://example.com/images/services-icon-1.svg',
      tags: ['icon', 'services'],
      usage: 'Services page'
    },
    {
      id: 5,
      name: 'office-location.jpg',
      type: 'image',
      size: '1.8 MB',
      dimensions: '1600x1200',
      uploadedBy: 'Admin User',
      uploadDate: '2025-02-20',
      url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      tags: ['office', 'location'],
      usage: 'Contact page'
    },
    {
      id: 6,
      name: 'product-brochure.pdf',
      type: 'document',
      size: '3.2 MB',
      dimensions: 'N/A',
      uploadedBy: 'Sarah Johnson',
      uploadDate: '2025-02-22',
      url: 'https://example.com/documents/brochure.pdf',
      tags: ['brochure', 'document'],
      usage: 'Download section'
    },
  ]);
  
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Handle search and filtering
  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  
  // Handle item selection
  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  // Select all items on current page
  const toggleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map(item => item.id));
    }
  };
  
  // Get file icon based on type
  const getFileIcon = (type) => {
    switch(type) {
      case 'image':
        return <div className="bg-blue-100 text-blue-600 p-2 rounded">IMG</div>;
      case 'video':
        return <div className="bg-red-100 text-red-600 p-2 rounded">VID</div>;
      case 'document':
        return <div className="bg-amber-100 text-amber-600 p-2 rounded">DOC</div>;
      case 'svg':
        return <div className="bg-green-100 text-green-600 p-2 rounded">SVG</div>;
      default:
        return <div className="bg-gray-100 text-gray-600 p-2 rounded">FILE</div>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Media Library"
        description="Manage media assets for your website"
        action={<Button size="sm"><Upload className="h-4 w-4 mr-2" /> Upload Media</Button>}
      />
      
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search media..."
              className="pl-10 pr-4 py-2 w-full border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-2 border rounded-md appearance-none bg-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
              <option value="svg">SVG</option>
            </select>
          </div>
          
          <div className="border rounded-md flex">
            <button 
              className={`p-2 ${view === 'grid' ? 'bg-brand-blue text-white' : 'text-gray-500'}`}
              onClick={() => setView('grid')}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button 
              className={`p-2 ${view === 'list' ? 'bg-brand-blue text-white' : 'text-gray-500'}`}
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Selected Items Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-gray-50 p-2 rounded-md flex justify-between items-center">
          <span className="text-sm">{selectedItems.length} items selected</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      )}
      
      {/* Media Grid View */}
      {view === 'grid' && (
        currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentItems.map((item) => (
              <Card key={item.id} className={`overflow-hidden ${selectedItems.includes(item.id) ? 'ring-2 ring-brand-blue' : ''}`}>
                <div className="relative">
                  {item.type === 'image' && (
                    <img 
                      src={item.url} 
                      alt={item.name} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  {item.type !== 'image' && (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      {getFileIcon(item.type)}
                    </div>
                  )}
                  <div 
                    className="absolute top-2 right-2 h-5 w-5 bg-white rounded-full border flex items-center justify-center cursor-pointer"
                    onClick={() => toggleItemSelection(item.id)}
                  >
                    {selectedItems.includes(item.id) && (
                      <div className="h-3 w-3 bg-brand-blue rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium truncate" title={item.name}>{item.name}</h3>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{item.size}</span>
                    <span>{item.uploadDate}</span>
                  </div>
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No media items found.</p>
          </Card>
        )
      )}
      
      {/* Media List View */}
      {view === 'list' && (
        <Card className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                      onChange={toggleSelectAll}
                    />
                    <span className="ml-2 font-medium text-sm">Name</span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Size</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Uploaded</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Usage</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? currentItems.map((item) => (
                <tr key={item.id} className={selectedItems.includes(item.id) ? 'bg-blue-50' : ''}>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <input 
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                      />
                      <div className="ml-2 flex items-center">
                        {item.type === 'image' ? (
                          <img src={item.url} alt={item.name} className="h-8 w-8 object-cover rounded" />
                        ) : (
                          <div className="h-8 w-8 flex items-center justify-center">
                            {getFileIcon(item.type)}
                          </div>
                        )}
                        <span className="ml-2 truncate max-w-xs">{item.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm capitalize">{item.type}</td>
                  <td className="px-4 py-3 text-sm">{item.size}</td>
                  <td className="px-4 py-3 text-sm">{item.uploadDate}</td>
                  <td className="px-4 py-3 text-sm">{item.usage}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Download className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    No media items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      )}
      
      {/* Pagination */}
      {filteredMedia.length > itemsPerPage && (
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

export default MediaLibrary;
