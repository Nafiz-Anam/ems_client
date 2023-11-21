export function SkeletonLoaderRow() {
  return (
    <div className="flex">
      <div className="flex-grow p-2">
        <div className="h-4 mt-4 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
      </div>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className="w-full border animate-pulse">
      {Array(7).fill().map((_, index) => (
        <div key={index} className={`h-16 px-8 ${index === 0 ? "bg-secondary" : "bg-white"}`}>
          <SkeletonLoaderRow />
        </div>
      ))}
    </div>
  );
}
