import clsx from 'clsx';
import styles from './QAthree_1_0_1.module.scss';
import { useEffect, useState } from 'react';

// Câu Giới thiệu
const QAthree_1_0_1 = (props) => {
    const [survey] = useState(props.survey);
    // const [survey] = useState(props.survey.data.data[0].question_ids[props.question]);
    const [questionTitle, setQuestionTitle] = useState(survey.title);
    const [answer] = useState(survey.answer);
    const [formValues, setFormValues] = useState([]);
    const [nameInput, setNameInput] = useState();
    const [active, setActive] = useState();
    const color = ['#ff371b', '#fd6954',  '#fbca43', '#fbca43','#f59d00', '#f59d00', '#bbdb5b', '#bbdb5b', '#58d357', '#58d357', '#26d125'];

    // console.log(answer);
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
                <span
                    className={active != idx ? undefined : clsx(styles.active)}
                    style={{backgroundColor: color[idx]}}                      
                >{idx}</span>
            </label>
        )
    });

    return (
        <div className={clsx(styles.section)}> 
            <div className={clsx(styles.title)}>
                {survey.title}
                <span className={clsx(styles.titleSub)}>
                    Bấm vào chữ số phía dưới để lựa chọn
                </span>
            </div>
            
            <div className={clsx(styles.question)}>
                <div className={styles['numberAnswer']}>
                   {status}
                </div>
                <div className={styles['line']}></div>
                
                <div className={styles['level']}>
                    <span className={styles['left']}>Không</span>
                    <span className={styles['center']}>Có thể</span>
                    <span className={styles['right']}>Chắc chắn</span>
                </div>
            </div>
            {props.error && (
                <div className={clsx(styles.feedback)}>{props.error}</div>
            )}
        </div>
    );
}

export default QAthree_1_0_1;