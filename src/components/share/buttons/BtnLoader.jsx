import React from "react";

const BtnLoader = () => {
  return (
    <button type="button" className="... bg-yellow-200" disabled>
      <svg className="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
        {/* <!-- ... --> */}
      </svg>
      Processing...
    </button>
  );
};

export default BtnLoader;
