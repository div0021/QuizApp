import { CurCountryProps } from "../App";

export interface GenerateCurrencyQuizReturn {
  mainData: CurCountryProps[];
  options: string[];
  correctOption: CurCountryProps;
}

const generateRandomNumber = (num: number): number =>
  Math.round(Math.random() * num);

const generateCurrencyQuiz = (
  data: CurCountryProps[]
): GenerateCurrencyQuizReturn => {
  if (data.length > 3) {
    let num = generateRandomNumber(data.length);

    const quizData = data[num];
    data = data.filter(
      (el) =>
        el.currencySymbol !== quizData.currencySymbol &&
        el.country !== quizData.country
    );
    const mainData = [...data];
    const optionData: (string | undefined)[] = [];
    for (let i = 0; i < 3; i++) {
      num = generateRandomNumber(data.length);
      const quizOption = data[num];
      optionData.push(data[num] ? data[num].country : undefined);
      data = data.filter(
        (el) =>
          (el && el.currencySymbol) !==
          (quizOption && quizOption.currencySymbol)
      );
    }
    const syncOptionData = optionData.filter(
      (el): el is string => typeof el === "string"
    );
    return {
      mainData,
      options: syncOptionData,
      correctOption: quizData,
    };
  }
  return { mainData: data, options: [], correctOption: {} };
};
export default generateCurrencyQuiz;
