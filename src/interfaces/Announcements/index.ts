export interface IUpdateAnnouncement {
  announceType?: string;
  title?: string;
  fabricationYear?: number;
  km?: number;
  price?: number;
  description?: string;
  category?: string;
  announceCover?: string;
  is_active: boolean;
}

export interface ICreateAnnouncementData {
  title: string;
  announceType: string;
  description: string;
  km: number;
  fabricationYear: number;
  price: number;
  announceCover: string;
  category: string;
  id: string;
}
