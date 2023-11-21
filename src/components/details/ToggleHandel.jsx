import React from 'react';
import { PrimaryButton } from '../share/buttons/Buttons';
import Invoice from './Invoice';
import Info from './Info';

const ToggleHandel = ({ setActive, active, data }) => {
  return (

    <div className="px-4 pt-6 my-5 bg-white rounded-md text-[#222] font-[500]">
      <div className="flex items-center justify-around w-full gap-4">
        <PrimaryButton
          onClick={() => setActive({ status: true, id: 1 })}
          className={`w-1/2 rounded-md ${active.id === 1 ? "" : 'bg-secondary text-gray-400'}`} > Info
        </PrimaryButton>
        <PrimaryButton
          onClick={() => setActive({ status: true, id: 2 })}
          className={`w-1/2 rounded-md ${active.id === 2 && active.status ? "" : 'bg-secondary text-gray-400'}`} >
          Get Invoice
        </PrimaryButton>
      </div>
      {active.status && active.id === 1 && <Info />}
      {active.status && active.id === 2 && <Invoice />}
    </div>

  );
};

export default ToggleHandel;