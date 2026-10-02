import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { OrbitSphere } from '../canvas/OrbitSphere';
import { Mail, Check, Instagram, MessageSquare } from 'lucide-react';
import { api } from '../../services/api';
import { renderSocialIcon } from '../layout/SocialLinksBar';
import { SocialLinkItem } from '../../types';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.getProfile();
        if (res.success && res.data) {
          setProfile(res.data);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadProfile();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await api.sendMessage(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Failed to submit message to API:', err);
      // Fallback local acknowledgment
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic social links from profile with Nexa Web defaults
  const activeSocials: SocialLinkItem[] = [];
  if (profile?.socialLinksList && profile.socialLinksList.length > 0) {
    activeSocials.push(
      ...profile.socialLinksList
        .filter((s: SocialLinkItem) => s.enabled && s.url)
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    );
  } else if (profile?.socialLinks) {
    if (profile.socialLinks.instagram) {
      activeSocials.push({ platform: 'instagram', title: 'Instagram', url: profile.socialLinks.instagram, icon: 'instagram', enabled: true, order: 1 });
    }
    if (profile.socialLinks.github) {
      activeSocials.push({ platform: 'github', title: 'GitHub', url: profile.socialLinks.github, icon: 'github', enabled: true, order: 2 });
    }
    if (profile.socialLinks.linkedin) {
      activeSocials.push({ platform: 'linkedin', title: 'LinkedIn', url: profile.socialLinks.linkedin, icon: 'linkedin', enabled: true, order: 3 });
    }
  }

  // Fallback defaults if empty
  if (activeSocials.length === 0) {
    activeSocials.push(
      { platform: 'instagram', title: 'Instagram', url: 'https://instagram.com/nexaweb.dz', icon: 'instagram', enabled: true, order: 1 },
      { platform: 'github', title: 'GitHub', url: 'https://github.com/nexaweb', icon: 'github', enabled: true, order: 2 }
    );
  }

  const contactEmail = profile?.email && profile.email !== 'titisoumi026@gmail.com' ? profile.email : 'contact@nexaweb.dz';

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden">
      
      {/* City Grid Watermark in Plum & Magenta (Bottom Right) */}
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] pointer-events-none opacity-20 -z-10 bg-no-repeat bg-right-bottom">
        <svg className="w-full h-full text-pink-400" viewBox="0 0 500 500" fill="none" stroke="currentColor">
          <path d="M50 450 L450 50 M100 480 L480 100 M20 380 L380 20 M150 500 L500 150" strokeWidth="1.5" opacity="0.6" />
          <path d="M0 200 L500 200 M0 300 L500 300 M200 0 L200 500 M350 0 L350 500" strokeWidth="0.8" opacity="0.4" />
          <path d="M120 180 L280 340 M300 150 L420 270 M80 280 L220 420" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: 3D Orbit Gyroscope Sphere in Rose Gold */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <OrbitSphere />
          </div>

          {/* Right Column: Contact Form with Side Tabs */}
          <div className="lg:col-span-6 flex flex-col items-start w-full max-w-lg mx-auto lg:mx-0">
            
            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              {t.skillsAndContact.connectTitle}
            </h2>

            {/* Studio Description */}
            <p className="text-xs sm:text-sm text-pink-200/80 mb-6 leading-relaxed">
              {t.skillsAndContact.connectDescription}
            </p>

            {/* Quick Studio Contact Channels Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full mb-6 text-xs">
              <a
                href="https://instagram.com/nexaweb.dz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border bg-[#150820]/90 border-pink-900/60 text-pink-300 hover:text-white hover:border-pink-500/50 transition-all flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] text-pink-400/80 font-mono">Instagram</span>
                  <span className="font-semibold text-[11px]">@nexaweb.dz</span>
                </div>
              </a>

              <a
                href={`mailto:${contactEmail}`}
                className="p-2.5 rounded-xl border bg-[#150820]/90 border-pink-900/60 text-pink-300 hover:text-white hover:border-pink-500/50 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] text-pink-400/80 font-mono">Email</span>
                  <span className="font-semibold text-[11px] truncate">{contactEmail}</span>
                </div>
              </a>

              <div className="p-2.5 rounded-xl border bg-[#150820]/90 border-pink-900/60 text-pink-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] text-emerald-400/80 font-mono">WhatsApp</span>
                  <span className="font-semibold text-[11px] text-emerald-300">
                    {profile?.phone && profile?.phoneEnabled ? profile.phone : '[NUMÉRO PRO]'}
                  </span>
                </div>
              </div>
            </div>

            {/* Container with side floating icons */}
            <div className="relative w-full">
              
              {/* Form Card */}
              <form
                onSubmit={handleSubmit}
                className="w-full p-6 sm:p-7 rounded-2xl backdrop-blur-xl border transition-all duration-300 space-y-4 shadow-2xl bg-[#12071a]/90 border-pink-900/50 shadow-black/50 text-white"
              >
                {isSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{t.skillsAndContact.successMessage}</span>
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.skillsAndContact.namePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-[#190924]/80 border-pink-900/60 text-white placeholder:text-pink-300/40 focus:border-pink-500 focus:ring-pink-500/30"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.skillsAndContact.emailPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 bg-[#190924]/80 border-pink-900/60 text-white placeholder:text-pink-300/40 focus:border-pink-500 focus:ring-pink-500/30"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.skillsAndContact.messagePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-none bg-[#190924]/80 border-pink-900/60 text-white placeholder:text-pink-300/40 focus:border-pink-500 focus:ring-pink-500/30"
                  />
                </div>

                {/* Gradient Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-pink-500/25 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? t.skillsAndContact.sendingButton : t.skillsAndContact.sendButton}
                </button>

                {profile?.phoneEnabled && profile?.phone && (
                  <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WhatsApp / Tél:</span>
                    <a
                      href={`tel:${profile.phone}`}
                      className="text-emerald-400 hover:text-emerald-300 hover:underline font-mono font-bold tracking-wider"
                    >
                      {profile.phone}
                    </a>
                  </div>
                )}
              </form>

              {/* Floating Social Icons (Desktop & Tablet) - RTL-aware & Dynamic */}
              <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 flex-col gap-2.5 ltr:-right-12 rtl:-left-12 rtl:right-auto z-10">
                {activeSocials.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border backdrop-blur-md transition-all hover:scale-110 shadow-sm bg-[#150820]/90 border-pink-900/60 text-pink-300 hover:text-white hover:border-pink-500/50"
                    aria-label={item.title}
                    title={item.title}
                  >
                    {renderSocialIcon(item.icon, 'w-4 h-4')}
                  </a>
                ))}

                {contactEmail && (
                  <a
                    href={`mailto:${contactEmail}`}
                    className="p-2.5 rounded-xl border backdrop-blur-md transition-all hover:scale-110 shadow-sm bg-[#150820]/90 border-pink-900/60 text-pink-300 hover:text-white hover:border-pink-500/50"
                    aria-label="Email"
                    title={`Email (${contactEmail})`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Mobile Social Icons Row - Dynamic */}
              <div className="flex sm:hidden items-center justify-center gap-3 pt-3 flex-wrap">
                {activeSocials.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border backdrop-blur-md transition-all shadow-sm bg-[#150a20]/90 border-pink-900/60 text-pink-300 hover:text-white hover:scale-105"
                    aria-label={item.title}
                    title={item.title}
                  >
                    {renderSocialIcon(item.icon, 'w-4 h-4')}
                  </a>
                ))}

                {contactEmail && (
                  <a
                    href={`mailto:${contactEmail}`}
                    className="p-2.5 rounded-xl border backdrop-blur-md transition-all shadow-sm bg-[#150a20]/90 border-pink-900/60 text-pink-300 hover:text-white hover:scale-105"
                    aria-label="Email"
                    title={`Email (${contactEmail})`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
