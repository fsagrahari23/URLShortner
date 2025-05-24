import React, { useState } from 'react';
import ShortUrlFomr from '../components/ShortUrlFomr';
import UrlList from '../components/UrlList';

const Dashboard = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Top Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full mb-8">
          <h1 className="text-2xl font-bold mb-4 text-center text-indigo-700">
            URL Shortener
          </h1>

          <ShortUrlFomr setShortUrl={setShortUrl} />

          {shortUrl && (
            <div className="mt-6 bg-gray-100 p-4 rounded-xl text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-2">Your Shortened URL:</p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold break-words hover:underline"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                >
                  Copy
                </button>
              </div>
              {copySuccess && (
                <p className="text-green-600 text-sm mt-2">{copySuccess}</p>
              )}
            </div>
          )}
        </div>

        {/* URL List */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <UrlList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
