import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { adminTranslations } from '../../data/adminTranslations';
import {
  Mail,
  MailOpen,
  Trash2,
  Check,
  X,
  Clock,
  Reply,
  Search,
  Inbox,
} from 'lucide-react';

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const AdminMessages: React.FC = () => {
  const { language } = useLanguage();
  const tAdmin = adminTranslations[language] || adminTranslations.fr;

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.getMessages();
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openMessage = async (msg: MessageItem) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      try {
        await api.toggleReadMessage(msg._id, true);
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
        );
      } catch (e) {
        // ignore
      }
    }
  };

  const handleToggleRead = async (id: string, currentRead: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await api.toggleReadMessage(id, !currentRead);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, isRead: !currentRead } : m))
        );
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, isRead: !currentRead } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm(tAdmin.messages.confirmDelete)) return;

    try {
      const res = await api.deleteMessage(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
        setSuccessMsg(tAdmin.messages.successDelete);
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert(res.message || 'Failed to delete');
      }
    } catch (err: any) {
      alert(err.message || 'Error deleting message');
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'unread' ? !m.isRead : m.isRead;

    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-pink-950/60">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {tAdmin.messages.title}
            </h1>
            {unreadCount > 0 && (
              <span className="bg-pink-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {unreadCount} {tAdmin.messages.unreadCount}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'ar'
              ? 'استعراض الرسائل الواردة من نموذج الاتصال في البورتفوليو وإدارتها والرد عليها'
              : 'Review and manage visitor messages sent through the portfolio contact form'}
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tAdmin.messages.searchPlaceholder}
            className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: `${tAdmin.messages.all} (${messages.length})` },
            { id: 'unread', label: `${tAdmin.messages.unread} (${unreadCount})` },
            { id: 'read', label: `${tAdmin.messages.read} (${messages.length - unreadCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === tab.id
                  ? 'bg-pink-500 text-white font-bold'
                  : 'bg-pink-950/30 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-16 text-center bg-[#120620]/60 border border-pink-950 rounded-2xl text-slate-400 text-xs flex flex-col items-center gap-3">
          <Inbox className="w-10 h-10 text-slate-600" />
          <span>{tAdmin.messages.noMessagesFound}</span>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => openMessage(msg)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
                !msg.isRead
                  ? 'bg-pink-950/35 border-pink-700/60 shadow-md shadow-pink-950/30'
                  : 'bg-[#120620]/80 border-pink-950/60 hover:border-pink-800/40 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3.5 overflow-hidden">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    !msg.isRead
                      ? 'bg-pink-500 text-white shadow-sm'
                      : 'bg-pink-950/40 text-slate-400'
                  }`}
                >
                  {!msg.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                </div>

                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{msg.name}</span>
                    <span className="text-xs text-pink-400 font-mono">({msg.email})</span>
                    {!msg.isRead && (
                      <span className="text-[9px] bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold">
                        {tAdmin.messages.newBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-1">{msg.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : 'en-US')}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleToggleRead(msg._id, msg.isRead, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-pink-300 hover:bg-pink-950/50"
                    title={msg.isRead ? 'Mark as unread' : 'Mark as read'}
                  >
                    {msg.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={(e) => handleDelete(msg._id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/50"
                    title={tAdmin.messages.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12071d] border border-pink-900/50 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-pink-950/80">
              <div>
                <h2 className="text-lg font-bold text-white mb-1">{selectedMessage.name}</h2>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-xs text-pink-400 font-mono hover:underline"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{tAdmin.messages.subject} {selectedMessage.subject || 'Portfolio Message'}</span>
              <span>{new Date(selectedMessage.createdAt).toLocaleString(language === 'ar' ? 'ar-EG' : language === 'fr' ? 'fr-FR' : 'en-US')}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950/80 text-xs text-slate-200 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
              {selectedMessage.message}
            </div>

            <div className="pt-3 border-t border-pink-950/80 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-950/40 text-xs transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>{tAdmin.messages.delete}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 bg-pink-950/30 text-xs"
                >
                  {tAdmin.messages.close}
                </button>
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Contact')}`}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/20"
                >
                  <Reply className="w-4 h-4" />
                  <span>{tAdmin.messages.replyEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
