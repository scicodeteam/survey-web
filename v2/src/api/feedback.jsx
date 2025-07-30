import http from "./http";
import { TOKEN } from '../utils/const';

// Post Feedback
export const postFeedback = async (body) => {
    return await http.post(`/create-case-survey?
        token=${TOKEN}&
        name=${body.name?.replace(/[<>[\]+'"#&]/g, '')}&
        phone=${body.phone}&
        content=${body.content?.replace(/[<>[\]+'"#&]/g, '')}&
        company_id=${body.company_id}&
        brand=${body.brand}&
        type=${body.type}`)
};

// Get Survey
export const getSurvey = async (body) => {
    return await http.get(`/get-survey?
        token=${TOKEN}&
        id=${body.id}&
        brand=${body.brand}
    `);
};

// Get Survey
export const postSurvey = async (body) => {
    return await http.get(`/create-survey-user-input-web?
        token=${TOKEN}&
        id=${body.id}&
        state=${body.state}&
        brand=${body.brand}&
        user_input_line_ids=${JSON.stringify(body.user_input_line_ids)}
    `);
};