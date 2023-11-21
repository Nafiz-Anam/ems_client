import Modal from '../../components/Modals/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { JobPostData } from '../../Assets/data/data';
import Search from '../../components/share/search/Search';
import Container from '../../components/share/ui/Container';
import TableTemp from '../../components/share/ui/TableTemp';
import Paginate from '../../components/share/Paginate/Paginate';
import TableHeader from '../../components/share/ui/TableHeader';
import { showModal } from '../../redux/features/modals/modalSlices';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DeleteCompo from '../../components/Modals/modalComponents/DeleteCompo';
import { useGetPostDataMutation } from '../../redux/features/jobPosts/jobPostApi';
import StageLoading from '../../components/share/loading/StageLoading';

const JobPost = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [modalContent, setModalContent] = useState();

  const [search, setSearch] = useState()
  const [rightPage, setRightPage] = useState(1)
  const [paginateData, setPaginateData] = useState([])

  const { data } = useSelector(state => state.jobPost)
  const [getPostData, { isLoading, isSuccess, isError, error }] = useGetPostDataMutation()

  const loadDataFn = async (page) => {
    if (search?.posts) { setRightPage(1) }
    const data = await getPostData({ page, search: search?.posts })
    setPaginateData(data)
  }
  useEffect(() => { loadDataFn(rightPage) }, [search])


  let header = 'Job Posts'
  let title = 'All Job Posts'
  let fd = []

  if (location.pathname == '/job-post/on-process') {
    title = 'On Process List'
    fd = data?.filter((item) => item.req_status === "pending")
  } else if (location.pathname == '/job-post/completed') {
    title = 'Completed List'
    fd = data?.filter((item) => item.req_status === 'Completed')
  } else if (location.pathname == '/job-post/cancelled') {
    title = 'Canceled List'
    fd = data?.filter((item) => item.req_status === 'Canceled')
  } else { return <Navigate to='/404' /> }


  const handleDeleteModal = (item) => {
    setModalContent(null)
    dispatch(showModal({ show: true, title: "Delate", width: "max-w-lg", page: rightPage, selectedItem: { ...item, name: item.username }, }))
    setModalContent(<DeleteCompo reloadFn={loadDataFn} name="jobPost" />)
  };
  // delete modal function and api call end

  //table related  -->>
  const handlePageClick = (data) => {
    let selected = data.selected;
    if (selected === 0) return loadDataFn(1);
    loadDataFn(selected + 1);
    setRightPage(selected + 1)
  };

  // table header
  const tableHead = [
    { name: 'Image', field: 'attach_img', },
    { name: 'Username', field: 'username', },
    { name: 'Category ', field: 'category_name', },
    { name: 'Job Title', field: 'title', },
    { name: 'Job Description', field: 'description', },
    { name: 'Budget', field: 'project_budget', },
    { name: 'Created Time', field: 'created_at', },
    { name: 'status', field: 'req_status', },
  ];
  // table fields to show
  const fieldsToShow = ["attach_img", "username", "category_name", "title", "description", "project_budget", "created_at", "status", "req_status"];
  const PostDetails = (data) => navigate(`/job-post/details/${encodeURIComponent(data.id)}`)
  // table action data
  const ActionData = [
    { name: "Details", fn: PostDetails },
    { name: "Delete", fn: handleDeleteModal },
  ]

  return (
    <div className=' bg-secondary'>
      <TableHeader title={header} />
      <Container>
        <div className="md:flex mb-[37px] mt-[30px] items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="mb-2 text-xl font-bold">{title}</p>
          </div>
          <div className="flex flex-row items-end w-full md:max-w-md md:flex-col ">
            <div className="flex flex-col items-center w-full max-w-sm gap-2 md:flex-row ">
              <Search setSearch={setSearch} text={"username or email or phone"} name={"posts"} />
            </div>
          </div>
        </div>
        <div className="mb-8 overflow-x-scroll scrollbar-hide">
          <StageLoading isLoading={isLoading} isError={isError} isSuccess={isSuccess} error={error}>
            <TableTemp
              btn={true}
              // linkUrl="/job-post/details"
              customID={true}
              assignLinkOnHeader="attach_img"
              // linkOnly={true}
              linkFieldName="username"
              isImage={true}
              isImageLink={false}
              tableHead={tableHead}
              data={fd}
              fieldsToShow={fieldsToShow}
              actionData={ActionData}
              fixedWith={"max-w-[150px]"} />
          </StageLoading>
        </div>
      </Container>
      {!isError && <Paginate loadDataFn={handlePageClick} total={paginateData} />}
      <Modal modalContent={modalContent} />
    </div>
  );
};

export default JobPost;