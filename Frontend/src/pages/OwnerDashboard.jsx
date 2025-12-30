import React, { useState } from 'react';

// --- Sub-Components ---

const StarRating = ({ rating }) => {
  return (
    <div className="flex text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = rating >= star;
        const isHalf = !isFull && rating >= star - 0.5;
        return (
          <span
            key={star}
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: `'FILL' ${isFull ? 1 : isHalf ? 0.5 : 0}` }}
          >
            {isHalf ? 'star_half' : 'star'}
          </span>
        );
      })}
    </div>
  );
};

const RatingRow = ({ name, initial, email, rating, date, bgColor, textColor }) => (
  <tr className="hover:bg-slate-50/50 transition-colors">
    <td className="px-6 py-4 font-medium text-slate-900">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${bgColor} flex items-center justify-center ${textColor} font-bold text-xs`}>
          {initial}
        </div>
        {name}
      </div>
    </td>
    <td className="px-6 py-4 text-slate-500">{email}</td>
    <td className="px-6 py-4">
      <StarRating rating={rating} />
    </td>
    <td className="px-6 py-4 text-slate-500">{date}</td>
  </tr>
);

const OwnerDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ratings = [
    { id: 1, name: "Jane Doe", initial: "JD", email: "jane.doe@example.com", rating: 5, date: "Oct 24, 2023", bgColor: "bg-blue-100", textColor: "text-blue-600" },
    { id: 2, name: "Mark Smith", initial: "MS", email: "mark.smith@test.com", rating: 4, date: "Oct 22, 2023", bgColor: "bg-purple-100", textColor: "text-purple-600" },
    { id: 3, name: "Alice Lee", initial: "AL", email: "alice.lee@company.net", rating: 4.5, date: "Oct 20, 2023", bgColor: "bg-emerald-100", textColor: "text-emerald-600" },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen text-slate-900 font-sans">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-indigo-100/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600/10 p-2 rounded-lg text-indigo-600">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">RatingPlatform</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end text-right">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">John Doe</span>
                <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Store Owner</span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
            <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Store Overview</h2>
            <p className="text-slate-500 mt-1">View your store details and performance summary.</p>
          </div>
          <button className="bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2 w-fit">
            <span className="material-symbols-outlined text-[18px]">help</span>
            Support
          </button>
        </header>

        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-xl">info</span>
                Store Details
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Store Name</p>
                <p className="text-base font-medium text-slate-900">Downtown Coffee Roasters</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Store Email</p>
                <p className="text-base font-medium text-slate-900">contact@downtowncoffee.com</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Store Address</p>
                <div className="flex items-start gap-2">
                  <p className="text-base font-medium text-slate-900">123 Main St, Suite 400, Cityville, ST 12345</p>
                  <span className="material-symbols-outlined text-indigo-600 text-sm mt-1 cursor-pointer">map</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-indigo-600 text-9xl rotate-12">star</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Average Rating</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-6xl font-bold text-slate-900 tracking-tighter">4.8</span>
              <span className="text-xl text-slate-400 font-medium mb-2">/ 5.0</span>
            </div>
            <StarRating rating={4.5} />
            <p className="text-sm text-slate-400 mt-4">Based on 124 reviews</p>
          </div>
        </div>

        {/* User Ratings Table */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">User Ratings</h3>
            <button className="text-sm text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Sort by Date
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase font-semibold text-slate-500 tracking-wider">
                    <th className="px-6 py-4">User Name</th>
                    <th className="px-6 py-4">User Email</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Submitted On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {ratings.map((rate) => (
                    <RatingRow key={rate.id} {...rate} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <p className="text-xs text-slate-500">Showing 1-3 of 124 ratings</p>
              <div className="flex gap-2">
                <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-1 rounded-md hover:bg-slate-100 text-slate-600">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-4 px-1">Settings</h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-slate-800">Account Security</h4>
              <p className="text-sm text-slate-500 mt-1">Manage your password and account access.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">lock_reset</span>
              Change Password
            </button>
          </div>
        </section>

        <footer className="py-6 text-center text-xs text-slate-400">
          © 2023 RatingPlatform Inc. All rights reserved.
        </footer>
      </main>

      {/* Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Change Password</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Current Password</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm outline-none" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">New Password</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm outline-none" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="p-6 pt-2 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200/50 rounded-lg">Cancel</button>
              <button className="px-6 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
