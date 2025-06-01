import React from 'react';
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="flex gap-4">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        <Facebook size={20} />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
      >
        <Twitter size={20} />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
      >
        <Linkedin size={20} />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
      >
        <LinkIcon size={20} />
      </button>
    </div>
  );
};

export default ShareButtons;