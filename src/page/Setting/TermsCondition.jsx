import React, { useState } from 'react';
import TableHeader from '../../components/share/ui/TableHeader';
import Container from '../../components/share/ui/Container';
import Editor from '../../components/share/Editor';
import { PrimaryButton } from '../../components/share/buttons/Buttons';

const TermsCondition = () => {
  const [content, setContent] = useState({})
  console.log(content);

  return (
    <div className=" bg-secondary" >
      <TableHeader title="Terms & Condition" />
      <Container className="flex flex-col">
        <Editor name={"terms"} setContent={setContent} content={content} />
        <div className="flex flex-col items-end w-full ">
          <PrimaryButton className="w-32">Save</PrimaryButton>
        </div>
      </Container>
    </div>
  );
};

export default TermsCondition;