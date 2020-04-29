import React, { useContext } from "react";
import { Context } from "../Context";

export const MediaSwitcher = ({ className }) => {
  const { state, setState } = useContext(Context);

  const mediaTypeList = [
    {
      id: 1,
      name: "🎬 Movies",
    },
    {
      id: 2,
      name: "📺 TV Shows",
    },
  ];

  function changeMediaType(e) {
    setState({ ...state, mediaType: Number(e.target.value) });
  }

  return (
    <div className={className}>
      <select
        className="inline-flex bg-white h-10 shadow border rounded"
        value={state.mediaType}
        onChange={(e) => changeMediaType(e)}
      >
        {mediaTypeList.map((media) => (
          <option key={media.id} value={media.id}>
            {media.name}
          </option>
        ))}
      </select>
    </div>
  );
};
