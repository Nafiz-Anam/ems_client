import React from 'react';
import TableHeader from '../../components/share/ui/TableHeader';
import Container from '../../components/share/ui/Container';

const ChangePassword = () => {
  return (
    <div className=''>
      <TableHeader title={"Change Password"} />
      <Container className={" py-[50px]"}>
        <form className='p-4 duration-300 bg-white md:p-10'>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className='capitalize'>Current Password</p>
              <input
                name='currentPassword'
                className='w-full p-2 border rounded-md' type="password" placeholder='Enter Current Password' />
            </div>
            <div className="flex flex-col gap-2">
              <p>New Password</p>
              <input
                name='newPassword'
                className='w-full p-2 border rounded-md ' type="password" placeholder='Enter New Password' />
            </div>
            <div className="flex flex-col gap-2">
              <p>Confirm Password</p>
              <input
                name='confirmPassword'
                className='w-full p-2 border rounded-md' type="password" placeholder='Enter Confirm Password' />
            </div>

            <div className="text-center">
              <button className='bg-primary px-4 py-[14px] text-slate-300 font-semibold capitalize'>
                Update Password
              </button>
            </div>

          </div>
        </form>
      </Container>
    </div>
  );
};

export default ChangePassword;