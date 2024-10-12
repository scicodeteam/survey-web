import clsx from 'clsx';
import styles from './QAeight.module.scss';
import { useEffect, useState } from 'react';

const QAeight = (props) => {
    const [survey] = useState(props.survey);
    const [questionTitle, setQuestionTitle] = useState(survey.title);
    const [answer] = useState(survey.answer);
    const [formValues, setFormValues] = useState([]);
    const [nameInput, setNameInput] = useState();
    const [active, setActive] = useState();

    // Xử lý UI
    const handleChange = (e) => {
        let data = e.target;
        setActive(data.getAttribute('number'));
        data = {
            "skipped": "",
            "question_id":  +data.getAttribute('question_id'),
            "suggested_answer_id": +data.getAttribute('suggested_answer_id'),
            "matrix_row_id": +data.getAttribute('matrix_row_id'),
            "answer_type": "simple_choice",
            "value_datetime": "",
            "value_date": "",
            "value_text_box": "",
            "value_numberical_box": "",
            "value_char_box": "",
            "value_comment": ""
        };  
        setFormValues(data);
        setNameInput(e.target.name);
    }

    // Gửi data ra Component Cha
    useEffect(() => {
        if (formValues.length !== 0 ){
            props.onLoad(nameInput, formValues);
        }
    }, [formValues]);

    // Remove 1.
    useEffect(() => {
        const title = questionTitle.slice(2);
        setQuestionTitle(title);
    },[]);

    const status = answer.map((item, idx) => {
        let imageUrl;
        let text = item.value;
        text = text.split(":");

        if(props.imageUrl && idx === 0){
            imageUrl = props.imageUrl[0];
        }
        if(props.imageUrl && idx === 1){
            imageUrl = props.imageUrl[1];
        }
        return(
            <label key={idx}>
                <input 
                    onClick = {handleChange}
                    type = 'radio' 
                    question_id = {item.question_id}
                    matrix_row_id = {0}
                    suggested_answer_id = {item.id}
                    name = {props.name}  
                    number = {idx}                  
                />
                <span className={active != idx ? undefined : clsx(styles.active)}>
                    <img src={imageUrl} alt={text}/>
                    <p>{text[0]}</p>
                </span>
            </label>
        )
    })

    return (
        <div className={clsx(styles.section)}> 
            <div className={clsx(styles.title)}>
                {props.brand !== 'HH' && 'Câu'} {survey.title}
            </div>
            
            <div className={clsx(styles.question)}>
                <div className={styles['numberAnswer']}>
                   {status}
                </div>
            </div>
            {props.error && (
                <div className={clsx(styles.feedback)}>{props.error}</div>
            )}
        </div>
    );
}

export default QAeight;