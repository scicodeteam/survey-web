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
    const intialValues = { description: '', introduce: '', service1: '', service2: '', service3: '', staff: ''};
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const staffData = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    }

    const validate = (values) => {
        const errors = {};
        // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // const regex_phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (!values.staff) {
            errors.staff = "Vui lòng nhập nội dung!";
        }
        // if (!values.description) {
        //     errors.description = "Vui lòng nhập nội dung!";
        // }
        // if (!values.introduce) {
        //     errors.introduce = "Vui lòng nhập nội dung!";
        // }
        // if (!values.service1) {
        //     errors.service1 = "Vui lòng nhập nội dung!";
        // }
        // if (!values.service2) {
        //     errors.service2 = "Vui lòng nhập nội dung!";
        // }
        // if (!values.service3) {
        //     errors.service3 = "Vui lòng nhập nội dung!";
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

    // Call API
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // Hide Form
            // formRef.current.remove();
            console.log(formValues);
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
                            onChange={handleChange}
                            onLoad={staffData}
                            error={formErrors.staff}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAtwo 
                            survey={surveyList}
                            question={1}
                            name="service1"
                            value={formValues.service1}
                            onChange={handleChange}
                            error={formErrors.service1}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAtwo 
                            survey={surveyList} 
                            question={2}  
                            name="service2"
                            value={formValues.service2}
                            onChange={handleChange}
                            error={formErrors.service2}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAtwo 
                            survey={surveyList} 
                            question={3}  
                            name="service3"
                            value={formValues.service3}
                            onChange={handleChange}
                            error={formErrors.service3}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAthree 
                            survey={surveyList} 
                            question={4}  
                            name="introduce"
                            value={formValues.introduce}
                            onChange={handleChange}
                            error={formErrors.introduce}
                        />}
                        {checkSurveyLoad && surveryID === '84091' && <QAfour 
                            survey={surveyList} 
                            question={5}  
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            error={formErrors.description}
                        />}
                        <Button btnNK>Gửi kết quả</Button>
                    </form>
                    
                    {/* <div ref={formRef}>
                        <div className={clsx(styles.title)}>Phản ánh/ Góp ý của khách hàng</div>
                        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
                            <TextArea
                                style1
                                name="description"
                                placeholder="Nội dung phản ánh:"
                                value={formValues.description}
                                onChange={handleChange}
                                error={formErrors.description}
                            />
                            <Input
                                style1
                                name="name"
                                placeholder="Họ và tên:"
                                value={formValues.name}
                                onChange={handleChange}
                                error={formErrors.name}
                            />
                            <Input
                                style1
                                name="phone"
                                placeholder="Số điện thoại:"
                                value={formValues.phone}
                                onChange={handleChange}
                                error={formErrors.phone}
                            />

                            <Button style1>Gửi phản ánh</Button>
                        </form>
                    </div> */}

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