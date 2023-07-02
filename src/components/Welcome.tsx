import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="w-full text-center h-full p-5 space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-xs font-md text-[#5c62c1]">
          "Test and improve your self"
        </p>
      </div>

      <div className="space-y-3 items-center flex flex-col justify-center">
        <p className="text-lg">Capital Quiz</p>
        <Link
          className="px-10 py-3 bg-[#fca82f] cursor-pointer font-medium rounded-lg hover:text-white hover:shadow-sm hover:shadow-[#fca82f]"
          to="capital"
        >
          Start
        </Link>
      </div>

      <div className="space-y-3 items-center flex flex-col justify-center">
        <p className="text-lg">Currency Quiz</p>
        <Link
          className="px-10 py-3 bg-[#fca82f] cursor-pointer font-medium rounded-lg hover:text-white hover:shadow-sm hover:shadow-[#fca82f]"
          to="currency"
        >
          Start
        </Link>
      </div>

      <div className="space-y-3 items-center flex flex-col justify-center">
        <p className="text-lg">Flag Quiz</p>
        <Link
          className="px-10 py-3 bg-[#fca82f] cursor-pointer font-medium rounded-lg hover:text-white hover:shadow-sm hover:shadow-[#fca82f]"
          to="flag"
        >
          Start
        </Link>
      </div>
    </div>
  );
};
export default Welcome;
