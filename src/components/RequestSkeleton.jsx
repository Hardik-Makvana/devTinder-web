import React from "react";

const RequestSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#1c232b] px-4 pt-6">
      <div className="mx-auto w-full max-w-[800px] space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 rounded-xl bg-[#151a20] p-4 max-sm:gap-3 max-sm:p-3"
          >
            <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-gray-700 max-sm:h-[60px] max-sm:w-[55px]" />

            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-8 w-32 animate-pulse rounded bg-gray-700" />

              <div className="h-3.5 w-28 animate-pulse rounded bg-gray-700" />

              <div className="h-3.5 w-full animate-pulse rounded bg-gray-700" />

              <div className="h-3.5 w-3/5 animate-pulse rounded bg-gray-700 max-sm:hidden" />

              <div className="flex gap-2 pt-1 sm:hidden">
                <div className="h-8 w-16 animate-pulse rounded-md bg-indigo-500/40" />
                <div className="h-8 w-16 animate-pulse rounded-md bg-gray-600" />
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <div className="h-10 w-[76px] animate-pulse rounded-md bg-blue-500/40" />
              <div className="h-10 w-[76px] animate-pulse rounded-md bg-pink-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestSkeleton;
