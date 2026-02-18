
import { TravelCategory, PackagePlan } from './types';

export const FEATURED_PACKAGES: PackagePlan[] = [
  {
    id: '1',
    title: 'Royal Rajasthan Heritage',
    category: TravelCategory.LUXURY,
    price: '₹85,000',
    duration: '6 Nights / 7 Days',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the grandeur of palaces and deserts with royal treatment.',
    highlights: ['Udaipur Lake Palace', 'Jaipur City Tour', 'Jaisalmer Sand Dunes']
  },
  {
    id: '2',
    title: 'Kerala Backwater Serenity',
    category: TravelCategory.HONEYMOON,
    price: '₹45,000',
    duration: '4 Nights / 5 Days',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    description: 'A romantic escape into the lush greens and tranquil waters of Alleppey.',
    highlights: ['Luxury Houseboat', 'Munnar Tea Gardens', 'Kathakali Performance']
  },
  {
    id: '3',
    title: 'Varanasi Spiritual Journey',
    category: TravelCategory.SPIRITUAL,
    price: '₹28,000',
    duration: '3 Nights / 4 Days',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
    description: 'A soulful trip for grandparents to experience the divine Ganga Aarti.',
    highlights: ['Ghats of Varanasi', 'Sarnath Visit', 'Ganga Boat Ride']
  },
  {
    id: '4',
    title: 'Kashmir Paradise Valley',
    category: TravelCategory.FAMILY,
    price: '₹55,000',
    duration: '5 Nights / 6 Days',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800',
    description: 'Heaven on Earth for families to enjoy Shikara rides and snow.',
    highlights: ['Gulmarg Gondola', 'Dal Lake Shikara', 'Pahalgam Valley']
  }
];

export const VIBES = ['Romantic', 'Adventurous', 'Peaceful', 'Historical', 'Religious', 'Back to Nature'];
export const BUDGETS = ['Budget Friendly', 'Mid-Range', 'Luxury', 'Ultra-Luxury'];
export const AGE_GROUPS = ['Young Couples', 'Families with Kids', 'Working Professionals', 'Senior Citizens (60+)', 'Honeymooners'];
