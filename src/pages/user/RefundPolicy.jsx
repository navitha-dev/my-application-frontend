import { FiArrowLeft, FiRefreshCw, FiLock, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RefundPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FiArrowLeft size={24} className="text-obsidian" />
                </button>
                <h1 className="text-xl font-bold text-obsidian">Refund & Cancellation</h1>
            </div>

            <div className="container-custom px-4 mt-6 max-w-3xl">
                
                {/* Intro Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-6"
                >
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        Last Updated: June 2026
                    </span>
                    <h2 className="text-2xl font-bold text-obsidian mt-4 mb-3 font-heading">Policy Overview</h2>
                    <p className="text-sm text-charcoal leading-relaxed">
                        At Royal Groww, operated under the legal business entity name <strong>Royal Groww FinTech Private Limited</strong> (our core business category is digital Wealth Management & Investment Services), we strive to maintain complete transparency in our financial operations. As a wealth partner, our services involve processing deposits, allocating capital to third-party secure assets, and distributing daily yield. Please read the following refund, cancellation, and transaction policies carefully.
                    </p>
                </motion.div>

                {/* Main Content Sections */}
                <div className="space-y-6">
                    
                    {/* Section 1: Deposits */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <FiRefreshCw size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">1. Deposit Failures & Double Charges</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                If your bank account is debited but the balance does not reflect in your Royal Groww wallet:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>Automatic Settlement:</strong> Payment gateways usually auto-reconcile such transactions. The money is either credited to your wallet or refunded to your source bank account within <span className="font-bold text-obsidian">3 to 5 business days</span>.
                                </li>
                                <li>
                                    <strong>Manual Verification:</strong> If the funds do not reflect within 24 hours, you may submit a request on our <Link to="/contact" className="text-primary font-medium hover:underline">Contact Support</Link> page with the transaction screenshot and UTR (Unique Transaction Reference) number.
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 2: Investment Subscriptions */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                <FiLock size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">2. Investment Cancellation & Lock-ins</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                When you choose an investment plan and subscribe, the funds are immediately allocated to the underlying yield-bearing assets (e.g. corporate bonds, lease assets, gold funds):
                            </p>
                            <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl flex gap-3 items-start my-2 text-xs text-orange-800">
                                <FiAlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong>No Early Cancellation:</strong> Once an investment subscription is activated, it cannot be canceled, terminated, or refunded before its maturity date. The capital is locked in for the specific duration specified in the product description.
                                </div>
                            </div>
                            <p>
                                At the end of the subscription term, the principal investment amount will be automatically unlocked and credited to your wallet balance, from where it can be withdrawn or reinvested.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 3: Withdrawals */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                                <FiCheckCircle size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">3. Wallet Withdrawals</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                Available wallet balance (accumulated from daily earnings or unlocked principal) can be withdrawn at any time:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>KYC Verification:</strong> Withdrawals are only processed for accounts that have successfully completed Aadhaar and PAN KYC verification.
                                </li>
                                <li>
                                    <strong>Processing Time:</strong> Standard withdrawals are processed through IMPS/NEFT. While most transactions are completed in minutes, bank-side delays can occasionally take up to 24 hours.
                                </li>
                                <li>
                                    <strong>Minimum Limit:</strong> A minimum withdrawal limit of ₹100 applies.
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 4: Fees and Charges */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                                <FiInfo size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">4. Fees & Charges</h3>
                        </div>
                        <p className="text-sm text-charcoal leading-relaxed">
                            Royal Groww does not charge any deposit fees. Standard banking transaction fees or gateway charges (if applicable) are shown transparently at the time of payment. We reserve the right to apply withdrawal processing fees in the future, which will be updated on this page and notified to users inside the app.
                        </p>
                    </motion.div>
                </div>

                {/* Policy Footer Support */}
                <div className="mt-8 text-center p-6 bg-white rounded-3xl border border-gray-100">
                    <h4 className="font-bold text-obsidian mb-2">Have questions about a specific transaction?</h4>
                    <p className="text-xs text-charcoal mb-4">
                        Please prepare your Transaction ID, UTR Number, and registered mobile number before reaching out.
                    </p>
                    <Link to="/contact" className="btn-primary inline-flex items-center py-2 px-6 text-sm">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
