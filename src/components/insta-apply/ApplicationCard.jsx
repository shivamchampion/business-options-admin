import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Building, 
  ExternalLink, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatRelativeTime } from '../../utils/formatters';

const ApplicationCard = ({ application, processed = false }) => {
  // Function to get status badge type based on the application status
  const getStatusBadge = (status) => {
    if (processed) {
      switch (status) {
        case 'approved':
          return <StatusBadge status="approved" type="application" />;
        case 'rejected':
          return <StatusBadge status="rejected" type="application" />;
        case 'cancelled':
          return <StatusBadge status="cancelled" type="application" />;
        default:
          return <StatusBadge status={status} type="application" />;
      }
    } else {
      return <StatusBadge status={application.status} type="application" />;
    }
  };

  // Function to get status icon based on the application status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-error" />;
      case 'cancelled':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-md bg-light-blue flex items-center justify-center text-brand-blue mr-4">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dark-gray">
                {application.businessName}
              </h3>
              <div className="flex flex-wrap items-center text-sm text-gray gap-x-4 gap-y-1 mt-1">
                <span className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  {application.businessType}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {application.location}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            {getStatusBadge(application.status)}
            <span className="text-sm text-gray mt-2">
              ID: {application.id}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* Applicant Information */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-dark-gray">Applicant</h4>
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 text-gray mr-2" />
              <span>{application.applicantName}</span>
            </div>
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 text-gray mr-2" />
              <a href={`mailto:${application.applicantEmail}`} className="text-brand-blue hover:underline">
                {application.applicantEmail}
              </a>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 text-gray mr-2" />
              <a href={`tel:${application.phone}`} className="text-brand-blue hover:underline">
                {application.phone}
              </a>
            </div>
          </div>

          {/* Submission Details */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-dark-gray">Submission Details</h4>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 text-gray mr-2" />
              <span>
                Submitted: {formatDate(application.submittedDate, 'dd MMM yyyy')}
              </span>
            </div>
            {processed && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-gray mr-2" />
                <span>
                  Processed: {formatDate(application.processedDate, 'dd MMM yyyy')}
                </span>
              </div>
            )}
            <div className="flex items-center text-sm">
              <UserCheck className="h-4 w-4 text-gray mr-2" />
              <span>
                Assigned to: {application.assignedTo || 'Unassigned'}
              </span>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="space-y-3 flex flex-col justify-between">
            {processed && (
              <div className="flex items-center text-sm">
                {getStatusIcon(application.status)}
                <span className="ml-2">
                  {application.status === 'approved' ? 'Approved' : 
                   application.status === 'rejected' ? 'Rejected' : 
                   application.status === 'cancelled' ? 'Cancelled' : 'Processed'}
                </span>
              </div>
            )}
            <div className="flex justify-end mt-auto">
              <Link 
                to={`/applications/${application.id}`}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-brand-blue bg-light-blue hover:bg-opacity-80"
              >
                View Details
                <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;