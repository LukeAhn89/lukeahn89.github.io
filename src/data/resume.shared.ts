const careerStart = new Date("2013-07-01T00:00:00+09:00");

export const getCompletedCareerYears = (date = new Date()) => {
  const anniversary = new Date(date.getFullYear(), careerStart.getMonth(), careerStart.getDate());
  return date.getFullYear() - careerStart.getFullYear() - (date < anniversary ? 1 : 0);
};

export const getCareerYear = (date = new Date()) => {
  return getCompletedCareerYears(date) + 1;
};
