import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import apiService from '../../api/apiService';
import { toast } from 'react-hot-toast';
import { HiShoppingBag, HiPencil, HiCheck, HiX, HiPlus } from 'react-icons/hi';
import { TableSkeleton } from '../../components/Skeletons';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        durationDays: '',
        dailyIncome: '',
        totalIncome: '',
        imageUrl: '',
        category: 'NORMAL'
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await apiService.product.getProducts();
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch products', error);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct) {
                await apiService.admin.updateProduct(currentProduct.id, formData);
                toast.success('Product updated successfully');
            } else {
                await apiService.admin.createProduct(formData);
                toast.success('Product created successfully');
            }
            setIsModalOpen(false);
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Failed to save product', error);
            toast.error('Failed to save product');
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price,
            durationDays: product.durationDays,
            dailyIncome: product.dailyIncome,
            totalIncome: product.totalIncome,
            imageUrl: product.imageUrl || '',
            category: product.category || 'NORMAL'
        });
        setIsModalOpen(true);
    };

    const handleToggleStatus = async (id) => {
        try {
            await apiService.admin.toggleProductStatus(id);
            toast.success('Product status updated');
            fetchProducts();
        } catch (error) {
            console.error('Failed to toggle status', error);
            toast.error('Failed to update status');
        }
    };

    const resetForm = () => {
        setCurrentProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            durationDays: '',
            dailyIncome: '',
            totalIncome: '',
            imageUrl: '',
            category: 'NORMAL'
        });
    };

    return (
        <AdminLayout title="Products Management">
            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">Manage investment products and plans</p>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="btn-primary flex items-center px-4 py-2"
                >
                    <HiPlus className="w-5 h-5 mr-2" />
                    Add Product
                </button>
            </div>

            {loading ? (
                <TableSkeleton rows={5} />
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-ivory border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Daily Income</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Total Income</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Duration</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-ivory transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-charcoal">{product.name}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-xs">{product.description}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-charcoal">
                                                {(!product.category || product.category === 'NORMAL') ? 'Plans' : product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono">₹{product.price}</td>
                                        <td className="px-6 py-4 font-mono text-green-600">+₹{product.dailyIncome}</td>
                                        <td className="px-6 py-4 font-mono text-gold font-bold">₹{product.totalIncome}</td>
                                        <td className="px-6 py-4">{product.durationDays} days</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.isActive
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}>
                                                {product.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <HiPencil className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleToggleStatus(product.id)}
                                                    className={`p-2 rounded-lg transition-colors ${product.isActive
                                                        ? 'text-red-600 hover:bg-red-50'
                                                        : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                    title={product.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    {product.isActive ? <HiX className="w-5 h-5" /> : <HiCheck className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {products.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No products found. Add one to get started.
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-charcoal">
                                {currentProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <HiX className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    >
                                        <option value="NORMAL">Plans</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        required
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Income (₹)</label>
                                    <input
                                        type="number"
                                        name="dailyIncome"
                                        required
                                        value={formData.dailyIncome}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Income (₹)</label>
                                    <input
                                        type="number"
                                        name="totalIncome"
                                        required
                                        value={formData.totalIncome}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Days)</label>
                                    <input
                                        type="number"
                                        name="durationDays"
                                        required
                                        value={formData.durationDays}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary px-6 py-2"
                                >
                                    {currentProduct ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminProducts;
