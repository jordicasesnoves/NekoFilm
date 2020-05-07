import React from "react";

export const ListItem = ({ item }, props) => {
  if (item) {
    return <li>{props.children}</li>;
  }
};
