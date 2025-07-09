'use client';
import { useState } from 'react';
import ProfileCard from './ProfileCard'
import SearchAndLeaderboard from './SearchAndLeaderboard'

interface ProfileData {
  name: string;
  title: string;
  handle: string;
  avatarUrl: string;
  searchCount?: number;
}

export default function Home() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "MONAD",
    title: "CURRENTLY TESTNET",
    handle: "monad_xyz",
    avatarUrl: "https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&"
  });

  const handleProfileUpdate = (newData: Partial<ProfileData>) => {
    setProfileData(prev => ({ ...prev, ...newData }));
  };

  const handleProfileSelect = (selectedProfile: ProfileData) => {
    setProfileData({
      name: selectedProfile.name,
      title: selectedProfile.title,
      handle: selectedProfile.handle,
      avatarUrl: selectedProfile.avatarUrl
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Black Background Panel with Large Monad Logo */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1
      }}>
        <img 
          src="https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&"
          alt="Monad Background Logo"
          style={{
            width: '1000px',
            height: '700px',
            opacity: 0.1,
            objectFit: 'contain'
          }}
        />
      </div>
      
      <SearchAndLeaderboard onProfileSelect={handleProfileSelect} />
      
      {/* Monad Logo */}
      <div style={{ 
        marginBottom: '10px',
        animation: 'float 3s ease-in-out infinite'
      }}>
        <img 
          src="https://cdn.discordapp.com/attachments/1347255078981074997/1392105527236104243/monad_logo.png?ex=686e52cd&is=686d014d&hm=40e7b82868a759a1c5c78c0de8eb084d6a99c985408f5b59e052ea8f60d6fd37&"
          alt="Monad Logo"
          style={{
            width: '60px',
            height: '60px'
          }}
        />
      </div>
      
      {/* Heading */}
      <h1 style={{
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '30px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #fff, #1da1f2)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 4px 20px rgba(29, 161, 242, 0.3)',
        letterSpacing: '2px'
      }}>
        MONAD PROFILE CARD
      </h1>
      
      <ProfileCard
        name={profileData.name}
        title={profileData.title}
        handle={profileData.handle}
        status="Online"
        contactText=''
        avatarUrl={profileData.avatarUrl}
        showUserInfo={true}
        enableTilt={true}
        onContactClick={() => window.open(`https://x.com/${profileData.handle}`, '_blank')}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
}
