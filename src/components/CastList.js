import { LazyPoster } from "./LazyPoster";
import React from "react";

export const CastList = ({ cast }) => {
  let maxActors = 7;
  let mainActors = cast.slice(0, maxActors);

  return mainActors.map((castMember, index) => (
    <div className="w-24 mr-2" key={castMember.id}>
      <LazyPoster
        className="rounded shadow"
        src={castMember.profile_path}
        alt={castMember.name}
      />

      <div className="text-sm mt-1 truncate">{castMember.name} </div>
      <div className="text-sm -mt-1 text-gray-600 truncate">
        ({castMember.character})
      </div>
    </div>
  ));
};
