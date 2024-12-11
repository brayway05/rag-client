import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const triggerRAG = async (input: any, person: string, conversationId: string) => {
    try {
        const response = await api.get('/rag-inference', {
            params: { user_input: input, owner: person, conversation_id: conversationId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting example data:', error);
        throw error;
    }
};

export default api;