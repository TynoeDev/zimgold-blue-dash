import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/DashboardSidebar";
import type { SidebarTab } from "@/components/DashboardSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { cn } from "@/lib/utils";
import sandCharm from "@/assets/sand-charm.png";
import goldMountain from "@/assets/gold-mountain.png";
import { 
  Briefcase, Plus, Search, Filter, ChevronDown, Users, Calendar, 
  Paperclip, FileText, Image as ImageIcon, Download, CheckCircle2, 
  Clock, AlertCircle, TrendingUp, Target, DollarSign, BarChart3,
  MessageSquare, Edit, Trash2, MoreVertical, Star, Send
} from "lucide-react";

// TypeScript interfaces for deal management
type DealStatus = 'active' | 'pending' | 'completed' | 'on-hold';
type DealPriority = 'high' | 'medium' | 'low';
type DealCategory = 'mining' | 'trading' | 'partnership' | 'investment';

type User = {
  id: string;
  display_name: string;
  avatar_ipfs_hash?: string;
  membership_tier: string;
  is_online: boolean;
};

type Deal = {
  id: string;
  title: string;
  description: string;
  category: DealCategory;
  status: DealStatus;
  priority: DealPriority;
  assigned_to: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
  target_value: number;
  current_value: number;
  progress: number;
  documents_ipfs: { filename: string; ipfs_hash: string; mime_type: string; uploaded_at: string; uploaded_by: string }[];
  comments_count: number;
  deadline?: string;
};

type Comment = {
  id: string;
  deal_id: string;
  user_id: string;
  user: User;
  comment: string;
  created_at: string;
};

const CommandRoom = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>("ai-assistant");
  
  // Deal management state
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
  const [filterStatus, setFilterStatus] = useState<DealStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<DealCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newComment, setNewComment] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock current user (replace with Supabase Auth)
  const currentUser: User = {
    id: 'user-001',
    display_name: 'You',
    membership_tier: 'Underboss',
    is_online: true,
  };

  // Mock team members
  const teamMembers: User[] = [
    { id: 'user-002', display_name: 'Don Vincenzo', avatar_ipfs_hash: 'Qm...abc123', membership_tier: 'Don', is_online: true },
    { id: 'user-003', display_name: 'Marco DeLuca', avatar_ipfs_hash: undefined, membership_tier: 'Caporegime', is_online: true },
    { id: 'user-004', display_name: 'Sophia Marcelli', avatar_ipfs_hash: 'Qm...def456', membership_tier: 'Underboss', is_online: false },
    { id: 'user-005', display_name: 'Tony Rizzo', avatar_ipfs_hash: undefined, membership_tier: 'Soldier', is_online: true },
    { id: 'user-006', display_name: 'Isabella Romano', avatar_ipfs_hash: 'Qm...ghi789', membership_tier: 'Caporegime', is_online: true },
  ];

  // Mock deals data (replace with Supabase real-time subscription)
  const mockDeals: Deal[] = [
    {
      id: 'deal-001',
      title: 'Cascade Ridge Mining Acquisition',
      description: 'Strategic acquisition of Cascade Ridge mining rights. Projected 68% ROI over 24 months with low geological risk.',
      category: 'mining',
      status: 'active',
      priority: 'high',
      assigned_to: ['user-002', 'user-003', 'user-005'],
      created_by: 'user-002',
      created_at: '2025-10-15T14:30:00Z',
      updated_at: '2025-10-21T09:15:00Z',
      target_value: 5000000,
      current_value: 3400000,
      progress: 68,
      documents_ipfs: [
        { filename: 'geological-survey.pdf', ipfs_hash: 'Qm...survey123', mime_type: 'application/pdf', uploaded_at: '2025-10-16T10:00:00Z', uploaded_by: 'user-003' },
        { filename: 'acquisition-contract.pdf', ipfs_hash: 'Qm...contract456', mime_type: 'application/pdf', uploaded_at: '2025-10-18T14:30:00Z', uploaded_by: 'user-002' },
      ],
      comments_count: 12,
      deadline: '2025-11-01T23:59:59Z',
    },
    {
      id: 'deal-002',
      title: 'Gold Futures Trading Strategy',
      description: 'Multi-million dollar gold futures position targeting 12% quarterly returns through strategic timing and market analysis.',
      category: 'trading',
      status: 'active',
      priority: 'high',
      assigned_to: ['user-004', 'user-006'],
      created_by: 'user-004',
      created_at: '2025-10-18T11:00:00Z',
      updated_at: '2025-10-21T08:45:00Z',
      target_value: 8000000,
      current_value: 6640000,
      progress: 83,
      documents_ipfs: [
        { filename: 'market-analysis-q4.pdf', ipfs_hash: 'Qm...market789', mime_type: 'application/pdf', uploaded_at: '2025-10-19T09:00:00Z', uploaded_by: 'user-004' },
      ],
      comments_count: 8,
      deadline: '2025-12-31T23:59:59Z',
    },
    {
      id: 'deal-003',
      title: 'Cerulean Span Partnership',
      description: 'Joint venture with Cerulean Span for shared mining operations. Negotiating favorable terms for equipment and profit sharing.',
      category: 'partnership',
      status: 'pending',
      priority: 'medium',
      assigned_to: ['user-002', 'user-004', 'user-006'],
      created_by: 'user-006',
      created_at: '2025-10-12T16:20:00Z',
      updated_at: '2025-10-20T15:30:00Z',
      target_value: 3000000,
      current_value: 1260000,
      progress: 42,
      documents_ipfs: [],
      comments_count: 5,
      deadline: '2025-10-27T23:59:59Z',
    },
    {
      id: 'deal-004',
      title: 'Solana NFT Mining Rights Collection',
      description: 'Launch exclusive NFT collection representing tokenized mining rights. Includes smart contract development and marketing strategy.',
      category: 'investment',
      status: 'on-hold',
      priority: 'low',
      assigned_to: ['user-005'],
      created_by: 'user-003',
      created_at: '2025-10-08T10:00:00Z',
      updated_at: '2025-10-19T12:00:00Z',
      target_value: 2000000,
      current_value: 400000,
      progress: 20,
      documents_ipfs: [
        { filename: 'nft-whitepaper.pdf', ipfs_hash: 'Qm...nft321', mime_type: 'application/pdf', uploaded_at: '2025-10-10T11:00:00Z', uploaded_by: 'user-003' },
        { filename: 'smart-contract-audit.pdf', ipfs_hash: 'Qm...audit654', mime_type: 'application/pdf', uploaded_at: '2025-10-14T13:00:00Z', uploaded_by: 'user-005' },
      ],
      comments_count: 3,
    },
  ];

  // Mock comments for selected deal
  const mockComments: Comment[] = selectedDeal ? [
    {
      id: 'comment-001',
      deal_id: selectedDeal.id,
      user_id: 'user-002',
      user: teamMembers[0],
      comment: 'Geological survey results exceeded expectations. Recommend proceeding to Phase 2.',
      created_at: '2025-10-20T14:30:00Z',
    },
    {
      id: 'comment-002',
      deal_id: selectedDeal.id,
      user_id: 'user-003',
      user: teamMembers[1],
      comment: 'Contract terms finalized. Legal review scheduled for tomorrow.',
      created_at: '2025-10-21T09:15:00Z',
    },
  ] : [];

  // Helper functions
  const getTierColor = (tier: string): string => {
    const colors: Record<string, string> = {
      Don: 'from-purple-500 to-violet-600',
      Underboss: 'from-amber-500 to-orange-600',
      Caporegime: 'from-cyan-500 to-blue-600',
      Soldier: 'from-green-500 to-emerald-600',
      Associate: 'from-slate-500 to-slate-600',
    };
    return colors[tier] || colors.Associate;
  };

  const getStatusColor = (status: DealStatus): string => {
    const colors: Record<DealStatus, string> = {
      active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      pending: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      completed: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
      'on-hold': 'text-slate-400 bg-slate-400/10 border-slate-400/30',
    };
    return colors[status];
  };

  const getPriorityIcon = (priority: DealPriority) => {
    if (priority === 'high') return <AlertCircle className="h-4 w-4 text-rose-400" />;
    if (priority === 'medium') return <Clock className="h-4 w-4 text-amber-400" />;
    return <CheckCircle2 className="h-4 w-4 text-cyan-400" />;
  };

  const getCategoryIcon = (category: DealCategory) => {
    if (category === 'mining') return <Target className="h-4 w-4" />;
    if (category === 'trading') return <TrendingUp className="h-4 w-4" />;
    if (category === 'partnership') return <Users className="h-4 w-4" />;
    return <DollarSign className="h-4 w-4" />;
  };

  const getAvatarUrl = (user: User): string | null => {
    return user.avatar_ipfs_hash ? `https://gateway.pinata.cloud/ipfs/${user.avatar_ipfs_hash}` : null;
  };

  const getUserInitials = (name: string): string => {
    const words = name.trim().split(' ');
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(value);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDeadline = (dateString?: string): string => {
    if (!dateString) return 'No deadline';
    const deadline = new Date(dateString);
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / 86400000);
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  // Filter deals
  const filteredDeals = mockDeals.filter(deal => {
    const matchesStatus = filterStatus === 'all' || deal.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || deal.category === filterCategory;
    const matchesSearch = searchQuery === '' || 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Event handlers (TODO: Wire up Supabase)
  const handleCreateDeal = () => {
    // TODO: Open create deal modal
    // TODO: On submit, insert into Supabase:
    // const { data, error } = await supabase
    //   .from('deals')
    //   .insert([{ title, description, category, status, priority, assigned_to, created_by: currentUser.id }])
    // TODO: Real-time subscription will auto-update deals list
    console.log('Create new deal');
  };

  const handleFileUpload = async (dealId: string) => {
    if (!fileInputRef.current?.files?.[0]) return;
    const file = fileInputRef.current.files[0];
    
    // TODO: Upload to IPFS via Pinata:
    // const formData = new FormData();
    // formData.append('file', file);
    // const pinataResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    //   method: 'POST',
    //   headers: { Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}` },
    //   body: formData,
    // });
    // const { IpfsHash } = await pinataResponse.json();
    
    // TODO: Update deal in Supabase with new document:
    // const { data: deal } = await supabase.from('deals').select('documents_ipfs').eq('id', dealId).single();
    // const updatedDocs = [...deal.documents_ipfs, { filename: file.name, ipfs_hash: IpfsHash, mime_type: file.type, uploaded_at: new Date().toISOString(), uploaded_by: currentUser.id }];
    // await supabase.from('deals').update({ documents_ipfs: updatedDocs }).eq('id', dealId);
    
    console.log('Upload file to IPFS for deal:', dealId, file.name);
  };

  const handleAddComment = (dealId: string) => {
    if (!newComment.trim()) return;
    
    // TODO: Insert comment into Supabase:
    // await supabase
    //   .from('deal_comments')
    //   .insert([{ deal_id: dealId, user_id: currentUser.id, comment: newComment }])
    // TODO: Increment comments_count on deal
    // await supabase.from('deals').update({ comments_count: deal.comments_count + 1 }).eq('id', dealId);
    
    console.log('Add comment to deal:', dealId, newComment);
    setNewComment('');
  };

  const handleUpdateDealStatus = (dealId: string, newStatus: DealStatus) => {
    // TODO: Update deal status in Supabase:
    // await supabase.from('deals').update({ status: newStatus, updated_at: new Date().toISOString() }).eq('id', dealId);
    console.log('Update deal status:', dealId, newStatus);
  };

  const tabMeta: Record<SidebarTab, { label: string; accentBullet: string; accentText: string }> = {
    "discussion-forums": { label: "Deals", accentBullet: "bg-cyan-400", accentText: "text-cyan-300/70" },
    "networking-spaces": { label: "Team", accentBullet: "bg-cyan-400", accentText: "text-cyan-300/70" },
    "sentiment-analysis": { label: "Analytics", accentBullet: "bg-cyan-400", accentText: "text-cyan-300/70" },
    "ai-assistant": { label: "Active", accentBullet: "bg-cyan-300", accentText: "text-cyan-300/70" },
    "analytics-dashboards": { label: "Metrics", accentBullet: "bg-amber-400", accentText: "text-amber-300/70" },
    "portfolio-management": { label: "Documents", accentBullet: "bg-purple-400", accentText: "text-purple-300/70" },
  };

  const renderTabContent = () => {
    if (viewMode === 'detail' && selectedDeal) {
      // Deal Detail View
      return (
        <div className="space-y-6 pt-6">
          {/* Back button */}
          <button
            onClick={() => { setViewMode('grid'); setSelectedDeal(null); }}
            className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
          >
            ← Back to deals
          </button>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Main deal info */}
            <div className="space-y-6">
              {/* Header */}
              <div className="rounded-2xl glass-card-cyan glow-cyan-soft p-6 shadow-xl transition-all duration-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-gradient-to-br animate-float-gentle", getTierColor('Caporegime'))}>
                      {getCategoryIcon(selectedDeal.category)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedDeal.title}</h2>
                      <p className="text-sm text-cyan-200/60 mt-1">Created {formatDate(selectedDeal.created_at)}</p>
                    </div>
                  </div>
                  <button className="text-white/60 hover:text-white">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-sm text-cyan-100/80 leading-relaxed mb-6">{selectedDeal.description}</p>

                {/* Status badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider", getStatusColor(selectedDeal.status))}>
                    {selectedDeal.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/40 text-slate-300 border border-slate-600/30 uppercase tracking-wider flex items-center gap-1">
                    {getPriorityIcon(selectedDeal.priority)}
                    {selectedDeal.priority} priority
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/30 text-purple-300 border border-purple-700/30 uppercase tracking-wider">
                    {selectedDeal.category}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-cyan-200/80">Progress</span>
                    <span className="text-white font-semibold">{selectedDeal.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${selectedDeal.progress}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-black/40 rounded-lg p-4 border border-cyan-900/30">
                    <p className="text-xs text-cyan-300/60 uppercase tracking-wider mb-1">Target Value</p>
                    <p className="text-xl font-bold text-white">{formatCurrency(selectedDeal.target_value)}</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-4 border border-cyan-900/30">
                    <p className="text-xs text-cyan-300/60 uppercase tracking-wider mb-1">Current Value</p>
                    <p className="text-xl font-bold text-emerald-400">{formatCurrency(selectedDeal.current_value)}</p>
                  </div>
                </div>

                {/* Deadline */}
                {selectedDeal.deadline && (
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    <span className="text-cyan-200/80">Deadline:</span>
                    <span className="text-white font-semibold">{formatDeadline(selectedDeal.deadline)}</span>
                  </div>
                )}
              </div>

              {/* Documents section */}
              <div className="rounded-2xl glass-card-cyan glow-cyan-soft p-6 shadow-xl transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-cyan-400 animate-float-gentle" />
                    Documents ({selectedDeal.documents_ipfs.length})
                  </h3>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Upload
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={() => handleFileUpload(selectedDeal.id)}
                  />
                </div>

                {selectedDeal.documents_ipfs.length === 0 ? (
                  <div className="text-center py-8 text-cyan-300/50">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No documents yet. Upload documents to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedDeal.documents_ipfs.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-black/40 border border-cyan-900/30 rounded-lg hover:border-cyan-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {doc.mime_type.startsWith('image/') ? (
                            <ImageIcon className="h-5 w-5 text-purple-400" />
                          ) : (
                            <FileText className="h-5 w-5 text-cyan-400" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{doc.filename}</p>
                            <p className="text-xs text-cyan-300/50">
                              Uploaded {formatDate(doc.uploaded_at)} by {teamMembers.find(u => u.id === doc.uploaded_by)?.display_name || 'Unknown'}
                            </p>
                          </div>
                        </div>
                        <a
                          href={`https://gateway.pinata.cloud/ipfs/${doc.ipfs_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded transition-colors"
                        >
                          <Download className="h-3 w-3" />
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments section */}
              <div className="rounded-2xl glass-card-cyan glow-cyan-soft p-6 shadow-xl transition-all duration-500">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-cyan-400 animate-float-gentle" />
                  Comments ({mockComments.length})
                </h3>

                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-3 bg-black/40 border border-cyan-900/30 rounded-lg">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {getAvatarUrl(comment.user) ? (
                          <img
                            src={getAvatarUrl(comment.user)!}
                            alt={comment.user.display_name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br", getTierColor(comment.user.membership_tier))}>
                            {getUserInitials(comment.user.display_name)}
                          </div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">{comment.user.display_name}</span>
                          <span className={cn("px-2 py-0.5 rounded text-[0.65rem] font-semibold bg-gradient-to-r text-white", getTierColor(comment.user.membership_tier))}>
                            {comment.user.membership_tier}
                          </span>
                          <span className="text-xs text-cyan-300/50">{formatDate(comment.created_at)}</span>
                        </div>
                        <p className="text-sm text-cyan-100/80">{comment.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add comment */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(selectedDeal.id)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 bg-black/60 border border-cyan-900/40 rounded-lg text-white placeholder:text-cyan-300/30 focus:outline-none focus:border-cyan-600"
                  />
                  <button
                    onClick={() => handleAddComment(selectedDeal.id)}
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Team & Actions */}
            <div className="space-y-6">
              {/* Assigned team */}
              <div className="rounded-2xl glass-card-cyan glow-cyan-soft p-6 shadow-xl transition-all duration-500">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-cyan-400 animate-float-gentle" />
                  Assigned Team ({selectedDeal.assigned_to.length})
                </h3>
                <div className="space-y-3">
                  {selectedDeal.assigned_to.map((userId) => {
                    const user = teamMembers.find(u => u.id === userId);
                    if (!user) return null;
                    return (
                      <div key={userId} className="flex items-center gap-3 p-2">
                        {getAvatarUrl(user) ? (
                          <img
                            src={getAvatarUrl(user)!}
                            alt={user.display_name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br", getTierColor(user.membership_tier))}>
                            {getUserInitials(user.display_name)}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{user.display_name}</p>
                          <p className="text-xs text-cyan-300/60">{user.membership_tier}</p>
                        </div>
                        {user.is_online && (
                          <div className="h-2 w-2 rounded-full bg-green-400" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick actions */}
              <div className="rounded-2xl glass-card-cyan glow-cyan-soft p-6 shadow-xl transition-all duration-500">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleUpdateDealStatus(selectedDeal.id, 'active')}
                    className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Active
                  </button>
                  <button
                    onClick={() => handleUpdateDealStatus(selectedDeal.id, 'completed')}
                    className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Star className="h-4 w-4" />
                    Mark Completed
                  </button>
                  <button
                    onClick={() => handleUpdateDealStatus(selectedDeal.id, 'on-hold')}
                    className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Put On Hold
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid View - Deal Cards
    return (
      <div className="space-y-6 pt-6">
        {/* Header with filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateDeal}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg"
            >
              <Plus className="h-4 w-4" />
              New Deal
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-400/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deals..."
                className="pl-10 pr-4 py-2 bg-black/40 border border-cyan-900/40 rounded-lg text-white placeholder:text-cyan-300/30 focus:outline-none focus:border-cyan-600 w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as DealStatus | 'all')}
              className="px-3 py-2 bg-black/40 border border-cyan-900/40 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-600"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as DealCategory | 'all')}
              className="px-3 py-2 bg-black/40 border border-cyan-900/40 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-600"
            >
              <option value="all">All Categories</option>
              <option value="mining">Mining</option>
              <option value="trading">Trading</option>
              <option value="partnership">Partnership</option>
              <option value="investment">Investment</option>
            </select>
          </div>
        </div>

        {/* Deal cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              onClick={() => { setSelectedDeal(deal); setViewMode('detail'); }}
              className="group relative rounded-2xl glass-card-cyan glow-cyan-soft p-5 shadow-xl hover:border-cyan-400/40 transition-all duration-500 cursor-pointer hover:scale-[1.05]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={cn("p-2 rounded-lg bg-gradient-to-br animate-float-gentle", getTierColor('Caporegime'))}>
                  {getCategoryIcon(deal.category)}
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityIcon(deal.priority)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                {deal.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-cyan-100/70 mb-4 line-clamp-2">
                {deal.description}
              </p>

              {/* Status & Category */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={cn("px-2 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider", getStatusColor(deal.status))}>
                  {deal.status}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-900/30 text-purple-300 border border-purple-700/30 uppercase tracking-wider">
                  {deal.category}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-200/70">Progress</span>
                  <span className="text-white font-semibold">{deal.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    style={{ width: `${deal.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-cyan-900/30">
                <div className="flex items-center gap-2 text-xs text-cyan-300/60">
                  <Paperclip className="h-3.5 w-3.5" />
                  <span>{deal.documents_ipfs.length} docs</span>
                  <MessageSquare className="h-3.5 w-3.5 ml-2" />
                  <span>{deal.comments_count}</span>
                </div>
                <div className="flex items-center -space-x-2">
                  {deal.assigned_to.slice(0, 3).map((userId) => {
                    const user = teamMembers.find(u => u.id === userId);
                    if (!user) return null;
                    return getAvatarUrl(user) ? (
                      <img
                        key={userId}
                        src={getAvatarUrl(user)!}
                        alt={user.display_name}
                        className="h-6 w-6 rounded-full border-2 border-slate-900 object-cover"
                      />
                    ) : (
                      <div
                        key={userId}
                        className={cn("h-6 w-6 rounded-full border-2 border-slate-900 flex items-center justify-center text-[0.6rem] font-bold text-white bg-gradient-to-br", getTierColor(user.membership_tier))}
                      >
                        {getUserInitials(user.display_name)}
                      </div>
                    );
                  })}
                  {deal.assigned_to.length > 3 && (
                    <div className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[0.6rem] text-white">
                      +{deal.assigned_to.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Deadline badge */}
              {deal.deadline && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-amber-900/40 border border-amber-700/50 rounded text-xs text-amber-300 font-semibold">
                  {formatDeadline(deal.deadline)}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 mx-auto mb-4 text-cyan-400/30" />
            <p className="text-lg text-white mb-2">No deals found</p>
            <p className="text-sm text-cyan-300/50">Try adjusting your filters or create a new deal</p>
          </div>
        )}
      </div>
    );
  };

  const activeMeta = tabMeta[activeTab];

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#040708] lg:flex-row">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="relative z-20 flex flex-1 overflow-hidden bg-gradient-to-br from-[#090909] via-[#050505] to-[#020202]">
        <div className="flex flex-1 overflow-auto pl-5 pr-0 pt-0 pb-0 sm:pl-8 sm:pr-0 sm:pt-0 sm:pb-0">
          <div className="flex w-full gap-8">
            {/* Main Content */}
            <section className="flex min-w-0 flex-1 flex-col pt-10 pb-12 sm:pt-12">
              <div className="text-left text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-cyan-300/80">
                  Gold Mining in the Future
                </p>
                <h1 className="mt-2 text-[36px] font-bold tracking-[0.14em] text-white sm:text-[40px]">
                  Command Room
                </h1>
              </div>

              <div className="mt-6">
                <h2
                  className={cn(
                    "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
                    activeMeta.accentText
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", activeMeta.accentBullet)} />
                  {activeMeta.label}
                </h2>
                <div className="mt-3 h-px w-full bg-white/10" />

                <div className="relative mt-6 pb-48">{renderTabContent()}</div>
              </div>
            </section>

            {/* Right Sidebar Panel */}
            <aside
              className="flex w-full max-w-[320px] flex-col self-stretch border-y border-l border-white/5 bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent px-5 py-6 pr-8 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              style={{ backgroundColor: "rgba(10,10,10,0.95)" }}
            >
              <RightSidebar theme="cyan" sandCharmImage={sandCharm} />
            </aside>
          </div>
        </div>
      </main>

      {/* Background mountain - pushed to the back */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[5] flex justify-center">
        <img
          src={goldMountain}
          alt="Gold mountain"
          className="w-[min(760px,90vw)] max-w-5xl opacity-95 drop-shadow-[0_32px_42px_rgba(0,0,0,0.55)]"
        />
      </div>

      {/* Lightweight volumetric fog - 3 layers for depth with cyan theme */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[10] flex justify-center overflow-hidden">
        {/* Fog layer 1 - furthest */}
        <div 
          className="absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-900/20 via-cyan-800/10 to-transparent blur-3xl animate-fog-drift-1"
          style={{ transform: 'translateX(-50%) translateY(20px)' }}
        />
        
        {/* Fog layer 2 - middle */}
        <div 
          className="absolute bottom-0 left-1/2 h-40 w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-t from-blue-900/15 via-blue-800/8 to-transparent blur-2xl animate-fog-drift-2"
          style={{ transform: 'translateX(-30%) translateY(30px)' }}
        />
        
        {/* Fog layer 3 - closest */}
        <div 
          className="absolute bottom-0 left-1/2 h-36 w-[450px] -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-700/12 via-cyan-600/6 to-transparent blur-xl animate-fog-drift-3"
          style={{ transform: 'translateX(-70%) translateY(40px)' }}
        />
      </div>
    </div>
  );
};

export default CommandRoom;
