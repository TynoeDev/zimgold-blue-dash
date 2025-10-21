import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/DashboardSidebar";
import type { SidebarTab } from "@/components/DashboardSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { cn } from "@/lib/utils";
import { Send, Paperclip, Image as ImageIcon, Smile, Users, Hash, Pin, Search, MoreVertical, ThumbsUp, Heart, Sparkles } from "lucide-react";
import sandCharm from "@/assets/sand-charm.png";
import goldMountain from "@/assets/gold-mountain.png";

// TODO: Replace with real user data from Supabase after authentication setup
type User = {
  id: string;
  display_name: string;
  avatar_ipfs_hash?: string; // IPFS CID for avatar
  membership_tier: string;
  is_online: boolean;
};

// TODO: Replace with real message data from Supabase real-time subscription
type Message = {
  id: string;
  user_id: string;
  user: User;
  message: string;
  message_type: 'text' | 'image' | 'file';
  attachments_ipfs: { filename: string; ipfs_hash: string; mime_type: string }[];
  created_at: string;
  reactions: { [emoji: string]: string[] }; // emoji -> array of user IDs
  is_pinned: boolean;
  reply_to?: string;
};

const Lounge = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<SidebarTab>("discussion-forums");
  const [message, setMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // TODO: Replace with current authenticated user from Supabase Auth
  const currentUser: User = {
    id: "current-user-id",
    display_name: "You",
    membership_tier: "Associate",
    is_online: true,
  };

  // TODO: Replace with real Supabase real-time subscription
  // Example: supabase.channel('lounge_chat').on('postgres_changes', ...)
  const mockMessages: Message[] = [
    {
      id: "1",
      user_id: "user-1",
      user: {
        id: "user-1",
        display_name: "Don Vincenzo",
        membership_tier: "Don",
        is_online: true,
      },
      message: "Welcome to the lounge, family. Let's discuss our next big move. 🎯",
      message_type: "text",
      attachments_ipfs: [],
      created_at: new Date(Date.now() - 3600000).toISOString(),
      reactions: { "👍": ["user-2", "user-3"], "🔥": ["user-2"] },
      is_pinned: true,
    },
    {
      id: "2",
      user_id: "user-2",
      user: {
        id: "user-2",
        display_name: "Sophia Marcelli",
        membership_tier: "Caporegime",
        is_online: true,
      },
      message: "I've been analyzing the Solana ecosystem. The NFT market is heating up again.",
      message_type: "text",
      attachments_ipfs: [],
      created_at: new Date(Date.now() - 1800000).toISOString(),
      reactions: { "💡": ["user-1", "user-3"] },
      is_pinned: false,
    },
    {
      id: "3",
      user_id: "user-3",
      user: {
        id: "user-3",
        display_name: "Marco \"The Shark\" DeLuca",
        membership_tier: "Soldier",
        is_online: false,
      },
      message: "Just closed a deal worth 50K. Anyone interested in partnership opportunities?",
      message_type: "text",
      attachments_ipfs: [],
      created_at: new Date(Date.now() - 900000).toISOString(),
      reactions: { "🤝": ["user-1"], "💰": ["user-1", "user-2"] },
      is_pinned: false,
    },
  ];

  // TODO: Replace with real-time online members from Supabase
  const onlineMembers: User[] = [
    { id: "user-1", display_name: "Don Vincenzo", membership_tier: "Don", is_online: true },
    { id: "user-2", display_name: "Sophia Marcelli", membership_tier: "Caporegime", is_online: true },
    { id: "user-4", display_name: "Anthony Russo", membership_tier: "Underboss", is_online: true },
    { id: "user-5", display_name: "Isabella Romano", membership_tier: "Soldier", is_online: true },
  ];

  const channels = [
    { id: "general", name: "General Chat", icon: Hash, memberCount: 47 },
    { id: "deals", name: "Deal Rooms", icon: Sparkles, memberCount: 23 },
    { id: "tech", name: "Tech Talk", icon: Hash, memberCount: 31 },
    { id: "market", name: "Market Insights", icon: Hash, memberCount: 56 },
  ];

  const tabMeta: Record<SidebarTab, { label: string; accentBullet: string; accentText: string }> = {
    "discussion-forums": { label: "Forum", accentBullet: "bg-amber-400", accentText: "text-amber-300/70" },
    "networking-spaces": { label: "Networking", accentBullet: "bg-cyan-300", accentText: "text-cyan-300/70" },
    "sentiment-analysis": { label: "Sentiment", accentBullet: "bg-purple-400", accentText: "text-purple-300/70" },
    "ai-assistant": { label: "AI Assistant", accentBullet: "bg-green-400", accentText: "text-green-300/70" },
    "analytics-dashboards": { label: "Analytics", accentBullet: "bg-blue-400", accentText: "text-blue-300/70" },
    "portfolio-management": { label: "Portfolio", accentBullet: "bg-red-400", accentText: "text-red-300/70" },
  };

  const activeMeta = tabMeta[activeTab];

  // Get tier badge color
  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      Don: "bg-gradient-to-r from-purple-500 to-violet-600",
      Underboss: "bg-gradient-to-r from-amber-500 to-orange-600",
      Caporegime: "bg-gradient-to-r from-cyan-500 to-blue-600",
      Soldier: "bg-gradient-to-r from-green-500 to-emerald-600",
      Associate: "bg-gradient-to-r from-slate-500 to-slate-600",
    };
    return colors[tier] || colors.Associate;
  };

  // Get avatar URL from IPFS or fallback to initials
  const getAvatarUrl = (user: User) => {
    if (user.avatar_ipfs_hash) {
      // TODO: Replace with actual IPFS gateway after integration
      return `https://gateway.pinata.cloud/ipfs/${user.avatar_ipfs_hash}`;
    }
    return null; // Will show initials instead
  };

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // TODO: Implement Supabase insert
    // await supabase.from('lounge_messages').insert({
    //   user_id: currentUser.id,
    //   message: message,
    //   message_type: 'text',
    //   attachments_ipfs: [],
    // });

    console.log("📨 Sending message:", message);
    setMessage("");
  };

  // Handle file upload to IPFS
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Implement IPFS upload via Pinata
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${PINATA_JWT}` },
    //   body: formData
    // });
    // const { IpfsHash } = await response.json();
    
    // Then insert message with IPFS reference:
    // await supabase.from('lounge_messages').insert({
    //   user_id: currentUser.id,
    //   message: `Shared ${file.name}`,
    //   message_type: file.type.startsWith('image/') ? 'image' : 'file',
    //   attachments_ipfs: [{ filename: file.name, ipfs_hash: IpfsHash, mime_type: file.type }],
    // });

    console.log("📎 Uploading file to IPFS:", file.name);
  };

  // Handle reaction to message
  const handleReaction = async (messageId: string, emoji: string) => {
    // TODO: Implement Supabase update for reactions
    // const message = await supabase.from('lounge_messages').select('reactions').eq('id', messageId).single();
    // const reactions = message.data.reactions || {};
    // if (!reactions[emoji]) reactions[emoji] = [];
    // if (reactions[emoji].includes(currentUser.id)) {
    //   reactions[emoji] = reactions[emoji].filter(id => id !== currentUser.id);
    // } else {
    //   reactions[emoji].push(currentUser.id);
    // }
    // await supabase.from('lounge_messages').update({ reactions }).eq('id', messageId);

    console.log("👍 Reacting to message:", messageId, emoji);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "discussion-forums":
        // REAL-TIME CHAT INTERFACE
        return (
          <div className="flex h-[calc(100vh-200px)] gap-4">
            {/* Channel List */}
            <div className="w-64 rounded-2xl glass-card-amber glow-amber-soft shadow-lg">
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-200/80">Channels</h3>
                  <button className="rounded-lg p-1 hover:bg-white/10 transition-all duration-300">
                    <Search className="h-4 w-4 text-white/60" />
                  </button>
                </div>
                
                <div className="space-y-1">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <button
                        key={channel.id}
                        onClick={() => setSelectedChannel(channel.id)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-all duration-300 hover:scale-105",
                          selectedChannel === channel.id
                            ? "glass-card-amber glow-amber-soft text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white/80"
                        )}
                      >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1 text-sm font-medium">{channel.name}</span>
                      <span className="text-xs text-white/40">{channel.memberCount}</span>
                    </button>
                  );
                })}
              </div>

              {/* TODO: Add voice channels section when implementing */}
              <div className="mt-6">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-200/60">Voice Rooms</h3>
                <p className="text-xs text-white/40">Coming with Supabase Realtime</p>
              </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex flex-1 flex-col rounded-2xl glass-card-amber shadow-lg">
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-amber-400" />
                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      {channels.find(c => c.id === selectedChannel)?.name}
                    </h2>
                    <p className="text-xs text-white/50">
                      {channels.find(c => c.id === selectedChannel)?.memberCount} members online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <Pin className="h-4 w-4 text-white/60" />
                  </button>
                  <button className="rounded-lg p-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <Search className="h-4 w-4 text-white/60" />
                  </button>
                  <button className="rounded-lg p-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <MoreVertical className="h-4 w-4 text-white/60" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {mockMessages.map((msg) => {
                  const avatarUrl = getAvatarUrl(msg.user);
                  const initials = getUserInitials(msg.user.display_name);
                  const tierColor = getTierColor(msg.user.membership_tier);

                  return (
                    <div key={msg.id} className="group relative flex gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={msg.user.display_name}
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-amber-500/50 animate-float-gentle"
                          />
                        ) : (
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-amber-500/50 animate-float-gentle", tierColor)}>
                            {initials}
                          </div>
                        )}
                        {msg.user.is_online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-green-500 animate-pulse"></div>
                        )}
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-white text-sm">{msg.user.display_name}</span>
                          <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white", tierColor)}>
                            {msg.user.membership_tier}
                          </span>
                          <span className="text-xs text-white/40">
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {msg.is_pinned && (
                            <Pin className="h-3 w-3 text-amber-400" />
                          )}
                        </div>

                        <p className="mt-1 text-sm text-white/90 leading-relaxed">{msg.message}</p>

                        {/* Attachments from IPFS */}
                        {msg.attachments_ipfs.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {msg.attachments_ipfs.map((attachment, idx) => (
                              <div key={idx} className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 p-3">
                                {attachment.mime_type.startsWith('image/') ? (
                                  <img
                                    src={`https://gateway.pinata.cloud/ipfs/${attachment.ipfs_hash}`}
                                    alt={attachment.filename}
                                    className="max-w-sm rounded-lg"
                                  />
                                ) : (
                                  <>
                                    <Paperclip className="h-4 w-4 text-amber-400" />
                                    <span className="text-sm text-white/80">{attachment.filename}</span>
                                    <a
                                      href={`https://gateway.pinata.cloud/ipfs/${attachment.ipfs_hash}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-auto text-xs text-amber-400 hover:text-amber-300"
                                    >
                                      Download
                                    </a>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reactions */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Object.entries(msg.reactions).map(([emoji, userIds]) => (
                            <button
                              key={emoji}
                              onClick={() => handleReaction(msg.id, emoji)}
                              className={cn(
                                "flex items-center gap-1 rounded-full border px-2 py-1 text-xs transition-all duration-300 hover:scale-110",
                                userIds.includes(currentUser.id)
                                  ? "border-amber-400/50 glass-card-amber glow-amber-soft text-amber-200"
                                  : "border-white/10 glass-card text-white/60 hover:border-white/30"
                              )}
                            >
                              <span>{emoji}</span>
                              <span>{userIds.length}</span>
                            </button>
                          ))}
                          
                          {/* Add reaction button */}
                          <button
                            onClick={() => handleReaction(msg.id, "👍")}
                            className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/40 opacity-0 transition-opacity hover:border-white/30 hover:bg-black/40 hover:text-white/60 group-hover:opacity-100"
                          >
                            <Smile className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t border-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 rounded-lg glass-card px-4 py-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg p-1.5 text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-110"
                    title="Upload file to IPFS"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                    title="Upload image to IPFS"
                  >
                    <ImageIcon className="h-5 w-5" />
                  </button>

                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Message the lounge..."
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
                  />

                  <button className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                    <Smile className="h-5 w-5" />
                  </button>

                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={cn(
                      "rounded-lg p-1.5 transition-colors",
                      message.trim()
                        ? "bg-amber-500 text-white hover:bg-amber-600"
                        : "text-white/40"
                    )}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-xs text-white/40">
                  💡 Files are stored on IPFS for permanent, decentralized access
                </p>
              </div>
            </div>

            {/* Online Members */}
            <div className="w-56 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 via-transparent to-black/50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-200/80">
                  Online — {onlineMembers.length}
                </h3>
                <Users className="h-4 w-4 text-white/60" />
              </div>

              <div className="space-y-2">
                {onlineMembers.map((member) => {
                  const avatarUrl = getAvatarUrl(member);
                  const initials = getUserInitials(member.display_name);
                  const tierColor = getTierColor(member.membership_tier);

                  return (
                    <div key={member.id} className="flex items-center gap-2">
                      <div className="relative">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={member.display_name}
                            className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
                          />
                        ) : (
                          <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white ring-1 ring-white/20", tierColor)}>
                            {initials}
                          </div>
                        )}
                        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-black bg-green-500"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-medium text-white">{member.display_name}</p>
                        <p className="text-[10px] text-white/40">{member.membership_tier}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-lg border border-amber-400/20 bg-amber-500/10 p-3">
                <p className="text-xs font-semibold text-amber-200">🔐 Authenticated Only</p>
                <p className="mt-1 text-[10px] text-white/60">
                  Real-time chat will be available after Supabase integration
                </p>
              </div>
            </div>
          </div>
        );

      case "networking-spaces":
        // TODO: Implement voice rooms with Supabase Realtime
        return (
          <div className="flex items-center justify-center pt-20">
            <div className="max-w-md text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-cyan-500/20 p-4">
                  <Users className="h-12 w-12 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">Voice Rooms</h3>
              <p className="mt-3 text-sm text-white/60">
                Real-time voice chat and networking spaces will be available after Supabase Realtime integration.
              </p>
              <div className="mt-6 rounded-lg border border-cyan-400/20 bg-cyan-500/10 p-4">
                <p className="text-xs font-semibold text-cyan-200">📋 Planned Features:</p>
                <ul className="mt-2 space-y-1 text-left text-xs text-white/60">
                  <li>• Live voice channels</li>
                  <li>• Screen sharing</li>
                  <li>• Scheduled meetups</li>
                  <li>• Breakout rooms</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center pt-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/80">Coming Soon</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Feature Under Development</h3>
              <p className="mt-4 max-w-md text-sm text-white/60">
                This section will be enhanced with Supabase integration for real-time functionality.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#050505] lg:flex-row">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="relative z-20 flex flex-1 overflow-hidden bg-gradient-to-br from-[#090909] via-[#050505] to-[#020202]">
        <div className="flex flex-1 overflow-auto pl-5 pr-0 pt-0 pb-0 sm:pl-8 sm:pr-0 sm:pt-0 sm:pb-0">
          <div className="flex w-full gap-8">
            <section className="flex min-w-0 flex-1 flex-col pt-10 pb-12 sm:pt-12">
              <div className="text-left text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-amber-300/80">
                  Gold Mining in the Future
                </p>
                <h1 className="mt-2 text-[36px] font-bold tracking-[0.14em] text-white sm:text-[40px]">
                  Mafia Lounge
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

            <aside
              className="flex w-full max-w-[320px] flex-col self-stretch border-y border-l border-white/5 bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent px-5 py-6 pr-8 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              style={{ backgroundColor: "rgba(10,10,10,0.95)" }}
            >
              <RightSidebar theme="amber" sandCharmImage={sandCharm} />
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

      {/* Lightweight volumetric fog - 3 layers for depth */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[10] flex justify-center overflow-hidden">
        {/* Fog layer 1 - furthest */}
        <div 
          className="absolute bottom-0 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-900/20 via-amber-800/10 to-transparent blur-3xl animate-fog-drift-1"
          style={{ transform: 'translateX(-50%) translateY(20px)' }}
        />
        
        {/* Fog layer 2 - middle */}
        <div 
          className="absolute bottom-0 left-1/2 h-40 w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-900/15 via-orange-800/8 to-transparent blur-2xl animate-fog-drift-2"
          style={{ transform: 'translateX(-30%) translateY(30px)' }}
        />
        
        {/* Fog layer 3 - closest */}
        <div 
          className="absolute bottom-0 left-1/2 h-36 w-[450px] -translate-x-1/2 rounded-full bg-gradient-to-t from-amber-700/12 via-amber-600/6 to-transparent blur-xl animate-fog-drift-3"
          style={{ transform: 'translateX(-70%) translateY(40px)' }}
        />
      </div>
    </div>
  );
};

export default Lounge;
