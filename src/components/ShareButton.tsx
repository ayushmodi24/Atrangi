import React from 'react';
import { FaWhatsapp, FaFacebook, FaTelegram, FaTwitter, FaTimes } from 'react-icons/fa';

interface Props {
  paintingId: string;
  title?: string;
  onClose: () => void;
}

const SocialShareModal: React.FC<Props> = ({ paintingId, title, onClose }) => {
  const shareUrl = `${window.location.origin}/paintings/${paintingId}`;
  const message = encodeURIComponent(`Check out this painting: ${title || "Artwork"}`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/5 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 shadow-lg w-80 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Share this Painting</h2>

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/?text=${message}%20${shareUrl}`}
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            <FaWhatsapp /> Share on WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaFacebook /> Share on Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${message}`}
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded bg-sky-500 text-white hover:bg-sky-600"
          >
            <FaTwitter /> Share on Twitter
          </a>
          <a
            href={`https://t.me/share/url?url=${shareUrl}&text=${message}`}
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded bg-blue-400 text-white hover:bg-blue-500"
          >
            <FaTelegram /> Share on Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;
