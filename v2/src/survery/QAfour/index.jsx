import clsx from 'clsx';
import styles from './QAfour.module.scss';
import { useEffect, useState } from 'react';

const QAfour = (props) => {
    const [survey] = useState(props.survey);
    // const [survey] = useState(props.survey.data.data[0].question_ids[props.question]);
    const [questionTitle, setQuestionTitle] = useState(survey.title);
    const [formValues, setFormValues] = useState([]);
    const [nameInput, setNameInput] = useState();
    const [value, setValue] = useState('');
    const [question_id, setQuestion_id] = useState('');
    const [suggested_answer_id, setSuggested_answer_id] = useState('');

    // Xử lý UI
    const handleChange = (e) => {
        setValue(e.target.value);
        setNameInput(e.target.name);
        setQuestion_id(e.target.getAttribute('question_id'))
        setSuggested_answer_id(e.target.getAttribute('suggested_answer_id'))
    }
    
    // Update FormValues
    useEffect(()=>{
        setFormValues({
            "skipped": "",
            "question_id":  +question_id,
            "suggested_answer_id": +suggested_answer_id,
            "matrix_row_id": 0,
            "answer_type": "free_text",
            "value_datetime": "",
            "value_date": "",
            "value_text_box": value,
            "value_numberical_box": "",
            "value_char_box": "",
            "value_comment": ""
        });
    },[value, question_id, suggested_answer_id]);

    // Gửi data ra Component Cha
    useEffect(() => {
        if (value !== '' ){
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
                {(props.brand !== 'HH' && props.brand !== 'KN')  && 'Câu'} {survey.title}
            </div>
            
            <div className={clsx(styles.question)}>
                <textarea 
                    placeholder="Nhập câu trả lời ..."
                    value={value}
                    onChange={handleChange} 
                    question_id = {survey.id}
                    suggested_answer_id = {0}
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