import api from './axios.config';

export const userService = {
    // Get user profile
    getProfile: async () => {
        return await api.get('/users/profile');
    },

    // Update profile
    updateProfile: async (fullName, email) => {
        return await api.put('/users/profile', null, {
            params: { fullName, email }
        });
    },

    // Get wallet info
    getWallet: async () => {
        return await api.get('/users/wallet');
    },

    // Get team info
    getTeam: async () => {
        return await api.get('/users/team');
    },
};

export const walletService = {
    // Get wallet info (delegates to user endpoint for consistency)
    getWallet: async () => {
        return await api.get('/users/wallet');
    },

    // Initiate recharge
    initiateRecharge: async (amount, paymentMethod = 'UPI') => {
        return await api.post('/wallet/recharge', {
            amount,
            paymentMethod,
        });
    },

    // Complete recharge
    completeRecharge: async (transactionId, paymentId) => {
        return await api.post('/wallet/recharge/complete', null, {
            params: { transactionId, paymentId }
        });
    },

    // Request withdrawal
    requestWithdrawal: async (amount) => {
        return await api.post('/wallet/withdraw', { amount });
    },

    // Get transactions
    getTransactions: async () => {
        return await api.get('/wallet/transactions');
    },
};

export const productService = {
    // Get all products
    getProducts: async () => {
        return await api.get('/products');
    },

    // Get product by ID
    getProductById: async (id) => {
        return await api.get(`/products/${id}`);
    },
};

export const subscriptionService = {
    // Get user subscriptions
    getSubscriptions: async () => {
        return await api.get('/subscriptions');
    },

    // Invest in product
    investInProduct: async (productId, amount) => {
        return await api.post(`/subscriptions/${productId}/invest`, null, {
            params: { amount }
        });
    },

    // Pay monthly installment
    payInstallment: async (subscriptionId) => {
        return await api.post(`/subscriptions/${subscriptionId}/pay-installment`);
    },

    // Get subscription details
    getSubscriptionDetails: async (id) => {
        return await api.get(`/subscriptions/${id}`);
    },

    // Manual trigger for daily payouts (for testing/admin use)
    processDailyPayouts: async () => {
        return await api.post('/subscriptions/process-payouts');
    },
};

export const bankService = {
    // Get bank details
    getBankDetails: async () => {
        return await api.get('/bank');
    },

    // Add/update bank details
    saveBankDetails: async (bankDetails) => {
        return await api.post('/bank', bankDetails);
    },
};

export const giftCodeService = {
    // Redeem gift code
    redeemGiftCode: async (code) => {
        return await api.post('/gift/redeem', null, {
            params: { code }
        });
    },
};

export const checkInService = {
    // Perform check-in
    performCheckIn: async () => {
        return await api.post('/checkin');
    },

    // Get check-in status
    getCheckInStatus: async () => {
        return await api.get('/checkin/status');
    },
};

export const adminService = {
    // Get dashboard stats
    getDashboardStats: async () => {
        return await api.get('/admin/dashboard');
    },

    // Get all users
    getAllUsers: async () => {
        return await api.get('/admin/users');
    },

    // Toggle user active/inactive status
    toggleUserStatus: async (userId, active) => {
        return await api.put(`/admin/users/${userId}/status`, null, {
            params: { active }
        });
    },

    // Get user's referral team tree
    getUserTree: async (userId) => {
        return await api.get(`/admin/user-tree/${userId}`);
    },

    // Verify bank details
    verifyBankDetails: async (id, status, remarks) => {
        return await api.put(`/admin/bank/${id}/verify`, null, {
            params: { status, remarks }
        });
    },

    // Create gift code
    createGiftCode: async (amount, expiryDate, maxRedemptions) => {
        return await api.post('/admin/gift-codes', null, {
            params: { amount, expiryDate, maxRedemptions }
        });
    },

    // Get all gift codes
    getAllGiftCodes: async () => {
        return await api.get('/admin/gift-codes');
    },

    // Approve withdrawal
    approveWithdrawal: async (id, remarks) => {
        return await api.put(`/wallet/withdraw/${id}/approve`, null, {
            params: { remarks }
        });
    },

    // Reject withdrawal
    rejectWithdrawal: async (id, remarks) => {
        return await api.put(`/wallet/withdraw/${id}/reject`, null, {
            params: { remarks }
        });
    },

    // Get pending bank details
    getPendingBankDetails: async () => {
        return await api.get('/admin/bank/pending');
    },

    // Get pending withdrawals
    getPendingWithdrawals: async () => {
        return await api.get('/admin/withdrawals/pending');
    },

    // Get all withdrawals
    getAllWithdrawals: async () => {
        return await api.get('/admin/withdrawals');
    },

    // Create Product
    createProduct: async (productData) => {
        return await api.post('/products', null, {
            params: productData
        });
    },

    // Update Product
    updateProduct: async (id, productData) => {
        return await api.put(`/products/${id}`, null, {
            params: productData
        });
    },

    // Toggle Product Status
    toggleProductStatus: async (id) => {
        return await api.put(`/products/${id}/toggle`);
    },

    // Get analytics data for charts
    getAnalytics: async () => {
        return await api.get('/admin/analytics');
    },

    // Get Backend Application Logs
    getSystemLogs: async () => {
        return await api.get('/admin/system-logs');
    },

    // Send broadcast notification to all users
    broadcastNotification: async (title, message) => {
        return await api.post('/notifications/broadcast', { title, message });
    },

    // Get all notifications history
    getNotifications: async () => {
        return await api.get('/notifications');
    },

    // Get all support tickets
    getAllSupportTickets: async () => {
        return await api.get('/support/admin/all');
    },

    // Reply to a support ticket
    replyToTicket: async (id, reply) => {
        return await api.post(`/support/admin/reply/${id}`, { reply });
    },

    // Get pending KYC requests
    getPendingKycRequests: async () => {
        return await api.get('/kyc/admin/pending');
    },

    // Approve or reject a KYC request
    verifyKyc: async (userId, approve, reason) => {
        return await api.post(`/kyc/admin/verify/${userId}`, { approve, reason });
    },

    // Get all transactions
    getAllTransactions: async () => {
        return await api.get('/admin/transactions');
    },
};

export const portfolioService = {
    // Get portfolio analytics
    getAnalytics: async () => {
        return await api.get('/portfolio/analytics');
    },

    // Get portfolio summary
    getSummary: async () => {
        return await api.get('/portfolio/summary');
    },
};

export const referralService = {
    // Get user referral earnings
    getEarnings: async () => {
        return await api.get('/referrals/earnings');
    },

    // Get referral stats
    getStats: async () => {
        return await api.get('/referrals/stats');
    },
};

export const vipService = {
    // Get VIP status and progress
    getStatus: async () => {
        return await api.get('/vip/status');
    },
};

export const supportService = {
    createTicket: async (data) => {
        return await api.post('/support/create', data);
    },
    getMyTickets: async () => {
        return await api.get('/support/my-tickets');
    },
    // Admin
    getAllTickets: async () => {
        return await api.get('/support/admin/all');
    },
    replyTicket: async (id, reply) => {
        return await api.post(`/support/admin/reply/${id}`, { reply });
    }
};

export const kycService = {
    submitKyc: async (data) => {
        return await api.post('/kyc/submit', data);
    },
    verifyKyc: async (userId, data) => {
        return await api.post(`/kyc/admin/verify/${userId}`, data);
    }
};

export const favoriteService = {
    getFavorites: async () => {
        return await api.get('/favorites');
    },
    toggle: async (productId) => {
        return await api.post(`/favorites/${productId}`);
    }
};

export default {
    user: userService,
    wallet: walletService,
    product: productService,
    subscription: subscriptionService,
    bank: bankService,
    giftCode: giftCodeService,
    checkIn: checkInService,
    admin: adminService,
    portfolio: portfolioService,
    referral: referralService,
    vip: vipService,
    support: supportService,
    kyc: kycService,
    favorites: favoriteService,
};
