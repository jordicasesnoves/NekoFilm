import React from "react";

export const MediaPageContainer = (props) => {
  return (
    <div
      className="flex py-16 max-w-6xl mx-auto"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      {props.children}
    </div>
  );
};
