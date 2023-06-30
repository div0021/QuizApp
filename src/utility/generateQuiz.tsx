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

    const quizData = data[num];
    data = data.filter(
      (el) => el.capital !== quizData.capital && el.country !== quizData.country
    );
    const mainData = [...data];
    const optionData: string[] = [];
    for (let i = 0; i < 3; i++) {
      num = generateRandomNumber(data.length);
      const quizOption = data[num];
      optionData.push(data[num].country as string);
      data = data.filter(
        (el) =>
          el.capital !== quizOption.capital && el.country !== quizOption.country
      );
    }
    return {
      mainData,
      options: optionData,
      correctOption: quizData,
    };
  }
  return { mainData: data, options: [], correctOption: {} };
};
export default generateQuiz;
