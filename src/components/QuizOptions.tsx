import cn from "../utility/cn";
import React from "react";

interface QuizOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  green: boolean;
  red: boolean;
  isSelected: boolean;
  label: string;
  id: string;
  option: string;
}

const QuizOptions = React.forwardRef<HTMLDivElement, QuizOptionProps>(
  ({ green, red, isSelected, label, id, option, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `border-2 border-[#6066d0]/70 text-[#6066d0]/70 p-2 rounded-xl flex items-center justify-between hover:border-transparent hover:text-white transition-all duration-1000 ease-out cursor-pointer space-x-2 relative before:absolute before:bg-[#f9a826] before:w-96 before:h-96 before:rounded-full before:-translate-x-7 before:transition-all before:duration-700 before:ease-in-out before:scale-0 before:hover:scale-100 before:origin-center overflow-hidden`,
          {
            "pointer-events-none hover:bg-green-500  text-white bg-green-500 border-transparent":
              green,
            "pointer-events-none hover:bg-rose-500  text-white bg-rose-500 border-transparent":
              red,
          }
        )}
        {...props}
        id={id}
      >
        <div className="flex space-x-5 items-center relative z-10">
          <span>{option}</span>
          <span className="w-48">{label}</span>
        </div>
        {isSelected && (
          <span className="material-symbols-rounded relative z-10">
            {green ? "check_circle" : "cancel"}
          </span>
        )}
      </div>
    );
  }
);
export default QuizOptions;
