import React from 'react';

function AuthLayout({ children }) {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-green-50">

      {/* Green Blur Background */}
      <div
        className="
          absolute inset-0
          before:content-['']
          before:absolute
          before:w-[520px]
          before:h-[520px]
          before:rounded-full
          before:bg-green-400/30
          before:blur-[140px]
          before:top-1/2
          before:left-1/2
          before:-translate-x-1/2
          before:-translate-y-1/2
        "
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-10 py-12 bg-white/80 backdrop-blur-md rounded-xl shadow-lg shadow-green-200">
        <h2 className="text-lg font-medium mb-6 text-center">
          Personal Expense Tracker
        </h2>

        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
