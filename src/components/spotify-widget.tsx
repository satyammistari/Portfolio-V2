"use client";

import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LanyardSpotify {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

interface LanyardData {
  spotify: LanyardSpotify | null;
  discord_status: string;
}

export function SpotifyWidget() {
  const [lanyardData, setLanyardData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;
    
    if (!discordId) {
      console.error('NEXT_PUBLIC_DISCORD_ID is not set in environment variables');
      setLoading(false);
      return;
    }

    const fetchLanyardData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        const result = await response.json();
        
        if (result.success) {
          setLanyardData(result.data);
        }
      } catch (error) {
        console.error('Error fetching Lanyard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanyardData();
    const interval = setInterval(fetchLanyardData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const isPlaying = !!lanyardData?.spotify;
  const song = lanyardData?.spotify?.song || "Lose Yourself";
  const artist = lanyardData?.spotify?.artist || "Eminem";
  const albumCover = lanyardData?.spotify?.album_art_url;
  const trackId = lanyardData?.spotify?.track_id;

  return (
    <div 
      className="bg-[#111111] border border-white/10 rounded-lg p-4 hover:border-white/20 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <div className="flex items-center gap-4">
        {/* Album Art */}
        <div className="w-14 h-14 flex-shrink-0">
          <div className="w-14 h-14 bg-white/5 rounded-md overflow-hidden">
            {albumCover ? (
              <Image
                src={albumCover}
                alt={song}
                width={56}
                height={56}
                unoptimized
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500" />
            )}
          </div>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          {/* Header with Spotify Icon and Animated Visualizer */}
          <div className="flex items-center gap-2 mb-1.5">
            {/* Green Animated Music Visualizer */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-0.5 bg-green-500 rounded-full animate-music-bar"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
            
            <span 
              className="text-[10px] text-white/60 font-medium tracking-wider uppercase"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {isPlaying ? 'Now playing' : 'Last played'}
            </span>

            {/* Spotify Icon */}
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
          </div>
          
          <h4 
            className="text-sm font-bold text-white truncate mb-0.5"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {song}
          </h4>
          <p 
            className="text-xs text-white/60 truncate"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {artist}
          </p>
        </div>

        {/* Play Button */}
        {trackId ? (
          <a
            href={`https://open.spotify.com/track/${trackId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition-all flex-shrink-0 group"
            aria-label="Play on Spotify"
          >
            <Play className="w-4 h-4 text-black fill-black" />
          </a>
        ) : (
          <button 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-all flex-shrink-0"
            aria-label="No track available"
          >
            <Play className="w-4 h-4 text-white/60 fill-white/60" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes music-bar {
          0%, 100% {
            height: 4px;
          }
          50% {
            height: 12px;
          }
        }
        
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

