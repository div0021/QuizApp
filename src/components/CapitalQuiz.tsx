import { useState, MouseEvent, useRef } from "react";
import cn from "../utility/cn";
import generateQuiz, { GenerateQuizReturn } from "../utility/generateQuiz";
import Result from "./Result";
import { useNavigate } from "react-router-dom";
interface Choosen {
  isSelected: boolean;
  red: boolean;
  green: boolean;
}
interface ActiveProps {
  a: Choosen;
  b: Choosen;
  c: Choosen;
  d: Choosen;
}

interface CapitalQuizProps {
  quizData: GenerateQuizReturn;
  isRight: boolean | null;
  handleIsRight: (element: boolean | null) => void;
  handleCounter: (num: number) => void;
  counter: number;
}

const CapitalQuiz: React.FC<CapitalQuizProps> = ({
  quizData,
  isRight,
  handleIsRight,
  counter,
  handleCounter,
}) => {
  const [active, setActive] = useState<ActiveProps>({
    a: {
      red: false,
      green: false,
      isSelected: false,
    },
    b: {
      red: false,
      green: false,
      isSelected: false,
    },
    c: {
      red: false,
      green: false,
      isSelected: false,
    },
    d: {
      red: false,
      green: false,
      isSelected: false,
    },
  });
  const navigat = useNavigate();
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<GenerateQuizReturn>(quizData);

  quizData && !data && setData(quizData);

  const options: string[] | undefined = data && [
    data.correctOption.country as string,
    ...data.options,
  ];

  const generateRandomOptions = (): number[] => {
    let arr = [0, 1, 2, 3];
    const save: number[] = [];
    while (arr.length > 0) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      save.push(arr[randomIndex]);
      arr = arr.filter((el) => el !== arr[randomIndex]);
    }

    return save;
  };

  const [optionFormat, setOptionFormat] = useState<number[]>(
    generateRandomOptions()
  );
  if (!data) {
    return <div>Loading...</div>;
  }

  const restart = () => {
    setActive({
      a: {
        red: false,
        green: false,
        isSelected: false,
      },
      b: {
        red: false,
        green: false,
        isSelected: false,
      },
      c: {
        red: false,
        green: false,
        isSelected: false,
      },
      d: {
        red: false,
        green: false,
        isSelected: false,
      },
    });
    handleIsRight(false);
    handleCounter(0);
    if (data.mainData.length > 3) {
      setData(generateQuiz(data.mainData));
      setOptionFormat(generateRandomOptions());
    } else {
      navigat(0);
    }
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;

    const choosenElement =
      e.currentTarget.firstElementChild?.firstElementChild?.nextElementSibling
        ?.textContent;

    const isCorrect = choosenElement === data.correctOption.country;

    handleIsRight(isCorrect);

    if (!isCorrect) {
      setTimeout(() => {
        handleIsRight(null);
      }, 3000);
      const correctOption = data.correctOption.country as string;

      let isFound = false;

      isFound =
        ref1.current?.firstElementChild?.firstElementChild?.nextElementSibling
          ?.textContent === correctOption;
      let id1 = ref1.current?.id;
      if (!isFound) {
        isFound =
          ref2.current?.firstElementChild?.firstElementChild?.nextElementSibling
            ?.textContent === correctOption;
        if (isFound) {
          id1 = ref2.current?.id;
        }
      }
      if (!isFound) {
        isFound =
          ref3.current?.firstElementChild?.firstElementChild?.nextElementSibling
            ?.textContent === correctOption;
        if (isFound) {
          id1 = ref3.current?.id;
        }
      }
      if (!isFound) {
        isFound =
          ref4.current?.firstElementChild?.firstElementChild?.nextElementSibling
            ?.textContent === correctOption;
        id1 = ref4.current?.id;
      }
      if (typeof id1 === "string") {
        const newId = id1;
        setActive((pre) => {
          return {
            ...pre,
            [id]: {
              red: true,
              green: false,
              isSelected: true,
            },
            [newId]: {
              red: false,
              green: true,
              isSelected: true,
            },
          };
        });
        return;
      }
    }
    handleCounter(counter + 1);
    setActive((pre) => {
      return {
        ...pre,
        [id]: {
          red: isCorrect === false,
          green: isCorrect === true,
          isSelected: true,
        },
      };
    });
  };

  const handleButtonClick = () => {
    setData(generateQuiz(data.mainData));
    handleIsRight(false);
    setActive({
      a: {
        red: false,
        green: false,
        isSelected: false,
      },
      b: {
        red: false,
        green: false,
        isSelected: false,
      },
      c: {
        red: false,
        green: false,
        isSelected: false,
      },
      d: {
        red: false,
        green: false,
        isSelected: false,
      },
    });
    setOptionFormat(generateRandomOptions());
  };
  return (
    <>
      {!(isRight === null) ? (
        <div className="w-full p-5 space-y-5">
          <h1 className="text-[#2f527b] font-bold text-lg">
            {data?.correctOption.capital} is capital of
          </h1>
          <div
            className={cn("bg-transparent space-y-5", {
              "pointer-events-none":
                active.a.isSelected ||
                active.b.isSelected ||
                active.c.isSelected ||
                active.d.isSelected,
            })}
          >
            <div
              ref={ref1}
              className={cn(
                `border-2 border-[#6066d0]/70 text-[#6066d0]/70 p-2 rounded-xl flex items-center justify-between hover:border-transparent hover:text-white transition-all duration-1000 ease-out cursor-pointer space-x-2 relative before:absolute before:bg-[#f9a826] before:w-80 before:h-80 before:rounded-full before:-translate-x-7 before:transition-all before:duration-700 before:ease-in-out before:scale-0 before:hover:scale-100 before:origin-left overflow-hidden`,
                {
                  "pointer-events-none hover:bg-green-500  text-white bg-green-500 border-transparent":
                    active.a.green,
                  "pointer-events-none hover:bg-rose-500  text-white bg-rose-500 border-transparent":
                    active.a.red,
                }
              )}
              onClick={handleClick}
              id="a"
            >
              <div className="flex space-x-5 items-center relative z-10">
                <span>A</span>
                <span className="w-48">
                  {options && options[optionFormat[0]]}
                </span>
              </div>
              {active.a.isSelected && (
                <span className="material-symbols-rounded relative z-10">
                  {active.a.green ? "check_circle" : "cancel"}
                </span>
              )}
            </div>

            <div
              ref={ref2}
              className={cn(
                `border-2 border-[#6066d0]/70 text-[#6066d0]/70 p-2 rounded-xl flex items-center justify-between hover:border-transparent hover:text-white cursor-pointer space-x-2 transition-all duration-1000 ease-out relative before:absolute before:bg-[#f9a826] before:w-80 before:h-80 before:rounded-full before:-translate-x-7 before:transition-all before:duration-700 before:ease-in-out before:scale-0 before:hover:scale-100 before:origin-right overflow-hidden`,
                {
                  "pointer-events-none  text-white bg-green-500 hover:bg-green-500 border-transparent":
                    active.b.green,
                  "pointer-events-none  text-white bg-rose-500 hover:bg-rose-500 border-transparent":
                    active.b.red,
                }
              )}
              onClick={handleClick}
              id="b"
            >
              <div className="flex space-x-5 items-center relative z-10">
                <span>B</span>
                <span className="w-48">
                  {options && options[optionFormat[1]]}
                </span>
              </div>
              {active.b.isSelected && (
                <span className="material-symbols-rounded relative z-10">
                  {active.b.green ? "check_circle" : "cancel"}
                </span>
              )}
            </div>

            <div
              ref={ref3}
              className={cn(
                `border-2 border-[#6066d0]/70 text-[#6066d0]/70 p-2 rounded-xl flex items-center justify-between hover:border-transparent hover:text-white transition-all duration-1000 ease-out cursor-pointer space-x-2 relative before:absolute before:bg-[#f9a826] before:w-80 before:h-80 before:rounded-full before:-translate-x-7 before:transition-all before:duration-700 before:ease-in-out before:scale-0 before:hover:scale-100 before:origin-center overflow-hidden`,
                {
                  "pointer-events-none hover:bg-green-500  text-white bg-green-500 border-transparent":
                    active.c.green,
                  "pointer-events-none hover:bg-rose-500  text-white bg-rose-500 border-transparent":
                    active.c.red,
                }
              )}
              onClick={handleClick}
              id="c"
            >
              <div className="flex space-x-5 items-center relative z-10">
                <span>C</span>
                <span className="w-48">
                  {options && options[optionFormat[2]]}
                </span>
              </div>
              {active.c.isSelected && (
                <span className="material-symbols-rounded relative z-10">
                  {active.c.green ? "check_circle" : "cancel"}
                </span>
              )}
            </div>

            <div
              ref={ref4}
              className={cn(
                `border-2 border-[#6066d0]/70 text-[#6066d0]/70 p-2 rounded-xl flex items-center justify-between  hover:border-transparent hover:text-white transition-all duration-1000 ease-out cursor-pointer space-x-2 relative before:absolute before:bg-[#f9a826] before:w-80 before:h-80 before:rounded-full before:-translate-x-7 before:translate-y-12 before:transition-all before:duration-700 before:ease-in-out before:scale-0 before:hover:scale-100 before:origin-top-right overflow-hidden`,
                {
                  "pointer-events-none hover:bg-green-500  text-white bg-green-500 border-transparent":
                    active.d.green,
                  "pointer-events-none hover:bg-rose-500  text-white bg-rose-500 border-transparent":
                    active.d.red,
                }
              )}
              onClick={handleClick}
              id="d"
            >
              <div className="flex space-x-5 items-center relative z-10">
                <span>D</span>
                <span className="w-48">
                  {options && options[optionFormat[3]]}
                </span>
              </div>
              {active.d.isSelected && (
                <span className="material-symbols-rounded relative z-10">
                  {active.d.green ? "check_circle" : "cancel"}
                </span>
              )}
            </div>
          </div>
          {isRight && (
            <div className="flex items-center justify-end">
              <button
                className="bg-[#fca82f] hover:shadow-md text-white hover:shadow-[#fca82f]/40 cursor-pointer px-8 py-3 rounded-lg"
                onClick={handleButtonClick}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <Result
          counter={counter}
          restart={restart}
        />
      )}
    </>
  );
};

export default CapitalQuiz;
