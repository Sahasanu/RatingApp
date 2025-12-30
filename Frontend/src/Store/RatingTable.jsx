import React from 'react'
import RatingRow from './Rating';
function RatingTable({ratings}) {
  return (
        <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900">User Ratings</h3>
                        {/* <button className="text-sm text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-slate-50 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">sort</span>
                            Sort by Date
                        </button> */}
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
                                    {ratings.length > 0 ? ratings.map((rate) => (
                                        <RatingRow key={rate.id} {...rate} />
                                    )) : (
                                        <tr><td colSpan="4" className="px-6 py-4 text-center text-slate-500">No ratings yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
  )
}

export default RatingTable