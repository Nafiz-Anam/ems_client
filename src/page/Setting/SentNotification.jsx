import React, { useRef } from 'react';
import TableHeader from '../../components/share/ui/TableHeader';
import Container from '../../components/share/ui/Container';
import { Options } from '../../components/share/ui/Dropdown';

const SentNotification = () => {
  const refRr = useRef(null)
  const handleData = async (formData) => {
    const title = formData.get("title")
    console.log(title);
  }

  return (
    <div className=''>
      <TableHeader title={"Sent Notification"} />
      <Container className={"py-5"}>
        <form
          ref={refRr}
          action={handleData} className='p-4 mt-5 duration-300 bg-white md:p-10'>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className='capitalize'>Notification Type</p>
              <Options className={" "} options={["All User", "All Expert", "Text Message To All"]} />
            </div>
            <div className="flex flex-col gap-2">
              <p>Subject/Title</p>
              <input
                name='title'
                className='w-full p-2 border rounded-md' type="text" placeholder='Enter Subject' />
            </div>
            <div className="flex flex-col gap-2">
              <p>Message</p>
              <textarea
                name='message'
                className="w-full h-40 textarea textarea-bordered" placeholder="Bio"></textarea>
            </div>

            <div className="flex items-center justify-center w-full mt-4">
              <button className='bg-[#0EAB8B] px-4 py-[14px] text-white font-semibold capitalize flex gap-2 '>
                sand Notification
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM8.5 12.75H13.69L11.97 14.47C11.68 14.76 11.68 15.24 11.97 15.53C12.12 15.68 12.31 15.75 12.5 15.75C12.69 15.75 12.88 15.68 13.03 15.53L16.03 12.53C16.32 12.24 16.32 11.76 16.03 11.47L13.03 8.47C12.74 8.18 12.26 8.18 11.97 8.47C11.68 8.76 11.68 9.24 11.97 9.53L13.69 11.25H8.5C8.09 11.25 7.75 11.59 7.75 12C7.75 12.41 8.09 12.75 8.5 12.75Z" fill="white" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SentNotification;