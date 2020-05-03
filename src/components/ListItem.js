import React from "react";

export const ListItem = ({ item }, props) => {
  console.log(item);
  return <li>{props.children}</li>;
};
