import { MouseEvent } from "react";
import cn from "../utility/cn";
import { useNavigate } from "react-router-dom";
interface ModalProps {
  quizPath: string;
  handleModal: (value: boolean) => void;
  handleIsRight: (element: boolean | null | undefined) => void;
}

const Modal: React.FC<ModalProps> = ({
  quizPath,
  handleModal,
  handleIsRight,
}) => {
  const navigate = useNavigate();
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    if (id === "no") {
      handleModal(false);
    } else if (id === "yes") {
      navigate(quizPath);
      handleModal(false);
      handleIsRight(undefined);
    }
  };
  return (
    <div
      className={cn(
        "fixed w-80 h-[50rem] mini:w-[100dvw] mini:h-[100dvh] z-50 bg-slate-500/50 flex justify-center items-center"
      )}
    >
      <div className="px-10 sm:px-16 py-7 bg-white space-y-12 rounded-lg shadow-md shadow-slate-600">
        <div className="space-y-2">
          <h1 className="font-medium">Are you sure want to exit this quiz?</h1>
          <p className="text-rose-500 text-sm font-bold text-center">
            **All score will be lost**
          </p>
        </div>

        <div className="flex justify-between">
          <button
            id="yes"
            onClick={handleClick}
            className="px-10 py-3 bg-slate-500/50 hover:bg-slate-800 cursor-pointer font-medium rounded-lg hover:text-white hover:shadow-sm hover:shadow-slate-500"
          >
            Yes
          </button>

          <button
            id="no"
            onClick={handleClick}
            className="px-10 py-3 bg-[#fca82f] cursor-pointer font-medium rounded-lg hover:text-white hover:shadow-sm hover:shadow-[#fca82f]"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
