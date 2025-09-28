"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Gift, Clock, Star, TrendingUp, Award, BookOpen, CreditCard, Zap, Users, Target, Trophy, Bell } from 'lucide-react';

const SpinTheWheel = () => {
  // Main state management
  const [user, setUser] = useState({
    id: 'user_123',
    name: 'John Doe',
    totalPoints: 2450,
    spinsLeft: 3,
    level: 'Gold',
    streak: 7,
    badges: ['Early Bird', 'Quiz Master', 'Saver']
  });

  const [spinHistory, setSpinHistory] = useState([
    { id: 1, reward: '100 Points', date: new Date().toISOString(), type: 'points' },
    { id: 2, reward: '₹5 Cashback', date: new Date(Date.now() - 86400000).toISOString(), type: 'cash' }
  ]);

  const [isSpinning, setIsSpinning] = useState(false);
  const [lastReward, setLastReward] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [lastSpinTime, setLastSpinTime] = useState(null);
  const [timeUntilNextSpin, setTimeUntilNextSpin] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [activeTab, setActiveTab] = useState('wheel');
  
  const wheelRef = useRef(null);

  // Comprehensive reward pool with probabilities
  const rewardPool = [
    { id: 1, text: '50 Points', value: 50, type: 'points', probability: 25, color: '#4F46E5', icon: '⭐' },
    { id: 2, text: '100 Points', value: 100, type: 'points', probability: 20, color: '#7C3AED', icon: '✨' },
    { id: 3, text: '₹10 Cashback', value: 10, type: 'cash', probability: 15, color: '#059669', icon: '💰' },
    { id: 4, text: '₹25 Cashback', value: 25, type: 'cash', probability: 10, color: '#DC2626', icon: '💸' },
    { id: 5, text: '20% Discount', value: 20, type: 'discount', probability: 12, color: '#EA580C', icon: '🎫' },
    { id: 6, text: 'Free Course', value: 1, type: 'course', probability: 8, color: '#0891B2', icon: '📚' },
    { id: 7, text: 'Premium Badge', value: 1, type: 'badge', probability: 5, color: '#BE185D', icon: '🏆' },
    { id: 8, text: '₹100 Voucher', value: 100, type: 'voucher', probability: 3, color: '#7C2D12', icon: '🎁' },
    { id: 9, text: 'JACKPOT!', value: 500, type: 'jackpot', probability: 2, color: '#FFD700', icon: '🎊' }
  ];

  // Financial tips that change daily
  const dailyTips = [
    {
      title: "Emergency Fund Rule",
      content: "Build an emergency fund covering 3-6 months of expenses. Start with just ₹500 this month!",
      category: "Savings",
      icon: "🛡️"
    },
    {
      title: "50-30-20 Budget Rule",
      content: "Allocate 50% needs, 30% wants, 20% savings. Track your spending to see where your money goes!",
      category: "Budgeting",
      icon: "📊"
    },
    {
      title: "Investment Power",
      content: "Start investing early! Even ₹1000/month can grow to ₹15+ lakhs in 10 years with compound interest.",
      category: "Investment",
      icon: "📈"
    },
    {
      title: "Credit Score Boost",
      content: "Pay credit card bills in full before due date. Keep utilization below 30% for better credit score.",
      category: "Credit",
      icon: "💳"
    },
    {
      title: "Tax Saving Tips",
      content: "Use 80C deductions: ELSS, PPF, NSC can save up to ₹46,800 in taxes annually!",
      category: "Tax",
      icon: "📋"
    },
    {
      title: "Smart Shopping",
      content: "Use cashback apps and compare prices before big purchases. Small savings add up over time!",
      category: "Spending",
      icon: "🛒"
    },
    {
      title: "SIP Strategy",
      content: "Start SIP in diversified mutual funds. Market timing doesn't matter when you invest regularly.",
      category: "Investment",
      icon: "🎯"
    }
  ];

  // Leaderboard data
  const [leaderboard] = useState([
    { rank: 1, name: 'Sarah Chen', points: 15420, level: 'Platinum', avatar: '👩‍💼' },
    { rank: 2, name: 'Mike Johnson', points: 12850, level: 'Gold', avatar: '👨‍💻' },
    { rank: 3, name: 'You', points: user.totalPoints, level: user.level, avatar: '🤵' },
    { rank: 4, name: 'Lisa Wang', points: 8960, level: 'Silver', avatar: '👩‍🎓' },
    { rank: 5, name: 'David Smith', points: 7340, level: 'Silver', avatar: '👨‍🔬' }
  ]);

  // Timer for next spin availability
  useEffect(() => {
    const interval = setInterval(() => {
      const lastSpin = localStorage.getItem('lastSpinTime');
      if (lastSpin) {
        const timeDiff = Date.now() - parseInt(lastSpin);
        const timeLeft = 24 * 60 * 60 * 1000 - timeDiff; // 24 hours in ms
        
        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / (60 * 60 * 1000));
          const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
          setTimeUntilNextSpin(`${hours}h ${minutes}m`);
        } else {
          setTimeUntilNextSpin(null);
          localStorage.removeItem('lastSpinTime');
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Daily tip rotation
  useEffect(() => {
    const today = new Date().getDate();
    setCurrentTip(today % dailyTips.length);
  }, []);

  // Spin wheel logic
  const spinWheel = () => {
    if (isSpinning || user.spinsLeft <= 0) return;

    const lastSpin = localStorage.getItem('lastSpinTime');
    if (lastSpin) {
      const timeDiff = Date.now() - parseInt(lastSpin);
      if (timeDiff < 24 * 60 * 60 * 1000) {
        alert(`Next spin available in ${timeUntilNextSpin}`);
        return;
      }
    }

    setIsSpinning(true);

    // Generate random result based on probabilities
    const random = Math.random() * 100;
    let cumulative = 0;
    let selectedReward = rewardPool[0];

    for (const reward of rewardPool) {
      cumulative += reward.probability;
      if (random <= cumulative) {
        selectedReward = reward;
        break;
      }
    }

    // Calculate rotation
    const segmentAngle = 360 / rewardPool.length;
    const selectedIndex = rewardPool.findIndex(r => r.id === selectedReward.id);
    const baseRotation = wheelRotation;
    const spins = 5; // Number of full rotations
    const finalAngle = (selectedIndex * segmentAngle) + (segmentAngle / 2);
    const totalRotation = baseRotation + (spins * 360) + (360 - finalAngle);

    setWheelRotation(totalRotation);

    // Process reward after animation
    setTimeout(() => {
      processReward(selectedReward);
      setIsSpinning(false);
      setUser(prev => ({ ...prev, spinsLeft: prev.spinsLeft - 1 }));
      localStorage.setItem('lastSpinTime', Date.now().toString());
    }, 3000);
  };

  // Process different types of rewards
  const processReward = (reward) => {
    setLastReward(reward);
    setShowReward(true);

    let updatedUser = { ...user };
    let newAchievements = [];

    switch (reward.type) {
      case 'points':
        updatedUser.totalPoints += reward.value;
        if (reward.value >= 100) {
          newAchievements.push('Big Winner!');
        }
        break;
      case 'cash':
        // Simulate cashback processing
        newAchievements.push('Cashback Earned!');
        break;
      case 'discount':
        newAchievements.push('Discount Unlocked!');
        break;
      case 'course':
        newAchievements.push('Learning Unlocked!');
        break;
      case 'badge':
        updatedUser.badges.push('Lucky Spinner');
        newAchievements.push('New Badge Earned!');
        break;
      case 'voucher':
        newAchievements.push('Voucher Received!');
        break;
      case 'jackpot':
        updatedUser.totalPoints += reward.value;
        newAchievements.push('JACKPOT WINNER!');
        break;
    }

    // Level progression
    if (updatedUser.totalPoints >= 5000 && updatedUser.level === 'Gold') {
      updatedUser.level = 'Platinum';
      newAchievements.push('Level Up: Platinum!');
    }

    setUser(updatedUser);
    setAchievements(newAchievements);

    // Add to spin history
    const newSpin = {
      id: spinHistory.length + 1,
      reward: reward.text,
      date: new Date().toISOString(),
      type: reward.type
    };
    setSpinHistory(prev => [newSpin, ...prev.slice(0, 9)]);

    setTimeout(() => setShowReward(false), 5000);
  };

  // Earn spins through activities
  const earnSpin = (activity) => {
    setUser(prev => ({ 
      ...prev, 
      spinsLeft: prev.spinsLeft + 1,
      totalPoints: prev.totalPoints + 10 // Bonus points for activity
    }));
    alert(`Spin earned for: ${activity}!`);
  };

  // Render wheel segments
  const renderWheelSegments = () => {
    const segmentAngle = 360 / rewardPool.length;
    
    return rewardPool.map((reward, index) => {
      const rotation = index * segmentAngle;
      return (
        <div
          key={reward.id}
          className="absolute w-full h-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`
          }}
        >
          <div 
            className="w-full h-full flex items-start justify-center pt-4"
            style={{ backgroundColor: reward.color }}
          >
            <div className="text-white text-center transform -rotate-90" style={{ transform: `rotate(${segmentAngle/2}deg)` }}>
              <div className="text-lg">{reward.icon}</div>
              <div className="text-xs font-bold mt-1">{reward.text.split(' ')[0]}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white mt-24">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="text-yellow-400" />
              FinSpin Rewards
            </h1>
            <p className="text-purple-200">Level {user.level} • Streak: {user.streak} days</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-400">{user.totalPoints.toLocaleString()}</div>
            <div className="text-sm text-purple-200">Points Balance</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-4">
        <div className="flex space-x-4 mb-6">
          {[
            { id: 'wheel', label: 'Spin Wheel', icon: Target },
            { id: 'tips', label: 'Daily Tips', icon: BookOpen },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'history', label: 'History', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Wheel Tab */}
        {activeTab === 'wheel' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Wheel Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                <div className="relative inline-block">
                  {/* Wheel */}
                  <div 
                    ref={wheelRef}
                    className="relative w-80 h-80 mx-auto rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden"
                    style={{
                      transform: `rotate(${wheelRotation}deg)`,
                      transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
                    }}
                  >
                    {renderWheelSegments()}
                  </div>
                  
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
                  </div>
                  
                  {/* Center Button */}
                  <button
                    onClick={spinWheel}
                    disabled={isSpinning || user.spinsLeft <= 0 || timeUntilNextSpin}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full font-bold text-lg transition-all ${
                      isSpinning || user.spinsLeft <= 0 || timeUntilNextSpin
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-110 animate-pulse'
                    }`}
                  >
                    {isSpinning ? '🎰' : 'SPIN!'}
                  </button>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex justify-center items-center gap-4 text-lg">
                    <Gift className="text-yellow-400" />
                    <span>Spins Left: <strong className="text-yellow-400">{user.spinsLeft}</strong></span>
                  </div>
                  
                  {timeUntilNextSpin && (
                    <div className="flex justify-center items-center gap-2 text-orange-300">
                      <Clock size={18} />
                      <span>Next free spin in: {timeUntilNextSpin}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Earn More Spins */}
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  Earn More Spins
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { activity: 'Complete Quiz', spins: 1, icon: '🧠' },
                    { activity: 'Attend Webinar', spins: 2, icon: '🎓' },
                    { activity: 'Reach Savings Goal', spins: 3, icon: '💰' },
                    { activity: 'Daily Login', spins: 1, icon: '📅' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => earnSpin(item.activity)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="font-semibold">{item.activity}</div>
                      <div className="text-sm text-purple-200">+{item.spins} spin{item.spins > 1 ? 's' : ''}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Stats */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="text-blue-400" />
                  Your Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Level</span>
                    <span className="font-bold text-yellow-400">{user.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Points</span>
                    <span className="font-bold">{user.totalPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Login Streak</span>
                    <span className="font-bold text-orange-400">{user.streak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Badges</span>
                    <span className="font-bold text-purple-400">{user.badges.length}</span>
                  </div>
                </div>
              </div>

              {/* Recent Badges */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Award className="text-purple-400" />
                  Your Badges
                </h3>
                <div className="space-y-2">
                  {user.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                      <div className="text-xl">🏆</div>
                      <span className="text-sm">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="text-green-400" />
                  Quick Tip
                </h3>
                <p className="text-sm text-green-200">
                  Complete daily challenges to earn bonus spins and level up faster!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Daily Tips Tab */}
        {activeTab === 'tips' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{dailyTips[currentTip].icon}</div>
                <h2 className="text-3xl font-bold mb-2">{dailyTips[currentTip].title}</h2>
                <span className="inline-block px-4 py-1 bg-purple-600 rounded-full text-sm">
                  {dailyTips[currentTip].category}
                </span>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 mb-8">
                <p className="text-lg leading-relaxed">{dailyTips[currentTip].content}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {dailyTips.map((tip, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTip(index)}
                    className={`p-4 rounded-xl transition-all ${
                      currentTip === index 
                        ? 'bg-purple-600 shadow-lg scale-105' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{tip.icon}</div>
                    <div className="text-xs font-semibold">{tip.category}</div>
                  </button>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => earnSpin('Reading Daily Tip')}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                >
                  🎯 Earn Spin for Learning!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <Trophy className="text-yellow-400" />
                Top Performers
              </h2>
              
              <div className="space-y-4">
                {leaderboard.map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      player.name === 'You' 
                        ? 'bg-gradient-to-r from-purple-600/50 to-blue-600/50 border-2 border-yellow-400' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    <div className={`text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-full ${
                      player.rank <= 3 ? 'bg-yellow-400 text-black' : 'bg-gray-600'
                    }`}>
                      {player.rank <= 3 ? ['🥇', '🥈', '🥉'][player.rank - 1] : player.rank}
                    </div>
                    
                    <div className="text-3xl">{player.avatar}</div>
                    
                    <div className="flex-1">
                      <div className="font-bold text-lg">{player.name}</div>
                      <div className="text-sm text-purple-200">{player.level} Level</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-xl text-yellow-400">
                        {player.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-purple-200">points</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 text-center">
                <h3 className="font-bold mb-2">🎊 Weekly Challenge</h3>
                <p className="text-sm text-purple-200">
                  Complete 5 financial activities this week to climb the leaderboard!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <Clock className="text-blue-400" />
                Spin History
              </h2>
              
              <div className="space-y-4">
                {spinHistory.map((spin) => (
                  <div
                    key={spin.id}
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/15 transition-all"
                  >
                    <div className="text-2xl">
                      {spin.type === 'points' && '⭐'}
                      {spin.type === 'cash' && '💰'}
                      {spin.type === 'discount' && '🎫'}
                      {spin.type === 'course' && '📚'}
                      {spin.type === 'badge' && '🏆'}
                      {spin.type === 'voucher' && '🎁'}
                      {spin.type === 'jackpot' && '🎊'}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-bold">{spin.reward}</div>
                      <div className="text-sm text-purple-200">
                        {new Date(spin.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      spin.type === 'jackpot' ? 'bg-yellow-400 text-black' :
                      spin.type === 'cash' ? 'bg-green-500 text-white' :
                      'bg-purple-600 text-white'
                    }`}>
                      {spin.type.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>

              {spinHistory.length === 0 && (
                <div className="text-center py-12 text-purple-300">
                  <div className="text-4xl mb-4">🎰</div>
                  <p>No spins yet! Start spinning to see your history.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reward Popup */}
      {showReward && lastReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-3xl text-center max-w-md mx-4 transform animate-bounce">
            <div className="text-6xl mb-4">{lastReward.icon}</div>
            <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
            <p className="text-xl mb-4">You won: <strong>{lastReward.text}</strong></p>
            
            {achievements.length > 0 && (
              <div className="mb-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-2">
                    🎉 {achievement}
                  </div>
                ))}
              </div>
            )}
            
            <button
              onClick={() => setShowReward(false)}
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Awesome! ✨
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg transition-all hover:scale-110">
          <Bell size={24} />
        </button>
        <button 
          onClick={() => earnSpin('Daily Check-in')}
          className="bg-yellow-500 hover:bg-yellow-600 p-4 rounded-full shadow-lg transition-all hover:scale-110"
        >
          <Gift size={24} />
        </button>
      </div>

      {/* Bottom Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-4 lg:hidden">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="text-center">
            <div className="font-bold text-yellow-400">{user.totalPoints.toLocaleString()}</div>
            <div className="text-xs text-purple-200">Points</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-green-400">{user.spinsLeft}</div>
            <div className="text-xs text-purple-200">Spins</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-orange-400">{user.streak}</div>
            <div className="text-xs text-purple-200">Streak</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-purple-400">{user.badges.length}</div>
            <div className="text-xs text-purple-200">Badges</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinTheWheel;