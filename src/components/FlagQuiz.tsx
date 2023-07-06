import { useState, MouseEvent, useRef } from "react";
import cn from "../utility/cn";
import Result from "./Result";
import { useNavigate } from "react-router-dom";
import QuizOptions from "./QuizOptions";
import { v4 } from "uuid";
import { useQuiz } from "../utility/useQuiz";
import generateFlagQuiz, {
  GenerateFlagQuizReturn,
} from "../utility/generateFlagQuiz";
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

interface FullInfoProps {
  green: boolean;
  red: boolean;
  isSelected: boolean;
  label: string;
  id: string;
  option: string;
  ref: React.RefObject<HTMLDivElement>;
}

const FlagQuiz = () => {
  const { flagQuizData, isRight, handleIsRight, counter, handleCounter } =
    useQuiz();
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
  const [data, setData] = useState<GenerateFlagQuizReturn>(flagQuizData);

  flagQuizData && !data && setData(flagQuizData);

  const options: string[] | undefined =
    data &&
    [data.correctOption.country, ...data.options].filter(
      (el): el is string => typeof el === "string"
    );

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
      setData(generateFlagQuiz(data.mainData));
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
    setData(generateFlagQuiz(data.mainData));
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

  const fullQuizInfo: FullInfoProps[] = [
    {
      id: "a",
      isSelected: active.a.isSelected,
      green: active.a.green,
      red: active.a.red,
      label: options[optionFormat[0]],
      option: "A",
      ref: ref1,
    },
    {
      id: "b",
      isSelected: active.b.isSelected,
      green: active.b.green,
      red: active.b.red,
      label: options[optionFormat[1]],
      option: "B",
      ref: ref2,
    },
    {
      id: "c",
      isSelected: active.c.isSelected,
      green: active.c.green,
      red: active.c.red,
      label: options[optionFormat[2]],
      option: "C",
      ref: ref3,
    },
    {
      id: "d",
      isSelected: active.d.isSelected,
      green: active.d.green,
      red: active.d.red,
      label: options[optionFormat[3]],
      option: "D",
      ref: ref4,
    },
  ];

  return (
    <>
      {!(isRight === null) ? (
        <div className="w-full p-5 space-y-5">
          <div className="w-32 h-16 border border-slate-200">
            <img
              className="w-32 h-16"
              src={data.correctOption.flagUrl}
              alt="flag"
            />
          </div>

          <h1 className="text-[#2f527b] font-bold text-lg">
            Which country does this flag belong to?
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
            {fullQuizInfo.map((el) => (
              <QuizOptions
                key={v4()}
                onClick={handleClick}
                green={el.green}
                label={el.label}
                red={el.red}
                ref={el.ref}
                id={el.id}
                isSelected={el.isSelected}
                option={el.option}
              />
            ))}
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
        <Result counter={counter} restart={restart} />
      )}
    </>
  );
};

export default FlagQuiz;
