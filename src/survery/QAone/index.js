import clsx from 'clsx';
import styles from './QAone.module.scss';
import { useEffect, useState } from 'react';

const QAone = (props) => {
    const [survey] = useState(props.survey.data.data[0].question_ids[0]);
    const [answers] = useState(survey.answer);
    const [rows] = useState(survey.row);
    const [formValues, setFormValues] = useState([]);
    const [matrixRowIds, setMatrixRowIds] = useState([]);
    const [suggestedAnswerId, setSuggestedAnswerId] = useState()
 
    const handleChange = (e) => {
        let data = e.target;
        const matrix_row_id = data.getAttribute('matrix_row_id');
        // const suggested_answer_id = data.getAttribute('suggested_answer_id');
        setSuggestedAnswerId(data.getAttribute('suggested_answer_id'))
        data = {
            "skipped": "false",
            "question_id":  data.getAttribute('question_id'),
            "suggested_answer_id": data.getAttribute('suggested_answer_id'),
            "matrix_row_id":  data.getAttribute('matrix_row_id'),
            "answer_type": "simple_choice",
            "value_datetime": "",
            "value_date": "",
            "value_text_box": "",
            "value_numberical_box": "",
            "value_char_box": "",
            "value_comment": ""
        };   
        
     
        // Nếu khác matrix_row_id thì thêm mới
        if (!matrixRowIds.includes(matrix_row_id)){
            setMatrixRowIds([...matrixRowIds, matrix_row_id]);
            setFormValues([...formValues, data]);
        } else {
            formValues.map((item) => {
                if(item.matrix_row_id === matrix_row_id){
                    item.suggested_answer_id = suggestedAnswerId;
                    setFormValues(formValues); 
                }
            })
        }
    }

    // Gửi data ra Component Cha
    useEffect(() => {
        if (formValues.length == 5){
            props.onLoad('staff', formValues);
        }
    }, [suggestedAnswerId, matrixRowIds, formValues]);
    

    // Header Status
    const status = answers.map((item) => {
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

    const parts = rows.map((row, idx) => {
        return (
            <tr key={idx}>
                <td className={clsx(styles.name)}>{row.value}</td>
                {
                    answers.map((answer, idx2) => {
                        return (
                            <td key={idx2}>
                                <label>
                                    <input 
                                        type="radio"                            
                                        onClick={handleChange} 
                                        question_id = {answer.question_id}
                                        matrix_row_id = {row.id}
                                        suggested_answer_id = {answer.id}
                                        name = {'suggested_answer_id_' + row.id} 
                                    />
                                    <span></span>
                                </label>
                            </td>
                        )
                    }) 
                }
            </tr>
        )
    });
    


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