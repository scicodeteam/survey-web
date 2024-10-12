import clsx from 'clsx';
import styles from './QAtwo.module.scss';
import { useEffect, useState } from 'react';

const QAtwo = (props) => {
    const [survey] = useState(props.survey);
    // const [survey] = useState(props.survey.data.data[0].question_ids[props.question]);
    const [questionTitle, setQuestionTitle] = useState(survey.title);
    const [answer] = useState(survey.answer);
    // const [checkQuestion, setCheckQuestion] = useState(false);
    const [formValues, setFormValues] = useState([]);
    const [nameInput, setNameInput] = useState();
    const [question] = useState(props.question);
    // console.log(question);

    // Xử lý UI
    const handleChange = (e) => {
        let data = e.target;
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

    // useEffect(() => {
    //     if(props.question === 1){
    //         setCheckQuestion(true);
    //     }
    // },[]);
    
    // Remove 1.
    useEffect(() => {
        const title = questionTitle.slice(2);
        setQuestionTitle(title);
    },[]);

    const status = answer.map((item) => {
        return(
            <div className={clsx(styles.questionCheck)} key={item.id}>
                <label>
                    <input 
                        type='radio' 
                        onClick={handleChange} 
                        question_id = {item.question_id}
                        matrix_row_id = {0}
                        suggested_answer_id = {item.id}
                        name = {props.name}
                    /> 
                    <span>{item.value}</span>
                </label>
            </div>
        )
    })

    return (
        <div className={clsx(styles.section)}> 
            {question == 0 && 
                <div className={clsx(styles.title)}>
                    Câu 2. Trong quá trình làm dịch vụ Quý khách:
                </div>
            }
            
            <div className={clsx(styles.question)}>
                <div className={clsx(styles.questionTitle)}>
                    {questionTitle}
                </div>
                {status}
            </div>
            {props.error && (
                <div className={clsx(styles.feedback)}>{props.error}</div>
            )}
        </div>
    );
}

export default QAtwo;