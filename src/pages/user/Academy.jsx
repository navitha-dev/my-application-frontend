import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBookOpen, FiTrendingUp, FiTarget, FiPlayCircle } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import academyStrategy from '../../assets/images/academy-strategy.jpg';
import academyBasics from '../../assets/images/academy-basics.jpg';
import academyMarket from '../../assets/images/academy-market.jpg';
import academyVideo from '../../assets/images/academy-video.jpg';

const articles = [
    {
        id: 1,
        category: 'Strategy',
        title: 'How to earn ₹1 Lakh this month?',
        readTime: '5 min read',
        image: academyStrategy,
        icon: <FiTarget />
    },
    {
        id: 2,
        category: 'Basics',
        title: 'Understanding Compound Interest',
        readTime: '3 min read',
        image: academyBasics,
        icon: <FiTrendingUp />
    },
    {
        id: 3,
        category: 'Market',
        title: 'Top 3 Performing Assets Right Now',
        readTime: '4 min read',
        image: academyMarket,
        icon: <FaRupeeSign />
    },
    {
        id: 4,
        category: 'Video',
        title: 'Platform Walkthrough & Tips',
        readTime: '10 min watch',
        image: academyVideo,
        icon: <FiPlayCircle />
    }
];

const Academy = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Strategy', 'Basics', 'Market', 'Video'];

    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <FiArrowLeft size={24} className="text-obsidian" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-obsidian">Learn & Grow</h1>
                        <p className="text-xs text-ash">Master your financial journey</p>
                    </div>
                </div>
            </div>

            <div className="container-custom px-4 mt-6">

                {/* Featured Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-obsidian rounded-2xl p-6 text-white mb-8 relative overflow-hidden"
                >
                    <div className="relative z-10 w-2/3">
                        <span className="bg-gold text-black text-[10px] font-bold px-2 py-1 rounded mb-3 inline-block">NEW</span>
                        <h2 className="text-xl font-bold mb-2">The Golden Rule of Investing</h2>
                        <p className="text-gray-400 text-sm mb-4">Learn closely how top investors manage their risk.</p>
                        <button className="text-gold font-bold text-sm flex items-center gap-2">
                            Read Article <FiBookOpen />
                        </button>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gold/10 skew-x-12 transform translate-x-4"></div>
                    <FiTrendingUp className="absolute right-4 bottom-4 text-gold/20" size={80} />
                </motion.div>

                {/* Categories */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-4">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                ? 'bg-gold text-white shadow-md'
                                : 'bg-white text-ash border border-gray-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid gap-4">
                    {filteredArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                        <span className="text-[10px] text-gray-400">{article.readTime}</span>
                                    </div>
                                    <h3 className="font-bold text-obsidian leading-tight group-hover:text-gold transition-colors">
                                        {article.title}
                                    </h3>
                                </div>
                                <div className="flex items-center text-xs text-ash gap-1 mt-2">
                                    <div className="p-1 bg-gray-50 rounded-full">
                                        {article.icon}
                                    </div>
                                    <span>Read now</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Academy;
