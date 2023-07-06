import { CapCountryProps } from "../App";

export interface GenerateQuizReturn {
  mainData: CapCountryProps[];
  options: string[];
  correctOption: CapCountryProps;
}

const generateRandomNumber = (num: number): number =>
  Math.round(Math.random() * num);

const generateQuiz = (data: CapCountryProps[]): GenerateQuizReturn => {
  if (data.length > 3) {
    let num = generateRandomNumber(data.length);
    data = data.filter((el) => el && el.country !== "");

    const quizData = data[num];
    data = data.filter(
      (el) =>
        (el && el.capital) !== (quizData && quizData.capital) &&
        (el && el.country) !== (quizData && quizData.country)
    );
    const mainData = [...data];
    const optionData: (string | undefined)[] = [];
    for (let i = 0; i < 3; i++) {
      num = generateRandomNumber(data.length);
      const quizOption = data[num];
      optionData.push(data[num] ? data[num].country : undefined);
      data = data.filter(
        (el) =>
          (el && el.capital) !== (quizOption && quizOption.capital) &&
          (el && el.country) !== (quizOption && quizOption.country)
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
export default generateQuiz;
