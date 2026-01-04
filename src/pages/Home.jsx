import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For potential future real API calls
import { motion } from 'framer-motion';
import { Play, Info, ChevronRight, Loader2 } from 'lucide-react';

// --- Mock API Data and Configuration (Simulating real data fetching) ---
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const TMDB_POSTER_URL = 'https://image.tmdb.org/t/p/w500';

const mockMovie = (id, title, overview, poster, backdrop, releaseYear) => ({
    id: id,
    title: title,
    overview: overview || "A groundbreaking epic saga detailing the struggles and triumphs of heroes in a dystopian future, battling against insurmountable odds to restore peace to the fragmented world.",
    poster_path: poster,
    backdrop_path: backdrop,
    vote_average: (Math.random() * 3 + 7).toFixed(1),
    release_date: `${releaseYear}-10-27`
});

const mockTrending = [
    mockMovie(1, "The Galactic Sentinel", "An AI wakes up to defend humanity from an unknown threat.", '/pIKuG2R1F5z07K4z1P6yQx8E4D.jpg', '/jSA5xP3FwJ3xK4z1P6yQx8E4D.jpg', 2024),
    mockMovie(2, "Shadows of Neon", "A detective chases a ghost in the cyberpunk city.", '/r4n6uQG3pS0xVvK3jK9xQ1H2G3Y.jpg', '/x3bQ0v8qP2tS9jH5jK7xQ1H2G3Y.jpg', 2023),
    mockMovie(3, "Desert Mirage", "Survival story in the vast, unforgiving sands.", '/s5tWv8zJ3rS4sP2yQx1G2R4E5D.jpg', '/q3n8yR4bX5eS3xT2uP9yQ1G2R4E5D.jpg', 2022),
    mockMovie(4, "Code Red", "Hackers race against time to prevent global meltdown.", '/t2rQx8yR4eS3xT2uP9yQ1G2R4E5D.jpg', '/u1vQx8yR4eS3xT2uP9yQ1G2R4E5D.jpg', 2024),
    mockMovie(5, "Echoes of Time", "A scientist discovers temporal displacement.", '/v3wS9jK4z1P6yQx8E4D.jpg', '/w4n6uQG3pS0xVvK3jK9xQ1H2G3Y.jpg', 2021),
    mockMovie(6, "Midnight Train", "A suspenseful journey across Europe.", '/a7dKzLp5xM4VvX0jF1G2R4E5D.jpg', '/b8qR6yJ4FwK3z1P6yQx8E4D.jpg', 2023),
    mockMovie(7, "The Last Bloom", "Fantasy tale of magic and ancient curses.", '/c8qR6yJ4FwK3z1P6yQx8E4D.jpg', '/d7dKzLp5xM4VvX0jF1G2R4E5D.jpg', 2024),
];

const mockCategoriesData = {
    Trending: { title: "Trending Now", movies: mockTrending },
    TopRated: { title: "Top Rated", movies: [...mockTrending].reverse() },
    Action: { title: "Action Thrillers", movies: mockTrending.slice(1).concat(mockTrending[0]) },
    Comedy: { title: "Stand-Up & Comedies", movies: mockTrending.slice(2).concat(mockTrending.slice(0, 2)) },
    Horror: { title: "Horror Films", movies: mockTrending },
};

// --- Sub-Components ---

const HeroSection = ({ movie }) => {
    if (!movie) return null;

    const backdropUrl = `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`;

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[85vh] md:h-[95vh] text-white overflow-hidden"
        >
            <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                    backgroundImage: `url(${backdropUrl})`,
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 p-4 md:p-16 w-full md:w-2/3 lg:w-1/2">
                <motion.h1 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="text-5xl md:text-8xl font-extrabold mb-4 drop-shadow-lg"
                >
                    {movie.title}
                </motion.h1>

                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.7 }}
                    className="text-lg md:text-xl mb-8 line-clamp-3 drop-shadow-md text-gray-200"
                >
                    {movie.overview}
                </motion.p>

                <div className="flex space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center px-6 py-3 bg-white text-black font-bold rounded text-lg transition duration-300 shadow-xl"
                    >
                        <Play className="w-6 h-6 mr-2 fill-current" />
                        Play
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(107, 114, 128, 0.8)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center px-6 py-3 bg-gray-600 bg-opacity-70 text-white font-bold rounded text-lg transition duration-300"
                    >
                        <Info className="w-6 h-6 mr-2" />
                        More Info
                    </motion.button>
                </div>
            </div>
            
            {/* Rating Badge */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-[20%] right-0 bg-black/70 backdrop-blur-sm p-3 rounded-l-lg border-l-4 border-red-600 text-lg font-semibold hidden md:block"
            >
                TMDB: {movie.vote_average}
            </motion.div>
        </motion.header>
    );
};


const MovieCard = ({ movie }) => {
    const posterUrl = `${TMDB_POSTER_URL}${movie.poster_path}`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.08, zIndex: 20, transition: { type: "spring", stiffness: 300 } }}
            className="flex-shrink-0 w-36 md:w-56 h-auto cursor-pointer relative rounded-lg overflow-hidden group shadow-xl bg-gray-900"
        >
            <img 
                src={posterUrl} 
                alt={movie.title} 
                className="w-full h-full object-cover aspect-[2/3] transition duration-300 group-hover:opacity-80"
                loading="lazy"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x450?text=No+Image" }}
            />

            {/* Hover details */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                    <h3 className="text-base md:text-lg font-bold mb-3 line-clamp-2">{movie.title}</h3>
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition"
                    >
                        <Play className="w-5 h-5 fill-current" />
                    </motion.button>
                    <p className="mt-2 text-xs text-gray-300">{movie.release_date.split('-')[0]}</p>
                </div>
            </div>
        </motion.div>
    );
};

const MovieRow = ({ title, movies }) => {
    const scrollContainerRef = React.useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            // Scroll 80% of the container width
            const scrollAmount = current.clientWidth * 0.8;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="mb-12 relative group pl-6 md:pl-16">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-4 hover:text-gray-300 transition duration-300 cursor-pointer w-fit">
                {title} <ChevronRight className="inline w-6 h-6 ml-1 transform group-hover:translate-x-1 transition duration-300" />
            </h2>
            
            {/* Scroll Container */}
            <div 
                ref={scrollContainerRef}
                className="flex space-x-3 md:space-x-5 overflow-x-scroll scrollbar-hide p-2"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {movies.map(movie => (
                    <div key={movie.id} className="scroll-snap-align-start">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={() => scroll('left')}
                className="absolute top-[55%] left-0 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 md:p-3 rounded-r-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block z-20"
                aria-label="Scroll Left"
            >
                &lt;
            </button>
            <button 
                onClick={() => scroll('right')}
                className="absolute top-[55%] right-0 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 md:p-3 rounded-l-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block z-20"
                aria-label="Scroll Right"
            >
                &gt;
            </button>

            {/* Note: In a full project, scrollbar hiding is usually handled globally in CSS */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </div>
    );
};


// --- Main Component ---

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState({});
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomeData = async () => {
            setLoading(true);
            try {
                // Simulate network delay and data fetching success
                await new Promise(resolve => setTimeout(resolve, 800)); 
                
                setCategories(mockCategoriesData);
                
                if (mockTrending.length > 0) {
                    setFeaturedMovie(mockTrending[0]);
                }

            } catch (err) {
                console.error("Failed to fetch home data:", err);
                setError("Failed to load content. Please check your network connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black text-white text-xl p-8">
                Error: {error}
            </div>
        );
    }

    const categoryKeys = Object.keys(categories);

    return (
        <div className="min-h-screen bg-black">
            
            {featuredMovie && <HeroSection movie={featuredMovie} />}

            <main className="-mt-24 relative z-10 pb-10"> 
                {categoryKeys.map((key, index) => (
                    <motion.div
                        key={key}
                        // Use Framer Motion for staggered row entry
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.5, type: 'spring', stiffness: 100 }}
                    >
                        <MovieRow 
                            title={categories[key].title} 
                            movies={categories[key].movies} 
                        />
                    </motion.div>
                ))}
            </main>
        </div>
    );
};

export default Home;