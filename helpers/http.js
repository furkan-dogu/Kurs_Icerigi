import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const storeCourse = async (courseData) => {
    const { data } = await axios.post(`${API_URL}/courses.json`, courseData)
    const id = data.name
    return id
}

export const getCourses = async () => {
    const { data } = await axios.get(`${API_URL}/courses.json`)
    const courses = []

    for(let key in data) {
        const courseObj = {
            id: key,
            amount: data[key].amount,
            date: new Date(data[key].date),
            description: data[key].description
        }
        courses.push(courseObj)
    }
    return courses
}

export const editCourse = (id, courseData) => {
    return axios.put(`${API_URL}/courses/${id}.json`, courseData)
}

export const destroyedCourse = (id) => {
    return axios.delete(`${API_URL}/courses/${id}.json`)
}