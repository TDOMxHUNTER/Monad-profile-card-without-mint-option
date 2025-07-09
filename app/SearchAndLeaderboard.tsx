
'use client';
import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './SearchAndLeaderboard.css';

interface SearchResult {
  name: string;
  title: string;
  handle: string;
  avatarUrl: string;
  searchCount: number;
}

interface SearchAndLeaderboardProps {
  onProfileSelect: (profile: SearchResult) => void;
}

// Mock database of users - in a real app, this would come from an API
const mockUsers: SearchResult[] = [
  {
    name: "Berzan",
    title: "Co-founder & CEO of monda exchange",
    handle: "berzanorg",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392053798880673802/aV_RRUqA_400x400-removebg-preview.png?ex=686e22a0&is=686cd120&hm=b419b1f86a3c06e887906fcb2a97fe250892b0ff9ac035ad31ebc02082816962&",
    searchCount: 0
  },
  {
    name: "Alex Johnson",
    title: "Full Stack Developer",
    handle: "alexdev",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "Sarah Chen",
    title: "UI/UX Designer",
    handle: "sarahdesigns",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "Mike Rodriguez",
    title: "Blockchain Engineer",
    handle: "mikechain",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "Emma Wilson",
    title: "Product Manager",
    handle: "emmaprod",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "David Kim",
    title: "Data Scientist",
    handle: "daviddata",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "Lisa Anderson",
    title: "DevOps Engineer",
    handle: "lisaops",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "James Miller",
    title: "Security Expert",
    handle: "jamessec",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "Rachel Green",
    title: "Frontend Developer",
    handle: "rachelfrontend",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "Tom Brown",
    title: "Backend Developer",
    handle: "tombackend",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "Anna Davis",
    title: "Mobile Developer",
    handle: "annamobile",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  },
  {
    name: "Chris Taylor",
    title: "AI Engineer",
    handle: "chrisai",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&",
    searchCount: 0
  }
];

const SearchAndLeaderboard: React.FC<SearchAndLeaderboardProps> = ({ onProfileSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [users, setUsers] = useState<SearchResult[]>([]);

  // Load search counts from localStorage on component mount
  useEffect(() => {
    const savedSearchCounts = localStorage.getItem('profileSearchCounts');
    if (savedSearchCounts) {
      const searchCounts = JSON.parse(savedSearchCounts);
      const updatedUsers = mockUsers.map(user => ({
        ...user,
        searchCount: searchCounts[user.handle] || 0
      }));
      setUsers(updatedUsers);
    } else {
      setUsers(mockUsers);
    }
  }, []);

  // Save search counts to localStorage whenever users change
  useEffect(() => {
    const searchCounts = users.reduce((acc, user) => {
      acc[user.handle] = user.searchCount;
      return acc;
    }, {} as Record<string, number>);
    localStorage.setItem('profileSearchCounts', JSON.stringify(searchCounts));
  }, [users]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.handle.toLowerCase().includes(query.toLowerCase()) ||
        user.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleProfileClick = (profile: SearchResult) => {
    // Increment search count
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.handle === profile.handle
          ? { ...user, searchCount: user.searchCount + 1 }
          : user
      )
    );

    // Update the profile with new search count for the callback
    const updatedProfile = {
      ...profile,
      searchCount: profile.searchCount + 1
    };

    onProfileSelect(updatedProfile);
    setSearchQuery('');
    setShowResults(false);
  };

  const getTopSearchedProfiles = () => {
    return users
      .filter(user => user.searchCount > 0)
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 10);
  };

  return (
    <div className="search-leaderboard-container">
      {/* Connect Wallet Button */}
      <div className="connect-wallet-floating">
        <ConnectButton />
      </div>

      {/* Toggle Button */}
      <button
        className="search-toggle-btn"
        onClick={() => setShowPanel(!showPanel)}
        title="Search & Leaderboard"
      >
        🔍
      </button>

      {/* Search and Leaderboard Panel */}
      {showPanel && (
        <div className="search-leaderboard-panel">
          <div className="panel-header">
            <h3>Search & Leaderboard</h3>
            <button
              className="close-panel"
              onClick={() => setShowPanel(false)}
            >
              ✕
            </button>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <div className="search-input-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search profiles..."
                className="search-input"
              />
              <div className="search-icon">🔍</div>
            </div>
            
            {showResults && searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((profile) => (
                  <div
                    key={profile.handle}
                    className="search-result-item"
                    onClick={() => handleProfileClick(profile)}
                  >
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="search-result-avatar"
                    />
                    <div className="search-result-info">
                      <div className="search-result-name">{profile.name}</div>
                      <div className="search-result-handle">@{profile.handle}</div>
                      <div className="search-result-title">{profile.title}</div>
                    </div>
                    <div className="search-count">
                      {profile.searchCount} searches
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showResults && searchResults.length === 0 && searchQuery.trim() && (
              <div className="no-results">
                No profiles found for "{searchQuery}"
              </div>
            )}
          </div>

          {/* Leaderboard Toggle Button */}
          <button
            className="leaderboard-toggle"
            onClick={() => setShowLeaderboard(!showLeaderboard)}
          >
            🏆 {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
          </button>

          {/* Leaderboard Section */}
          {showLeaderboard && (
            <div className="leaderboard-section">
              <div className="leaderboard-list">
                {getTopSearchedProfiles().length > 0 ? (
                  getTopSearchedProfiles().map((profile, index) => (
                    <div
                      key={profile.handle}
                      className={`leaderboard-item rank-${index + 1}`}
                      onClick={() => handleProfileClick(profile)}
                    >
                      <div className="rank-number">#{index + 1}</div>
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="leaderboard-avatar"
                      />
                      <div className="leaderboard-info">
                        <div className="leaderboard-name">{profile.name}</div>
                        <div className="leaderboard-handle">@{profile.handle}</div>
                      </div>
                      <div className="search-count-badge">
                        {profile.searchCount}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-searches">
                    No searches yet. Start searching for profiles!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndLeaderboard;
