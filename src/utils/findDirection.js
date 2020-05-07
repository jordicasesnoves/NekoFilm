export const findDirection = (media) => {
  let { crew } = media.credits;
  let directors = [];

  crew.forEach((crewMember) => {
    if (crewMember.job === "Director") {
      directors.push(crewMember.name);
    }
  });
  return directors.join(", ");
};
