export const findDirection = (media) => {
  console.log(media);
  let { crew } = media.credits;
  let directors = [];

  crew.forEach((crewMember) => {
    if (crewMember.job === "Director") {
      directors.push(crewMember.name);
    }
  });
  return directors.join(", ");
};
