import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ListingForm from '@/components/listings/ListingForm';
import { PageHeader } from '@/components/layout/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const ListingCreate = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Check user authentication and permissions
    if (!authLoading) {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please login to create a listing",
          variant: "destructive",
        });
        navigate('/login', { state: { returnUrl: '/listings/create' } });
        return;
      }

      // Check if user has create listing permission
      const hasPermission = user.permissions?.listings?.create;
      if (!hasPermission) {
        toast({
          title: "Permission denied",
          description: "You don't have permission to create listings",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }

      setInitialLoading(false);
    }
  }, [user, authLoading, navigate, toast]);

  // If user navigates away, show confirmation dialog
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (initialLoading || authLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader
        title="Create New Listing"
        description="Create a new listing in a few simple steps"
        actions={
          <Button variant="outline" onClick={() => navigate('/listings')}>
            Cancel
          </Button>
        }
      />
      
      <div className="mt-6">
        <ListingForm 
          userId={user.uid} 
          onComplete={(listingId) => {
            toast({
              title: "Listing created successfully",
              description: "Your listing has been created and is pending review",
            });
            navigate(`/listings/${listingId}`);
          }}
        />
      </div>
    </div>
  );
};

export default ListingCreate;