import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TableHeader from "../../components/share/ui/TableHeader";
import Container from "../../components/share/ui/Container";
import ToggleHandel from "../../components/details/ToggleHandel";

const UserBookings = () => {
  const { userId, ExpertBookingId } = useParams()
  /// get query params

  const query = new URLSearchParams(useLocation().search);
  const invoice = query.get("invoice");

  console.log(invoice);


  // console.log(userId, detailsId);
  const [active, setActive] = useState({ status: true, id: invoice === "false" ? 1 : 2 })

  return (
    <div className=''>
      <TableHeader title={"Booking Details"} />
      <Container >
        <ToggleHandel setActive={setActive} active={active} />
      </Container>
    </div>
  );
};

export default UserBookings;