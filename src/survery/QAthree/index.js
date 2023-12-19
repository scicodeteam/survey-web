import clsx from 'clsx';
import styles from './QAthree.module.scss';
import { useEffect, useState } from 'react';

const QAthree = (props) => {
    const [survey] = useState(props.survey.data.data[0].question_ids[props.question]);
    const [questionTitle, setQuestionTitle] = useState(survey.title);
    const [answer] = useState(survey.answer);
    const color = ['#e94c36', '#e94c36', '#f59d00', '#f59d00', '#fbca43', '#fbca43', '#bbdb5b', '#bbdb5b', '#58d357', '#58d357'];
    // console.log(answer);

    // Remove 1.
    useEffect(() => {
        const title = questionTitle.slice(2);
        setQuestionTitle(title);
    },[]);

    const status = color.map((item, idx) => {
        let value;
        if(idx < 4){
            value = answer[0].value;
        } else if (idx < 8) {
            value = answer[1].value;
        } else {
            value = answer[2].value;
        }
        return(
            <label key={idx}>
                <input 
                    type="radio" 
                    name={props.name}
                    value={value}
                    onChange={props.onChange}
                />
                <span style={{backgroundColor: color[idx]}}>{idx + 1}</span>
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