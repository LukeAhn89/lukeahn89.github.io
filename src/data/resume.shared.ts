const careerStart = new Date("2013-07-01T00:00:00+09:00");

export const getCareerYear = (date = new Date()) => {
  const anniversary = new Date(date.getFullYear(), careerStart.getMonth(), careerStart.getDate());
  const elapsedYears = date.getFullYear() - careerStart.getFullYear() - (date < anniversary ? 1 : 0);

  return elapsedYears + 1;
};
