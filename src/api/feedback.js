import http from "./http";
import { TOKEN } from '../utils/const';

// Post Feedback
export const postFeedback = async (body) => {
    return await http.post(`/create-case-survey?token=${TOKEN}&name=${body.name?.replace(/[<>[\]+'"#&]/g, '')}&phone=${body.phone}&content=${body.content?.replace(/[<>[\]+'"#&]/g, '')}&company_id=${body.company_id}&type=${body.type}`)
};

// Get Survey
export const getSurvey = async (body) => {
    return await http.get(`/get-survey?
        token=${TOKEN}&
        id=${body.id}
    `);
};

// Get Survey
export const postSurvey = async (body) => {
    return await http.get(`/create-user-input-line?
        token=${TOKEN}&
        id=${body.id}&
        state=${body.state}&
        user_input_line_ids=${body.user_input_line_ids}
    `);
};