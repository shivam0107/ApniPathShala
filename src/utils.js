export const ACCOUNT_TYPE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
};

export const COURSE_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
};


export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
