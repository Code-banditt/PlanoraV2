// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated logo */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-300 rounded-full animate-ping opacity-75"></div>
          <div
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-300 rounded-full animate-ping opacity-75"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>

        {/* Loading text with typing effect */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Planora</h2>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-gray-500">Loading</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
