import React from "react";

const ConnectionsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#1c232b] px-4 pt-6">
      <h1 className="text-center text-3xl text-white mb-6">
        Connections
      </h1>

      {/* Match the width of your actual connection list */}
      <div className="mx-auto w-full max-w-[700px] space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center gap-5 rounded-xl
                       bg-[#151a20] p-5
                       max-sm:gap-3 max-sm:p-3"
          >
            {/* Profile image */}
            <div
              className="h-[100px] w-[100px] shrink-0 animate-pulse
                         rounded-lg bg-gray-700
                         max-sm:h-[68px] max-sm:w-[58px]"
            />

            {/* User details */}
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-[17px] w-36 animate-pulse rounded bg-gray-700" />

              <div className="h-[15px] w-24 animate-pulse rounded bg-gray-700" />

              <div className="h-[15px] w-full animate-pulse rounded bg-gray-700" />

              <div className="h-[15px] w-3/5 animate-pulse rounded bg-gray-700 max-sm:hidden" />
            </div>

            {/* Chat button */}
            <div
              className="h-[50px] w-[78px] shrink-0 animate-pulse
                         rounded-md bg-indigo-500/40
                         max-sm:h-[34px] max-sm:w-12"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionsSkeleton;