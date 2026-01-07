import React from 'react';
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu';

// Component to display a transaction (income or expense) card
const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {

  // Set styles based on transaction type
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  // Check if icon is a valid emoji (ignore URLs)
  const isValidEmoji = (str) => {
    if (!str) return false;
    const urlPattern = /^https?:\/\//i;
    if (urlPattern.test(str)) return false;
    const emojiRegex = /\p{Extended_Pictographic}/u;
    return emojiRegex.test(str);
  };

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      
      {/* Icon / emoji display */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {isValidEmoji(icon) ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Transaction details and amount */}
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          
          {/* Delete button (conditionally rendered) */}
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount and type icon */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className="text-xs font-medium">
              {type === "income" ? "+ " : "- "}LKR {amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
