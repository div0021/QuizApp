import {useLocation, useNavigate } from "react-router-dom";
import { PagesProps } from "../App";
import cn from "../utility/cn";
import { MouseEvent } from "react";
interface SidebarProps {
  page: PagesProps;
  handleModal: (value: boolean) => void;
  isRight: boolean | null | undefined;
  handleIsRight: (value: boolean | null | undefined) => void;
  handleQuizPath: (str: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  page,
  handleModal,
  isRight,
  handleIsRight,
  handleQuizPath,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    if (location.pathname === "/") {
      navigate(id);
      return;
    }
    if (isRight === undefined || isRight === false || isRight === true) {
      handleModal(true);
      handleQuizPath(id);
    } else {
      navigate(id);
      handleIsRight(undefined);
    }
  };
  return (
    <>
      <div
        className={cn(
          "w-80 mini:w-[100dvw] h-16 md:w-1/4 lg:w-1/5 xl:1/6 bg-transparent/10 z-20 fixed top-0 md:h-[100dvh] flex md:flex-col p-5 md:p-3 lg:p-7 md:pt-10 xl:p-10 justify-between items-center space-x-3 md:space-x-0 transition-all duration-500 ease-out md:translate-x-0",
          {
            "md:-translate-x-[80rem]":
              !page.capital && !page.currency && !page.flag,
          }
        )}
      >
        <button
          id="/"
          onClick={handleClick}
          className="text-md mini:text-2xl sm:text-4xl text-[#1d335d] tracking-wide font-bold text-center cursor-pointer"
        >
          <span className="text-[#fca82f]">Q</span>
          <span
            className="relative before:text-[#fca82f] before:top-0 sm:before:top-1 before:absolute before:w-0 before:content-['uiz'] before:hover:w-full 
            before:hover:drop-shadow-2xl before:hover:shadow-black before:overflow-hidden before:transition-all before:duration-500 before:ease-in-out before:origin-center"
          >
            uiz
          </span>
        </button>

        <div className="flex space-x-3 md:flex-col md:space-x-0 md:justify-center items-center sm:space-y-3 text-xs mini:text-sm sm:text-xl font-medium text-[#1d335d]">
          <button
            onClick={handleClick}
            id="capital"
            className={cn("group", {
              "text-white": page.capital,
            })}
          >
            <span
              className="relative before:text-[#fca82f] before:top-0 before:absolute before:w-0 before:content-['Capital\0a0Quiz'] before:hover:w-[77px] sm:before:hover:w-[110px] before:hover:drop-shadow-2xl before:hover:shadow-black before:overflow-hidden before:transition-all before:duration-500 before:ease-in-out before:origin-center
            group-hover:before:w-[77px] sm:group-hover:before:w-[110px]"
            >
              Capital Quiz
            </span>
            <hr
              className={cn(
                "border-2 border-transparent w-0 transition-all duration-500 ease-in-out",
                {
                  "border-white w-full group-hover:border-[rgb(252,168,47)]":
                    page.capital,
                }
              )}
            />
          </button>

          <button
            onClick={handleClick}
            id="currency"
            className={cn("group", {
              "text-white": page.currency,
            })}
          >
            <span className="relative before:text-[#fca82f] before:top-0 before:absolute before:w-0 before:content-['Currency\00a0Quiz'] before:hover:w-[89px] sm:before:hover:w-32 before:hover:drop-shadow-2xl before:hover:shadow-black before:overflow-hidden before:transition-all before:duration-500 before:ease-in-out before:origin-center group-hover:before:w-[89px]  sm:group-hover:before:w-32">
              Currency Quiz
            </span>
            <hr
              className={cn(
                "border-2 border-transparent w-0 transition-all duration-500 ease-in-out ",
                {
                  "border-white w-full group-hover:border-[#fca82f]":
                    page.currency,
                }
              )}
            />
          </button>

          <button
            onClick={handleClick}
            id="flag"
            className={cn("group", {
              "text-white": page.flag,
            })}
          >
            <span className="relative before:text-[#fca82f] before:top-0 before:absolute before:w-0 before:content-['Flag\00a0Quiz'] sm:before:hover:w-[84px] before:hover:w-[59px] before:hover:drop-shadow-2xl before:hover:shadow-black before:overflow-hidden before:transition-all before:duration-500 before:ease-in-out before:origin-center group-hover:before:w-[59px] sm:group-hover:before:w-[84px]">
              Flag Quiz
            </span>
            <hr
              className={cn(
                "border-2 border-transparent w-0 transition-all duration-500 ease-in-out ",
                {
                  "border-white w-full group-hover:border-[#fca82f]": page.flag,
                }
              )}
            />
          </button>
        </div>
        <div className="hidden sm:visible sm:block"></div>
      </div>
    </>
  );
};

export default Sidebar;
