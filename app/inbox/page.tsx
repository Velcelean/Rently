"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// 1. DEFINIREA TIPURILOR STRICTE (TYPESCRIPT)
// ==========================================
interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

interface Listing {
  id: string;
  title: string;
  city: string;
  image_url: string | null;
  image_urls: string[] | null;
  price: number;
}

interface ChatMessage {
  id: string;
  text: string;
  is_read: boolean;
  sender_id: string;
  created_at: string;
}

interface Conversation {
  id: string;
  created_at: string;
  listing_id: string;
  tenant_id: string;
  owner_id: string;
  listings: Listing;
  tenant: Profile;
  owner: Profile;
  chat_messages: ChatMessage[];
  lastMessage?: ChatMessage | null;
  hasUnread?: boolean;
  otherUser?: Profile;
}

// ==========================================
// 2. FUNCȚII UTILE (HELPERS)
// ==========================================
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// Formatare inteligentă a timpului
function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0 && now.getDate() === date.getDate()) {
    return date.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });
  } else if (diffInDays === 1 || (diffInDays === 0 && now.getDate() !== date.getDate())) {
    return "Ieri";
  } else if (diffInDays < 7) {
    const days = ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"];
    return days[date.getDay()];
  } else {
    return date.toLocaleDateString("ro-RO", { day: "numeric", month: "short" });
  }
}

const Icons = {
  Search: () => <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  CheckAll: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Refresh: ({ spinning }: { spinning: boolean }) => <svg className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Filter: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  Inbox: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>,
  Key: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>,
  Home: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
};

// ==========================================
// 4. COMPONENTA PRINCIPALĂ
// ==========================================
export default function InboxPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "owner" | "tenant">("all");
  
  const [selectedConvs, setSelectedConvs] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const fetchConversations = async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/login");
        return;
      }
      
      const user = session.user;
      setCurrentUser({ id: user.id, full_name: user.user_metadata?.full_name || "Utilizator", avatar_url: null });

      const { data: convs, error } = await supabase
        .from("conversations")
        .select(`
          id, created_at, listing_id, tenant_id, owner_id,
          listings ( id, title, city, image_url, image_urls, price ),
          tenant:profiles!conversations_tenant_id_fkey ( id, full_name, avatar_url ),
          owner:profiles!conversations_owner_id_fkey ( id, full_name, avatar_url ),
          chat_messages ( id, text, is_read, sender_id, created_at )
        `)
        .or(`tenant_id.eq.${user.id},owner_id.eq.${user.id}`);

      if (error) {
        console.error("Eroare Supabase la select:", error.message, error.hint);
        throw error;
      }

      if (convs) {
        const formattedConvs: Conversation[] = convs.map((conv: any) => {
          const sortedMsgs = conv.chat_messages?.sort((a: any, b: any) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          const lastMessage = sortedMsgs && sortedMsgs.length > 0 ? sortedMsgs[0] : null;
          
          const isMeTenant = user.id === conv.tenant_id;
          const otherUser = isMeTenant ? conv.owner : conv.tenant;
          const hasUnread = lastMessage && lastMessage.sender_id !== user.id && !lastMessage.is_read;

          return { ...conv, lastMessage, otherUser, hasUnread };
        }).sort((a, b) => {
          const dateA = a.lastMessage ? new Date(a.lastMessage.created_at).getTime() : new Date(a.created_at).getTime();
          const dateB = b.lastMessage ? new Date(b.lastMessage.created_at).getTime() : new Date(b.created_at).getTime();
          return dateB - dateA;
        });

        setConversations(formattedConvs);
      }
    } catch (error: any) {
      console.error("Eroare completă la preluarea conversațiilor:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchConversations();

    const channel = supabase
      .channel('global-inbox')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  const filteredConversations = useMemo(() => {
    return conversations.filter(conv => {
      if (activeTab === "unread" && !conv.hasUnread) return false;
      if (activeTab === "owner" && conv.owner_id !== currentUser?.id) return false;
      if (activeTab === "tenant" && conv.tenant_id !== currentUser?.id) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = conv.otherUser?.full_name?.toLowerCase().includes(query);
        const matchTitle = conv.listings?.title?.toLowerCase().includes(query);
        const matchCity = conv.listings?.city?.toLowerCase().includes(query);
        if (!matchName && !matchTitle && !matchCity) return false;
      }
      return true;
    });
  }, [conversations, activeTab, searchQuery, currentUser?.id]);

  const toggleSelection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newSet = new Set(selectedConvs);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedConvs(newSet);
  };

  const markSelectedAsRead = async () => {
    if (selectedConvs.size === 0 || !currentUser) return;
    setIsRefreshing(true);
    
    try {
      const convIdsArray = Array.from(selectedConvs);
      const { error } = await supabase
        .from("chat_messages")
        .update({ is_read: true })
        .in("conversation_id", convIdsArray)
        .neq("sender_id", currentUser.id)
        .eq("is_read", false);

      if (error) throw error;
      
      setSelectedConvs(new Set());
      setIsSelectionMode(false);
      fetchConversations();
    } catch (err) {
      console.error("Eroare la marcarea mesajelor:", err);
      setIsRefreshing(false);
    }
  };

  const SkeletonCard = () => (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 animate-pulse">
      <div className="flex items-center gap-5 overflow-hidden w-full pl-2">
        <div className="w-16 h-16 rounded-xl bg-slate-200 shrink-0"></div>
        <div className="flex-grow space-y-3">
          <div className="flex justify-between">
            <div className="h-5 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-12"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900">
      <Header />

      <main className="max-w-6xl w-full mx-auto px-4 py-8 lg:py-12 flex-grow flex flex-col lg:flex-row gap-8">
        
        <aside className="lg:w-72 shrink-0 space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2">Inbox</h1>
            <p className="text-slate-500 font-medium text-sm">Controlează-ți discuțiile și negocierile într-un singur loc.</p>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icons.Search />
            </div>
            <input
              type="text"
              placeholder="Caută pe nume, titlu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:text-slate-400 placeholder:font-medium shadow-sm"
            />
          </div>

          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 custom-scrollbar">
            {[
              { id: "all", label: "Toate mesajele", icon: <Icons.Inbox /> },
              { id: "unread", label: "Necitite", icon: <Icons.Filter /> },
              { id: "owner", label: "Anunțurile Mele", icon: <Icons.Home /> },
              { id: "tenant", label: "Ca și Chiriaș", icon: <Icons.Key /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap lg:whitespace-normal text-left ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-transparent text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-white' : 'text-slate-400'}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-grow flex flex-col min-w-0">
          
          {/* BARĂ ACȚIUNI FĂRĂ STICKY */}
          <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSelectionMode(!isSelectionMode)}
                className={`text-sm font-bold px-4 py-2 rounded-xl transition-colors border ${
                  isSelectionMode ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isSelectionMode ? "Anulează selecția" : "Selectare multiplă"}
              </button>
              
              {isSelectionMode && selectedConvs.size > 0 && (
                <button 
                  onClick={markSelectedAsRead}
                  className="flex items-center gap-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors shadow-sm animate-fade-in-up"
                >
                  <Icons.CheckAll />
                  Marchează ({selectedConvs.size}) ca citite
                </button>
              )}
            </div>

            <button 
              onClick={() => fetchConversations(true)}
              className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-xl hover:bg-blue-50"
              title="Reîncarcă mesajele"
            >
              <Icons.Refresh spinning={isRefreshing} />
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-[2rem] p-12 lg:p-20 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl block">📭</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                {searchQuery ? "Niciun rezultat găsit" : activeTab === "unread" ? "Ești la zi!" : "Inbox-ul tău e gol"}
              </h3>
              <p className="text-slate-500 text-base mb-8 font-medium max-w-md mx-auto leading-relaxed">
                {searchQuery 
                  ? "Nu am găsit nicio conversație care să se potrivească căutării tale." 
                  : "Nu ai nicio conversație aici deocamdată. Orice mesaj nou primit sau trimis va apărea direct în această listă."}
              </p>
              {!searchQuery && (
                <Link href="/anunturi" className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-black transition-all shadow-xl hover:-translate-y-1 duration-300">
                  Începe să cauți
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4 pb-20">
              {filteredConversations.map((conv) => {
                const listingImg = conv.listings?.image_urls?.[0] || conv.listings?.image_url;
                const lastMsg = conv.lastMessage;
                const hasUnread = conv.hasUnread;
                const isSelected = selectedConvs.has(conv.id);

                return (
                  <Link 
                    key={conv.id} 
                    href={`/inbox/${conv.id}`}
                    onClick={(e) => {
                      if (isSelectionMode) toggleSelection(e, conv.id);
                    }}
                    className={`block bg-white p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 group relative overflow-hidden ${
                      isSelected 
                        ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-md bg-blue-50/30' 
                        : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                    }`}
                  >
                    {hasUnread && !isSelectionMode && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
                    )}

                    <div className="flex items-center gap-5 overflow-hidden w-full pl-2">
                      
                      {isSelectionMode && (
                        <div className="shrink-0 flex items-center justify-center mr-2">
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                            {isSelected && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                        </div>
                      )}

                      <div className="relative w-[4.5rem] h-[4.5rem] rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-inner">
                        {listingImg ? (
                          <img src={listingImg} alt="Listing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">🏠</div>
                        )}
                        {hasUnread && !isSelectionMode && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </div>
                      
                      <div className="truncate flex-grow flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-lg truncate transition-colors group-hover:text-blue-600 ${hasUnread ? 'font-black text-slate-900' : 'font-bold text-slate-800'}`}>
                            {conv.otherUser?.full_name || "Utilizator Roomy"}
                          </h4>
                          
                          {lastMsg && (
                            <span className={`text-xs whitespace-nowrap ml-4 ${hasUnread ? 'text-blue-600 font-black' : 'text-slate-400 font-bold'}`}>
                              {formatRelativeTime(lastMsg.created_at)}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-xs text-slate-500 font-bold mb-1.5 flex items-center gap-1.5 truncate">
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 shrink-0">
                            {conv.owner_id === currentUser?.id ? 'Anunțul tău' : 'Ești chiriaș'}
                          </span>
                          <span className="truncate">{conv.listings?.title || "Anunț indisponibil"}</span>
                        </p>
                        
                        {lastMsg ? (
                          <div className="flex items-center gap-2">
                            {lastMsg.sender_id === currentUser?.id && (
                              <span className="shrink-0 text-slate-400">
                                {lastMsg.is_read ? <span className="text-blue-500 font-black text-xs">✓✓</span> : <span className="font-black text-xs">✓</span>}
                              </span>
                            )}
                            <p className={`text-sm truncate ${hasUnread ? 'font-black text-slate-900' : 'text-slate-500 font-medium'}`}>
                              {lastMsg.sender_id === currentUser?.id ? "Tu: " : ""}{lastMsg.text}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-400 font-medium italic">Niciun mesaj trimis încă.</p>
                        )}
                      </div>
                    </div>

                    {!isSelectionMode && (
                      <div className="hidden sm:block text-right shrink-0">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 shadow-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}