"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr"; 
import Link from "next/link";
import Header from "@/components/Header";

// Funcție locală sigură pentru Supabase
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createBrowserClient(supabaseUrl, supabaseKey);
}

// Iconițe pentru Notificări
const Icons = {
  CheckCircle: () => <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  ErrorCircle: () => <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

export default function ChatRoomPage() {
  const params = useParams();
  const id = params?.id as string; // Acesta este conversation_id-ul
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Stare pentru Notificări (Toasts)
  const [notification, setNotification] = useState<{show: boolean, type: 'success' | 'error', message: string}>({ show: false, type: 'success', message: '' });

  // Ref pentru a da scroll automat în jos la ultimul mesaj
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 4000);
  };

  useEffect(() => {
    async function fetchChat() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      const user = session.user;
      setCurrentUser(user);

      // 0. Aducem detaliile sistemului
      const { data: convData } = await supabase
        .from("conversations")
        .select(`
          id,
          listing_id,
          tenant_id,
          owner_id,
          listings ( title, price, image_url, image_urls ),
          tenant:profiles!conversations_tenant_id_fkey ( id, full_name, avatar_url ),
          owner:profiles!conversations_owner_id_fkey ( id, full_name, avatar_url )
        `)
        .eq("id", id)
        .single();

      if (convData) {
        setConversation(convData);
      } else {
        router.push("/inbox"); 
        return;
      }

      // 1. Aducem toate mesajele din baza de date
      const { data: msgs } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });

      if (msgs) {
        setMessages(msgs);
        
        // 2. LOGICA: Căutăm mesajele necitite primite de la celălalt și le marcăm ca "Citite"
        const unreadMsgs = msgs.filter(m => m.sender_id !== user.id && !m.is_read);
        
        if (unreadMsgs.length > 0) {
          await supabase
            .from("chat_messages")
            .update({ is_read: true })
            .eq("conversation_id", id)
            .neq("sender_id", user.id)
            .eq("is_read", false);
        }
      }
      
      setLoading(false);
      setTimeout(scrollToBottom, 100);
    }

    fetchChat();

    // 3. LOGICA LIVE (Realtime)
    const channel = supabase
      .channel(`realtime:chat:${id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${id}`,
        },
        async (payload) => {
          const newMsg = payload.new;
          setMessages((prev) => [...prev, newMsg]);
          setTimeout(scrollToBottom, 100);

          if (currentUser?.id && newMsg.sender_id !== currentUser.id) {
             await supabase
              .from("chat_messages")
              .update({ is_read: true })
              .eq("id", newMsg.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, supabase, router, currentUser?.id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    const textToSend = newMessage.trim();
    setNewMessage("");

    const { error } = await supabase.from("chat_messages").insert([
      {
        conversation_id: id,
        sender_id: currentUser.id,
        text: textToSend,
        is_read: false
      },
    ]);

    if (error) {
      console.error("Eroare trimitere mesaj:", error);
      showNotification('error', "A apărut o eroare la trimitere. Verifică-ți conexiunea la internet.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const isMeTenant = currentUser?.id === conversation?.tenant_id;
  const otherUser = isMeTenant ? conversation?.owner : conversation?.tenant;
  const listing = conversation?.listings;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans h-screen relative">
      <Header />
      
      {/* NOTIFICARE PLUTITOARE (TOAST) */}
      <div className={`fixed top-24 right-4 sm:right-8 z-50 transition-all duration-500 transform ${notification.show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${notification.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800' : 'bg-rose-50/90 border-rose-200 text-rose-800'}`}>
          {notification.type === 'success' ? <Icons.CheckCircle /> : <Icons.ErrorCircle />}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto w-full flex-grow flex flex-col p-4 sm:p-6 h-[calc(100vh-80px)] overflow-hidden">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col flex-grow overflow-hidden h-full">
          
          {/* ========================================== */}
          {/* ANTETUL (HEADER) CONVERSAȚIEI ACTUALIZAT */}
          {/* ========================================== */}
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-white flex items-center justify-between z-10">
            <button onClick={() => router.push("/inbox")} className="text-slate-400 hover:text-blue-600 font-black flex items-center gap-2 transition">
              &larr; Înapoi
            </button>
            <div className="flex flex-col items-end">
              {/* LINK CĂTRE PROFIL */}
              {otherUser?.id ? (
                <Link href={`/user/${otherUser.id}`} className="flex items-center gap-2 group cursor-pointer transition-all" title="Vezi profilul și lasă recenzie">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {otherUser.full_name}
                  </span>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="font-black text-slate-900">Conversație Live</span>
                </div>
              )}
              
              {/* LINK CĂTRE ANUNȚ */}
              {listing?.title && (
                <Link href={`/listing/${conversation?.listing_id}`} className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 mt-1.5 transition-colors">
                  Anunț: {listing.title}
                </Link>
              )}
            </div>
          </div>

          {/* Zona de Mesaje (Scrollabilă) */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <span className="text-5xl mb-3">💬</span>
                <p className="font-medium text-lg">Niciun mesaj încă.</p>
                <p className="text-sm">Scrie ceva pentru a începe discuția!</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.sender_id === currentUser?.id;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div 
                      className={`px-5 py-3.5 rounded-2xl max-w-[85%] sm:max-w-[70%] whitespace-pre-wrap shadow-sm text-[15px] leading-relaxed ${
                        isMe 
                          ? "bg-blue-600 text-white rounded-br-sm" 
                          : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs font-semibold text-gray-400">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isMe && (
                        <span className="text-xs">
                          {msg.is_read ? <span className="text-blue-500 font-black">✓✓</span> : <span className="text-gray-400 font-bold">✓</span>}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Zona de Input (Scriere mesaj) */}
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-white z-10">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Scrie un mesaj aici..."
                className="flex-grow p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 transition placeholder-gray-400 font-medium text-slate-900"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 rounded-xl transition disabled:opacity-50 disabled:bg-gray-300 shadow-md flex items-center justify-center"
              >
                <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
          
        </div>
      </main>
    </div>
  );
}