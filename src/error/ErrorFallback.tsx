const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div className="flex justify-center w-[100dvw] h-[100dvh] items-center">
      <img
        src="background.png"
        alt="background"
        className="absolute w-80 mini:w-[100dvw] h-[48.35rem] mini:h-[100dvh]"
      />
      <div className="bg-white py-10 px-20 rounded-lg shadow-lg shadow-slate-700 relative z-10 space-y-5 text-center">
        <p className="text-lg font-bold">Something went wrong!!</p>
        <pre className="text-rose-600 font-bold text-lg">{error.message}</pre>
        <button
          className="px-10 border-2 border-slate-600 hover:border-transparent hover:bg-slate-800 hover:shadow-md hover:shadow-slate-800/90 py-3 rounded-xl text-sm font-bold hover:text-white"
          onClick={resetErrorBoundary}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
export default ErrorFallback;
