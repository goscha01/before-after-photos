import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Clock, ArrowRight, Search, Home } from 'lucide-react';
import { toast } from 'react-toastify';
import Container, { ScreenContainer } from '@components/Layout/Container';
import Header from '@components/Layout/Header';
import Button from '@components/UI/Button';
import StatusMessage from '@components/UI/StatusMessage';
import useAppStore from '@store/useAppStore';
import { VALIDATION_RULES } from '@utils/constants';

const PropertySelectionScreen = () => {
  const navigate = useNavigate();
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Zustand store
  const {
    isAuthenticated,
    cleaner,
    properties,
    addProperty,
    updatePropertyLastUsed,
    setCurrentProperty,
    getPhotoCount
  } = useAppStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Filter properties based on search
  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort properties by last used (most recent first)
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const aTime = new Date(a.lastUsed || a.createdAt).getTime();
    const bTime = new Date(b.lastUsed || b.createdAt).getTime();
    return bTime - aTime;
  });

  // Handle property selection
  const handlePropertySelect = (property) => {
    setCurrentProperty(property);
    updatePropertyLastUsed(property.id);
    navigate(`/capture/${property.id}`);
  };

  // Handle adding new property
  const handleAddProperty = (propertyData) => {
    const newProperty = addProperty(propertyData);
    setShowAddProperty(false);
    handlePropertySelect(newProperty);
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <ScreenContainer>
      <Header
        title="Select Property"
        subtitle={`Welcome back, ${cleaner?.name}`}
      />

      <Container className="flex-1">
        {/* Search and Add section */}
        <div className="py-4 space-y-4">
          {/* Search input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Add property button */}
          <Button
            variant="outline"
            size="medium"
            icon={Plus}
            onClick={() => setShowAddProperty(true)}
            fullWidth
          >
            Add New Property
          </Button>
        </div>

        {/* Properties list */}
        <div className="space-y-4 pb-6">
          {sortedProperties.length === 0 ? (
            <EmptyState
              hasSearch={searchQuery.length > 0}
              onAddProperty={() => setShowAddProperty(true)}
            />
          ) : (
            sortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                photoCount={getPhotoCount(property.id)}
                onSelect={() => handlePropertySelect(property)}
              />
            ))
          )}
        </div>
      </Container>

      {/* Add property modal */}
      {showAddProperty && (
        <AddPropertyModal
          onAdd={handleAddProperty}
          onCancel={() => setShowAddProperty(false)}
        />
      )}
    </ScreenContainer>
  );
};

const PropertyCard = ({ property, photoCount, onSelect }) => {
  const lastUsedDate = new Date(property.lastUsed || property.createdAt);
  const isRecent = Date.now() - lastUsedDate.getTime() < 24 * 60 * 60 * 1000; // 24 hours

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-primary hover:shadow-md transition-all"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {/* Property name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {property.name || 'Unnamed Property'}
          </h3>

          {/* Address */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{property.address}</span>
          </div>

          {/* Last used and photo count */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>
                {isRecent ? 'Today' : lastUsedDate.toLocaleDateString()}
              </span>
            </div>

            {photoCount.total > 0 && (
              <div className="flex items-center gap-2">
                <span>{photoCount.total} photos</span>
                <span>•</span>
                <span>{photoCount.complete} rooms complete</span>
              </div>
            )}
          </div>
        </div>

        {/* Arrow icon */}
        <div className="ml-3 flex-shrink-0">
          <ArrowRight size={20} className="text-gray-400" />
        </div>
      </div>

      {/* Progress indicator */}
      {photoCount.rooms > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round((photoCount.complete / photoCount.rooms) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.round((photoCount.complete / photoCount.rooms) * 100)}%`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ hasSearch, onAddProperty }) => {
  if (hasSearch) {
    return (
      <div className="text-center py-12">
        <Search size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No properties found
        </h3>
        <p className="text-gray-500 mb-6">
          Try adjusting your search terms
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Home size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No properties yet
      </h3>
      <p className="text-gray-500 mb-6">
        Add your first property to start documenting your cleaning work
      </p>
      <Button
        variant="primary"
        icon={Plus}
        onClick={onAddProperty}
      >
        Add Your First Property
      </Button>
    </div>
  );
};

const AddPropertyModal = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Property name is required';
    } else if (formData.name.length < VALIDATION_RULES.PROPERTY_NAME.MIN_LENGTH) {
      newErrors.name = `Name must be at least ${VALIDATION_RULES.PROPERTY_NAME.MIN_LENGTH} characters`;
    } else if (formData.name.length > VALIDATION_RULES.PROPERTY_NAME.MAX_LENGTH) {
      newErrors.name = `Name must be no more than ${VALIDATION_RULES.PROPERTY_NAME.MAX_LENGTH} characters`;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.length < VALIDATION_RULES.PROPERTY_ADDRESS.MIN_LENGTH) {
      newErrors.address = `Address must be at least ${VALIDATION_RULES.PROPERTY_ADDRESS.MIN_LENGTH} characters`;
    } else if (formData.address.length > VALIDATION_RULES.PROPERTY_ADDRESS.MAX_LENGTH) {
      newErrors.address = `Address must be no more than ${VALIDATION_RULES.PROPERTY_ADDRESS.MAX_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      onAdd({
        name: formData.name.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim()
      });

      toast.success('Property added successfully!');
    } catch (error) {
      console.error('Failed to add property:', error);
      toast.error('Failed to add property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add New Property
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Property name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Main Street Apartment"
                className={`
                  w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.name ? 'border-red-300' : 'border-gray-300'}
                `}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street, City, State"
                className={`
                  w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                  ${errors.address ? 'border-red-300' : 'border-gray-300'}
                `}
                disabled={isSubmitting}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any special notes about this property..."
                rows="3"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isSubmitting}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Add Property
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// CSS styles (following the same pattern as other components)
const styles = `
  /* Modal styles */
  .fixed { position: fixed; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .z-50 { z-index: 50; }

  /* Background opacity */
  .bg-opacity-50 { background-color: rgba(0, 0, 0, 0.5); }

  /* Max height */
  .max-h-\\[90vh\\] { max-height: 90vh; }

  /* Overflow */
  .overflow-y-auto { overflow-y: auto; }

  /* Additional styles would continue here... */
`;

if (typeof document !== 'undefined' && !document.getElementById('property-selection-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'property-selection-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default PropertySelectionScreen;