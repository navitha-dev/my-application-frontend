import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiSend, FiChevronDown, FiChevronUp, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ContactUs = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [activeFaq, setActiveFaq] = useState(null);

    const faqs = [
        {
            q: "How long does it take for a deposit to reflect in my wallet?",
            a: "Most deposits via UPI or Net Banking are instant. However, during network congestion, it might take up to 30 minutes. If your balance is not updated after 30 minutes, please contact support with the transaction ID/UTR number."
        },
        {
            q: "What is the minimum withdrawal amount?",
            a: "The minimum withdrawal amount is ₹100. Withdrawals are processed directly to your verified bank account and are usually credited within a few minutes to a few hours depending on banking channels."
        },
        {
            q: "Is completing KYC mandatory to invest?",
            a: "Yes, to ensure compliance with financial regulations and secure your funds, we require all users to complete a basic Aadhaar & PAN verification before subscribing to any investment plans."
        },
        {
            q: "How safe is my investment with Royal Groww?",
            a: "We implement bank-grade 256-bit encryption for all transaction data. Your capital is allocated to verified, high-yielding corporate assets and secure bonds managed by experts with decades of financial experience."
        },
        {
            q: "What are the working hours of support?",
            a: "Our email ticket support is active 24/7. Live customer chat and query responses are operational from 9:00 AM to 8:00 PM IST every day."
        }
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.phone && formData.phone.length !== 10) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            toast.success("Message sent successfully! We will get back to you soon.");
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }, 1200);
    };

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FiArrowLeft size={24} className="text-obsidian" />
                </button>
                <h1 className="text-xl font-bold text-obsidian">Contact Support</h1>
            </div>

            <div className="container-custom px-4 mt-6">
                
                {/* Hero section */}
                <div className="text-center py-6 mb-8">
                    <h2 className="text-3xl font-bold text-obsidian mb-2 font-heading">We're Here to Help</h2>
                    <p className="text-charcoal max-w-sm mx-auto leading-relaxed text-sm">
                        Have queries about your investment, wallet, or account? Get in touch with our team.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex gap-4 items-start"
                    >
                        <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                            <FiMail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-obsidian text-base mb-1">Email Support</h3>
                            <a href="mailto:navithajune06@gmail.com" className="text-sm text-primary font-semibold hover:underline">
                                navithajune06@gmail.com
                            </a>
                            <p className="text-xs text-ash mt-1">Response within 12-24 hours</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex gap-4 items-start"
                    >
                        <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                            <FiPhone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-obsidian text-base mb-1">Call / WhatsApp</h3>
                            <span className="text-sm text-obsidian font-semibold">
                                +91 98765 43210
                            </span>
                            <p className="text-xs text-ash mt-1">9:00 AM to 8:00 PM IST</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        whileHover={{ y: -4 }}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex gap-4 items-start"
                    >
                        <div className="bg-primary/10 p-3 rounded-xl text-primary flex-shrink-0">
                            <FiMapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-obsidian text-base mb-1">Headquarters</h3>
                            <p className="text-sm text-charcoal leading-relaxed">
                                Royal Groww Tech Park, Sector 45, Gurugram, Haryana - 122003
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
                    
                    {/* Inquiry Form */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                <FiMessageCircle size={20} />
                            </div>
                            <h3 className="font-bold text-lg text-obsidian">Send us a Message</h3>
                        </div>

                        {submitted ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                    <FiCheckCircle size={36} />
                                </div>
                                <h4 className="font-bold text-lg text-obsidian mb-2">Message Sent!</h4>
                                <p className="text-sm text-charcoal max-w-xs mx-auto mb-6">
                                    Thank you for reaching out. A support representative will review your message and get back to you shortly.
                                </p>
                                <button 
                                    onClick={() => setSubmitted(false)}
                                    className="btn-secondary py-2 px-6 text-sm"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Full Name</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="input-primary py-3 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Mobile Number</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            maxLength="10"
                                            placeholder="10-digit number"
                                            className="input-primary py-3 text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="input-primary py-3 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Subject</label>
                                    <input 
                                        type="text" 
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. Deposit not reflecting"
                                        className="input-primary py-3 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-charcoal mb-2 uppercase tracking-wide">Your Message</label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        placeholder="Describe your query in detail..."
                                        className="input-primary py-3 text-sm resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full btn-primary flex items-center justify-center gap-2 py-3 mt-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner border-white border-t-transparent w-5 h-5"></div>
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <FiSend size={16} />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl text-obsidian font-heading mb-4 px-1">Frequently Asked Questions</h3>
                        {faqs.map((faq, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-200"
                            >
                                <button 
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-gray-50/50 transition-colors"
                                >
                                    <span className="font-bold text-obsidian text-sm leading-relaxed">{faq.q}</span>
                                    {activeFaq === idx ? (
                                        <FiChevronUp size={18} className="text-primary flex-shrink-0" />
                                    ) : (
                                        <FiChevronDown size={18} className="text-charcoal flex-shrink-0" />
                                    )}
                                </button>
                                
                                <AnimatePresence initial={false}>
                                    {activeFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="px-5 pb-5 pt-1 border-t border-gray-50 text-xs text-charcoal leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Trust Badge */}
                <div className="text-center py-6 border-t border-gray-100 mt-12">
                    <p className="text-xs text-ash">
                        Typical response time is 1-2 hours during business hours. For urgent issues regarding active subscriptions, please write directly from your registered email.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
