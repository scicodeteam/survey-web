import clsx from 'clsx';
import styles from './QAfour.module.scss';
import { useEffect, useState } from 'react';

const QAfour = (props) => {
    const [survey] = useState(props.survey.data.data[0].question_ids[props.question]);
    const [questionTitle, setQuestionTitle] = useState(survey.title);

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
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />                
            </div>
            {props.error && (
                <div className={clsx(styles.feedback)}>{props.error}</div>
            )}
        </div>
    );
}

export default QAfour;