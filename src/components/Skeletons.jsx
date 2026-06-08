
import React from 'react';

// Basic wrapper for consistent skeleton styles
const Skeleton = ({ className = '', ...props }) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded ${className}`}
            {...props}
        />
    );
};

// Skeleton mimicking the Product Card layout
export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            {/* Header: Icon/Image + Title + Days + Price */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center flex-1">
                    {/* Icon/Image Placeholder */}
                    <Skeleton className="w-10 h-10 rounded-lg mr-3 shrink-0" />

                    <div className="w-full">
                        {/* Title Placeholder */}
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        {/* Days Badge Placeholder */}
                        <Skeleton className="h-5 w-16 rounded" />
                    </div>
                </div>
                <div className="text-right ml-2">
                    {/* Price Label Placeholder */}
                    <Skeleton className="h-3 w-8 ml-auto mb-1" />
                    {/* Price Value Placeholder */}
                    <Skeleton className="h-5 w-16 ml-auto" />
                </div>
            </div>

            {/* Info Grid (Daily Returns, Total Returns) */}
            <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div>
                    <Skeleton className="h-3 w-16 mb-2" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="text-right">
                    <Skeleton className="h-3 w-16 mb-2 ml-auto" />
                    <Skeleton className="h-4 w-20 ml-auto" />
                </div>
            </div>

            {/* Footer Info (Investors, CAGR) */}
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
            </div>

            {/* Action Button */}
            <Skeleton className="w-full h-10 rounded-lg" />
        </div>
    );
};

// Generic Card Skeleton
export const CardSkeleton = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Skeleton className="h-4 w-1/3 mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <div className="flex justify-between">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
};

// Generic List Item Skeleton
export const ListItemSkeleton = () => {
    return (
        <div className="flex items-center p-4 bg-white border-b border-gray-50 last:border-0">
            <Skeleton className="w-10 h-10 rounded-full mr-4 shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-4 w-12" />
        </div>
    );
};

// Table Skeleton
export const TableSkeleton = ({ rows = 5 }) => {
    return (
        <div className="w-full overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Table Header */}
            <div className="flex p-4 border-b border-gray-100 bg-gray-50">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-4 flex-1 mx-2" />
                ))}
            </div>
            {/* Table Rows */}
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex p-4 border-b border-gray-50 items-center">
                    {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex-1 mx-2">
                            <Skeleton className="h-3 w-full" />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

// Home Page Skeleton
export const HomeSkeleton = () => {
    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header Skeleton */}
            <div className="bg-white p-6 pb-2 border-b border-gray-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div>
                            <Skeleton className="h-4 w-32 mb-1" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                    <Skeleton className="w-8 h-8 rounded-full" />
                </div>
            </div>

            <div className="p-6 pb-2">
                {/* Wallet Card Skeleton */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-48 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <Skeleton className="h-3 w-24 mb-2" />
                            <Skeleton className="h-8 w-40" />
                        </div>
                        <Skeleton className="w-10 h-10 rounded-xl" />
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-gray-50">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex-1">
                                <Skeleton className="h-3 w-16 mb-1" />
                                <Skeleton className="h-5 w-20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="px-6 mt-4">
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center h-32">
                            <Skeleton className="w-8 h-8 mb-2" />
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>

                {/* Menu Items Skeleton */}
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center p-4 rounded-xl border border-gray-100">
                            <Skeleton className="w-10 h-10 rounded-lg mr-4" />
                            <div className="flex-1">
                                <Skeleton className="h-4 w-32 mb-1" />
                                <Skeleton className="h-3 w-40" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Records Page Skeleton
export const RecordsSkeleton = () => {
    return (
        <div className="min-h-screen bg-ivory pb-6">
            {/* Header Skeleton */}
            <div className="gradient-gold p-6">
                <div className="flex items-center mb-4">
                    <Skeleton className="w-8 h-8 rounded-lg mr-3 bg-white/30" />
                    <div>
                        <Skeleton className="h-6 w-48 mb-2 bg-white/30" />
                        <Skeleton className="h-4 w-24 bg-white/30" />
                    </div>
                </div>
                {/* Filter Tabs Skeleton */}
                <div className="flex gap-2 overflow-hidden">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-8 w-24 rounded-lg bg-white/30" />
                    ))}
                </div>
            </div>

            <div className="container-custom mt-6 space-y-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <ListItemSkeleton key={i} />
                ))}
            </div>
        </div>
    );
};

// Profile Page Skeleton
export const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header Skeleton */}
            <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <Skeleton className="h-6 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="w-8 h-8 rounded-full" />
            </div>

            <div className="container-custom mt-6 space-y-6 px-4">
                {/* Profile Card Skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center mb-6">
                        <Skeleton className="w-16 h-16 rounded-full mr-4" />
                        <div className="flex-1">
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Skeleton className="h-10 w-full rounded-lg" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center">
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center">
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                </div>

                {/* Menu Items Skeleton */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-1">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center p-4">
                            <Skeleton className="w-8 h-8 rounded-lg mr-3" />
                            <div className="flex-1">
                                <Skeleton className="h-4 w-32 mb-1" />
                                <Skeleton className="h-3 w-48" />
                            </div>
                            <Skeleton className="w-4 h-4 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Subscription/My Investments Page Skeleton
export const SubscriptionSkeleton = () => {
    return (
        <div className="min-h-screen bg-ivory pb-6">
            {/* Header Skeleton */}
            <div className="gradient-gold p-6">
                <div className="flex items-center">
                    <Skeleton className="w-8 h-8 rounded-lg mr-3 bg-white/30" />
                    <div>
                        <Skeleton className="h-6 w-48 mb-2 bg-white/30" />
                        <Skeleton className="h-4 w-24 bg-white/30" />
                    </div>
                </div>
            </div>

            <div className="container-custom mt-6 space-y-4">
                {/* Next Payout Card Skeleton */}
                <div className="bg-white p-4 mb-6 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <div>
                                <Skeleton className="h-3 w-32 mb-1" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                        <div className="text-right">
                            <Skeleton className="h-3 w-16 mb-1 ml-auto" />
                            <Skeleton className="h-6 w-8 ml-auto" />
                        </div>
                    </div>
                </div>

                {/* Subscription Cards */}
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <Skeleton className="h-5 w-40 mb-2" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {[1, 2, 3, 4].map(j => (
                                <div key={j}>
                                    <Skeleton className="h-3 w-20 mb-1" />
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            ))}
                        </div>

                        {/* Progress Section */}
                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="flex justify-between mb-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-10" />
                            </div>
                            <Skeleton className="h-3 w-full rounded-full mb-2" />
                            <div className="flex justify-between">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Promotion Page Skeleton
export const PromotionSkeleton = () => {
    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header Skeleton */}
            <div className="gradient-gold p-6">
                <Skeleton className="h-8 w-48 mb-2 bg-white/30" />
                <Skeleton className="h-4 w-32 bg-white/30" />
            </div>

            <div className="container-custom mt-6 space-y-6">
                {/* Referral Code Card Skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="bg-gray-50 p-6 rounded-xl text-center mb-4">
                        <Skeleton className="h-4 w-24 mx-auto mb-2" />
                        <Skeleton className="h-8 w-40 mx-auto mb-4" />
                        <Skeleton className="h-10 w-32 mx-auto rounded-lg" />
                    </div>
                    <div className="flex justify-center mb-4">
                        <Skeleton className="w-40 h-40 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Skeleton className="h-10 w-full rounded-lg" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                </div>

                {/* Commission Structure Skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <Skeleton className="h-4 w-40 mb-1" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                                <Skeleton className="h-8 w-12" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Stats Skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg">
                                <Skeleton className="h-3 w-24 mb-1" />
                                <Skeleton className="h-6 w-20 mb-1" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Withdraw Page Skeleton
export const WithdrawSkeleton = () => {
    return (
        <div className="min-h-screen bg-ivory">
            {/* Header Skeleton */}
            <div className="gradient-gold p-6">
                <div className="flex items-center mb-4">
                    <Skeleton className="w-8 h-8 rounded-lg mr-3 bg-white/30" />
                    <div>
                        <Skeleton className="h-6 w-48 mb-2 bg-white/30" />
                        <Skeleton className="h-4 w-24 bg-white/30" />
                    </div>
                </div>
            </div>

            <div className="container-custom mt-6 space-y-6">
                {/* Balance Card Skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <Skeleton className="h-3 w-32 mb-2" />
                    <Skeleton className="h-10 w-48" />
                </div>

                {/* Bank Details Skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                </div>

                {/* Amount Card Skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-12 w-full rounded-lg mb-4" />
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {[1, 2, 3, 4].map(i => (
                            <Skeleton key={i} className="h-8 rounded" />
                        ))}
                    </div>
                    <Skeleton className="h-4 w-32" />
                </div>

                {/* Button Skeleton */}
                <Skeleton className="h-14 w-full rounded-xl" />
            </div>
        </div>
    );
};

export default Skeleton;
