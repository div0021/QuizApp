import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getData from "./utility/getData";
import generateQuiz, { GenerateQuizReturn } from "./utility/generateQuiz";
import cn from "./utility/cn";
import Sidebar from "./components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import generateCurrencyQuiz, {
  GenerateCurrencyQuizReturn,
} from "./utility/generateCurrencyQuiz";
import Modal from "./components/Modal";
import generateFlagQuiz, {
  GenerateFlagQuizReturn,
} from "./utility/generateFlagQuiz";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error/ErrorFallback";

export interface CapCountryProps {
  country?: string;
  capital?: string;
}

export interface CurCountryProps {
  country?: string;
  currencySymbol?: string;
  currencyName?: string;
}
export interface FlCountryProps {
  country?: string;
  flagUrl?: string;
}
export interface PagesProps {
  capital: boolean;
  currency: boolean;
  flag: boolean;
}

export type StrProps = "capital" | "currency" | "flag" | "none";

const App = () => {
  const capCountry: CapCountryProps[] | null = [];
  const curCountry: CurCountryProps[] | null = [];
  const flCountry: FlCountryProps[] | null = [];
  const [isRight, setIsRight] = useState<boolean | null | undefined>(undefined);
  const [page, setPage] = useState<PagesProps>({
    capital: false,
    currency: false,
    flag: false,
  });

  const [modalActive, setModalActive] = useState<boolean>(false);

  const [quizPath, setQuizPath] = useState<string>("");

  const location = useLocation();

  const handleModal = useCallback((value: boolean) => {
    setModalActive(value);
  }, []);

  const handlePages = useCallback((str: StrProps) => {
    handleCounter(0);
    handleIsRight(undefined);
    if (str === "capital") {
      setPage({ capital: true, currency: false, flag: false });
    } else if (str === "currency") {
      setPage({ capital: false, currency: true, flag: false });
    } else if (str === "flag") {
      setPage({ capital: false, currency: false, flag: true });
    } else {
      setPage({ capital: false, currency: false, flag: false });
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      handlePages("none");
    } else if (location.pathname === "/capital") {
      handlePages("capital");
    } else if (location.pathname === "/currency") {
      handlePages("currency");
    } else if (location.pathname === "/flag") {
      handlePages("flag");
    }
  }, [location, handlePages]);
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
        if (el.currencies) {
          curCountry.push({
            country: el.name.common,
            currencySymbol: Object.keys(el.currencies)[0],
            currencyName: el.currencies[Object.keys(el.currencies)[0]].name,
          });
        }
        if (el.flags) {
          flCountry.push({
            country: el.name.common,
            flagUrl: el.flags.png,
          });
        }
      });
  }

  const quizData: GenerateQuizReturn | undefined =
    data && generateQuiz(capCountry);

  const currencyQuizData: GenerateCurrencyQuizReturn | undefined =
    data && generateCurrencyQuiz(curCountry);

  const flagQuizData: GenerateFlagQuizReturn | undefined =
    data && generateFlagQuiz(flCountry);

  const handleIsRight = (element: boolean | null | undefined) => {
    setIsRight(element);
  };
  const [counter, setCounter] = useState<number>(0);
  const handleCounter = (num: number) => {
    setCounter(num);
  };
  const navigate = useNavigate();

  const handleQuizPath = useCallback((str: string) => {
    setQuizPath(str);
  }, []);
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => navigate("/")}
        resetKeys={[location]}
      >
        <Sidebar
          page={page}
          handleModal={handleModal}
          isRight={isRight}
          handleIsRight={handleIsRight}
          handleQuizPath={handleQuizPath}
        />

        {modalActive && (
          <Modal
            handleModal={handleModal}
            quizPath={quizPath}
            handleIsRight={handleIsRight}
          />
        )}
        <div className="w-80 font-medium mini:w-[100dvw] h-[45rem] mini:h-[100dvh] flex justify-center items-center flex-col space-y-2 font-poppins relative">
          <img
            src="background.png"
            alt="background"
            className="absolute w-80 mini:w-[100dvw] h-[48.35rem] mini:h-[100dvh]"
          />

          <h1 className="w-80 lg:w-96 text-2xl font-bold text-white relative z-10">
            Country Quiz
          </h1>
          <div
            className={cn(
              "bg-white w-80 lg:w-96 min-h-[25rem] rounded-xl transition-all duration-500 ease-in-out relative",
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

            <Outlet
              context={{
                quizData: quizData as GenerateQuizReturn,
                currencyQuizData:
                  currencyQuizData as GenerateCurrencyQuizReturn,
                flagQuizData: flagQuizData as GenerateFlagQuizReturn,
                isRight,
                handleCounter,
                handleIsRight,
                counter,
              }}
            />
          </div>
        </div>

        <footer className="fixed bottom-0 w-[100dvw] text-center font-bold text-sm text-[#828282]">
          Don't copy built yours
        </footer>
      </ErrorBoundary>
    </>
  );
};

export default App;
