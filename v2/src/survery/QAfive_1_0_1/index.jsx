import clsx from 'clsx';
import styles from './QAfive_1_0_1.module.scss';
import { useEffect, useState } from 'react';

// Thêm file media
import accept from '../../assets/accept-react.svg';
import angry from '../../assets/angry-react.svg';
import expectations from '../../assets/expectations-react.svg';
import satisfy from '../../assets/satisfy-react.svg';
import happy from '../../assets/happy-react.svg';
import perfect from '../../assets/perfect-react.svg';

// Câu Dịch vụ
const QAfive_1_0_1 = (props) => {
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
        let text = item.value_description;

        switch (idx) {
            case 0:
                imageUrl = angry;
                break;
            case 1:
                imageUrl = accept;
                break;
            case 2:
                imageUrl = expectations;
                break;
            case 3:
                imageUrl = satisfy;
                break;
            case 4:
                imageUrl = happy;
                break;
            case 5:
                imageUrl = perfect;
                break;
            default:
                imageUrl = perfect;
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
                    <p>{text}</p>
                </span>
            </label>
        )
    })

    return (
        <div className={clsx(styles.section)}> 
            <div className={clsx(styles.title)}>
                {survey.title}
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

export default QAfive_1_0_1;