import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/studentProfiles';
import { AdminActivity, AdminStats, ApprovedCredential } from '../types';

interface AdminPanelProps {
  stats: AdminStats;
  activities: AdminActivity[];
  approvedCredentials?: ApprovedCredential[];
  onClose: () => void;
  onApprovePaymentWithCredential?: (
    activityId: string,
    credential: { loginId: string; passcode: string }
  ) => void;
  onRejectPayment?: (activityId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  stats,
  activities: initialActivities,
  approvedCredentials = [],
  onClose,
  onApprovePaymentWithCredential,
  onRejectPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'verification' | 'credentials' | 'analytics' | 'reports'>('dashboard');
  const [activities, setActivities] = useState<AdminActivity[]>(initialActivities);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReviewItem, setSelectedReviewItem] = useState<AdminActivity | null>(null);

  // Credential Production state in modal
  const [prodLoginId, setProdLoginId] = useState('');
  const [prodPasscode, setProdPasscode] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setActivities(initialActivities);
  }, [initialActivities]);

  // When opening review item, prefill credentials
  useEffect(() => {
    if (selectedReviewItem) {
      if (selectedReviewItem.assignedCredential) {
        setProdLoginId(selectedReviewItem.assignedCredential.loginId);
        setProdPasscode(selectedReviewItem.assignedCredential.passcode);
      } else {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        setProdLoginId(`MPL-2026-${randomNum}`);
        setProdPasscode(`Campus#${randomNum}`);
      }
    }
  }, [selectedReviewItem]);

  const generateNewCredentials = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setProdLoginId(`MPL-2026-${randomNum}`);
    setProdPasscode(`Campus#${randomNum}`);
  };

  const handleApproveWithCredential = (id: string) => {
    const finalLoginId = prodLoginId.trim() || `MPL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const finalPasscode = prodPasscode.trim() || `Campus#${Math.floor(1000 + Math.random() * 9000)}`;

    setActivities((prev) =>
      prev.map((act) =>
        act.id === id
          ? {
              ...act,
              status: 'Completed' as const,
              assignedCredential: { loginId: finalLoginId, passcode: finalPasscode },
            }
          : act
      )
    );

    if (onApprovePaymentWithCredential) {
      onApprovePaymentWithCredential(id, { loginId: finalLoginId, passcode: finalPasscode });
    }

    if (selectedReviewItem && selectedReviewItem.id === id) {
      setSelectedReviewItem((prev) =>
        prev
          ? {
              ...prev,
              status: 'Completed',
              assignedCredential: { loginId: finalLoginId, passcode: finalPasscode },
            }
          : null
      );
    }
  };

  const handleReject = (id: string) => {
    setActivities((prev) =>
      prev.map((act) =>
        act.id === id ? { ...act, status: 'Investigation Required' as const } : act
      )
    );
    if (onRejectPayment) {
      onRejectPayment(id);
    }
    if (selectedReviewItem && selectedReviewItem.id === id) {
      setSelectedReviewItem((prev) => (prev ? { ...prev, status: 'Investigation Required' } : null));
    }
  };

  const filteredActivities = activities.filter((act) => {
    if (filterStatus === 'all') return true;
    return act.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  const pendingCount = activities.filter((act) => act.status === 'Pending Review').length;

  return (
    <div className="bg-[#1e0f10] text-[#f9dcdb] font-sans min-h-screen flex overflow-hidden fixed inset-0 z-50 animate-in fade-in duration-200">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1e0f10] border-r border-[#5b4040]/40 flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-[#5b4040]/40">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#ffb3b3]">Registrar Admin</h2>
            <button 
              onClick={onClose}
              className="text-xs px-2.5 py-1 rounded bg-[#423030] text-[#e3bebd] hover:text-white cursor-pointer"
            >
              Exit
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden glass-card border border-white/20">
              <img
                src={ASSETS.adminRegistrar}
                alt="Admin User"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#f9dcdb]">Registrar Desk</p>
              <p className="text-xs text-[#e3bebd]/80">MAHE Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
              { id: 'verification', label: 'Student Payments', icon: 'payments', badge: pendingCount },
              { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
              { id: 'reports', label: 'Moderation Logs', icon: 'flag' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-[#5edda8]/15 text-[#5edda8] border-r-4 border-[#5edda8]'
                      : 'text-[#e3bebd] hover:bg-[#423030]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#ff5260] text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Ambient Glow */}
        <div className="ambient-glow top-0 right-0 opacity-20 pointer-events-none"></div>

        {/* Top Header Bar */}
        <header className="flex justify-between items-center w-full px-6 py-4 border-b border-[#5b4040]/30 bg-[#1e0f10]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="md:hidden text-[#f9dcdb] p-1.5 rounded-lg glass-panel cursor-pointer"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF4B5C] to-[#6C4AB6]">
                REGISTRAR CONTROL & NOTIFICATIONS
              </h1>
              <p className="text-[11px] text-[#e3bebd]">Live verification and payment screenshot logs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="p-2 rounded-full bg-white/5 border border-white/10 text-white relative flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">notifications</span>
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF4B5C] text-white text-[9px] font-bold flex items-center justify-center border border-[#1e0f10]">
                    {pendingCount}
                  </span>
                )}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#5edda8]/10 text-[#5edda8] border border-[#5edda8]/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#5edda8] animate-ping"></span>
              <span>Live Updates</span>
            </div>
            
            <button 
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full bg-[#ff5260]/20 text-[#ffb3b3] border border-[#ff5260]/30 text-xs font-semibold hover:bg-[#ff5260]/30 transition-colors cursor-pointer"
            >
              Exit Admin
            </button>
          </div>
        </header>

        {/* Dashboard Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 z-10 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#f9dcdb] mb-1">Live Registrar Monitoring</h2>
            <p className="text-xs text-[#e3bebd]">Review student registrations, payment screenshots & UTR references.</p>
          </div>

          {/* Bento Grid Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-5 relative overflow-hidden group border border-white/10">
              <p className="text-xs font-semibold text-[#e3bebd] mb-1 uppercase tracking-wider">Total Registrations</p>
              <p className="text-3xl font-extrabold text-[#f9dcdb]">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-[#5edda8] mt-2 font-semibold">✓ Live Sync</p>
            </div>

            <div className="glass-card rounded-xl p-5 relative overflow-hidden group border border-white/10">
              <p className="text-xs font-semibold text-[#e3bebd] mb-1 uppercase tracking-wider">Verified Students</p>
              <p className="text-3xl font-extrabold text-[#f9dcdb]">{stats.verifiedStudents.toLocaleString()}</p>
              <p className="text-xs text-[#e3bebd] mt-2">Active @manipal.edu</p>
            </div>

            <div className="glass-card rounded-xl p-5 relative overflow-hidden group border border-[#FF4B5C]/40 bg-[#FF4B5C]/10">
              <p className="text-xs font-semibold text-[#ffb3b3] mb-1 uppercase tracking-wider">Pending Payment Proofs</p>
              <p className="text-3xl font-extrabold text-white">{pendingCount}</p>
              <p className="text-xs text-[#ffb3b3] mt-2 font-semibold animate-pulse">⚡ Needs Screenshot Review</p>
            </div>

            <div className="glass-card rounded-xl p-5 relative overflow-hidden group border border-white/10">
              <p className="text-xs font-semibold text-[#e3bebd] mb-1 uppercase tracking-wider">Campus Pass Active</p>
              <p className="text-3xl font-extrabold text-[#f9dcdb]">{stats.paidMembers.toLocaleString()}</p>
              <p className="text-xs text-[#5edda8] mt-2 font-semibold">₹29.69 Tier</p>
            </div>
          </div>

          {/* Activity Table */}
          <div className="glass-card rounded-xl overflow-hidden flex flex-col border border-white/10">
            <div className="p-5 border-b border-[#5b4040]/40 flex flex-wrap justify-between items-center bg-[#1e0f10]/40 gap-4">
              <div>
                <h3 className="text-base font-bold text-[#f9dcdb]">Real-Time Activity & Payment Submissions</h3>
                <p className="text-xs text-[#e3bebd]">Click any item to inspect uploaded payment screenshot and UTR</p>
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                {['all', 'Pending Review', 'Completed', 'Investigation'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      filterStatus === status
                        ? 'bg-[#6C4AB6] text-white font-bold'
                        : 'bg-[#423030]/60 text-[#e3bebd] hover:bg-[#423030]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-[#423030]/20 border-b border-[#5b4040]/40">
                    <th className="py-3.5 px-6 text-xs font-semibold text-[#e3bebd] uppercase tracking-wider">Student Name</th>
                    <th className="py-3.5 px-6 text-xs font-semibold text-[#e3bebd] uppercase tracking-wider">Action / Event</th>
                    <th className="py-3.5 px-6 text-xs font-semibold text-[#e3bebd] uppercase tracking-wider">Status</th>
                    <th className="py-3.5 px-6 text-xs font-semibold text-[#e3bebd] uppercase tracking-wider text-right">Verification & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#5b4040]/30">
                  {filteredActivities.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.avatarUrl || ASSETS.userAvatar}
                            alt={item.userName}
                            className="w-9 h-9 rounded-full object-cover border border-white/20"
                          />
                          <div>
                            <span className="text-sm font-semibold text-[#f9dcdb] block">{item.userName}</span>
                            {item.paymentDetails?.studentRegNo && (
                              <span className="text-[10px] text-[#e3bebd]/80 font-mono">Reg: {item.paymentDetails.studentRegNo}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-xs text-white font-medium">{item.action}</p>
                        {item.paymentDetails && (
                          <p className="text-[10px] text-[#5edda8] font-mono mt-0.5">
                            UTR: {item.paymentDetails.transactionRef} ({item.paymentDetails.amount})
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            item.status === 'Completed'
                              ? 'bg-[#0ba574]/20 text-[#5edda8] border-[#5edda8]/30'
                              : item.status === 'Pending Review'
                              ? 'bg-[#FF4B5C]/20 text-[#ffb3b3] border-[#FF4B5C]/40 animate-pulse'
                              : 'bg-[#55329e]/30 text-[#d1bcff] border-[#d1bcff]/30'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.paymentDetails && (
                            <button
                              onClick={() => setSelectedReviewItem(item)}
                              className="px-3 py-1 rounded-full bg-[#6C4AB6]/30 text-[#d1bcff] border border-[#6C4AB6]/50 hover:bg-[#6C4AB6]/50 text-xs font-bold cursor-pointer flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-sm">visibility</span>
                              <span>Inspect Proof</span>
                            </button>
                          )}

                          {item.status === 'Pending Review' && (
                            <button
                              onClick={() => handleApproveWithCredential(item.id)}
                              className="px-3 py-1 rounded-full bg-[#0ba574]/20 text-[#5edda8] border border-[#5edda8]/40 hover:bg-[#0ba574]/30 text-xs font-bold cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Screenshot & Payment Proof Review Modal */}
      {selectedReviewItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl max-w-md w-full space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#FF4B5C]">receipt_long</span>
                  <span>Payment Screenshot & Credential Approval</span>
                </h3>
                <p className="text-xs text-[#e3bebd]">{selectedReviewItem.userName}</p>
              </div>
              <button
                onClick={() => setSelectedReviewItem(null)}
                className="p-1 rounded-full text-[#e3bebd] hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {selectedReviewItem.paymentDetails ? (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <p className="text-white font-bold flex justify-between">
                    <span>Amount Transferred:</span>
                    <span className="text-[#5edda8] font-mono">{selectedReviewItem.paymentDetails.amount}</span>
                  </p>
                  <p className="text-[#e3bebd] flex justify-between font-mono">
                    <span>Submitted UPI ID:</span>
                    <span className="text-white">{selectedReviewItem.paymentDetails.upiNumber}</span>
                  </p>
                  <p className="text-[#e3bebd] flex justify-between font-mono">
                    <span>UTR / Ref ID:</span>
                    <span className="text-[#d1bcff] font-bold">{selectedReviewItem.paymentDetails.transactionRef}</span>
                  </p>
                  {selectedReviewItem.paymentDetails.studentRegNo && (
                    <p className="text-[#e3bebd] flex justify-between font-mono">
                      <span>Student Reg No:</span>
                      <span className="text-white font-bold">{selectedReviewItem.paymentDetails.studentRegNo}</span>
                    </p>
                  )}
                </div>

                {/* Screenshot Image Display */}
                <div>
                  <p className="text-xs font-bold text-[#e3bebd] mb-1 uppercase">Uploaded Screenshot Image</p>
                  <div className="rounded-2xl overflow-hidden border border-white/20 max-h-48 bg-black flex items-center justify-center">
                    <img
                      src={selectedReviewItem.paymentDetails.screenshotUrl}
                      alt="Uploaded Screenshot"
                      className="w-full h-full object-contain max-h-48"
                    />
                  </div>
                </div>

                {/* Admin Credential Assignment Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#2a1728] to-[#1a0f1c] border border-[#6C4AB6]/40 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#d1bcff] uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">vpn_key</span>
                      <span>Assign Student Login Credentials</span>
                    </span>
                    <button
                      type="button"
                      onClick={generateNewCredentials}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-[#5edda8] hover:bg-white/20 cursor-pointer font-mono font-bold"
                    >
                      ⚡ Auto-Generate
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-[11px] text-[#e3bebd] mb-1">
                        Produce Login ID (e.g., MPL-2026-8812)
                      </label>
                      <input
                        type="text"
                        value={prodLoginId}
                        onChange={(e) => setProdLoginId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white font-mono text-xs focus:border-[#5edda8] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#e3bebd] mb-1">
                        Produce Passcode (e.g., Campus#8812)
                      </label>
                      <input
                        type="text"
                        value={prodPasscode}
                        onChange={(e) => setProdPasscode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white font-mono text-xs focus:border-[#5edda8] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Status or Approval Buttons */}
                {selectedReviewItem.status === 'Completed' ? (
                  <div className="p-3 rounded-xl bg-[#5edda8]/15 border border-[#5edda8]/30 text-center text-xs text-[#5edda8] font-bold space-y-1">
                    <p>✓ Payment Approved & Credentials Shared to Student!</p>
                    <p className="text-white font-mono text-[11px]">
                      ID: {selectedReviewItem.assignedCredential?.loginId || prodLoginId} | Pass: {selectedReviewItem.assignedCredential?.passcode || prodPasscode}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleReject(selectedReviewItem.id)}
                      className="flex-1 py-3 rounded-xl bg-[#423030] text-[#ffb3b3] hover:bg-[#5b3030] text-xs font-bold uppercase cursor-pointer"
                    >
                      Flag / Reject
                    </button>
                    <button
                      onClick={() => handleApproveWithCredential(selectedReviewItem.id)}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0ba574] to-[#5edda8] text-slate-950 font-black text-xs uppercase cursor-pointer shadow-lg hover:opacity-90 active:scale-95 transition-all"
                    >
                      Approve & Issue Credentials ✓
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-[#e3bebd]">No payment screenshot attached for this item.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

