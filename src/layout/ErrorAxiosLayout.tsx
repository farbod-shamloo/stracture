import { useSearchParams } from 'react-router-dom';

const ErrorAxiosLayout = () => {
  const [searchParams] = useSearchParams();
  const errorCode = searchParams.get('errorCode');

  if (errorCode === '500') return <ServerError />;
  if (errorCode === '503') return <ServerErrorServ />;
  if (errorCode === '403') return <ForbiddenError />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">خطا {errorCode}</h1>
      <p className="text-lg text-gray-700">خطایی رخ داده است.</p>
    </div>
  );
};

// کامپوننت‌های خطا این پایین هستن
const ServerError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-6">
    <h1 className="text-6xl font-extrabold">500</h1>
    <p className="text-2xl mt-4 font-semibold">خطای داخلی سرور</p>
    <p className="mt-2 text-center max-w-md">
      مشکلی در سرور رخ داده است. لطفاً دقایقی بعد دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
    </p>
  </div>
);

const ServerErrorServ = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-6">
    <h1 className="text-6xl font-extrabold">503</h1>
    <p className="text-2xl mt-4 font-semibold">خطای داخلی سرور</p>
    <p className="mt-2 text-center max-w-md">
      مشکلی در سرور رخ داده است. لطفاً دقایقی بعد دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
    </p>
  </div>
);



const ForbiddenError = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-yellow-800 p-6">
    <h1 className="text-6xl font-extrabold">403</h1>
    <p className="text-2xl mt-4 font-semibold">دسترسی غیرمجاز</p>
    <p className="mt-2 text-center max-w-md">
      شما به این صفحه دسترسی ندارید. اگر فکر می‌کنید این یک اشتباه است، لطفاً با پشتیبانی تماس بگیرید.
    </p>
  </div>
);

export default ErrorAxiosLayout;
