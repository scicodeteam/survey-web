import clsx from 'clsx';
import styles from './QAthree.module.scss';
import { useEffect, useState } from 'react';

const QAthree = (props) => {
    const [survey] = useState(props.survey);
    // const [survey] = useState(props.survey.data.data[0].question_ids[props.question]);
    const [questionTitle, setQuestionTitle] = useState(survey.title);
    const [answer] = useState(survey.answer);
    const [formValues, setFormValues] = useState([]);
    const [nameInput, setNameInput] = useState();
    const [active, setActive] = useState();
    const color = ['#e94c36', '#e94c36', '#f59d00', '#f59d00', '#fbca43', '#fbca43', '#bbdb5b', '#bbdb5b', '#58d357', '#58d357'];

    // console.log(active);
    // Xử lý UI
    const handleChange = (e) => {
        let data = e.target;
        setActive(data.getAttribute('number'));
        data = {
            "skipped": "",
            "question_id":  data.getAttribute('question_id'),
            "suggested_answer_id": data.getAttribute('suggested_answer_id'),
            "matrix_row_id": data.getAttribute('matrix_row_id'),
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

    const status = color.map((item, idx) => {
        let value, question_id, suggested_answer_id;

        if(idx < 4){
            value = answer[0].value;
            question_id = answer[0].question_id;
            suggested_answer_id = answer[0].id;
        } else if (idx < 8) {
            value = answer[1].value;
            question_id = answer[1].question_id;
            suggested_answer_id = answer[1].id;
        } else {
            value = answer[2].value;
            question_id = answer[2].question_id;
            suggested_answer_id = answer[2].id;
        }
        return(
            <label key={idx}>
                <input 
                    onClick = {handleChange}
                    type = 'radio' 
                    question_id = {question_id}
                    matrix_row_id = {0}
                    suggested_answer_id = {suggested_answer_id}
                    name = {props.name}  
                    number = {idx}                  
                />
                <span
                    className={active != idx ? undefined : clsx(styles.active)}
                    style={{backgroundColor: color[idx]}}                      
                >{idx + 1}</span>
            </label>
        )
    })

    return (
        <div className={clsx(styles.section)}> 
            <div className={clsx(styles.title)}>
                Câu {survey.title}
            </div>
            
            <div className={clsx(styles.question)}>
                <div className={styles['numberAnswer']}>
                   {status}
                </div>
                
                <div className={styles['level']}>
                    <span>Chắc chắn không</span>
                    <p></p>
                    <span>Chắc chắn có</span>
                </div>
            </div>
            {props.error && (
                <div className={clsx(styles.feedback)}>{props.error}</div>
            )}
        </div>
    );
}

export default QAthree;