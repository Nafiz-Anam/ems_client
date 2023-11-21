import React, { useState } from 'react';

import Search from '../share/search/Search';
import { PrimaryButton } from '../share/buttons/Buttons';
import { PlusIcon } from '../../Assets/icons';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/features/modals/modalSlices';
import Modal from '../Modals/Modal';
import TableTemp from '../share/ui/TableTemp';
import DeleteCompo from '../Modals/modalComponents/DeleteCompo';
import { CardModal } from '../Modals/modalComponents/PaymentGatewayModal';


const Card = () => {
  const dispatch = useDispatch()
  const [modalContent, setModalContent] = useState();
  const handleAddNewCard = () => {
    dispatch(showModal({ show: true, title: "Add New Card", width: "max-w-4xl", }))
    setModalContent(<CardModal onConfirm={() => console.log("confirm")} />)
  };

  const data = [
    {
      id: 1,
      logo: 'https://example.com/logo1.jpg',
      methodName: 'Method 1',
      status: 'Active',
    },
    {
      id: 2,
      logo: 'https://example.com/logo2.jpg',
      methodName: 'Method 2',
      status: 'Deactive',
    },
    {
      id: 3,
      logo: 'https://example.com/logo3.jpg',
      methodName: 'Method 3',
      status: 'Active',
    },
    {
      id: 4,
      logo: 'https://example.com/logo4.jpg',
      methodName: 'Method 4',
      status: 'Deactive',
    },
    {
      id: 5,
      logo: 'https://example.com/logo5.jpg',
      methodName: 'Method 5',
      status: 'Active',
    },
    {
      id: 6,
      logo: 'https://example.com/logo6.jpg',
      methodName: 'Method 6',
      status: 'Deactive',
    },
    {
      id: 7,
      logo: 'https://example.com/logo7.jpg',
      methodName: 'Method 7',
      status: 'Active',
    },
    {
      id: 8,
      logo: 'https://example.com/logo8.jpg',
      methodName: 'Method 8',
      status: 'Deactive',
    },
    {
      id: 9,
      logo: 'https://example.com/logo9.jpg',
      methodName: 'Method 9',
      status: 'Active',
    },
    {
      id: 10,
      logo: 'https://example.com/logo10.jpg',
      methodName: 'Method 10',
      status: 'Deactive',
    },
  ];
  const tableHeader = [
    { id: 1, name: 'logo', field: 'logo' },
    { id: 2, name: 'Method Name', field: 'methodName' },
    { id: 3, name: 'Status', field: 'status' },
  ]
  const fieldToShow = ["logo", "methodName", "status"]


  const handleUpdateModal = (item) => {
    dispatch(showModal({ show: true, title: "Delate", width: "max-w-4xl", selectedItem: { ...item, name: item.methodName }, }))
    setModalContent(<CardModal onConfirm={() => console.log("confirm")} />)

  }
  // delete modal function and api call
  const handleDeleteFn = () => {
    //  delate api call
    // successToast("Delete successfully")
  }
  const handleDeleteModal = (item) => {
    setModalContent(null)
    dispatch(showModal({ show: true, title: "Delate", width: "max-w-lg", selectedItem: { ...item, name: item.methodName }, }))
    setModalContent(<DeleteCompo onConfirm={handleDeleteFn} />)
  };
  // delete modal function and api call end


  const ActionData = [
    { name: "Edit", fn: handleUpdateModal },
    { name: "Delete", fn: handleDeleteModal },
  ]



  return (
    <div>
      <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="mb-2 text-xl font-bold">Card List</p>
        </div>
        <div className="flex flex-col items-center w-full gap-4 md:max-w-md md:flex-row ">
          <div className="flex items-center w-full ">
            <Search />
            <div className=" w-80">
              <PrimaryButton
                onClick={() => handleAddNewCard()}
                className="flex items-center gap-2 ml-3 rounded-md">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add New Card</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <>
        <div className="mt-10 mb-8 overflow-x-scroll scrollbar-hide">
          <TableTemp
            btn={true}
            linkUrl={``}
            customID={true}
            assignLinkOnHeader="logo"
            linkOnly={false}
            // linkFieldName="logo"
            isImage={true}
            isImageLink={false}
            tableHead={tableHeader}
            data={data}
            // fixedWith={180}
            fieldsToShow={fieldToShow}
            actionData={ActionData}
          />
        </div>
      </>
      <Modal modalContent={modalContent} setModalContent={setModalContent} />
    </div>
  );
};

export default Card;