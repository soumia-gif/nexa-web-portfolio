import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { SocialLinkItem } from '../../types';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Globe,
  Code2,
  Send,
} from 'lucide-react';

interface SocialLinksBarProps {
  className?: string;
  iconClassName?: string;
  showLabels?: boolean;
}

export const renderSocialIcon = (iconName: string, className = 'w-4 h-4') => {
  switch (iconName?.toLowerCase()) {
    case 'github':
      return <Github className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'twitter':
    case 'x':
      return <Twitter className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'code2':
    case 'leetcode':
      return <Code2 className={className} />;
    case 'send':
    case 'telegram':
      return <Send className={className} />;
    default:
      return <Globe className={className} />;
  }
};

export const SocialLinksBar: React.FC<SocialLinksBarProps> = ({
  className = '',
  iconClassName = 'w-4 h-4',
  showLabels = false,
}) => {
  const [socials, setSocials] = useState<SocialLinkItem[]>([]);

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await api.getProfile();
        if (res.success && res.data) {
          if (res.data.socialLinksList && res.data.socialLinksList.length > 0) {
            setSocials(
              res.data.socialLinksList
                .filter((s: SocialLinkItem) => s.enabled && s.url)
                .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            );
          } else if (res.data.socialLinks) {
            // Fallback
            const list: SocialLinkItem[] = [];
            if (res.data.socialLinks.github) {
              list.push({ platform: 'github', title: 'GitHub', url: res.data.socialLinks.github, icon: 'github', enabled: true, order: 1 });
            }
            if (res.data.socialLinks.linkedin) {
              list.push({ platform: 'linkedin', title: 'LinkedIn', url: res.data.socialLinks.linkedin, icon: 'linkedin', enabled: true, order: 2 });
            }
            if (res.data.socialLinks.twitter) {
              list.push({ platform: 'twitter', title: 'Twitter', url: res.data.socialLinks.twitter, icon: 'twitter', enabled: true, order: 3 });
            }
            setSocials(list);
          }
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchSocials();
  }, []);

  if (socials.length === 0) return null;

  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      {socials.map((item, idx) => (
        <a
          key={idx}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          title={item.title}
          aria-label={item.title}
          className="p-2.5 rounded-full border transition-all duration-300 backdrop-blur-md bg-pink-950/30 border-pink-800/40 text-pink-300 hover:text-white hover:bg-pink-900/60 hover:border-pink-500 hover:scale-110 shadow-sm flex items-center gap-1.5"
        >
          {renderSocialIcon(item.icon, iconClassName)}
          {showLabels && <span className="text-xs font-semibold pr-1">{item.title}</span>}
        </a>
      ))}
    </div>
  );
};
