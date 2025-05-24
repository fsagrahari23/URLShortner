import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShortUrl } from '../api/shorturl/route';

const ShortUrlForm = ({ setShortUrl }) => {
  const [longUrl, setLongUrl] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (longUrl) => {
      const data = await createShortUrl(longUrl);
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        setShortUrl(`http://localhost:5000/api/${data.short}`);
        queryClient.invalidateQueries({ queryKey: ['short'] });
      } else {
        console.error('Failed:', data.message);
      }
      setLongUrl('');
    },
    onError: (error) => {
      console.error('Error shortening URL:', error.message);
      setLongUrl('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) return;
    mutation.mutate(longUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {mutation.isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                ></path>
              </svg>
              Creating short URL...
            </div>
          ) : (
            'Shorten URL'
          )}
        </button>
      </form>
    </>
  );
};

export default ShortUrlForm;
