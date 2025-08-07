import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://calculadora.joksantelles.com/api/v1";


export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// --- AUTH ---
function setAuthToken() {
    const token = localStorage.getItem("adminToken");
    if (token) {
        apiClient.defaults.headers.common["x-admin-token"] = token;
    } else {
        delete apiClient.defaults.headers.common["x-admin-token"];
    }
}

export const loginAdmin = async (password: string) => {
    const res = await apiClient.post("/auth/", { password });
    const token = res.data.token;

    // Guardar token localmente
    localStorage.setItem("adminToken", token);

    // Establecer token inmediatamente para peticiones futuras
    setAuthToken();

    return token;
};

// --- COURSES ---
export const createCourse = async (name: string, price: number) => {
    setAuthToken();
    const res = await apiClient.post("/courses/", { name, price });
    return res.data;
};

export const getCourses = async () => {
    setAuthToken();
    const res = await apiClient.get("/courses/");
    return res.data;
};

export const updateCourse = async (id: number, name: string, price: number) => {
    setAuthToken();
    const res = await apiClient.put(`/courses/${id}`, { name, price });
    return res.data;
};

export const deleteCourse = async (id: number) => {
    setAuthToken();
    const res = await apiClient.delete(`/courses/${id}`);
    return res.data;
};

// --- PRICING ---
export const calculatePricing = async (payload: { items: { course_id: number; quantity: number }[] }) => {
  const res = await apiClient.post("/pricing/", payload);
  return res.data;
};

// --- QUOTATIONS ---
export const createQuotation = async (quotation: any) => {
  const response = await apiClient.post("/quotations/", quotation);
  return response.data;
};
