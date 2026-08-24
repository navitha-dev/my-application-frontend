import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiTrendingUp, FiLock, FiChevronRight, FiDollarSign, FiCheck } from 'react-icons/fi';

const Landing = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    // Animation presets
    const fadeInUp = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] text-[#1a1a1a] flex flex-col justify-between font-sans selection:bg-primary/20 selection:text-primary-dark">
            
            {/* 1. Header (Glassmorphism & Spacing) */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100/80 py-4 px-6 sticky top-0 z-30 shadow-[0_2px_15px_rgba(0,0,0,0.015)]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-dark flex items-center justify-center shadow-md shadow-primary/20">
                            <FiTrendingUp className="text-white" size={20} />
                        </div>
                        <h1 className="text-2xl font-black font-heading tracking-tight text-obsidian">
                            Royal<span className="text-primary">Groww</span>
                        </h1>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        {isAuthenticated ? (
                            <Link 
                                to="/home" 
                                className="group relative inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Enter Dashboard 
                                <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-charcoal hover:text-primary-dark font-semibold text-sm py-2 px-3 transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-dark font-semibold text-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-primary/10 hover:shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </motion.div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                
                {/* 2. Hero Section */}
                <section className="relative pt-20 pb-28 px-6 text-center overflow-hidden">
                    {/* Background Gradients */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary-light/50 to-primary-dark/5 rounded-full blur-3xl -z-10"></div>
                    
                    <div className="max-w-4xl mx-auto space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-primary-light/40 border border-primary/20 text-primary-dark font-bold text-[11px] px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm"
                        >
                            <FiShield size={14} className="animate-pulse" /> Bank-Grade Secure Wealth Partner
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-4xl sm:text-6xl font-black text-obsidian font-heading leading-tight tracking-tight"
                        >
                            Next-Generation Wealth Creation<br />
                            <span className="bg-gradient-to-r from-primary via-primary-dark to-primary-dark bg-clip-text text-transparent">
                                Engineered For High Yield
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-charcoal text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
                        >
                            Empowering 50,000+ Indian investors with institutional-grade assets. Allocate capital securely to vetted portfolios in corporate credit, startup seed funds, and gold.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
                        >
                            {isAuthenticated ? (
                                <Link 
                                    to="/home" 
                                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Enter Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link 
                                        to="/register" 
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/35 transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        Create Free Account
                                    </Link>
                                    <Link 
                                        to="/login" 
                                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-gray-200 text-charcoal hover:text-primary-dark hover:border-primary/50 font-bold text-base shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* 3. Interactive CSS Dashboard Preview (WOW Element) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-5xl mx-auto mt-16 rounded-3xl bg-white p-6 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative"
                    >
                        {/* Header Bar */}
                        <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <span className="text-[11px] text-ash font-mono ml-2 uppercase tracking-widest">dashboard_preview_v2.0</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold text-charcoal">
                                <span className="flex items-center gap-1"><FiLock className="text-green-500" /> SSL Encrypted</span>
                                <span className="text-green-500 flex items-center gap-0.5"><FiCheck /> Fully Live</span>
                            </div>
                        </div>

                        {/* Preview Columns */}
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            {/* Left panel: Wallet stats */}
                            <div className="space-y-4">
                                <div className="bg-[#faf9f6] p-5 rounded-2xl border border-gray-100">
                                    <p className="text-xs font-bold uppercase text-ash tracking-wide">Wallet Balance</p>
                                    <div className="flex items-baseline gap-1 mt-2">
                                        <span className="text-3xl font-extrabold text-obsidian">₹48,250.00</span>
                                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full flex items-center">+5.2%</span>
                                    </div>
                                    <p className="text-[10px] text-ash mt-1">Pending allocation: ₹2,400.00</p>
                                </div>
                                <div className="bg-[#faf9f6] p-5 rounded-2xl border border-gray-100">
                                    <p className="text-xs font-bold uppercase text-ash tracking-wide font-sans">Current Yield Account</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-obsidian">Daily Earnings</p>
                                            <p className="text-xs text-ash mt-0.5">Average yield rate</p>
                                        </div>
                                        <p className="text-lg font-extrabold text-primary-dark">14.5% p.a.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Middle Panel: Visual Simulation Chart */}
                            <div className="md:col-span-2 bg-[#faf9f6] p-5 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[220px]">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase text-ash tracking-wide">Asset Allocation Progress</p>
                                        <p className="text-sm font-bold text-obsidian mt-0.5">Yield Performance Tracker</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-[10px] font-bold text-primary-dark bg-primary-light px-2 py-1 rounded">1M</span>
                                        <span className="text-[10px] font-bold text-ash px-2 py-1">6M</span>
                                        <span className="text-[10px] font-bold text-ash px-2 py-1">1Y</span>
                                    </div>
                                </div>

                                {/* Dynamic SVG Chart representation */}
                                <div className="w-full h-28 relative flex items-end">
                                    <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#00D09C" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#00D09C" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {/* Chart Fill */}
                                        <path d="M 0 90 Q 50 70 100 80 T 200 40 T 300 20 T 400 10 L 400 100 L 0 100 Z" fill="url(#chartGrad)"></path>
                                        {/* Chart Line */}
                                        <path d="M 0 90 Q 50 70 100 80 T 200 40 T 300 20 T 400 10" fill="none" stroke="#00B386" strokeWidth="3" strokeLinecap="round"></path>
                                        {/* Target points */}
                                        <circle cx="200" cy="40" r="5" fill="#00B386" stroke="#ffffff" strokeWidth="2"></circle>
                                        <circle cx="300" cy="20" r="5" fill="#00B386" stroke="#ffffff" strokeWidth="2"></circle>
                                        <circle cx="400" cy="10" r="5" fill="#00B386" stroke="#ffffff" strokeWidth="2"></circle>
                                    </svg>
                                    {/* Tooltip */}
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-obsidian text-white text-[10px] py-1 px-2.5 rounded-lg shadow font-semibold">
                                        Current Yield Peak: +16.2%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 4. Vetted Investment Offerings Section */}
                <section className="bg-white border-y border-gray-100/80 py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto space-y-16">
                        <div className="text-center space-y-4">
                            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-obsidian tracking-tight">
                                Vetted Asset Portfolios
                            </h3>
                            <p className="text-ash max-w-md mx-auto text-sm leading-relaxed">
                                Our investment team secures, diversifies, and structures digital asset options to consistently outperform standard savings assets.
                            </p>
                        </div>

                        <motion.div 
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {/* Card 1: Corporate Debt */}
                            <motion.div 
                                variants={fadeInUp}
                                className="group bg-[#faf9f6] p-8 rounded-3xl border border-gray-100 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-6">
                                    <div className="p-4 bg-primary-light text-primary-dark w-fit rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        <FiTrendingUp size={28} />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-extrabold text-xl text-obsidian">High-Yield Bonds</h4>
                                        <p className="text-charcoal text-sm leading-relaxed">
                                            Institutional corporate credit portfolios. Earn recurring yields by allocating capital to stable commercial institutions.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between items-center text-xs font-bold">
                                    <span className="text-primary-dark uppercase tracking-wider">UP TO 12.5% p.a.</span>
                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">Daily Payout</span>
                                </div>
                            </motion.div>

                            {/* Card 2: Venture Equity */}
                            <motion.div 
                                variants={fadeInUp}
                                className="group bg-[#faf9f6] p-8 rounded-3xl border border-gray-100 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-6">
                                    <div className="p-4 bg-blue-50 text-blue-600 w-fit rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        <FiDollarSign size={28} />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-extrabold text-xl text-obsidian">Venture Funds</h4>
                                        <p className="text-charcoal text-sm leading-relaxed">
                                            Vetted early-stage capital pools for rapid scaling startups. Built to generate substantial returns on equity.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between items-center text-xs font-bold">
                                    <span className="text-primary-dark uppercase tracking-wider">HIGH GROWTH CAP</span>
                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">Asset Backed</span>
                                </div>
                            </motion.div>

                            {/* Card 3: Digital Gold Vaults */}
                            <motion.div 
                                variants={fadeInUp}
                                className="group bg-[#faf9f6] p-8 rounded-3xl border border-gray-100 hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div className="space-y-6">
                                    <div className="p-4 bg-primary-light text-primary-dark w-fit rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        <FiLock size={28} />
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="font-extrabold text-xl text-obsidian">Digital Gold Vaults</h4>
                                        <p className="text-charcoal text-sm leading-relaxed">
                                            Fully-backed physical 24K gold stored in secure vault storage. Provides instant liquidity and inflation hedging.
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between items-center text-xs font-bold">
                                    <span className="text-primary-dark uppercase tracking-wider">99.9% CERTIFIED</span>
                                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">Instant Sell</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* 5. Proof / Trust Banner */}
                <section className="py-20 px-6 max-w-7xl mx-auto space-y-10">
                    <div className="text-center">
                        <h4 className="text-sm font-bold uppercase text-ash tracking-widest">Built On Security & Transparency</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <h5 className="text-4xl font-black text-obsidian">₹10Cr+</h5>
                            <p className="text-xs text-ash uppercase font-bold tracking-wide">Yield Disbursed</p>
                        </div>
                        <div className="space-y-2">
                            <h5 className="text-4xl font-black text-obsidian">50,000+</h5>
                            <p className="text-xs text-ash uppercase font-bold tracking-wide">Active Investors</p>
                        </div>
                        <div className="space-y-2">
                            <h5 className="text-4xl font-black text-obsidian">256-Bit</h5>
                            <p className="text-xs text-ash uppercase font-bold tracking-wide">SSL Encryption</p>
                        </div>
                        <div className="space-y-2">
                            <h5 className="text-4xl font-black text-obsidian">Zero</h5>
                            <p className="text-xs text-ash uppercase font-bold tracking-wide">Hidden Fees</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* 6. Professional Compliance Footer */}
            <footer className="bg-obsidian text-white/90 pt-16 pb-12 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="grid md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
                        {/* Company Logo and Entity */}
                        <div className="md:col-span-2 space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                    <FiTrendingUp className="text-obsidian" size={18} />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-white tracking-tight">
                                    Royal<span className="text-primary">Groww</span>
                                </h3>
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
                                Royal Groww is an investment technology infrastructure. We partner with leading financial services to offer retail investors high-yield digital portfolios.
                            </p>
                            <p className="text-xs text-white/60">
                                Corporate Entity: <strong>Royal Groww FinTech Private Limited</strong>
                            </p>
                        </div>

                        {/* Policies Links */}
                        <div className="space-y-3">
                            <h5 className="text-xs font-bold uppercase text-primary tracking-wider">Required Policies</h5>
                            <ul className="space-y-2 text-xs text-white/60">
                                <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                                <li><Link to="/refund-policy" className="hover:text-primary transition-colors">Refund & Cancellation</Link></li>
                                <li><Link to="/shipping-policy" className="hover:text-primary transition-colors">Shipping & Delivery</Link></li>
                            </ul>
                        </div>

                        {/* Platform Links */}
                        <div className="space-y-3">
                            <h5 className="text-xs font-bold uppercase text-primary tracking-wider">Contact & Corporate</h5>
                            <ul className="space-y-2 text-xs text-white/60">
                                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                                <li className="text-[10px] text-white/40">Category: digital Wealth Management & Investment Advisory Platform</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40">
                        <p className="leading-relaxed text-center md:text-left max-w-3xl">
                            <strong>Regulatory Disclaimer:</strong> Royal Groww (operated under legal business name Royal Groww FinTech Private Limited) is a technology platform and not registered directly as a bank or broker-dealer. Investment offerings are structured debt, startup equity, and vault-held metal assets managed by certified partner custodians. Capital involves investment risk; verify platform terms.
                        </p>
                        <p className="text-center md:text-right whitespace-nowrap">
                            &copy; 2026 Royal Groww FinTech Private Ltd.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
