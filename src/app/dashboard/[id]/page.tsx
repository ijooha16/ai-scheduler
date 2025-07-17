'use client'

import PageContainer from "@/components/layout/page-container";
import { use } from "react";
import Todos from "../_components/todos";

const GoalDetail = ({ params }: { params: { id: string } }) => {
const { id } = use(params);

  return (
    <>
      {id}
      <Todos id={id} />
    </>
  );
};

export default GoalDetail;
