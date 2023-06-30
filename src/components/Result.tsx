interface ResultProps {
  counter: number;
  restart: () => void;
}
const Result: React.FC<ResultProps> = ({ counter, restart }) => {
  return (
    <div className="w-full flex flex-col justify-center space-y-12 items-center p-5">
      <img src="undraw_winners_ao2o.svg" alt="Winner" />
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-[#1d355d] text-center">
          Result
        </h1>
        <p className="text-base font-normal text-[#1d355d]">
          You got
          <span className="text-3xl font-bold text-[#6fcf97]">{counter}</span>
          correct answers
        </p>
      </div>
      <div>
        <button
          className="px-10 py-2 border-2 rounded-lg cursor-pointer border-[#1d335d] text-[#1d335d] text-base 
             hover:border-transparent hover:text-white bg-transparent relative
             before:bg-[#1f335d] before:w-44 before:h-44 before:rounded-full before:absolute before:-translate-x-12 before:-translate-y-[4.5rem] before:scale-0 before:hover:scale-100 before:origin-center before:transition-all before:duration-500 before:ease-in-out transition-all duration-500 ease-in-out overflow-hidden"
          onClick={() => restart()}
        >
          <span className="relative z-10">Try again</span>
        </button>
      </div>
    </div>
  );
};
export default Result;
