import { useOutletContext } from "react-router";
import { GenerateQuizReturn } from "./generateQuiz";
import { GenerateCurrencyQuizReturn } from "./generateCurrencyQuiz";
import { GenerateFlagQuizReturn } from "./generateFlagQuiz";

export interface OutletProps {
  quizData: GenerateQuizReturn;
  currencyQuizData: GenerateCurrencyQuizReturn;
  flagQuizData: GenerateFlagQuizReturn;
  isRight: boolean | null;
  handleIsRight: (element: boolean | null) => void;
  handleCounter: (num: number) => void;
  counter: number;
}

export function useQuiz() {
  return useOutletContext<OutletProps>();
}
