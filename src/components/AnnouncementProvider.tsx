// src/components/AnnouncementProvider.tsx
import { fetchActiveAnnouncements } from '@/lib/announcements-queries';
import { AnnouncementBanner } from './AnnouncementBanner';

type Props = {
  currentPage?: 'home' | 'blog' | 'karriere';
};

export async function AnnouncementProvider({ currentPage }: Props) {
  try {
    const announcements = await fetchActiveAnnouncements();
    
    if (!announcements || announcements.length === 0) {
      return null;
    }

    return <AnnouncementBanner announcements={announcements} currentPage={currentPage} />;
  } catch (error) {
    // Fail silently - announcements are not critical for page functionality
    console.error('Failed to load announcements:', error);
    return null;
  }
}
