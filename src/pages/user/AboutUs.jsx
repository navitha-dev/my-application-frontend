import { motion } from 'framer-motion';
import { FiArrowLeft, FiShield, FiUsers, FiTrendingUp, FiTarget, FiAward, FiGlobe, FiCheckCircle, FiLock, FiBriefcase } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import officeImg from '../../assets/images/team/office.png';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <FiArrowLeft size={24} className="text-obsidian" />
                </button>
                <h1 className="text-xl font-bold text-obsidian">Our Story & Promise</h1>
            </div>

            <div className="container-custom px-4 mt-6">

                {/* Trust Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8 mb-6"
                >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                        <FiShield size={52} className="text-primary" />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full border-2 border-white">
                            100% SECURE
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-obsidian mb-3 font-heading">India's Most Trusted<br />Wealth Partner</h2>
                    <p className="text-charcoal max-w-sm mx-auto leading-relaxed">
                        Join <span className="font-bold text-obsidian">50,000+ investors</span> giving their dreams the Royal Groww advantage.
                    </p>
                </motion.div>

                {/* Our Journey */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="rounded-2xl overflow-hidden shadow-lg mb-6 border border-gray-100">
                        <img src={officeImg} alt="Our Office" className="w-full h-56 object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold text-obsidian font-heading mb-3">From a Vision to a Movement</h3>
                    <p className="text-charcoal leading-relaxed">
                        Started in 2020 by a group of ex-bankers and tech enthusiasts, Royal Groww was born from a simple frustration: wealth creation tools were too complex for the average Indian.
                        <br /><br />
                        What began in a small shared workspace has grown into a family of 150+ dreamers working out of Gurugram, united by a single mission:
                        <span className="font-bold text-obsidian"> to simplify your financial journey.</span>
                    </p>
                </motion.div>

                {/* The "Why Trust Us?" Cards */}
                <div className="grid gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-primary"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary mt-1">
                                <FiShield size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-obsidian mb-1">Bank-Grade Security</h3>
                                <p className="text-sm text-ash leading-relaxed">
                                    We use 256-bit SSL encryption and ISO 27001 certified data centers. Your money and personal data are guarded by the same tech used by major banks.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-blue-500"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-3 rounded-xl text-blue-600 mt-1">
                                <FiBriefcase size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-obsidian mb-1">Expert Fund Management</h3>
                                <p className="text-sm text-ash leading-relaxed">
                                    Your capital is managed by experts with 15+ years of experience in high-yield corporate bonds, validated startups, and diversified gold assets.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-gold"
                    >
                        <div className="flex items-start gap-4">
                            <div className="bg-gold/10 p-3 rounded-xl text-gold mt-1">
                                <FiCheckCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-obsidian mb-1">Transparency Guarantee</h3>
                                <p className="text-sm text-ash leading-relaxed">
                                    No hidden fees. No lock-in periods on earnings. Withdraw your profits anytime, directly to your bank account within minutes.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Founder's Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-obsidian text-white p-8 rounded-3xl relative overflow-hidden mb-8"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full -ml-12 -mb-12 blur-xl"></div>

                    <h3 className="text-2xl font-bold font-heading mb-4 relative z-10">A Note from Our Founder</h3>
                    <p className="text-white/80 leading-relaxed text-sm italic mb-6 relative z-10">
                        "We built Royal Groww because we believe potential shouldn't be limited by capital. Every Indian deserves access to world-class investment strategies, not just the ultra-rich. Your trust is our most valuable asset, and we work 24/7 to protect and grow it."
                    </p>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden border-2 border-white/20 flex items-center justify-center text-white font-bold text-sm">
                            RK
                        </div>
                        <div>
                            <p className="font-bold">Rajesh Kumar</p>
                            <p className="text-primary text-xs">CEO & Founder, Royal Groww</p>
                        </div>
                    </div>
                </motion.div>

                {/* Team Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-obsidian font-heading mb-6 text-center">Meet the Minds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* CEO */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gold/10 shadow-sm bg-gold/5 flex items-center justify-center text-gold text-2xl font-bold">
                                RK
                            </div>
                            <h4 className="font-bold text-lg text-obsidian">Rajesh Kumar</h4>
                            <p className="text-gold text-xs font-bold uppercase tracking-wide mb-3">Founder & CEO</p>
                            <p className="text-sm text-charcoal/80 leading-relaxed">Ex-Goldman Sachs. Believes in democratizing wealth for every Indian household.</p>
                        </motion.div>

                        {/* CTO */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/10 shadow-sm bg-primary/5 flex items-center justify-center text-primary text-2xl font-bold">
                                PS
                            </div>
                            <h4 className="font-bold text-lg text-obsidian">Priya Sharma</h4>
                            <p className="text-primary text-xs font-bold uppercase tracking-wide mb-3">Chief Tech Officer</p>
                            <p className="text-sm text-charcoal/80 leading-relaxed">IIT Delhi Alum. Architecting secure, bank-grade infrastructure for your peace of mind.</p>
                        </motion.div>

                        {/* CFO */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-blue-100 shadow-sm bg-blue-50 flex items-center justify-center text-blue-600 text-2xl font-bold">
                                AV
                            </div>
                            <h4 className="font-bold text-lg text-obsidian">Amit Verma</h4>
                            <p className="text-blue-600 text-xs font-bold uppercase tracking-wide mb-3">Head of Finance</p>
                            <p className="text-sm text-charcoal/80 leading-relaxed">Chartered Accountant with 15 years in risk management and asset allocation.</p>
                        </motion.div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mb-8 text-center">
                    <p className="text-xs font-bold text-ash uppercase tracking-widest mb-4">Certified & Compliant</p>
                    <div className="flex justify-center gap-4 grayscale opacity-70">
                        <div className="border border-gray-200 p-2 rounded px-4">
                            <span className="font-bold text-obsidian text-sm block">ISO</span>
                            <span className="text-[10px]">27001:2013</span>
                        </div>
                        <div className="border border-gray-200 p-2 rounded px-4">
                            <span className="font-bold text-obsidian text-sm block">GDPR</span>
                            <span className="text-[10px]">Compliant</span>
                        </div>
                        <div className="border border-gray-200 p-2 rounded px-4">
                            <span className="font-bold text-obsidian text-sm block">SSL</span>
                            <span className="text-[10px]">Secured</span>
                        </div>
                    </div>
                </div>

                {/* Office Address */}
                <div className="text-center border-t border-gray-100 pt-8">
                    <h4 className="font-bold text-obsidian mb-2">Visit Us</h4>
                    <p className="text-ash text-sm leading-relaxed mb-4">
                        Royal Groww Headquarters<br />
                        Tech Park, Sector 45<br />
                        Gurugram, Haryana - 122003<br />
                        India
                    </p>
                    <p className="text-xs text-primary font-medium">support@royalgroww.in</p>
                </div>

                <div className="h-4"></div>
            </div>
        </div>
    );
};

export default AboutUs;
