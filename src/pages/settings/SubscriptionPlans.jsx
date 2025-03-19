import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, Calendar, Info, DollarSign, Users, CreditCard, ArrowUp, Save } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Free',
      description: 'Basic features for small businesses just getting started',
      price: 0,
      billingCycle: 'monthly',
      features: [
        { name: 'Single listing', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Featured listings', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'Dedicated advisor', included: false },
      ],
      maxListings: 1,
      featuredListings: 0,
      mediaStorage: '100MB',
      supportLevel: 'email',
      active: true,
      popularPlan: false,
      color: 'gray',
      userCount: 156
    },
    {
      id: 2,
      name: 'Business',
      description: 'Everything needed for established businesses',
      price: 49.99,
      billingCycle: 'monthly',
      features: [
        { name: 'Up to 5 listings', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Featured listings', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: false },
        { name: 'Dedicated advisor', included: false },
      ],
      maxListings: 5,
      featuredListings: 1,
      mediaStorage: '1GB',
      supportLevel: 'priority-email',
      active: true,
      popularPlan: true,
      color: 'blue',
      userCount: 89
    },
    {
      id: 3,
      name: 'Professional',
      description: 'Advanced features for high-volume business transactions',
      price: 99.99,
      billingCycle: 'monthly',
      features: [
        { name: 'Unlimited listings', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Featured listings', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Dedicated advisor', included: true },
      ],
      maxListings: -1, // Unlimited
      featuredListings: 5,
      mediaStorage: '10GB',
      supportLevel: 'dedicated',
      active: true,
      popularPlan: false,
      color: 'purple',
      userCount: 42
    },
    {
      id: 4,
      name: 'Enterprise',
      description: 'Custom solution for large organizations with specific needs',
      price: 299.99,
      billingCycle: 'monthly',
      features: [
        { name: 'Unlimited listings', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Featured listings', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority support', included: true },
        { name: 'Dedicated advisor', included: true },
      ],
      maxListings: -1, // Unlimited
      featuredListings: -1, // Unlimited
      mediaStorage: '50GB',
      supportLevel: 'dedicated-manager',
      active: true,
      popularPlan: false,
      color: 'amber',
      userCount: 15
    },
  ]);
  
  const [editingPlan, setEditingPlan] = useState(null);
  const [showAddPlanForm, setShowAddPlanForm] = useState(false);
  
  // Handle editing a plan
  const handleEditPlan = (plan) => {
    setEditingPlan({ ...plan });
    setShowAddPlanForm(false);
  };
  
  // Handle saving a plan
  const handleSavePlan = () => {
    if (editingPlan) {
      const updatedPlans = plans.map(plan => 
        plan.id === editingPlan.id ? editingPlan : plan
      );
      setPlans(updatedPlans);
      setEditingPlan(null);
    }
  };
  
  // Handle adding a new plan
  const handleAddPlan = () => {
    setEditingPlan({
      id: plans.length + 1,
      name: '',
      description: '',
      price: 0,
      billingCycle: 'monthly',
      features: [
        { name: 'Single listing', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Featured listings', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'Dedicated advisor', included: false },
      ],
      maxListings: 1,
      featuredListings: 0,
      mediaStorage: '100MB',
      supportLevel: 'email',
      active: true,
      popularPlan: false,
      color: 'gray',
      userCount: 0
    });
    setShowAddPlanForm(true);
  };
  
  // Handle input changes for editing plan
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingPlan({
      ...editingPlan,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle feature toggle
  const handleFeatureToggle = (index) => {
    const updatedFeatures = [...editingPlan.features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      included: !updatedFeatures[index].included
    };
    
    setEditingPlan({
      ...editingPlan,
      features: updatedFeatures
    });
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Subscription Plans"
        description="Manage subscription plans for your marketplace"
        action={
          editingPlan ? (
            <Button onClick={handleSavePlan}>
              <Save className="h-4 w-4 mr-2" /> Save Plan
            </Button>
          ) : (
            <Button onClick={handleAddPlan}>
              <Plus className="h-4 w-4 mr-2" /> Add Plan
            </Button>
          )
        }
      />
      
      {/* Edit Plan Form */}
      {editingPlan && (
        <Card className="overflow-hidden">
          <div className="border-b px-4 py-3 bg-gray-50">
            <h3 className="font-medium">{showAddPlanForm ? 'Add New Plan' : 'Edit Plan'}</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingPlan.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={editingPlan.price}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                <select
                  name="billingCycle"
                  value={editingPlan.billingCycle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Listings</label>
                <input
                  type="number"
                  name="maxListings"
                  value={editingPlan.maxListings === -1 ? 'Unlimited' : editingPlan.maxListings}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id="unlimitedListings"
                    checked={editingPlan.maxListings === -1}
                    onChange={() => setEditingPlan({
                      ...editingPlan,
                      maxListings: editingPlan.maxListings === -1 ? 1 : -1
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="unlimitedListings" className="ml-2 block text-xs text-gray-500">
                    Unlimited
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Listings</label>
                <input
                  type="number"
                  name="featuredListings"
                  value={editingPlan.featuredListings === -1 ? 'Unlimited' : editingPlan.featuredListings}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    id="unlimitedFeatured"
                    checked={editingPlan.featuredListings === -1}
                    onChange={() => setEditingPlan({
                      ...editingPlan,
                      featuredListings: editingPlan.featuredListings === -1 ? 0 : -1
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="unlimitedFeatured" className="ml-2 block text-xs text-gray-500">
                    Unlimited
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media Storage</label>
                <input
                  type="text"
                  name="mediaStorage"
                  value={editingPlan.mediaStorage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="e.g. 1GB"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={editingPlan.description}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border rounded-md"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Level</label>
                <select
                  name="supportLevel"
                  value={editingPlan.supportLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="email">Email Support</option>
                  <option value="priority-email">Priority Email</option>
                  <option value="dedicated">Dedicated Support</option>
                  <option value="dedicated-manager">Dedicated Account Manager</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color Theme</label>
                <select
                  name="color"
                  value={editingPlan.color}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="gray">Gray</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="amber">Amber</option>
                  <option value="red">Red</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <div className="flex items-center mr-4 mb-2">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={editingPlan.active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                    Active
                  </label>
                </div>
                
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="popularPlan"
                    name="popularPlan"
                    checked={editingPlan.popularPlan}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="popularPlan" className="ml-2 block text-sm text-gray-700">
                    Popular Plan
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Plan Features</h4>
              <div className="space-y-2">
                {editingPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                    <span className="text-sm">{feature.name}</span>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleFeatureToggle(index)}
                        className={`inline-flex items-center justify-center h-5 w-5 rounded-full ${feature.included ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                      >
                        {feature.included && <Check className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
      
      {/* Plans List */}
      {!editingPlan && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`overflow-hidden ${plan.popularPlan ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popularPlan && (
                <div className="bg-blue-500 text-white text-center py-1 text-xs font-medium">
                  MOST POPULAR
                </div>
              )}
              <div className={`border-b p-4 ${plan.popularPlan ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{plan.name}</h3>
                  {plan.active ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-500">{plan.description}</div>
              </div>
              
              <div className="p-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="ml-1 text-sm text-gray-500">/{plan.billingCycle}</span>
                  )}
                </div>
                
                <div className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 rounded-full ${feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} flex items-center justify-center mt-0.5`}>
                        {feature.included ? <Check className="h-3 w-3" /> : null}
                      </div>
                      <span className={`ml-2 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{plan.userCount} users</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-3 w-3 mr-1" />
                    <span>{plan.maxListings === -1 ? 'Unlimited' : plan.maxListings} listings</span>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-2">
                  <button
                    className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => handleEditPlan(plan)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </button>
                  
                  {!plan.active && (
                    <button
                      className="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
          
          {/* Add Plan Card */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer h-[25rem]"
            onClick={handleAddPlan}
          >
            <div className="text-center">
              <Plus className="h-8 w-8 text-gray-400 mx-auto" />
              <span className="mt-2 block text-sm font-medium text-gray-500">Add New Plan</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Summary Stats */}
      {!editingPlan && (
        <div className="mt-8">
          <Card className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">Subscription Plans Overview</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You currently have {plans.filter(p => p.active).length} active plans with a total of {plans.reduce((sum, plan) => sum + plan.userCount, 0)} subscribed users.
                  The most popular plan is "{plans.sort((a, b) => b.userCount - a.userCount)[0].name}" with {plans.sort((a, b) => b.userCount - a.userCount)[0].userCount} subscribers.
                </p>
                <div className="mt-3">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                    View Subscription Analytics <ArrowUp className="inline-block h-3 w-3 ml-1 rotate-45" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
