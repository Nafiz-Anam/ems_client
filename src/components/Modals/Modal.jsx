import React, { useEffect, useRef } from "react";
import Transition from "../../utils/Transition";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../redux/features/modals/modalSlices";
// import Toast from "../../utils/toast";


function Modal({ modalContent }) {

  const dispatch = useDispatch()
  // const { errorToast } = Toast()
  const modalContentRef = useRef(null);
  const { modal } = useSelector(state => state.modal)

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modal.show || keyCode !== 27) return;
      dispatch(showModal({ show: false, page: null, title: null, width: null, selectedItem: null }))
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className={`${modal.show === true ? "block" : "hidden"}`}>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 z-50 transition-opacity bg-black bg-opacity-70 backdrop-blur-sm"
        show={modal.show}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />

      {/* Modal dialog */}
      <Transition
        className="fixed inset-0 z-50 flex items-start justify-center px-4 mb-4 overflow-hidden transform top-20 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modal.show}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4">
        <div
          ref={modalContentRef}
          className={`max-h-full overflow-scroll w-full ${modal.width ? modal.width : "max-w-sm"} overflow-auto rounded bg-white shadow-lg`}>
          <div className="flex items-center justify-between p-3 border-b lg:p-6">
            <h1 className="font-poppins text-[18px] font-semibold text-blackText capitalize">
              {modal.title}
            </h1>
            <button onClick={() => {
              // errorToast("successfully close modal")
              dispatch(showModal({ show: false, title: null, width: null, selectedItem: null }))
            }}>
              <svg style={{ color: "#222222" }} xmlns="http://www.w3.org/2000/svg" width="20"
                height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="">{modalContent}</div>
        </div>
      </Transition>
    </div>
  );
}

export default Modal;
