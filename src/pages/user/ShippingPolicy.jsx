import { FiArrowLeft, FiTruck, FiLock, FiInfo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ShippingPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FiArrowLeft size={24} className="text-obsidian" />
                </button>
                <h1 className="text-xl font-bold text-obsidian">Shipping & Delivery Policy</h1>
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
                    <h2 className="text-2xl font-bold text-obsidian mt-4 mb-3 font-heading">Digital Delivery Terms</h2>
                    <p className="text-sm text-charcoal leading-relaxed">
                        This Shipping & Delivery Policy applies to services and digital assets offered under the brand name <strong>Royal Groww</strong>, owned and operated by the legal entity <strong>Royal Groww FinTech Private Limited</strong>. As a digital Wealth Management and Investment Platform (our core business category), our product offerings are strictly digital, and physical shipping is not applicable.
                    </p>
                </motion.div>

                {/* Main Content Sections */}
                <div className="space-y-6">
                    
                    {/* Section 1: Delivery Mode */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <FiTruck size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">1. Mode of Delivery</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                All investments, portfolio access, and deposit transactions made on the Royal Groww platform are delivered digitally through our secure server infrastructure.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Wallet Recharges:</strong> Wallet credits are credited directly to your digital account balance immediately upon successful transaction completion via our payment gateways.</li>
                                <li><strong>Investment Subscription:</strong> Capital allocations to our wealth products are activated instantly upon subscribing through your wallet.</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 2: Delivery Timeline */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                                <FiLock size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">2. Dispatch Timeline</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                Since there are no physical goods to package, ship, or transport, the dispatch timeline is near-instantaneous:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Standard activation of all digital plan options occurs within <strong>5-10 seconds</strong> of purchase.</li>
                                <li>In the rare event of API lags or server maintenance, plan activations may be delayed, but are guaranteed to be resolved and processed within <strong>24 hours</strong>.</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 3: Fees and Charges */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-xl">
                                <FiInfo size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">3. Shipping Fees & Charges</h3>
                        </div>
                        <div className="text-sm text-charcoal leading-relaxed">
                            <p>
                                There are absolutely zero shipping charges, handling costs, or convenience fees associated with the delivery of your digital products and services. Any transaction processing charges are disclosed upfront on the recharge summary page.
                            </p>
                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default ShippingPolicy;
