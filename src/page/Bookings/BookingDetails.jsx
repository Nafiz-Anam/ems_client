import React, { useState } from 'react';
import TableHeader from '../../components/share/ui/TableHeader';
import Container from '../../components/share/ui/Container';
import ToggleHandel from '../../components/details/ToggleHandel';
import { useLocation, useParams } from 'react-router-dom';

const BookingDetails = () => {
  const { userId, ExpertBookingId } = useParams()
  /// get query params

  const query = new URLSearchParams(useLocation().search);
  const invoice = query.get("invoice");

  // console.log(userId, detailsId);
  const [active, setActive] = useState({ status: true, id: invoice === "false" ? 1 : 2 })

  return (
    <div className=' bg-secondary'>
      <TableHeader title={"Booking Details"} />
      <Container >
        <ToggleHandel setActive={setActive} active={active} />
      </Container>
    </div>
  );
};

export default BookingDetails;