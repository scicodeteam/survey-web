import clsx from 'clsx';
import styles from './QAfour.module.scss';
import { useEffect, useState } from 'react';

const QAfour = (props) => {
    const [survey] = useState(props.survey.data.data[0].question_ids[props.question]);
    const [questionTitle, setQuestionTitle] = useState(survey.title);
    const [formValues, setFormValues] = useState([]);
    const [nameInput, setNameInput] = useState();
    // console.log(survey);

    // Xử lý UI
    const handleChange = (e) => {
        let data = e.target;
        data = {
            "skipped": "false",
            "question_id":  data.getAttribute('question_id'),
            "suggested_answer_id": data.getAttribute('suggested_answer_id'),
            "matrix_row_id": data.getAttribute('matrix_row_id'),
            "answer_type": "free_text",
            "value_datetime": "",
            "value_date": "",
            "value_text_box": data.value,
            "value_numberical_box": "",
            "value_char_box": "",
            "value_comment": ""
        };  
        setFormValues(data);
        setNameInput(e.target.name);
    }

    // Gửi data ra Component Cha
    useEffect(() => {
        if (formValues.length != 0 ){
            props.onLoad(nameInput, formValues);
        }
    }, [formValues]);

    // Remove 1.
    useEffect(() => {
        const title = questionTitle.slice(2);
        setQuestionTitle(title);
    },[]);

    return (
        <div className={clsx(styles.section)}> 
            <div className={clsx(styles.title)}>
                Câu {survey.title}
            </div>
            
            <div className={clsx(styles.question)}>
                <textarea 
                    placeholder="Nhập câu trả lời ..."
                    // name={props.name}
                    // value={props.value}
                    onChange={props.onChange}
                    onClick={handleChange} 
                    question_id = {survey.id}
                    matrix_row_id = {0}
                    suggested_answer_id = {0}
                    value_text_box = {props.value}
                    name = {props.name}
                />                
            </div>
            {props.error && (
                <div className={clsx(styles.feedback)}>{props.error}</div>
            )}
        </div>
    );
}

export default QAfour;