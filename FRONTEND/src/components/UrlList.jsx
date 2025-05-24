import React, { useEffect, useState } from 'react';
import { getAllShortUrls } from '../api/user/route';

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { urls } = await getAllShortUrls();
        setUrls(urls);
      } catch (err) {
        setError('Failed to fetch URLs');
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  if (loading) return <p className="text-indigo-600 animate-pulse">Loading URLs...</p>;
  if (error)   return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Original URL</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Short Code</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Full Short URL</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                You haven't shortened any URLs yet.
              </td>
            </tr>
          ) : (
            urls.map((url, idx) => {
              const fullUrl = `http://localhost:5000/api/${url.short_url}`;
              return (
                <tr
                  key={url._id}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4 break-words">
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {url.fullUrl}
                    </a>
                  </td>
                  <td className="px-6 py-4 font-mono">
                    {url.short_url}
                  </td>
                  <td className="px-6 py-4 break-words">
                    <a
                      href={fullUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {fullUrl}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold">
                    {url.clicks}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UrlList;
