import CapitalQuiz from "./components/CapitalQuiz";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getData from "./utility/getData";
import generateQuiz, { GenerateQuizReturn } from "./utility/generateQuiz";
import cn from "./utility/cn";

export interface CapCountryProps {
  country?: string;
  capital?: string;
}
const App = () => {
  const capCountry: CapCountryProps[] | null = [];
  const [isRight, setIsRight] = useState<boolean | null>(false);
  const { data } = useQuery({
    queryKey: ["country"],
    queryFn: getData,
    refetchOnWindowFocus() {
      return false;
    },
  });
  {
    data &&
      data.data.forEach((el: any) => {
        if (el.capital) {
          capCountry.push({
            country: el.name.common,
            capital: el.capital,
          });
        }
      });
  }

  const quizData: GenerateQuizReturn | undefined =
    data && generateQuiz(capCountry);

  const handleIsRight = (element: boolean | null) => {
    setIsRight(element);
  };
  const [counter, setCounter] = useState<number>(0);
  const handleCounter = (num: number) => {
    setCounter(num);
  };
  return (
    <>
      <div className="font-medium bg-cover bg-no-repeat bg-[url('background.png')] w-[100dvw] h-[100dvh] flex justify-center items-center flex-col space-y-2 font-poppins">
        <h1 className="w-80 text-2xl font-bold text-white">Country Quiz</h1>
        <div
          className={cn(
            "bg-white w-80 min-h-[25rem] rounded-xl transition-all duration-500 ease-in-out relative",
            {
              "pt-11": !(isRight === null),
            }
          )}
        >
          {!(isRight === null) && (
            <img
              src="undraw_adventure_4hum.svg"
              alt="adventure"
              className="absolute -top-[4.5rem] right-0"
            />
          )}
          <CapitalQuiz
            quizData={quizData as GenerateQuizReturn}
            isRight={isRight}
            handleIsRight={handleIsRight}
            handleCounter={handleCounter}
            counter={counter}
          />
        </div>
      </div>
    </>
  );
};

export default App;
