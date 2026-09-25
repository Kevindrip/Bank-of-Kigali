import React, { useState, useEffect } from 'react';
import {
  Heart,
  X,
  Sparkles,
  Star,
  MessageCircle,
  User,
  Globe,
  CreditCard,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  Send,
  Image as ImageIcon,
  Mic,
  Gift,
  CheckCircle2,
  Zap,
  Settings,
  ChevronRight,
  MapPin,
  RotateCcw,
  Smartphone,
  Search,
  Lock,
  Crown,
  Info,
  ArrowLeft,
  Check,
  Loader2,
  Bell,
  Sliders,
  DollarSign,
  SmartphoneNfc
} from 'lucide-react';

const INITIAL_PROFILES = [
  {
    id: '1',
    name: 'Aline',
    age: 25,
    location: 'Kigali, Rwanda',
    country: 'Rwanda',
    flag: '🇷🇼',
    distance: '3 km away',
    bio: 'Architect & coffee enthusiast ☕. Love weekend hiking in Musanze and art galleries.',
    occupation: 'Architect',
    interests: ['Architecture', 'Specialty Coffee', 'Hiking', 'Salsa', 'Art'],
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    prompt: 'Ideal Sunday: Morning black coffee and a scenic walk along Kimihurura.',
    matchScore: 96
  },
  {
    id: '2',
    name: 'Elena',
    age: 27,
    location: 'Paris, France',
    country: 'France',
    flag: '🇫🇷',
    distance: 'Global Passport (6,100 km)',
    bio: 'Fashion designer traveling between Paris, London, and Kigali. Polyglot 🇫🇷🇪🇳🇪🇸.',
    occupation: 'Fashion Designer',
    interests: ['Haute Couture', 'Museums', 'Wine Tasting', 'Travel', 'Photography'],
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
    ],
    prompt: 'My rule for first dates: High energy and good laughter.',
    matchScore: 89
  },
  {
    id: '3',
    name: 'David',
    age: 29,
    location: 'Nairobi, Kenya',
    country: 'Kenya',
    flag: '🇰🇪',
    distance: '750 km away',
    bio: 'Tech founder & fitness addict. Looking for someone ambitious to explore East Africa with.',
    occupation: 'Software Founder',
    interests: ['Startups', 'Marathon', 'Afrobeats', 'Safari', 'Cooking'],
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    ],
    prompt: 'Fastest way to my heart: A genuine smile and good music playlists.',
    matchScore: 92
  },
  {
    id: '4',
    name: 'Sophia',
    age: 24,
    location: 'London, UK',
    country: 'United Kingdom',
    flag: '🇬🇧',
    distance: 'Global Passport (6,800 km)',
    bio: 'UX Strategist living in London, visiting family in Kigali soon! Let’s meet up.',
    occupation: 'UX Designer',
    interests: ['UX Design', 'Indie Rock', 'Podcasts', 'Baking', 'Dogs'],
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
    ],
    prompt: 'Simple pleasures: Hot tea on rainy days and discovering acoustic sessions.',
    matchScore: 85
  },
  {
    id: '5',
    name: 'Lucas',
    age: 28,
    location: 'New York, USA',
    country: 'USA',
    flag: '🇺🇸',
    distance: 'Global Passport (11,200 km)',
    bio: 'Financial analyst & jazz bassist. Always up for late-night jazz sessions and pizza.',
    occupation: 'Financial Analyst',
    interests: ['Jazz', 'Finance', 'Basketball', 'Street Food', 'Vinyl Records'],
    verified: false,
    images: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
    ],
    prompt: 'Two truths and a lie: I spoke at TEDx, played bass for 12 years, hate avocado.',
    matchScore: 81
  }
];

const SUBSCRIPTION_PACKAGES = [
  {
    id: 'plus',
    name: 'HeartSync Plus',
    priceRWF: '5,000 RWF',
    priceUSD: '$5 / mo',
    duration: '1 Month',
    features: ['Unlimited Likes', 'Rewind last swipe', 'Hide Ads', 'Local Distance Boost'],
    badgeColor: 'bg-blue-500'
  },
  {
    id: 'gold',
    name: 'HeartSync Gold',
    popular: true,
    priceRWF: '12,000 RWF',
    priceUSD: '$12 / mo',
    duration: '1 Month',
    features: ['See who likes you', 'Passport (Swipe Worldwide)', '5 Super Likes / week', 'Top Picks daily'],
    badgeColor: 'bg-amber-500'
  },
  {
    id: 'platinum',
    name: 'HeartSync VIP Platinum',
    priceRWF: '25,000 RWF',
    priceUSD: '$25 / mo',
    duration: '3 Months VIP',
    features: ['Prioritized Likes', 'Message before matching', 'Read Receipts', 'Dedicated Matchmaker VIP Concierge'],
    badgeColor: 'bg-gradient-to-r from-purple-600 to-pink-600'
  }
];

const GLOBAL_CITIES = [
  { name: 'Kigali', country: 'Rwanda', flag: '🇷🇼', users: '14.2k active' },
  { name: 'Nairobi', country: 'Kenya', flag: '🇰🇪', users: '45.1k active' },
  { name: 'Paris', country: 'France', flag: '🇫🇷', users: '98.5k active' },
  { name: 'London', country: 'UK', flag: '🇬🇧', users: '120k active' },
  { name: 'New York', country: 'USA', flag: '🇺🇸', users: '210k active' },
  { name: 'Tokyo', country: 'Japan', flag: '🇯🇵', users: '85k active' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('swipe'); // 'swipe', 'matches', 'explore', 'vip', 'profile', 'dev'
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' app frame vs 'desktop' full screen
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([
    {
      id: '1',
      profile: INITIAL_PROFILES[0],
      lastMessage: 'Hey there! Loved your profile picture at Kimihurura! 😊',
      time: '10m ago',
      unread: true,
      chatHistory: [
        { sender: 'them', text: 'Hey there! Loved your profile picture at Kimihurura! 😊', time: '10:14 AM' }
      ]
    }
  ]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  
  // Registration / Onboarding State
  const [isRegistered, setIsRegistered] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: 'Jean Luc',
    age: 26,
    gender: 'Male',
    lookingFor: 'Women',
    location: 'Kigali, Rwanda',
    country: 'Rwanda',
    phone: '0796585529',
    bio: 'Software developer loving tech, travel, and live music!',
    isVIP: false,
    vipTier: 'Free Member',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  });

  // Filter Modal
  const [showFilters, setShowFilters] = useState(false);
  const [filterAge, setFilterAge] = useState([18, 35]);
  const [globalPassport, setGlobalPassport] = useState(true);
  const [selectedDetailProfile, setSelectedDetailProfile] = useState(null);

  // Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(SUBSCRIPTION_PACKAGES[1]);
  const [paymentMethod, setPaymentMethod] = useState('momo'); // 'momo' | 'card' | 'paypal'
  const [momoNumber, setMomoNumber] = useState('0796585529');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Animation feedback
  const [swipeFeedback, setSwipeFeedback] = useState(null); // 'like' | 'pass' | 'superlike'

  const handleSwipe = (direction) => {
    if (currentIndex >= profiles.length) return;
    const currentProfile = profiles[currentIndex];

    setSwipeFeedback(direction);
    setTimeout(() => setSwipeFeedback(null), 600);

    if (direction === 'like' || direction === 'superlike') {
      // Simulate 70% match probability
      const isMatch = Math.random() > 0.3;
      if (isMatch) {
        const newMatch = {
          id: currentProfile.id,
          profile: currentProfile,
          lastMessage: direction === 'superlike' ? '⭐ You Super Liked each other!' : 'It is a match! Say hello 👋',
          time: 'Just now',
          unread: true,
          chatHistory: [
            {
              sender: 'system',
              text: `You matched with ${currentProfile.name}! 🎉`,
              time: 'Just now'
            }
          ]
        };
        setMatches((prev) => [newMatch, ...prev]);
      }
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleRewind = () => {
    if (currentIndex > 0) {
      if (!userProfile.isVIP) {
        setSelectedPackage(SUBSCRIPTION_PACKAGES[0]);
        setPaymentModalOpen(true);
        return;
      }
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatId) return;

    const text = messageInput;
    setMessageInput('');

    setMatches((prev) =>
      prev.map((match) => {
        if (match.id === activeChatId) {
          const updatedChat = [
            ...match.chatHistory,
            { sender: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ];

          // Simulate auto-reply from match after 1.5 sec
          setTimeout(() => {
            setMatches((currMatches) =>
              currMatches.map((m) => {
                if (m.id === activeChatId) {
                  const autoReplies = [
                    "That sounds awesome! Tell me more ✨",
                    "Aww, thanks! What are your plans for this weekend?",
                    "Haha completely agree! Would love to chat over coffee ☕",
                    "Which city are you currently in right now?"
                  ];
                  const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
                  return {
                    ...m,
                    lastMessage: randomReply,
                    time: 'Just now',
                    chatHistory: [
                      ...m.chatHistory,
                      { sender: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                      { sender: 'them', text: randomReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                    ]
                  };
                }
                return m;
              })
            );
          }, 1500);

          return {
            ...match,
            lastMessage: text,
            time: 'Just now',
            chatHistory: updatedChat
          };
        }
        return match;
      })
    );
  };

  const processPayment = () => {
    setPaymentProcessing(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      setUserProfile((prev) => ({
        ...prev,
        isVIP: true,
        vipTier: selectedPackage.name
      }));

      setTimeout(() => {
        setPaymentModalOpen(false);
        setPaymentSuccess(false);
      }, 2500);
    }, 2500);
  };

  const activeMatch = matches.find((m) => m.id === activeChatId);
  const activeProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Heart className="w-5 h-5 text-white fill-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              HeartSync <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">Global</span>
            </h1>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Globe className="w-3 h-3 text-emerald-400" /> Worldwide Matchmaking & Mobile Payments
            </p>
          </div>
        </div>

        {/* View mode switcher & Dev guide toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'desktop' : 'mobile')}
            className="hidden sm:flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
            title="Toggle Device Frame"
          >
            <Smartphone className="w-3.5 h-3.5 text-rose-400" />
            {viewMode === 'mobile' ? 'Expanded View' : 'Phone Frame View'}
          </button>

          <button
            onClick={() => setActiveTab('dev')}
            className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-3 py-1.5 rounded-lg shadow-md transition"
          >
            <Zap className="w-3.5 h-3.5" />
            App Store Build Guide
          </button>
        </div>
      </header>

      {}
      <main className="flex-1 flex justify-center items-center p-0 sm:p-4 overflow-hidden">
        <div
          className={`w-full transition-all duration-300 flex flex-col bg-slate-900 border-slate-800 shadow-2xl relative ${
            viewMode === 'mobile'
              ? 'max-w-md h-[100vh] sm:h-[840px] sm:rounded-3xl border-0 sm:border-8 sm:border-slate-800 overflow-hidden'
              : 'max-w-6xl h-[calc(100vh-80px)] rounded-xl border'
          }`}
        >
          {/* Main Content Render Area */}
          <div className="flex-1 overflow-y-auto relative flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
            {/* SWIPE TAB */}
            {activeTab === 'swipe' && (
              <div className="flex-1 flex flex-col p-4 relative justify-between overflow-hidden">
                {/* Discovery Sub Header */}
                <div className="flex items-center justify-between mb-3 z-10">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full text-slate-300 border border-slate-700/50 backdrop-blur flex items-center gap-1.5 text-xs px-3"
                  >
                    <Sliders className="w-4 h-4 text-rose-400" />
                    Filters
                  </button>

                  <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/50 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-medium text-slate-200">
                      {globalPassport ? 'Worldwide Passport' : 'Kigali, Rwanda'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPackage(SUBSCRIPTION_PACKAGES[1]);
                      setPaymentModalOpen(true);
                    }}
                    className={`p-2 rounded-full border backdrop-blur text-xs flex items-center gap-1 font-bold ${
                      userProfile.isVIP
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                    }`}
                  >
                    <Crown className="w-4 h-4 text-amber-400" />
                    {userProfile.isVIP ? 'VIP' : 'Get Gold'}
                  </button>
                </div>

                {/* SWIPE CARD CONTAINER */}
                {}
                {currentIndex < profiles.length ? (
                  <div className="flex-1 relative my-2 rounded-3xl overflow-hidden shadow-2xl group border border-slate-800">
                    {/* Background photo */}
                    <img
                      src={activeProfile.images[0]}
                      alt={activeProfile.name}
                      className="w-full h-full object-cover rounded-3xl transform transition duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                    {/* Feedback Badges */}
                    {swipeFeedback === 'like' && (
                      <div className="absolute top-8 left-8 border-4 border-emerald-400 text-emerald-400 font-black text-3xl px-4 py-2 rounded-2xl rotate-[-15deg] bg-slate-950/60 backdrop-blur animate-bounce z-20">
                        LIKE ❤️
                      </div>
                    )}
                    {swipeFeedback === 'pass' && (
                      <div className="absolute top-8 right-8 border-4 border-rose-500 text-rose-500 font-black text-3xl px-4 py-2 rounded-2xl rotate-[15deg] bg-slate-950/60 backdrop-blur animate-bounce z-20">
                        NOPE ✖️
                      </div>
                    )}
                    {swipeFeedback === 'superlike' && (
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 border-4 border-cyan-400 text-cyan-300 font-black text-3xl px-6 py-2 rounded-2xl bg-slate-950/80 backdrop-blur animate-pulse z-20">
                        SUPER LIKE ⭐
                      </div>
                    )}

                    {/* Profile Information Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5 text-white z-10 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold tracking-tight">{activeProfile.name}, {activeProfile.age}</h2>
                          {activeProfile.verified && (
                            <ShieldCheck className="w-5 h-5 text-sky-400 fill-sky-400/20" title="Verified Profile" />
                          )}
                          <span className="text-xl">{activeProfile.flag}</span>
                        </div>

                        <button
                          onClick={() => setSelectedDetailProfile(activeProfile)}
                          className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-full backdrop-blur transition border border-slate-700"
                        >
                          <Info className="w-4 h-4 text-slate-200" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{activeProfile.location}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-emerald-400">{activeProfile.distance}</span>
                      </div>

                      <p className="text-sm text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                        "{activeProfile.bio}"
                      </p>

                      {/* Interest tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {activeProfile.interests.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs bg-slate-800/80 backdrop-blur text-slate-200 px-2.5 py-1 rounded-full border border-slate-700/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-900/50 rounded-3xl border border-slate-800 my-2">
                    <div className="w-20 h-20 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mb-4 border border-rose-500/20">
                      <Globe className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">That's everyone for now!</h3>
                    <p className="text-xs text-slate-400 max-w-xs mb-6">
                      You've swiped through all profiles in your current radar. Turn on Global Passport mode or refresh location to see more singles worldwide.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setCurrentIndex(0)}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition"
                      >
                        Start Over
                      </button>
                      <button
                        onClick={() => {
                          setGlobalPassport(true);
                          setCurrentIndex(0);
                        }}
                        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition"
                      >
                        Enable Global Passport 🌍
                      </button>
                    </div>
                  </div>
                )}

                {/* SWIPE ACTION BUTTONS */}
                {}
                <div className="flex items-center justify-around py-3 px-2 z-10">
                  <button
                    onClick={handleRewind}
                    className="p-3 bg-slate-800/90 hover:bg-slate-700 text-amber-400 rounded-full border border-slate-700 shadow-lg transform hover:scale-110 active:scale-95 transition"
                    title="Rewind"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleSwipe('pass')}
                    className="p-4 bg-slate-800/90 hover:bg-rose-950/50 text-rose-500 rounded-full border border-slate-700 shadow-xl transform hover:scale-110 active:scale-95 transition"
                    title="Pass"
                  >
                    <X className="w-7 h-7" />
                  </button>

                  <button
                    onClick={() => handleSwipe('superlike')}
                    className="p-3 bg-slate-800/90 hover:bg-cyan-950/50 text-cyan-400 rounded-full border border-slate-700 shadow-lg transform hover:scale-110 active:scale-95 transition"
                    title="Super Like"
                  >
                    <Star className="w-5 h-5 fill-cyan-400/20" />
                  </button>

                  <button
                    onClick={() => handleSwipe('like')}
                    className="p-4 bg-gradient-to-tr from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full shadow-lg shadow-rose-500/30 transform hover:scale-110 active:scale-95 transition"
                    title="Like"
                  >
                    <Heart className="w-7 h-7 fill-white" />
                  </button>
                </div>
              </div>
            )}

            {/* MATCHES & CHAT TAB */}
            {}
            {activeTab === 'matches' && (
              <div className="flex-1 flex flex-col h-full bg-slate-900">
                {activeChatId ? (
                  /* ACTIVE CHAT WINDOW */
                  <div className="flex-1 flex flex-col h-full">
                    {/* Chat Header */}
                    <div className="p-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setActiveChatId(null)}
                          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="relative">
                          <img
                            src={activeMatch.profile.images[0]}
                            alt={activeMatch.profile.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-700"
                          />
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-white flex items-center gap-1">
                            {activeMatch.profile.name} {activeMatch.profile.flag}
                          </h3>
                          <p className="text-xs text-slate-400">{activeMatch.profile.location}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedDetailProfile(activeMatch.profile)}
                        className="p-2 hover:bg-slate-800 text-slate-400 rounded-full"
                      >
                        <Info className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/40">
                      {activeMatch.chatHistory.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex flex-col ${
                            msg.sender === 'me' ? 'items-end' : msg.sender === 'system' ? 'items-center my-2' : 'items-start'
                          }`}
                        >
                          {msg.sender === 'system' ? (
                            <span className="text-[11px] bg-slate-800/60 text-slate-400 px-3 py-1 rounded-full border border-slate-700/50">
                              {msg.text}
                            </span>
                          ) : (
                            <div
                              className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                                msg.sender === 'me'
                                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-br-none shadow-md'
                                  : 'bg-slate-800 text-slate-100 border border-slate-700/60 rounded-bl-none'
                              }`}
                            >
                              <p>{msg.text}</p>
                              <span className={`text-[9px] block text-right mt-1 ${msg.sender === 'me' ? 'text-rose-200' : 'text-slate-400'}`}>
                                {msg.time}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Chat Input Bar */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                      <button type="button" className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-full transition">
                        <Gift className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        placeholder={`Message ${activeMatch.profile.name}...`}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1 bg-slate-800 text-xs text-white placeholder-slate-400 px-4 py-2.5 rounded-full border border-slate-700 focus:outline-none focus:border-rose-500"
                      />
                      <button
                        type="submit"
                        disabled={!messageInput.trim()}
                        className="p-2.5 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white rounded-full transition shadow-md shadow-rose-500/20"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                ) : (
                  /* MATCHES LIST VIEW */
                  <div className="p-4 flex-1 overflow-y-auto">
                    <h2 className="text-lg font-bold text-white mb-3">New Matches</h2>
                    
                    {/* Horizontal Recent Matches Bar */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-4 scrollbar-none">
                      {matches.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => setActiveChatId(m.id)}
                          className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 group"
                        >
                          <div className="relative">
                            <img
                              src={m.profile.images[0]}
                              alt={m.profile.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-rose-500 p-0.5 group-hover:scale-105 transition"
                            />
                            <span className="absolute bottom-0 right-0 text-sm">{m.profile.flag}</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-200">{m.profile.name}</span>
                        </div>
                      ))}
                    </div>

                    <h2 className="text-lg font-bold text-white mb-3">Conversations</h2>
                    <div className="space-y-2">
                      {matches.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => setActiveChatId(m.id)}
                          className="flex items-center gap-3 p-3 bg-slate-800/40 hover:bg-slate-800/80 rounded-2xl border border-slate-800/80 cursor-pointer transition"
                        >
                          <img
                            src={m.profile.images[0]}
                            alt={m.profile.name}
                            className="w-12 h-12 rounded-full object-cover border border-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                                {m.profile.name} <span className="text-xs text-slate-400">{m.profile.flag}</span>
                              </h4>
                              <span className="text-[10px] text-slate-400">{m.time}</span>
                            </div>
                            <p className="text-xs text-slate-300 truncate mt-0.5">{m.lastMessage}</p>
                          </div>
                          {m.unread && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full flex-shrink-0"></div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EXPLORE WORLDWIDE PASSPORT TAB */}
            {}
            {activeTab === 'explore' && (
              <div className="p-4 flex-1 overflow-y-auto space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-rose-400" /> Passport Cross-World Hub
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Connect with singles in Kigali, East Africa, Europe, North America, and beyond.
                  </p>
                </div>

                {/* Popular Cities Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {GLOBAL_CITIES.map((city, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setGlobalPassport(true);
                        setActiveTab('swipe');
                      }}
                      className="p-3 bg-slate-800/60 hover:bg-slate-800 rounded-2xl border border-slate-700/60 cursor-pointer transition flex items-center gap-3 group"
                    >
                      <span className="text-2xl">{city.flag}</span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-white group-hover:text-rose-400 transition">{city.name}</h4>
                        <p className="text-[10px] text-slate-400">{city.users}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Local Kigali Spotlight Banner */}
                <div className="bg-gradient-to-r from-purple-900/60 via-pink-900/40 to-slate-900 p-4 rounded-2xl border border-purple-500/30 flex items-center justify-between">
                  <div className="space-y-1 max-w-[70%]">
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-semibold">
                      Featured Hub: Rwanda
                    </span>
                    <h3 className="font-bold text-sm text-white">Kigali Nightlife & Coffee Dates</h3>
                    <p className="text-xs text-slate-300">Over 14,000 active verified singles looking for dates in Kigali.</p>
                  </div>
                  <div className="text-3xl">🇷🇼</div>
                </div>

                {/* Verified Profiles Section */}
                <div>
                  <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-400" /> Top Verified Singles Worldwide
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {profiles.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedDetailProfile(p)}
                        className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 cursor-pointer group shadow-lg"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <p className="text-xs font-bold flex items-center gap-1">
                            {p.name}, {p.age} <span>{p.flag}</span>
                          </p>
                          <p className="text-[10px] text-slate-300 truncate">{p.occupation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIP SUBSCRIPTIONS & PAYMENT GATEWAY TAB */}
            {}
            {activeTab === 'vip' && (
              <div className="p-4 flex-1 overflow-y-auto space-y-5">
                <div className="text-center space-y-2">
                  <div className="inline-flex p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
                    <Crown className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Upgrade HeartSync</h2>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Unlock Unlimited Swiping, Global Passport, Rewinds & Direct Payments via Mobile Money.
                  </p>
                </div>

                {/* Package Cards */}
                <div className="space-y-3">
                  {SUBSCRIPTION_PACKAGES.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-4 rounded-2xl border cursor-pointer transition relative ${
                        selectedPackage.id === pkg.id
                          ? 'bg-slate-800 border-rose-500 ring-2 ring-rose-500/30'
                          : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-base text-white">{pkg.name}</h3>
                          <span className="text-xs text-slate-400">{pkg.duration}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-extrabold text-base text-rose-400">{pkg.priceRWF}</p>
                          <p className="text-[10px] text-slate-400">{pkg.priceUSD}</p>
                        </div>
                      </div>

                      <ul className="space-y-1.5 mt-3 pt-3 border-t border-slate-700/50">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPackage(pkg);
                          setPaymentModalOpen(true);
                        }}
                        className="w-full mt-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow-lg shadow-rose-500/20"
                      >
                        Subscribe with Mobile Money / Card
                      </button>
                    </div>
                  ))}
                </div>

                {/* Mobile Money Notice Box */}
                <div className="bg-slate-800/50 border border-slate-700/70 p-4 rounded-2xl flex items-start gap-3">
                  <SmartphoneNfc className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <h4 className="font-bold text-slate-200">MTN / Airtel Mobile Money Enabled</h4>
                    <p className="text-slate-400 leading-relaxed">
                      Instant STK Push setup configured for phone numbers (e.g. <span className="text-emerald-400 font-mono font-bold">0796585529</span>). Supports MTN MoMo, Airtel Money, Visa & MasterCard worldwide.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MY PROFILE TAB */}
            {}
            {activeTab === 'profile' && (
              <div className="p-4 flex-1 overflow-y-auto space-y-5">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative">
                    <img
                      src={userProfile.photo}
                      alt={userProfile.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-rose-500 shadow-xl"
                    />
                    <button className="absolute bottom-0 right-0 p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-full border border-slate-600 shadow-md">
                      <ImageIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
                      {userProfile.name}, {userProfile.age}
                      <ShieldCheck className="w-5 h-5 text-sky-400" />
                    </h2>
                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-400" /> {userProfile.location}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs text-amber-400 font-semibold">
                    <Crown className="w-3.5 h-3.5" /> {userProfile.vipTier}
                  </div>
                </div>

                {/* Profile Edit Fields */}
                <div className="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Information</h3>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Registered Payment Phone Number</label>
                    <input
                      type="text"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Bio</label>
                    <textarea
                      rows={2}
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl focus:border-rose-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Gender</label>
                      <select
                        value={userProfile.gender}
                        onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl focus:border-rose-500 focus:outline-none"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-binary</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Looking For</label>
                      <select
                        value={userProfile.lookingFor}
                        onChange={(e) => setUserProfile({ ...userProfile, lookingFor: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl focus:border-rose-500 focus:outline-none"
                      >
                        <option>Women</option>
                        <option>Men</option>
                        <option>Everyone</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link to VIP Upgrade */}
                <button
                  onClick={() => setActiveTab('vip')}
                  className="w-full p-3 bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/40 text-amber-300 rounded-2xl text-xs font-bold flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400" /> Manage Membership Plan
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* DEVELOPER EXPORT & APP STORE GUIDE TAB */}
            {}
            {activeTab === 'dev' && (
              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-400" /> Mobile App Build & Publishing Guide
                  </h2>
                  <p className="text-xs text-slate-400">
                    How to convert this HeartSync app into standalone APK (Android) and IPA (iOS) for app store distribution.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Step 1 */}
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/70 space-y-1">
                    <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">Step 1: Mobile Framework Setup</span>
                    <h4 className="font-bold text-white">Export to React Native / Expo</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Copy the JSX component into an Expo or React Native project. Expo allows cross-platform native compiling for Android (Google Play) and iOS (Apple App Store).
                    </p>
                    <code className="block bg-slate-950 p-2 rounded text-[10px] text-emerald-400 font-mono mt-1">
                      npx create-expo-app HeartSyncApp
                    </code>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/70 space-y-1">
                    <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">Step 2: Mobile Money Integration</span>
                    <h4 className="font-bold text-white">RWANDA / EA Mobile Money Setup (0796585529)</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Connect your backend server to MTN MoMo API / Flutterwave / Paypack Rwanda. When a user enters <span className="font-mono text-emerald-300">0796585529</span>, fire an STK push prompt directly to their phone screen.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/70 space-y-1">
                    <span className="font-bold text-sky-400 uppercase tracking-wider text-[10px]">Step 3: App Store & Play Store Publishing</span>
                    <h4 className="font-bold text-white">Submitting to Google Play & Apple App Store</h4>
                    <p className="text-slate-300 leading-relaxed">
                      Use Expo Application Services (EAS) to build standalone binaries:
                    </p>
                    <code className="block bg-slate-950 p-2 rounded text-[10px] text-sky-300 font-mono mt-1">
                      eas build --platform all
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>

          {}
          <nav className="border-t border-slate-800 bg-slate-900/95 backdrop-blur px-3 py-2 flex items-center justify-around z-30">
            <button
              onClick={() => setActiveTab('swipe')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'swipe' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="text-[10px]">Swipe</span>
            </button>

            <button
              onClick={() => setActiveTab('explore')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'explore' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span className="text-[10px]">Passport</span>
            </button>

            <button
              onClick={() => setActiveTab('matches')}
              className={`flex flex-col items-center gap-1 relative transition ${
                activeTab === 'matches' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-[10px]">Matches</span>
              {matches.some((m) => m.unread) && (
                <span className="absolute top-0 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('vip')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'vip' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Crown className="w-5 h-5" />
              <span className="text-[10px]">VIP VIP</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 transition ${
                activeTab === 'profile' ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px]">Profile</span>
            </button>
          </nav>
        </div>
      </main>

      {}
      {selectedDetailProfile && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedDetailProfile(null)}
              className="absolute top-4 right-4 p-2 bg-slate-950/70 text-white rounded-full z-10 hover:bg-slate-950 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-72 relative">
              <img src={selectedDetailProfile.images[0]} alt={selectedDetailProfile.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {selectedDetailProfile.name}, {selectedDetailProfile.age} <span>{selectedDetailProfile.flag}</span>
                </h2>
                <p className="text-xs text-slate-300">{selectedDetailProfile.occupation}</p>
              </div>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">About</h4>
                <p className="text-slate-200 leading-relaxed text-sm">{selectedDetailProfile.bio}</p>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
                <h4 className="font-bold text-rose-400 mb-1">Date Prompt</h4>
                <p className="text-slate-200 italic">"{selectedDetailProfile.prompt}"</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-2">Interests</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDetailProfile.interests.map((tag, idx) => (
                    <span key={idx} className="bg-slate-800 text-slate-200 px-3 py-1 rounded-full border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {}
      {paymentModalOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl p-6 relative">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Payment Successful!</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Your <span className="text-amber-400 font-bold">{selectedPackage.name}</span> subscription has been activated for number <span className="font-mono text-emerald-400 font-bold">{momoNumber}</span>.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-bold text-white">Checkout Upgrade</h3>
                  <p className="text-xs text-slate-400">Selected Plan: <span className="text-rose-400 font-bold">{selectedPackage.name}</span> ({selectedPackage.priceRWF})</p>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'momo'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <SmartphoneNfc className="w-4 h-4" /> Mobile Money
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      paymentMethod === 'card'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Visa / MasterCard
                  </button>
                </div>

                {/* Mobile Money Details */}
                {paymentMethod === 'momo' && (
                  <div className="space-y-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">MTN / Airtel Payment Phone Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-sm px-3 py-2.5 rounded-xl focus:border-emerald-500 focus:outline-none"
                          placeholder="e.g. 0796585529"
                        />
                        <span className="absolute right-3 top-2.5 text-xs text-slate-400">🇷🇼 EA</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      An STK Push request will be sent to <span className="text-emerald-400 font-mono font-bold">{momoNumber}</span>. Enter your PIN on your phone to complete the purchase.
                    </p>
                  </div>
                )}

                {/* Card Payment Details Mock */}
                {paymentMethod === 'card' && (
                  <div className="space-y-2 bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-300 block mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        className="w-full bg-slate-900 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl"
                        readOnly
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={processPayment}
                  disabled={paymentProcessing || !momoNumber}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-sm py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {paymentProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                      Sending Mobile Money Prompt...
                    </>
                  ) : (
                    `Confirm Payment (${selectedPackage.priceRWF})`
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {}
      {showFilters && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Discovery Preferences</h3>
              <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-200">Global Passport Mode</h4>
                  <p className="text-[10px] text-slate-400">Match with singles across Rwanda & globally</p>
                </div>
                <input
                  type="checkbox"
                  checked={globalPassport}
                  onChange={(e) => setGlobalPassport(e.target.checked)}
                  className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="font-bold text-slate-200 block mb-1">Age Range: 18 - {filterAge[1]}</label>
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={filterAge[1]}
                  onChange={(e) => setFilterAge([18, parseInt(e.target.value)])}
                  className="w-full accent-rose-500"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2.5 rounded-xl transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}