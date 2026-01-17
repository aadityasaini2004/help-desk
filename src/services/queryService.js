import api from './api';

export const queryService = {
    // Student
    getStudentQueries: async () => {
        const response = await api.get('/api/queries/student');
        return response.data;
    },

    askQuery: async (data) => {
        // data = { content: string, subject: string, ... }
        const response = await api.post('/api/queries/ask', data);
        return response.data;
    },

    // Faculty / Admin
    getSchoolQueries: async () => {
        const response = await api.get('/api/queries/school');
        return response.data;
    },

    answerQuery: async (id, answer, facultyName) => {
        // PUT /api/queries/answer/{id}?answer=TEXT&facultyName=NAME
        // Using params as per spec
        const params = new URLSearchParams();
        params.append('answer', answer);
        params.append('facultyName', facultyName);

        const response = await api.put(`/api/queries/answer/${id}?${params.toString()}`);
        return response.data;
    }
};
