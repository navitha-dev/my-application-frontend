import React, { useState, useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

const firstNames = [
    'Rahul', 'Priya', 'Amit', 'Neha', 'Vikas', 'Sneha', 'Rohit', 'Pooja', 'Sunil', 'Anjali',
    'Karan', 'Riya', 'Raj', 'Kriti', 'Arjun', 'Meera', 'Vikram', 'Sonia', 'Deepak', 'Nisha',
    'Suresh', 'Ramesh', 'Aditya', 'Aarav', 'Vivaan', 'Diya', 'Ishaan', 'Aanya', 'Vihaan', 'Myra',
    'Manish', 'Sanjay', 'Geeta', 'Seema', 'Kavita', 'Manoj', 'Prakash', 'Rekha', 'Santosh', 'Sunita'
];

const actions = ['withdrew', 'earned', 'received bonus'];

const dummyReviews = [
    "This platform is amazing, I just got my first payout!",
    "Highly recommended! The investment plans are really profitable.",
    "I was skeptical at first, but I actually received the money.",
    "Best earning app I have ever used. Fast withdrawals.",
    "Customer support is great and payouts are instant.",
    "Thank you for this wonderful opportunity to earn extra income.",
    "I've been using this for a month, already doubled my investment.",
    "Very smooth process, just received my daily returns.",
    "Legit app! Finally an application that actually pays.",
    "My friends invited me, and we are all earning together.",
    "Super fast withdrawal, money credited to my bank in minutes.",
    "The VIP plans give excellent daily returns. Loving it!",
    "Just successfully withdrew my earnings. Very happy!",
    "Great passive income source. Keep up the good work.",
    "I love the daily check-in rewards. Simple and easy."
];

const generateComments = (count) => {
    const comments = [];
    for (let i = 0; i < count; i++) {
        const name = firstNames[Math.floor(Math.random() * firstNames.length)] + '***';
        const action = actions[Math.floor(Math.random() * actions.length)];
        // Amounts skewed towards lower numbers but occasional high ones
        const isHigh = Math.random() > 0.9;
        const amount = isHigh ? Math.floor(Math.random() * 49000) + 1000 : Math.floor(Math.random() * 4500) + 100;
        const time = Math.floor(Math.random() * 59) + 1; // 1 to 59 mins ago
        
        let message = '';
        if (action === 'withdrew') {
            message = `successfully withdrew ₹${amount}`;
        } else if (action === 'earned') {
            message = `earned ₹${amount} from an investment`;
        } else {
            message = `received ₹${amount} bonus`;
        }
        
        const review = dummyReviews[Math.floor(Math.random() * dummyReviews.length)];

        comments.push({ id: `comment-${i}-${Date.now()}`, name, message, review, amount, time: `${time}m ago` });
    }
    return comments;
};

const UserSuccessMarquee = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Generate 500 comments
        setComments(generateComments(500));
    }, []);

    if (comments.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 overflow-hidden my-6 shadow-sm">
            <h3 className="text-lg font-bold text-obsidian mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-primary" /> Live Earnings & Payouts
            </h3>
            
            {/* 
                We use a fixed height and hidden overflow container. 
                The inner container runs an infinite vertical scroll animation.
            */}
            <div className="relative h-[400px] overflow-hidden mask-image-vertical">
                <div className="flex flex-col gap-3 custom-marquee-vertical">
                    {/* Render comments twice to ensure seamless looping without a break */}
                    {[...comments, ...comments].map((comment, index) => (
                        <div key={`${comment.id}-${index}`} className="flex flex-col bg-gray-50/80 rounded-xl p-3.5 border border-gray-100 hover:bg-gray-100 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                        {comment.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-obsidian">{comment.name}</span>
                                        <span className="text-[10px] text-primary font-medium">{comment.message}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end shrink-0">
                                    <span className="text-sm font-bold text-obsidian flex items-center">
                                        <FaRupeeSign className="text-[10px]" />{comment.amount}
                                    </span>
                                    <span className="text-[10px] text-gray-400">{comment.time}</span>
                                </div>
                            </div>
                            <p className="text-xs text-charcoal italic px-1 bg-white/50 p-2 rounded-lg border border-gray-50">&quot;{comment.review}&quot;</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserSuccessMarquee;
