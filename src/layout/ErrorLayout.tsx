function ErrorLayout() {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-100 to-gray-200 px-4">
        <div className="text-center max-w-md">
          <div className="text-[100px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600 drop-shadow-md">
            404
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            اوه نه! صفحه پیدا نشد
          </h2>
          <p className="text-gray-600 mb-6">
            صفحه‌ای که دنبال آن هستید ممکن است حذف شده باشد یا آدرس آن اشتباه باشد.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
          >
            بازگشت به خانه
          </a>
        </div>
      </div>
    );
  }
  
  export default ErrorLayout;
  