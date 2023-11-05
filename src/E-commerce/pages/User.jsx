import React from "react";
import Empty from "../components/Empty";

function User() {
  let Content = <Empty text="User is empty right now, try others!" />;
  return <div>{Content}</div>;
}

export default User;
