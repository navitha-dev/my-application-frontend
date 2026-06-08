import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';

const FloatingSupportButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();



    const handleSupportPageClick = () => {
        navigate('/support');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-20 right-4 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="bg-white rounded-2xl shadow-2xl p-4 mb-3 w-64"
                    >
                        <div className="mb-3">
                            <h3 className="font-bold text-obsidian mb-1">Need Help?</h3>
                            <p className="text-xs text-ash">Choose your support option</p>
                        </div>

                        {/* Telegram Support Option */}


                        {/* All Support Options */}
                        <button
                            onClick={handleSupportPageClick}
                            className="w-full bg-gold/10 text-gold p-3 rounded-xl flex items-center justify-center hover:bg-gold/20 transition-colors border border-gold/20"
                        >
                            <FiMessageCircle size={16} className="mr-2" />
                            <span className="text-sm font-semibold">View All Support Options</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'bg-red-500' : 'bg-gradient-to-r from-gold to-gold-dark'
                    } text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:shadow-gold/50 transition-all`}
            >
                {isOpen ? (
                    <FiX size={24} />
                ) : (
                    <FiMessageCircle size={24} />
                )}
            </motion.button>

            {/* Notification Badge */}
            {!isOpen && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                    !
                </motion.div>
            )}
        </div>
    );
};

export default FloatingSupportButton;
