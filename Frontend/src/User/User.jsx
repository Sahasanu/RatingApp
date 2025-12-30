import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/StoreContext'
import Welcome from './Welcome';
import Search from './Search';
import StoreTable from './StoreTable';
import Pagination from './Pagination';
import BubbleLoader from '../components/Laoding';
const User = () => {
    const { user } = useAuth();
    const {loading}=useStore()
   
    const [pendingRatings, setPendingRatings] = useState({});
    const pendingCount = Object.keys(pendingRatings).length;

    if (loading) return <BubbleLoader/>

    return (
        <div className="bg-gray-200/70 min-h-screen flex flex-col font-sans text-slate-800">
            <Navbar user={user} />
            <main className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                <Welcome user={user} pendingCount={pendingCount} />
                <Search />
                <StoreTable pendingRatings={pendingRatings} setPendingRatings={setPendingRatings} />
                <Pagination />
            </main>
        </div>
    );
};

export default User;
