import { Suspense, lazy, ComponentType, LazyExoticComponent } from "react";
import { ClipLoader } from "react-spinners"; // می‌تونی هر نوع اسپینر دیگه‌ای هم بگیری

export const withSuspense = (Component: LazyExoticComponent<ComponentType<any>>) => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="text-center">
            <ClipLoader color="#4CAF50" size={40} />
            <p className="text-gray-600 text-lg mt-4">در حال بارگذاری...</p>
          </div>
        </div>
      }
    >
      <Component />
    </Suspense>
  );
};
