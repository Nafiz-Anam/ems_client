import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/semantic-ui.css';

const PhoneNumberValidation = ({ phoneNumber, setPhoneNumber }) => {

  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div className='relative w-full'>
      <label className='flex flex-col w-full '>
        <PhoneInput
          country={'bn'}
          disabled
          value={phoneNumber}
          inputClass='w-full p-2 border-none '
          inputStyle={{
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ddd',
            height: '40px',
          }}
          onChange={handleChange}
          inputProps={{
            required: true,
          }}
        />
      </label>
      {!valid && (
        <p className='absolute text-red-500'>Please enter a valid phone number.</p>
      )}
    </div>
  );
};

export default PhoneNumberValidation;