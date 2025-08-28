import Form from "./Form";
import { useAppData } from "../AppContext";
import { useClickOutside } from "../hooks/useClickOutside";

function Modal() {
  const { isOpenModal, setIsOpenModal } = useAppData();
  const closeModal = () => setIsOpenModal(false);
  const ref = useClickOutside(closeModal, true);

  return (
    <>
      <div className={`overlay ${isOpenModal ? "" : "hidden"}`}></div>

      <div
        className={`add-recipe-window ${isOpenModal ? "" : "hidden"}`}
        ref={ref}
      >
        <button
          className="btn--close-modal"
          onClick={() => setIsOpenModal(false)}
        >
          &times;
        </button>
        <Form />
      </div>
    </>
  );
}

export default Modal;
