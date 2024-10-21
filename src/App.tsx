import React, { useState, useEffect } from 'react';
import { Shuffle, Copy, AlertCircle, ExternalLink, MessageSquare, Twitter, Download, Send, Youtube, Globe, Twitch, X, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import memeUrls from './memeUrls.json';

function App() {
  const [hue, setHue] = useState(0);
  const [currentMeme, setCurrentMeme] = useState('');
  const [showRaidMessage, setShowRaidMessage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedMemes, setGeneratedMemes] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    generateRandomMeme();
  }, []);

  const generateRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * memeUrls.length);
    const newMeme = memeUrls[randomIndex];
    setCurrentMeme(newMeme);
    setGeneratedMemes(prevMemes => [...prevMemes, newMeme]);
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const navigateMeme = (direction: 'prev' | 'next') => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      newIndex = Math.min(generatedMemes.length - 1, currentIndex + 1);
    }
    setCurrentIndex(newIndex);
    setCurrentMeme(generatedMemes[newIndex]);
  };

  const downloadMeme = async () => {
    try {
      const response = await fetch(currentMeme);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `crypto_twitter_meme_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading meme:', error);
      alert('Failed to download meme. Please try again.');
    }
  };

  const contractAddress = '6fUwECXzRQeh2wYuTg3xeQHGt4wSbiUbsd1PYw3pump';

  const raidMessage = `You should really check out Crypto Twitter Token [name]! 

$CT is the first coin anywhere even remotely this small in market cap that's built legitimate cultural movement energy in the infancy of its lifespan.  

The chart doesn't even look real because there are simply no fkn sellers.  

Consecutive nightly Twitter spaces that run for hours and consistently pull in hundreds of listeners now 

A podcast linked to it that runs CT ads directly in the middle of the episodes as sponsored content 

The most content, lore, and history out of any coin even 10x larger in MC than it. 

This is the most expensive one to miss at this stage. 

0 tokens EVER for KOLs.  0 tokens sold for marketing. 

Yet we have at least a dozen KOLs that post about us on a daily basis. 

Why?  

Because paying gets you one tweet.  Selling someone, and I mean REALLY selling someone on why this is a multi-billion dollar project, gets you a huge top blast by them, and then leads to unlimited consistent tweets down the line. 

Its time to prove your shabbiness by not being one of the last ones to recognize CT is the end all be all of this cycle on chain. 

Its 3 for 20 time [name] 🍤🫵`;

  return (
    <div className="min-h-screen p-4 relative" style={{ background: `linear-gradient(135deg, hsl(${hue}, 70%, 40%), hsl(${(hue + 60) % 360}, 70%, 40%))` }}>
      <a
        href="https://dexscreener.com/solana/wcvb9s4kqftoosuxkmvotjsg5bui4wbcfbhrwckbgud"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 left-4 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
      >
        <BarChart2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </a>
      <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md rounded-3xl shadow-lg p-4 sm:p-8">
        <div className="flex justify-center space-x-3 sm:space-x-6 mb-4 sm:mb-6">
          <a href="https://x.com/CTcoinOfficial" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200">
            <Twitter className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="https://t.me/OfficialCTcoinSOL" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200">
            <Send className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="https://www.youtube.com/@OutTheTrenchesPod" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200">
            <Youtube className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="https://www.officialctcoinsol.fun/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200">
            <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="https://www.twitch.tv/cryptotwittertoken" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200">
            <Twitch className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-bold text-center text-white mb-4 sm:mb-6">Crypto Twitter Meme Generator</h1>
        
        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <span className="text-white font-semibold mb-2 sm:mb-0">Contract Address:</span>
            <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 w-full sm:w-auto">
              <span className="text-white mr-2 text-sm sm:text-base overflow-hidden overflow-ellipsis">{contractAddress}</span>
              <button
                onClick={() => copyToClipboard(contractAddress)}
                className="text-white hover:text-blue-200 flex-shrink-0"
              >
                <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowRaidMessage(true)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-4 rounded-xl mb-4 sm:mb-6 flex items-center justify-center"
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Show Raid Message
        </button>

        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          {currentMeme && (
            <div className="mb-4 flex flex-col items-center">
              <div className="w-full max-w-[368px] aspect-square overflow-hidden rounded-lg mb-2 relative">
                <img 
                  src={currentMeme} 
                  alt="Crypto Twitter Meme" 
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  <button
                    onClick={() => navigateMeme('prev')}
                    className="text-white hover:text-blue-200 disabled:opacity-50 bg-black bg-opacity-50 rounded-full p-2 transition-opacity duration-300"
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>
                  <button
                    onClick={() => navigateMeme('next')}
                    className="text-white hover:text-blue-200 disabled:opacity-50 bg-black bg-opacity-50 rounded-full p-2 transition-opacity duration-300"
                    disabled={currentIndex === generatedMemes.length - 1}
                  >
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-2 space-x-4">
                <button
                  onClick={() => window.open(currentMeme, '_blank')}
                  className="text-white hover:text-blue-200 flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">Open Full Size</span>
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={generateRandomMeme}
              className="flex-grow bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 sm:py-3 px-4 rounded-xl flex items-center justify-center"
            >
              <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">Generate Random Meme</span>
            </button>
            <button
              onClick={downloadMeme}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-4 rounded-xl flex items-center justify-center"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 sm:p-4">
          <p className="text-white text-center text-sm sm:text-base">
            Click the button to generate a random Crypto Twitter meme!
          </p>
        </div>
      </div>

      {showRaidMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Raid Message</h2>
            <pre className="whitespace-pre-wrap bg-gray-100 p-3 sm:p-4 rounded-lg mb-4 text-sm sm:text-base">{raidMessage}</pre>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => copyToClipboard(raidMessage)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
              >
                {copied ? 'Copied!' : 'Copy Raid Message'}
              </button>
              <button
                onClick={() => setShowRaidMessage(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;