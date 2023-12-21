import clsx from 'clsx';
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from 'react-router-dom'
import Input from "../../components/Input";
import Button from "../../components/Button";
import TextArea from '../../components/TextArea';
import DefaultLayout from '../../layout/DefaultLayout';
import styles from './ParisSurvey.module.scss';
import { postFeedback, getSurvey, postSurvey } from '../../api/feedback';
import QAone from '../../survery/QAone';
import QAtwo from '../../survery/QAtwo';
import QAthree from '../../survery/QAthree';
import QAfour from '../../survery/QAfour';

const ParisSurvey = () => {
    const intialValues = { };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const formRef = useRef(null);
    const [searchParams] = useSearchParams();
    const [surveyList, setSurveyList] = useState();
    const [checkSurveyLoad, setCheckSurveyLoad] = useState(false);
    const [surveryID] = useState(searchParams.get("id"));

    useEffect(() => {
        getSurvey({
            id: surveryID, // '84091 Paris', 
        }).then((info) => {
            // const listSurvey = info.data.data[0].question_ids;
            setSurveyList(info);
            setCheckSurveyLoad(true);
        });
    },[]);
    
    useEffect(()=>{
        document.title = 'NHA KHOA PARIS - KHẢO SÁT KHÁCH HÀNG';
        let link = document.querySelector("link[rel~='icon']");
        link.href = 'https://nhakhoaparis.vn/wp-content/themes/ParisBrand2021/favicon.png';
    },[]);  
    
    // Call API Post Survery
    useEffect(() => {
        // postSurvey({
        //     id: searchParams.get("id"), // '84046', 
        //     state: 'done', 
        //     user_input_line_ids: '[{"skipped":"","question_id":105,"suggested_answer_id":236,"matrix_row_id":0,"answer_type":"simple_choice","value_datetime":"","value_date":"","value_text_box":"","value_numberical_box":"","value_char_box":"","value_comment":""},{"skipped":"","question_id":106,"suggested_answer_id":253,"matrix_row_id":0,"answer_type":"multiple_choice","value_datetime":"","value_date":"","value_text_box":"","value_numberical_box":"","value_char_box":"","value_comment":""},{"skipped":"","question_id":271,"suggested_answer_id":1016,"matrix_row_id":0,"answer_type":"simple_choice","value_datetime":"","value_date":"","value_text_box":"","value_numberical_box":"","value_char_box":"","value_comment":""},{"skipped":"","question_id":269,"suggested_answer_id":0,"matrix_row_id":0,"answer_type":"free_text","value_datetime":"","value_date":"","value_text_box":"fgdfgd","value_numberical_box":"","value_char_box":"","value_comment":""}]', 
        // });
    },[]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormValues({ ...formValues, [name]: value });
    // }

    const getField = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    }
    // const getFieldMatrix = (name, value) => {
    //     setFormValues({ ...formValues, [name]: value });
    // }

    const validate = (values) => {
        const errors = {};
        // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // const regex_phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        // if (!values.staff) {
        //     errors.staff = "Bạn vui lòng nhập đầy đủ đánh giá về các bộ phận!";
        // }
                
        // if (!values.service1) {
        //     errors.service1 = "Bạn vui lòng chọn câu trả lời!";
        // }

        // if (!values.service2) {
        //     errors.service2 = "Bạn vui lòng chọn câu trả lời!";
        // }

        // if (!values.service3) {
        //     errors.service3 = "Bạn vui lòng chọn câu trả lời!";
        // }

        // if (!values.introduce) {
        //     errors.introduce = "Bạn vui lòng chọn câu trả lời!";
        // }

        // if (!values.description) {
        //     errors.description = "Vui lòng nhập nội dung!";
        // }



        // if (!values.phone) {
        //     errors.phone = "Vui lòng nhập số điện thoại!";
        // } else if (!regex_phone.test(values.phone)) {
        //     errors.phone = "Số điện thoại của bạn không đúng!";
        // }

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    // Call API Post Form
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // Hide Form
            // formRef.current.remove();
            let newsarr = [
                {} = formValues.staff[0],
                {} = formValues.staff[1],
                {} = formValues.staff[2],
                {} = formValues.staff[3],
                {} = formValues.staff[4],
                {} = formValues.service1,
                {} = formValues.service2,
                {} = formValues.service3,
                {} = formValues.introduce,
                {} = formValues.description,
            ]
            console.log(newsarr);
            // let data = Object.values(formValues);

            // Call API
            // postFeedback({
            //     name: formValues.name,
            //     phone: formValues.phone,
            //     content: formValues.description,
            //     company_id: searchParams.get("company_id"), //36
            //     type: searchParams.get("type"),
            // });
        }
    }, [formErrors]);

    // console.log(getSurvey({
    //     id: 84091
    // }));    

    return (
        <div className={clsx(styles.background)}>
            <DefaultLayout>
                <div className={clsx(styles.box)}>
                    <div className={clsx(styles.logo)}>
                        <img src={require('../../assets/logo-pr.svg').default} alt="Logo" />
                    </div>
                    <form className={clsx(styles.question)} onSubmit={handleSubmit}>
                        {checkSurveyLoad && surveryID === '84091' && <QAone 
                            survey={surveyList} 
                            question={0}
                            name="staff"
                            value={formValues.staff}
                            onLoad={getField}
                            error={formErrors.staff}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAtwo 
                            survey={surveyList}
                            question={1}
                            name="service1"
                            value={formValues.service1}
                            onLoad={getField}
                            error={formErrors.service1}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAtwo 
                            survey={surveyList} 
                            question={2}  
                            name="service2"
                            value={formValues.service2}
                            onLoad={getField}
                            error={formErrors.service2}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAtwo 
                            survey={surveyList} 
                            question={3}  
                            name="service3"
                            value={formValues.service3}
                            onLoad={getField}
                            error={formErrors.service3}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAthree 
                            survey={surveyList} 
                            question={4}  
                            name="introduce"
                            value={formValues.introduce}
                            onLoad={getField}
                            error={formErrors.introduce}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAfour 
                            survey={surveyList} 
                            question={5}  
                            name="description"
                            value={formValues.description}
                            onLoad={getField}
                            error={formErrors.description}
                        />}
                        <Button btnNK>Gửi kết quả</Button>
                    </form>
                    
                    {/* <div className={clsx(styles.thanks)}>
                        <div className={clsx(styles.thanksTitle)}>Xin chào Quý Khách</div>
                        <div className={clsx(styles.thanksText)}>
                            <p>Cảm ơn Quý khách đã tin chọn trải nghiệm dịch vụ tại <br></br> Thẩm mỹ Bệnh viện Hồng Hà.</p>
                            <p>Mọi góp ý của Quý khách sẽ giúp Thẩm mỹ Bệnh viện Hồng Hà nâng cao chất lượng dịch vụ & phục vụ tốt hơn.</p>
                        </div>
                        <div className={clsx(styles.thanksHotline)}>Hotline: <a href='tel:1900633988'>1900 633 988</a></div>
                    </div> */}
                </div>
            </DefaultLayout>
        </div>
    )
}

export default ParisSurvey;