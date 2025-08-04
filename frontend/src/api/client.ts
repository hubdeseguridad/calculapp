import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

export const createCourse = async (name: string, price: number, token: string) => {
    const res = await apiClient.post(
        "/courses/",
        { name, price },
        { headers: { "x-admin-token": token } }
    );
    return res.data;
};

export const getCourses = async () => {
    const res = await apiClient.get("/courses/");
    return res.data;
};

export const updateCourse = async (id: number, name: string, price: number, token: string) => {
    const res = await apiClient.put(
        `/courses/${id}`,
        { name, price },
        { headers: { "x-admin-token": token } }
    );
    return res.data;
};

export const deleteCourse = async (id: number, token: string) => {
    const res = await apiClient.delete(`/courses/${id}`, {
        headers: { "x-admin-token": token },
    });
    return res.data;
};

export const calculatePricing = async (payload: { items: { course_id: number; quantity: number }[] }) => {
  const res = await apiClient.post("/pricing/", payload);
  return res.data;
};

export const createQuotation = async (quotation: any) => {
  const response = await apiClient.post("/quotations/", quotation);
  return response.data;
};
