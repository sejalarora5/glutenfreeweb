import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserStateType } from "../redux/userSlice/userSlice";
type props = {
  modal: boolean;
  title: string;
  subtitle1: string;
  subtitle2: string;
  handleModalClose: () => void;
  handleModalFunctionality: () => void;
};
function Modal({
  modal,
  title,
  subtitle1,
  subtitle2,
  handleModalClose,
  handleModalFunctionality,
}: props) {
  const userSelector = useSelector<RootState>(
    (state) => state.userSlice
  ) as UserStateType;
  return (
    <>
      <dialog
        open={modal}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hi {userSelector.userData.name}</h3>
          <p className="py-4">{title}</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn mr-5 btn-secondary"
                onClick={handleModalFunctionality}
              >
                {subtitle1}
              </button>
              <button onClick={handleModalClose} className="btn">
                {subtitle2}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
