import React, { useState } from 'react';
import { LuImage, LuX } from 'react-icons/lu';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      {/* Icon display and toggle button */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? <span className="text-2xl">{icon}</span> : <LuImage />}
        </div>
        <p>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {/* Emoji picker popup */}
      {isOpen && (
        <div className="relative">
          {/* Close button */}
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          {/* Emoji selection */}
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji); // Pass selected emoji to parent
              setIsOpen(false);           // Close picker after selection
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
