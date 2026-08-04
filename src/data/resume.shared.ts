const careerStart = { year: 2013, month: 7, day: 1 };
const koreaDateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

const getKoreaCalendarDate = (date: Date) => {
  const parts = Object.fromEntries(
    koreaDateFormatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  );

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
  };
};

export const getCompletedCareerYears = (date = new Date()) => {
  const current = getKoreaCalendarDate(date);
  const hasNotReachedAnniversary = current.month < careerStart.month
    || (current.month === careerStart.month && current.day < careerStart.day);

  return current.year - careerStart.year - (hasNotReachedAnniversary ? 1 : 0);
};

export const getCareerYear = (date = new Date()) => {
  return getCompletedCareerYears(date) + 1;
};
