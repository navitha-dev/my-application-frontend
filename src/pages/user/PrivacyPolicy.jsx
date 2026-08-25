import { FiArrowLeft, FiShield, FiDatabase, FiShare2, FiEye, FiMail } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FiArrowLeft size={24} className="text-obsidian" />
                </button>
                <h1 className="text-xl font-bold text-obsidian">Privacy Policy</h1>
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
                    <h2 className="text-2xl font-bold text-obsidian mt-4 mb-3 font-heading">Our Commitment</h2>
                    <p className="text-sm text-charcoal leading-relaxed">
                        Royal Groww, operated under the legal business entity name <strong>Royal Groww FinTech Private Limited</strong> (our core business category is digital Wealth Management & Investment Services), values your trust and is committed to protecting your personal and financial information. This Privacy Policy details how we collect, store, use, and safeguard your data when you interact with our platform. By registering an account, you consent to the collection and use of your information under this policy.
                    </p>
                </motion.div>

                {/* Main Content Sections */}
                <div className="space-y-6">
                    
                    {/* Section 1: Information We Collect */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <FiDatabase size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">1. Information We Collect</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                We collect various information to provide you with secure and customized wealth creation services:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>Personal Profile:</strong> Full name, mobile number, email address, and account passwords.
                                </li>
                                <li>
                                    <strong>KYC Information:</strong> Aadhaar card data, PAN card details, and selfie photographs to verify your identity as required by financial regulations.
                                </li>
                                <li>
                                    <strong>Banking & Transaction Details:</strong> Bank account numbers, IFSC codes, UPI details, deposit and withdrawal records, and transaction logs.
                                </li>
                                <li>
                                    <strong>Technical & Usage Data:</strong> Device model, IP addresses, browser types, and navigation history on our platform to optimize security.
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 2: How We Use Your Data */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
                                <FiEye size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">2. How We Use Your Information</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                We process your personal and financial information for the following core activities:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To verify your identity and fulfill regulatory KYC obligations.</li>
                                <li>To execute and track your wallet deposits, withdraw requests, and active investment plans.</li>
                                <li>To send transactional updates, critical alerts, and security notifications.</li>
                                <li>To detect, prevent, and mitigate fraudulent behavior or system abuse.</li>
                                <li>To improve our system performance, layout, and client experience.</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 3: Data Security */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                                <FiShield size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">3. Security of Your Information</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                We implement bank-grade safeguards to keep your personal files and financial details secure:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>All communication between your browser and our servers is secured using 256-bit Secure Socket Layer (SSL) encryption.</li>
                                <li>KYC document images are stored in highly secure, isolated databases with restricted administrative access.</li>
                                <li>Passwords and sensitive tokens are hashed using advanced algorithms and are never stored in plain text.</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 4: Data Sharing */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                <FiShare2 size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">4. Information Sharing & Disclosures</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                Royal Groww does <span className="font-bold text-obsidian">not</span> sell, trade, or rent your personal information to third-party advertising companies. We share data only with:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Payment Gateways & Banking Partners:</strong> to process your wallet recharges and payouts.</li>
                                <li><strong>KYC Verification Partners:</strong> to programmatically verify Aadhaar and PAN credentials.</li>
                                <li><strong>Legal Authorities:</strong> when required by law to comply with judicial processes, search warrants, or court orders.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Privacy Contact Support */}
                <div className="mt-8 text-center p-6 bg-white rounded-3xl border border-gray-100">
                    <div className="p-3 bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <FiMail size={20} />
                    </div>
                    <h4 className="font-bold text-obsidian mb-2">Privacy Questions or Data Removal Request</h4>
                    <p className="text-xs text-charcoal mb-4">
                        If you have queries regarding this policy, or wish to request details about the personal data stored with us, please email our security officer.
                    </p>
                    <a href="mailto:navithajune06@gmail.com" className="text-sm text-primary font-semibold hover:underline">
                        navithajune06@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
