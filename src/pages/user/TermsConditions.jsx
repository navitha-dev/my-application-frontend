import { FiArrowLeft, FiUserCheck, FiTrendingUp, FiActivity, FiAlertOctagon, FiSettings, FiMail } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TermsConditions = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FiArrowLeft size={24} className="text-obsidian" />
                </button>
                <h1 className="text-xl font-bold text-obsidian">Terms & Conditions</h1>
            </div>

            <div className="container-custom px-4 mt-6 max-w-3xl">
                
                {/* Intro Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-6"
                >
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        Effective Date: June 16, 2026
                    </span>
                    <h2 className="text-2xl font-bold text-obsidian mt-4 mb-3 font-heading">User Agreement</h2>
                    <p className="text-sm text-charcoal leading-relaxed">
                        Welcome to Royal Groww. By creating an account, depositing money, subscribing to investment plans, or using our mobile application, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these terms, you must not use our services.
                    </p>
                </motion.div>

                {/* Main Content Sections */}
                <div className="space-y-6">
                    
                    {/* Section 1: Eligibility and Accounts */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <FiUserCheck size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">1. Account Registration & Eligibility</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                To access the services of Royal Groww, you must satisfy the following:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>You must be a resident of India and at least <strong>18 years of age</strong>.</li>
                                <li>You agree to provide true, current, and complete details during registration (mobile, name, email).</li>
                                <li><strong>One Account Policy:</strong> Users are permitted to register and operate exactly one account. Creating multiple accounts to exploit referral bonuses, gift codes, or system functions is strictly prohibited.</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 2: KYC Verification */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                                <FiActivity size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">2. Identity Verification (KYC)</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                In order to withdraw wallet funds or earn daily commissions, users must upload official identity proofs (Aadhaar Card number, PAN Card details, and verification photography).
                            </p>
                            <p>
                                Royal Groww reserves the right to reject verification submissions, freeze account balances, or suspend user access if the uploaded documents are found to be fake, edited, or registered under another person's name.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 3: Investment Terms and Risk Disclosures */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                <FiTrendingUp size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">3. Investment Disclosures & Risks</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                Royal Groww acts as a facilitator enabling individuals to participate in high-yield corporate assets, lease assets, and gold funds. By purchasing any plan:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>You acknowledge that historical performance does not guarantee future results.</li>
                                <li>You accept that all investments carry market risks, including the risk of capital depreciation in volatile economic cycles.</li>
                                <li>You agree that you have read and understood the return rates, lock-in terms, and plan structures before investing.</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 4: Prohibited Activities */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-50 text-red-500 rounded-xl">
                                <FiAlertOctagon size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">4. Prohibited System Exploitations</h3>
                        </div>
                        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
                            <p>
                                Royal Groww retains a zero-tolerance policy against platform abuse. You must not:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Engage in automated scraping, botting, or reverse-engineering of the application APIs.</li>
                                <li>Manipulate the referral earnings system by inviting fake accounts or using self-referrals.</li>
                                <li>Exploit software bugs, security loopholes, or operational glitches for financial gain.</li>
                            </ul>
                            <p className="text-xs text-red-600 font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                                Warning: Violation of these guidelines will lead to instant termination of the user account, forfeiture of all wallet balances, and potential legal actions.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 5: Limitation of Liability */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-50 text-gray-600 rounded-xl">
                                <FiSettings size={22} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">5. Limitation of Liability & Governing Law</h3>
                        </div>
                        <p className="text-sm text-charcoal leading-relaxed">
                            Royal Groww, its directors, and employees shall not be liable for any direct, indirect, incidental, or consequential losses resulting from website downtime, banking gateway failures, or investment performance fluctuations. These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts at Gurugram, Haryana.
                        </p>
                    </motion.div>
                </div>

                {/* Terms Footer Contact Support */}
                <div className="mt-8 text-center p-6 bg-white rounded-3xl border border-gray-100">
                    <div className="p-3 bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <FiMail size={20} />
                    </div>
                    <h4 className="font-bold text-obsidian mb-2">Need clarification on our Terms?</h4>
                    <p className="text-xs text-charcoal mb-4">
                        If you have queries or need assistance regarding legal clauses, feel free to contact our support department.
                    </p>
                    <Link to="/contact" className="btn-primary inline-flex items-center py-2 px-6 text-sm">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
