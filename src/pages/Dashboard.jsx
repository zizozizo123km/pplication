import React, { useState, useEffect, useCallback } from 'react';
import { Play, Info, ChevronRight, Loader2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Mock Data Simulation ---

const mockFetchMovies = (delay = 800) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        featured: {
          id: 1,
          title: "The Silent Watcher",
          genre: "Sci-Fi Thriller",
          year: 2024,
          rating: 4.8,
          description: "A lone astronaut discovers an ancient, silent entity orbiting Jupiter, forcing humanity to confront its place in the cosmos. An epic journey of discovery and survival.",
          // Using a high-quality placeholder image typical for a hero section
          backgroundUrl: "https://images.unsplash.com/photo-1517457224424-633878b22a01?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        },
        rows: [
          { id: 'trending', title: 'Trending Now', items: Array.from({ length: 15 }, (_, i) => ({ id: `t${i}`, title: `Trend Film ${i + 1}`, imageUrl: `https://picsum.photos/300/450?random=10${i}`, genre: 'Action', rating: (Math.random() * 1 + 4).toFixed(1) })) },
          { id: 'continue', title: 'Continue Watching', items: Array.from({ length: 10 }, (_, i) => ({ id: `c${i}`, title: `Watched Film ${i + 1}`, imageUrl: `https://picsum.photos/300/450?random=20${i}`, progress: Math.floor(Math.random() * 80) + 10, genre: 'Drama', rating: (Math.random() * 1 + 3.5).toFixed(1) })) },
          { id: 'toprated', title: 'Top Rated in 2024', items: Array.from({ length: 12 }, (_, i) => ({ id: `r${i}`, title: `Top Film ${i + 1}`, imageUrl: `https://picsum.photos/300/450?random=30${i}`, genre: 'Comedy', rating: (Math.random() * 0.5 + 4.5).toFixed(1) })) },
          { id: 'scifi', title: 'Sci-Fi Adventures', items: Array.from({ length: 15 }, (_, i) => ({ id: `s${i}`, title: `Sci-Fi Title ${i + 1}`, imageUrl: `https://picsum.photos/300/450?random=40${i}`, genre: 'Sci-Fi', rating: (Math.random() * 1 + 4).toFixed(1) })) },
        ]
      });
    }, delay);
  });
};

// --- Framer Motion Variants ---

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// --- Components ---

const MovieCard = React.memo(({ movie }) => {
  return (
    <motion.div
      className="relative flex-shrink-0 w-56 h-80 rounded-lg overflow-hidden cursor-pointer group transition-transform duration-300 transform shadow-2xl bg-gray-900 border border-transparent hover:border-red-600"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
      layout
    >
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{movie.title}</h3>
        <p className="text-sm text-gray-300 flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
          {movie.rating} • {movie.genre}
        </p>

        {movie.progress && (
          <div className="w-full bg-red-800/50 rounded-full h-1 mt-2">
            <div
              className="bg-red-600 h-1 rounded-full transition-all duration-500"
              style={{ width: `${movie.progress}%` }}
            ></div>
            <p className="text-xs text-gray-400 mt-1">{movie.progress}% Watched</p>
          </div>
        )}
      </div>

      <motion.button
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-700 z-10 ring-4 ring-black/30"
        whileTap={{ scale: 0.9 }}
      >
        <Play className="w-7 h-7 fill-white" />
      </motion.button>
    </motion.div>
  );
});

const ContentRow = React.memo(({ title, items }) => {
  const scrollRef = React.useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.7; // Scroll 70% of viewport width
      const newScrollPosition = direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-10 group relative px-8 md:px-12">
      <h2 className="text-2xl font-bold text-white mb-4 hover:text-red-500 transition-colors cursor-pointer flex items-center">
        {title} <ChevronRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h2>

      {/* Scroll Container */}
      <motion.div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-scroll scrollbar-hide py-2"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        initial="hidden"
        animate="visible"
      >
        {items.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.div>
      
      {/* Scroll Arrows */}
      <button 
        className="hidden lg:block absolute top-1/2 left-0 transform translate-x-4 -translate-y-1/2 bg-black/70 p-3 rounded-full text-white z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/90 focus:outline-none"
        onClick={() => handleScroll('left')}
        aria-label={`Scroll ${title} left`}
      >
        <ChevronRight className="w-6 h-6 rotate-180" />
      </button>
      <button 
        className="hidden lg:block absolute top-1/2 right-0 transform -translate-x-4 -translate-y-1/2 bg-black/70 p-3 rounded-full text-white z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/90 focus:outline-none"
        onClick={() => handleScroll('right')}
        aria-label={`Scroll ${title} right`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
});

const HeroSection = React.memo(({ featured }) => {
  if (!featured) return null;

  return (
    <motion.div 
      className="relative h-[65vh] md:h-[85vh] w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        <img
          src={featured.backgroundUrl}
          alt={featured.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent"></div>
      </div>

      {/* Content Area */}
      <div className="absolute bottom-0 left-0 p-8 md:p-16 lg:p-24 max-w-lg lg:max-w-2xl text-white">
        <motion.p 
          className="text-lg font-semibold text-red-500 mb-2 uppercase tracking-widest drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {featured.genre} | {featured.year}
        </motion.p>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 drop-shadow-xl leading-tight"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {featured.title}
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-xl mb-6 text-gray-200 line-clamp-3 drop-shadow-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {featured.description}
        </motion.p>

        <motion.div 
          className="flex space-x-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.button 
            className="flex items-center px-8 py-3 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-300 transition-colors shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 mr-2 fill-black" />
            Play
          </motion.button>
          <motion.button 
            className="flex items-center px-8 py-3 bg-gray-600/70 text-white font-bold rounded-full text-lg hover:bg-gray-500/80 transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info className="w-6 h-6 mr-2" />
            Details
          </motion.button>
        </motion.div>
      </div>
      
      {/* Ensure sharp contrast at the bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
    </motion.div>
  );
});

// --- Main Dashboard Component ---

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // In a real application, replace with: const result = await api.get('/dashboard');
        const result = await mockFetchMovies(); 
        setData(result);
      } catch (e) {
        setError("Failed to load dashboard content. API unreachable.");
        // Axios error handling would be more specific here
        console.error("Dashboard Fetch Error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
        <span className="mt-4 text-white text-xl font-medium">Loading your cinematic universe...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-10 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl text-red-600 mb-4 font-bold">Connection Error</h1>
        <p className='text-lg'>{error}</p>
        <p className='text-gray-400 mt-4'>Please check your network connection and try reloading the page.</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      
      {/* 1. Hero Section */}
      {data?.featured && <HeroSection featured={data.featured} />}

      {/* 2. Content Rows Container */}
      <motion.div 
        className="relative -mt-20 z-20 pb-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {data?.rows.map((row) => (
          <ContentRow key={row.id} title={row.title} items={row.items} />
        ))}
      </motion.div>
      
      {/* Spacer for bottom padding */}
      <div className="h-10 bg-black"></div>
    </div>
  );
};

export default Dashboard;