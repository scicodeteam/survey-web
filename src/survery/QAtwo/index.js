import clsx from 'clsx';
import styles from './QAtwo.module.scss';
import { useEffect, useState } from 'react';

const QAtwo = (props) => {
    const [survey] = useState(props.survey.data.data[0].question_ids[props.question]);
    const [questionTitle, setQuestionTitle] = useState(survey.title);
    const [answer] = useState(survey.answer);
    const [checkQuestion, setCheckQuestion] = useState(false);
    // console.log(answer);

    useEffect(() => {
        if(props.question == 1){
            setCheckQuestion(true);
        }
    },[]);
    
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
                        name={props.name}
                        value={item.value}
                        onChange={props.onChange} 
                    /> 
                    <span>{item.value}</span>
                </label>
            </div>
        )
    })

    return (
        <div className={clsx(styles.section)}> 
            {checkQuestion && 
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