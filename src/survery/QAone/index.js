import clsx from 'clsx';
import styles from './QAone.module.scss';
import { useEffect, useState } from 'react';

const QAone = (props) => {
    const [survey] = useState(props.survey.data.data[0].question_ids[0]);
    const [answer] = useState(survey.answer);
    const [listParts] = useState(survey.row);
    const [data, setData] = useState('')
    // useEffect(()=>{
    //     const obj = {
    //         "skipped": "",
    //         "question_id": 105,
    //         "suggested_answer_id": 236,
    //         "matrix_row_id": 0,
    //         "answer_type": "simple_choice",
    //         "value_datetime": "",
    //         "value_date": "",
    //         "value_text_box": "",
    //         "value_numberical_box": "",
    //         "value_char_box": "",
    //         "value_comment": ""
    //     }
    //     setTimeout(() => {
    //         setData(JSON.stringify(obj));
    //     }, 500);
    // })

    // console.log(listParts);

    // Header Status
    const status = answer.map((item) => {
        let imageUrl;
        let text = item.value;
        text = text.slice(2);
        if(item.id === 1056){
            imageUrl = require('../../assets/accept-react.svg').default;
        }
        if(item.id === 1057){
            imageUrl = require('../../assets/angry-react.svg').default;
        }
        if(item.id === 1058){
            imageUrl = require('../../assets/expectations-react.svg').default;
        }
        if(item.id === 1059){
            imageUrl = require('../../assets/satisfy-react.svg').default;
        }
        if(item.id === 1060){
            imageUrl = require('../../assets/happy-react.svg').default;
        }
        if(item.id === 1061){
            imageUrl = require('../../assets/perfect-react.svg').default;
        }
        return(
            <th key={item.id}>
                <img src={imageUrl} alt="Logo"/>
                <p>{text}</p>
            </th>
        )
    })

    const parts = listParts.map((item) => {
        return (
            <tr key={item.id}>
                <td className={clsx(styles.name)}>{item.value}</td>
                <td>
                    <label>
                        <input type="radio" name={'suggested_answer_id_' + item.id} value="1056" />
                        <span></span>
                    </label>
                </td>
                <td>
                    <label>
                        <input type="radio" name={'suggested_answer_id_' + item.id} value="1057" />
                        <span></span>
                    </label>
                </td>
                <td>
                    <label>
                        <input type="radio" name={'suggested_answer_id_' + item.id} value="1058" />
                        <span></span>
                    </label>
                </td>
                <td>
                    <label>
                        <input type="radio" name={'suggested_answer_id_' + item.id} value="1059" />
                        <span></span>
                    </label>
                </td>
                <td>
                    <label>
                        <input type="radio" name={'suggested_answer_id_' + item.id} value="1060" />
                        <span></span>
                    </label>
                </td>
                <td>
                    <label>
                        <input type="radio" name={'suggested_answer_id_' + item.id} value="1061" />
                        <span></span>
                    </label>
                </td>
            </tr>
        )
    });
    
    const sendData = () => {
        props.onLoad('staff', {
            "skipped": "",
            "question_id": 105,
            "suggested_answer_id": 236,
            "matrix_row_id": 0,
            "answer_type": "simple_choice",
            "value_datetime": "",
            "value_date": "",
            "value_text_box": "",
            "value_numberical_box": "",
            "value_char_box": "",
            "value_comment": ""
        });
    }

    useEffect(() => {
        sendData();
    },[]);

    return(
        <div className={clsx(styles.section)}>
            <div className={clsx(styles.title)}>
                Câu {survey.title}
            </div>
            <div className="table-responsive">
                <table className="table">
                    <tbody><tr>
                        <th></th>
                        {status}
                    </tr>
                   {parts}
                </tbody></table>
            </div>
            {props.error && (
                <div className={clsx(styles.feedback)}>{props.error}</div>
            )}
        </div>
    );
}

export default QAone;