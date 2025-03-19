import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Search, AlertTriangle, Info, Check, RefreshCw, Download, Filter } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    level: 'all',
    startDate: '',
    endDate: '',
    keyword: ''
  });
  
  // Generate mock log data
  useEffect(() => {
    const logTypes = ['info', 'warning', 'error', 'success'];
    const components = ['Authentication', 'Database', 'API', 'Email Service', 'Payment Gateway', 'File Storage', 'User Management', 'Listing Management'];
    const actions = [
      'User login attempt',
      'Password reset',
      'Database query executed',
      'API request processed',
      'Email sent',
      'Payment processed',
      'File uploaded',
      'User created',
      'Listing published',
      'Role permission changed',
      'System configuration updated',
      'Backup completed',
      'Cache cleared',
      'Session expired',
      'Rate limit exceeded'
    ];
    
    const mockLogs = Array.from({ length: 100 }, (_, i) => {
      const type = logTypes[Math.floor(Math.random() * logTypes.length)];
      const component = components[Math.floor(Math.random() * components.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
      randomDate.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
      
      return {
        id: i + 1,
        timestamp: randomDate,
        level: type,
        component,
        message: `${action} ${type === 'error' ? 'failed' : type === 'warning' ? 'completed with warnings' : 'completed successfully'}`,
        details: type === 'error' ? `Error code: ERR-${Math.floor(Math.random() * 10000)}` : 
                 type === 'warning' ? 'Warning: Operation took longer than expected' : 
                 'IP: 192.168.1.' + Math.floor(Math.random() * 255),
        user: Math.random() > 0.3 ? `user${Math.floor(Math.random() * 100)}@example.com` : 'system'
      };
    });
    
    // Sort logs by timestamp (newest first)
    mockLogs.sort((a, b) => b.timestamp - a.timestamp);
    
    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };
  
  // Apply filters to logs
  const filteredLogs = logs.filter(log => {
    // Filter by level
    if (filter.level !== 'all' && log.level !== filter.level) {
      return false;
    }
    
    // Filter by date range
    if (filter.startDate && new Date(log.timestamp) < new Date(filter.startDate)) {
      return false;
    }
    if (filter.endDate) {
      const endDate = new Date(filter.endDate);
      endDate.setHours(23, 59, 59);
      if (new Date(log.timestamp) > endDate) {
        return false;
      }
    }
    
    // Filter by keyword
    if (filter.keyword && !(
      log.message.toLowerCase().includes(filter.keyword.toLowerCase()) ||
      log.component.toLowerCase().includes(filter.keyword.toLowerCase()) ||
      log.details.toLowerCase().includes(filter.keyword.toLowerCase()) ||
      log.user.toLowerCase().includes(filter.keyword.toLowerCase())
    )) {
      return false;
    }
    
    return true;
  });
  
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // Get icon for log level
  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Get background color for log level
  const getLevelBackground = (level) => {
    switch (level) {
      case 'error':
        return 'bg-red-50 border-red-100';
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'info':
        return 'bg-blue-50 border-blue-100';
      case 'success':
        return 'bg-green-50 border-green-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };
  
  // Handle refresh logs
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  // Handle export logs
  const handleExport = () => {
    alert('Logs would be exported as CSV in a real implementation');
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="System Logs"
        description="View and monitor system activity logs"
        action={
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" /> Export Logs
            </Button>
          </div>
        }
      />
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Log Level</label>
            <select
              name="level"
              value={filter.level}
              onChange={handleFilterChange}
              className="w-full sm:w-40 px-3 py-2 border rounded-md"
            >
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="success">Success</option>
            </select>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="date"
                name="startDate"
                value={filter.startDate}
                onChange={handleFilterChange}
                className="w-full sm:w-40 pl-10 pr-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="date"
                name="endDate"
                value={filter.endDate}
                onChange={handleFilterChange}
                className="w-full sm:w-40 pl-10 pr-3 py-2 border rounded-md"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="keyword"
                value={filter.keyword}
                onChange={handleFilterChange}
                placeholder="Search logs by keyword..."
                className="w-full pl-10 pr-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div>
            <Filter className="h-4 w-4 inline-block mr-1" />
            {filteredLogs.length} logs found
          </div>
          <div className="flex items-center">
            <button 
              className="text-blue-600 hover:text-blue-800"
              onClick={() => setFilter({
                level: 'all',
                startDate: '',
                endDate: '',
                keyword: ''
              })}
            >
              Clear filters
            </button>
          </div>
        </div>
      </Card>
      
      {/* Logs */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          filteredLogs.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No logs matching your filters
            </div>
          ) : (
            filteredLogs.map(log => (
              <div 
                key={log.id} 
                className={`border rounded-md overflow-hidden ${getLevelBackground(log.level)}`}
              >
                <div className="p-4">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div className="flex items-center space-x-2">
                      {getLevelIcon(log.level)}
                      <span className="font-medium capitalize">{log.level}</span>
                      <span className="text-gray-600">|</span>
                      <span className="text-gray-600">{log.component}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(log.timestamp)}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-gray-800">{log.message}</p>
                    <p className="mt-1 text-sm text-gray-500">{log.details}</p>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    <span>User: {log.user}</span>
                    <span className="ml-4">Log ID: {log.id}</span>
                  </div>
                </div>
              </div>
            ))
          )
        )}
      </div>
      
      {/* Pagination */}
      {!loading && filteredLogs.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(20, filteredLogs.length)}</span> of <span className="font-medium">{filteredLogs.length}</span> logs
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded-md bg-gray-50 text-gray-600 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600 font-medium">
              1
            </button>
            {filteredLogs.length > 20 && (
              <>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-gray-600">
                  2
                </button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-gray-600">
                  3
                </button>
              </>
            )}
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50 text-gray-600" disabled={filteredLogs.length <= 20}>
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* System Health Card */}
      <Card className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Check className="h-5 w-5 text-green-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">System Health Status</h3>
            <p className="mt-1 text-sm text-gray-500">
              All systems are operating normally. Last system check was performed {formatDate(new Date(Date.now() - 1000 * 60 * 30))}.
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-green-50 rounded-md">
                <div className="text-xs text-gray-500">Error Rate (24h)</div>
                <div className="mt-1 font-medium">0.02%</div>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="text-xs text-gray-500">Avg. Response Time</div>
                <div className="mt-1 font-medium">187ms</div>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="text-xs text-gray-500">Server Uptime</div>
                <div className="mt-1 font-medium">99.99%</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemLogs;
