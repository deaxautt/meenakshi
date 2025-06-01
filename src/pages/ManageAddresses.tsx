import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Check, AlertCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface Address {
  id: string;
  contactPerson: string;
  contactNumber: string;
  addressLine1: string;
  addressLine2?: string;
  landmark: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const ManageAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [useSelfContact, setUseSelfContact] = useState(false);

  const [formData, setFormData] = useState<Address>({
    id: '',
    contactPerson: '',
    contactNumber: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });

  const resetForm = () => {
    setFormData({
      id: '',
      contactPerson: '',
      contactNumber: '',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
    setUseSelfContact(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.contactPerson || !formData.contactNumber || !formData.addressLine1 || 
        !formData.landmark || !formData.city || !formData.state || !formData.zipCode) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    // Validate contact number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      setErrorMessage('Please enter a valid 10-digit contact number');
      return;
    }

    // Validate zipcode
    const zipRegex = /^[0-9]{6}$/;
    if (!zipRegex.test(formData.zipCode)) {
      setErrorMessage('Please enter a valid 6-digit zipcode');
      return;
    }

    try {
      if (editingAddressId) {
        // Update existing address
        setAddresses(addresses.map(addr => 
          addr.id === editingAddressId ? { ...formData, id: editingAddressId } : addr
        ));
        setSuccessMessage('Address updated successfully');
      } else {
        // Add new address
        const newAddress = { ...formData, id: Date.now().toString() };
        setAddresses([...addresses, newAddress]);
        setSuccessMessage('Address added successfully');
      }

      // If this is the first address or marked as default, update other addresses
      if (formData.isDefault || addresses.length === 0) {
        setAddresses(prev => prev.map(addr => ({
          ...addr,
          isDefault: addr.id === (editingAddressId || newAddress.id)
        })));
      }

      resetForm();
      setIsAddingAddress(false);
      setEditingAddressId(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to save address. Please try again.');
    }
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
    setErrorMessage('');
    // Check if the contact details match the user's details
    setUseSelfContact(
      address.contactPerson === user?.full_name &&
      address.contactNumber === user?.mobile
    );
  };

  const handleDelete = async (id: string) => {
    try {
      setAddresses(addresses.filter(addr => addr.id !== id));
      setSuccessMessage('Address deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to delete address');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      setAddresses(addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      })));
      setSuccessMessage('Default address updated');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to update default address');
    }
  };

  const handleUseSelfContact = (checked: boolean) => {
    setUseSelfContact(checked);
    if (checked && user) {
      setFormData(prev => ({
        ...prev,
        contactPerson: user.full_name || '',
        contactNumber: user.mobile || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        contactPerson: '',
        contactNumber: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Manage Addresses</h1>
            {!isAddingAddress && (
              <button
                onClick={() => {
                  setIsAddingAddress(true);
                  resetForm();
                  setEditingAddressId(null);
                  setErrorMessage('');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus size={20} />
                Add New Address
              </button>
            )}
          </div>

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg"
            >
              <Check size={20} />
              {successMessage}
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg"
            >
              <AlertCircle size={20} />
              {errorMessage}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {isAddingAddress ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-6">
                  {editingAddressId ? 'Edit Address' : 'Add New Address'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Details Section */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                      <input
                        type="checkbox"
                        checked={useSelfContact}
                        onChange={(e) => handleUseSelfContact(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-gray-700 flex items-center gap-2">
                        <User size={16} />
                        Use my contact details
                      </span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                          disabled={useSelfContact}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                          placeholder="10-digit mobile number"
                          disabled={useSelfContact}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        value={formData.addressLine1}
                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        value={formData.addressLine2}
                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Landmark *
                      </label>
                      <input
                        type="text"
                        value={formData.landmark}
                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
                        placeholder="6-digit pincode"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isDefault}
                          onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700">Set as default address</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingAddress(false);
                        resetForm();
                        setEditingAddressId(null);
                        setErrorMessage('');
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      {editingAddressId ? 'Update Address' : 'Save Address'}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {addresses.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                    <h2 className="text-xl font-medium text-gray-900 mb-2">No addresses yet</h2>
                    <p className="text-gray-500 mb-4">Add your first delivery address</p>
                  </div>
                ) : (
                  addresses.map((address) => (
                    <motion.div
                      key={address.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              {address.contactPerson}
                            </h3>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600">{address.contactNumber}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(address)}
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(address.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 text-gray-600">
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>Landmark: {address.landmark}</p>
                        <p>{address.city}, {address.state} - {address.zipCode}</p>
                      </div>

                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="mt-4 text-primary hover:text-primary-dark text-sm"
                        >
                          Set as Default
                        </button>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;