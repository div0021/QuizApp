import { FlCountryProps } from "../App";

export interface GenerateFlagQuizReturn {
  mainData: FlCountryProps[];
  options: string[];
  correctOption: FlCountryProps;
}

const generateRandomNumber = (num: number): number =>
  Math.round(Math.random() * num);

const generateFlagQuiz = (data: FlCountryProps[]): GenerateFlagQuizReturn => {
  if (data.length > 3) {
    let num = generateRandomNumber(data.length);
    data = data.filter((el) => el && el.country !== "");
    const quizData = data[num];
    data = data.filter(
      (el) =>
        (el && el.flagUrl) !== (quizData && quizData.flagUrl) &&
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
          (el && el.flagUrl) !== (quizOption && quizOption.flagUrl) &&
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
export default generateFlagQuiz;
