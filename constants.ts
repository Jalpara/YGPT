
import { ColorDef, YGPTColors, SpotlightClub, Event, Badge, LeaderboardEntry, Testimonial, FeaturedItem, Club } from './types';

// START: LOGO CONFIGURATION
// To change the logo, upload your image to the public/assets folder or use an external URL.
// Then update this constant. Example: 'https://example.com/logo.png'
export const CUSTOM_LOGO_URL = ''; // Leave empty to use the dynamic SVG logo
// END: LOGO CONFIGURATION

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Clubs', path: '/clubs' },
  { name: 'Events', path: '/events' },
  { name: 'Transform', path: '/transform' },
  { name: 'Contact', path: '/contact' },
];

export const BRAND_COLORS: ColorDef[] = [
  { name: 'Orange', hex: YGPTColors.Orange, cmyk: '00-65-100-00', rgb: '244-121-32', pantone: '158 C' },
  { name: 'Yellow', hex: YGPTColors.Yellow, cmyk: '00-35-100-00', rgb: '252-175-23', pantone: '1235 C' },
  { name: 'Purple', hex: YGPTColors.Purple, cmyk: '45-60-00-00', rgb: '148-116-180', pantone: '7440 C' },
  { name: 'Teal', hex: YGPTColors.Teal, cmyk: '60-00-30-00', rgb: '91-196-191', pantone: '570 C' },
  { name: 'Green', hex: YGPTColors.Green, cmyk: '00-85-95-00', rgb: '00-174-82', pantone: '7481 C' },
  { name: 'Dark Grey', hex: YGPTColors.DarkGrey, cmyk: '00-00-00-90', rgb: '65-64-66', pantone: '446 C' },
];

export const IMPACT_STATS = [
    { label: "Youth attended transformational seminars", value: "8000+", icon: "Users" },
    { label: "Institutes reached", value: "40+", icon: "Building" },
    { label: "Women provided Sanitary Pads", value: "16000+", icon: "HeartHandshake" },
    { label: "Lives positively impacted", value: "100000+", icon: "Smile" },
    { label: "Families supported with food banks", value: "140+", icon: "Utensils" },
    { label: "Earth with 8 Billion+ people to look after", value: "1", icon: "Globe" }
];

export const IMPACT_DATA = [
  { name: '2021', reached: 15000, projects: 120 },
  { name: '2022', reached: 35000, projects: 340 },
  { name: '2023', reached: 65000, projects: 560 },
  { name: '2024', reached: 100000, projects: 890 },
];

export const PROGRAMS_DATA = [
  {
    id: '1',
    title: 'Mindful Leadership',
    description: 'Developing the next generation of conscious leaders through meditation and soft skills.',
    image: 'https://picsum.photos/800/600',
    category: 'Leadership'
  },
  {
    id: '2',
    title: 'Green Earth Initiative',
    description: 'Tree plantation drives and sustainable living workshops.',
    image: 'https://picsum.photos/800/601',
    category: 'Environment'
  },
  {
    id: '3',
    title: 'Digital Wellness',
    description: 'Navigating the digital world with balance and mental hygiene.',
    image: 'https://picsum.photos/800/602',
    category: 'Wellness'
  },
];

export const CLUBS_DATA: any[] = [
    { 
        id: '1', 
        name: 'YGPT New York', 
        location: 'New York, USA', 
        members: 150, 
        image: 'https://picsum.photos/400/300?random=101',
        lead: { name: 'Sarah Jenkins', bio: 'Passionate about urban sustainability and youth mental health.', image: 'https://i.pravatar.cc/150?u=sarah' },
        description: 'The New York chapter focuses on integrating mindfulness into the fast-paced city life. We organize weekly meditation circles in Central Park and monthly soup kitchen volunteering.'
    },
    { 
        id: '2', 
        name: 'YGPT London', 
        location: 'London, UK', 
        members: 85, 
        image: 'https://picsum.photos/400/300?random=102',
        lead: { name: 'David Chem', bio: 'Philosophy student dedicated to peace education.', image: 'https://i.pravatar.cc/150?u=david' },
        description: 'Located in the heart of London, our chapter brings together students from various universities to discuss global peace strategies and local community action.'
    },
    { 
        id: '3', 
        name: 'YGPT Berlin', 
        location: 'Berlin, Germany', 
        members: 120, 
        image: 'https://picsum.photos/400/300?random=103',
        lead: { name: 'Hanna Mueller', bio: 'Artist and activist using creativity for change.', image: 'https://i.pravatar.cc/150?u=hanna' },
        description: 'YGPT Berlin is a hub for creative expression. We host art workshops, sustainable fashion shows, and peace dialogues.'
    },
    { 
        id: '4', 
        name: 'YGPT Mumbai', 
        location: 'Mumbai, India', 
        members: 200, 
        image: 'https://picsum.photos/400/300?random=104',
        lead: { name: 'Raj Patel', bio: 'Engineer with a heart for rural development.', image: 'https://i.pravatar.cc/150?u=raj' },
        description: 'Our largest chapter, focusing on rural education support and large-scale tree plantation drives across Maharashtra.'
    },
    { 
        id: '5', 
        name: 'YGPT Toronto', 
        location: 'Toronto, Canada', 
        members: 60, 
        image: 'https://picsum.photos/400/300?random=105',
        lead: { name: 'Emily Chen', bio: 'Environmental science major.', image: 'https://i.pravatar.cc/150?u=emily' },
        description: 'Focused on climate action and indigenous reconciliation projects within the Greater Toronto Area.'
    },
    { 
        id: '6', 
        name: 'YGPT Sydney', 
        location: 'Sydney, Australia', 
        members: 45, 
        image: 'https://picsum.photos/400/300?random=106',
        lead: { name: 'Jack Thompson', bio: 'Surfer and ocean conservationist.', image: 'https://i.pravatar.cc/150?u=jack' },
        description: 'Dedicated to ocean conservation and beach clean-ups, promoting peace with nature.'
    },
];

export const PAST_ACTIVITIES = [
    { id: 1, title: "City Park Cleanup", date: "Sept 2023", image: "https://picsum.photos/300/200?random=201" },
    { id: 2, title: "Meditation Flash Mob", date: "Aug 2023", image: "https://picsum.photos/300/200?random=202" },
    { id: 3, title: "Food Drive", date: "July 2023", image: "https://picsum.photos/300/200?random=203" },
    { id: 4, title: "Peace Walk", date: "June 2023", image: "https://picsum.photos/300/200?random=204" },
];

export const SPOTLIGHT_CLUB: SpotlightClub = {
  name: "YGPT Berlin Chapter",
  location: "Berlin, Germany",
  description: "The Berlin chapter has been a beacon of sustainability this month! They successfully organized the 'Urban Green' initiative, planting over 500 saplings in the city center and hosting weekly mindfulness sessions for university students.",
  image: "https://picsum.photos/800/600?random=55",
  month: "October 2023"
};

// Helper to get dates relative to today for dynamic demo data
const today = new Date();
const getDateStr = (offsetDays: number) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
};

// Helper to find the next Thursday
const getNextThursday = () => {
    const d = new Date();
    d.setDate(d.getDate() + (4 + 7 - d.getDay()) % 7);
    return d.toISOString().split('T')[0];
}

export const EVENTS_DATA: Event[] = [
  {
    id: 'weekly-prayer',
    title: 'Weekly Global Prayer',
    date: getNextThursday(),
    time: '10:30 PM IST',
    location: 'YouTube Live',
    type: 'Online',
    description: 'Join us every Thursday for a powerful session of collective prayer and meditation to send positive vibrations to the world. Link: https://youtu.be/0lpi7-xAc7g'
  },
  {
    id: '1',
    title: 'Global Peace Summit 2024',
    date: getDateStr(5),
    time: '10:00 AM - 4:00 PM',
    location: 'New York, USA',
    type: 'Offline',
    description: 'Join youth leaders from over 50 countries to discuss peace-building strategies.'
  },
  {
    id: '2',
    title: 'Yoga for Mental Health',
    date: getDateStr(12),
    time: '08:00 AM - 09:30 AM',
    location: 'London, UK',
    type: 'Offline',
    description: 'A community yoga session focusing on stress relief and mental clarity.'
  },
  {
    id: '3',
    title: 'Sustainable Living Workshop',
    date: getDateStr(2),
    time: '02:00 PM - 05:00 PM',
    location: 'Zoom (Online)',
    type: 'Online',
    description: 'Learn practical tips for reducing your carbon footprint from experts.'
  },
  {
    id: '4',
    title: 'YGPT Charity Run',
    date: getDateStr(20),
    time: '07:00 AM - 11:00 AM',
    location: 'Mumbai, India',
    type: 'Offline',
    description: 'Run for a cause! All proceeds go towards rural education projects.'
  },
  {
    id: '5',
    title: 'Meditation Masterclass',
    date: getDateStr(-3),
    time: '06:00 PM - 07:30 PM',
    location: 'Zoom (Online)',
    type: 'Online',
    description: 'Deep dive into advanced meditation techniques.'
  },
  {
    id: '6',
    title: 'Beach Clean-up Drive',
    date: getDateStr(8),
    time: '07:00 AM - 10:00 AM',
    location: 'Sydney, Australia',
    type: 'Offline',
    description: 'Community action to restore our coastlines.'
  },
  {
    id: '7',
    title: 'Youth Leadership Forum',
    date: getDateStr(15),
    time: '09:00 AM - 05:00 PM',
    location: 'Toronto, Canada',
    type: 'Offline',
    description: 'Workshops and panels on effective leadership in the 21st century.'
  },
  {
    id: '8',
    title: 'Art for Peace Exhibition',
    date: getDateStr(25),
    time: '11:00 AM - 06:00 PM',
    location: 'Paris, France',
    type: 'Offline',
    description: 'Showcasing artwork created by youth on the theme of global harmony.'
  },
  {
    id: '10',
    title: 'Tech for Good Hackathon',
    date: getDateStr(30),
    time: '48 Hours',
    location: 'Berlin, Germany',
    type: 'Offline',
    description: 'Building digital solutions for social impact problems.'
  }
];

export const MOCK_USER_STATS = {
  name: "Alex Peace",
  points: 1250,
  level: 5,
  nextLevelPoints: 2000,
  coursesCompleted: 12,
  streak: 7
};

export const BADGES: Badge[] = [
  { id: '1', name: 'Early Riser', description: 'Completed 5 morning meditation sessions.', icon: 'Sun', earned: true },
  { id: '2', name: 'Green Warrior', description: 'Participated in 3 environmental projects.', icon: 'Leaf', earned: true },
  { id: '3', name: 'Community Pillar', description: 'Referred 5 friends to YGPT.', icon: 'Users', earned: false },
  { id: '4', name: 'Mindful Master', description: 'Completed the 30-day mindfulness challenge.', icon: 'Brain', earned: false },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah J.", points: 3400, avatar: "https://i.pravatar.cc/150?u=sarah" },
  { rank: 2, name: "Mike T.", points: 3150, avatar: "https://i.pravatar.cc/150?u=mike" },
  { rank: 3, name: "Alex Peace", points: 1250, avatar: "https://i.pravatar.cc/150?u=alex" },
  { rank: 4, name: "Emma W.", points: 1100, avatar: "https://i.pravatar.cc/150?u=emma" },
  { rank: 5, name: "Raj K.", points: 950, avatar: "https://i.pravatar.cc/150?u=raj" },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: '1',
        name: "Priya Sharma",
        role: "Student Leader, Delhi",
        quote: "YGPT gave me the tools to manage my exam stress and find a community that truly cares about making a difference.",
        image: "https://i.pravatar.cc/150?u=priya"
    },
    {
        id: '2',
        name: "John Doe",
        role: "Volunteer, New York",
        quote: "The leadership programs are world-class. I've learned more here about empathy and team building than in my MBA.",
        image: "https://i.pravatar.cc/150?u=john"
    },
    {
        id: '3',
        name: "Maria Garcia",
        role: "Club Lead, Madrid",
        quote: "Starting a YGPT club on my campus transformed the university culture. We are now a hub for peace and sustainability.",
        image: "https://i.pravatar.cc/150?u=maria"
    }
];

export const FEATURED_ITEMS: FeaturedItem[] = [
    {
        id: '1',
        type: 'Event',
        title: 'Global Meditate-a-thon',
        date: 'Oct 25, 2023',
        image: 'https://picsum.photos/600/400?random=1',
        link: '/events'
    },
    {
        id: '2',
        type: 'Program',
        title: 'New: Youth for Earth',
        image: 'https://picsum.photos/600/400?random=2',
        link: '/programs'
    },
    {
        id: '3',
        type: 'Announcement',
        title: 'YGPT App Launching Soon',
        image: 'https://picsum.photos/600/400?random=3',
        link: '/new'
    }
];
