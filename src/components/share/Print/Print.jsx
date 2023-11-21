import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { setPrintStart } from '../../../redux/features/utils/utilsSlice';
import { twMerge } from 'tailwind-merge';

const Print = ({ children, className }) => {
  const dispatch = useDispatch()
  const { printStart } = useSelector(state => state.utils)
  const componentRef = useRef();

  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `invoice`,
    onAfterPrint: () => dispatch(setPrintStart(false)),
  });

  useEffect(() => {
    if (printStart) { handelPrint(); }
  }, [print, handelPrint]);

  return (
    <div ref={componentRef} style={{ width: '100%' }} className={twMerge(`${printStart ? "p-10 duration-300" : null}`, className)}>
      {children}
    </div>
  );
};

export default Print;