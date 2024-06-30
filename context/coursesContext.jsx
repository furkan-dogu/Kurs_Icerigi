import { createContext, useContext, useReducer } from "react";

const CoursesContext = createContext()

const coursesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "DELETE":
      return state.filter((course) => course.id !== action.payload);

    case "SET":
      const reversedData = action.payload.reverse()
      return reversedData

    case "UPDATE":
      const updatedCourseIndex = state.findIndex(
        (course) => course.id === action.payload.id
      );
      const updatedCourse = state[updatedCourseIndex];
      const updatedItem = { ...updatedCourse, ...action.payload.data };
      const updatedCourses = [...state];
      updatedCourses[updatedCourseIndex] = updatedItem;
      return updatedCourses;

    default:
      return state;
  }
};

const CoursesContextProvider = ({ children }) => {
  const [coursesState, dispatch] = useReducer(coursesReducer, []);

  const addCourse = (data) => {
    dispatch({ type: "ADD", payload: data });
  };

  const deleteCourse = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const setCourse = (courses) => {
    dispatch({ type: "SET", payload: courses });
  };

  const updateCourse = (id, data) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: data } });
  };

  const values = {
    courses: coursesState,
    addCourse,
    deleteCourse,
    setCourse,
    updateCourse,
  };

  return (
    <CoursesContext.Provider value={values}>{children}</CoursesContext.Provider>
  );
};

export default CoursesContextProvider;

export const useCoursesContext = () => {
  return useContext(CoursesContext);
};
