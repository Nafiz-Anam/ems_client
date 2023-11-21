import React from 'react';
import Card from '../../components/PaymentGateway/Card';
import Container from '../../components/share/ui/Container';
import Banking from '../../components/PaymentGateway/Banking';
import TableHeader from '../../components/share/ui/TableHeader';
import { Navigate, useLocation } from 'react-router-dom';
import MobileBanking from '../../components/PaymentGateway/MobileBanking';

const PaymentGateway = () => {

  const location = useLocation()
  const needRoute = ["card", "mobile-banking", "banking"]
  if (!needRoute.includes(location.pathname.split("/")[2])) { return <Navigate to="/404" /> }

  return (
    <div className=' bg-secondary'>
      <TableHeader title={"Payment Gateway"} />
      <Container>
        {location.pathname === '/payment-gateway/card' && <Card />}
        {location.pathname === '/payment-gateway/mobile-banking' && <MobileBanking />}
        {location.pathname === '/payment-gateway/banking' && <Banking />}
      </Container>
    </div>
  );
};

export default PaymentGateway;