import React from 'react';
import Container from '../../components/share/ui/Container';
import TableHeader from '../../components/share/ui/TableHeader';

const SupportChart = () => {
  return (
    <div className=' bg-secondary'>
      <TableHeader title="Support Chart" />
      <div className="">
        <Container className="md:px-12">
          <div className="grid grid-cols-1 gap-2 my-4 md:grid-cols-11">
            <div className="col-span-1 bg-white md:col-span-4">
              helo

            </div>
            <div className="col-span-1 md:col-span-7"></div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SupportChart;