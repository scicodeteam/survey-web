import clsx from 'clsx';
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from 'react-router-dom'
import Button from "../../components/Button";
import DefaultLayout from '../../layout/DefaultLayout';
import styles from './ParisSurvey.module.scss';
import { getSurvey, postSurvey } from '../../api/feedback';
import QAone from '../../survery/QAone';
import QAtwo from '../../survery/QAtwo';
import QAthree from '../../survery/QAthree';
import QAfour from '../../survery/QAfour';

const ParisSurvey = () => {
    const intialValues = { };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [searchParams] = useSearchParams();
    const [surveyList, setSurveyList] = useState();
    const [checkSurveyLoad, setCheckSurveyLoad] = useState(false);
    const [surveryID] = useState(searchParams.get("id"));
    const [start, setStart] = useState(false);
    const introRef = useRef(null);
    const formRef = useRef(null);
    const [matrix, setMatrix] = useState();
    const [service, setService] = useState();
    const [introduce, setIntroduce] = useState();
    const [freetext, setFreetext] = useState();
    let valueCheck, errorCheck;
    
    // console.log(surveyList.data.data[0].question_ids);
    
    const getMatrix = (survey) => {
        const question = survey.question_ids.filter((q)=>{
         return q.question_type == "matrix";
        })
        setMatrix(question);
    }
    
    const getService = (survey) => {
        const question = survey.question_ids.filter((q)=>{
         return (q.col_nb == "12" && q.question_type == "simple_choice");
        })
        setService(question);
    }

    const getIntroduce = (survey) => {
        const question = survey.question_ids.filter((q)=>{
         return (q.col_nb == "10" && q.question_type == "simple_choice");
        })
        setIntroduce(question);
    }

    const getFreetext = (survey) => {
        const question = survey.question_ids.filter((q)=>{
         return (q.question_type == "free_text");
        })
        setFreetext(question);
    }
    
    // Gọi API gán vào State surveryList
    useEffect(() => {
        getSurvey({
            id: surveryID, // '84091, 84095 Paris', 
        }).then((info) => {
            // Kiểm tra bộ câu hỏi
            if(info.data.message){
                setSurveyList(info);
                setCheckSurveyLoad(true);
                getMatrix(info.data.data[0]);
                getService(info.data.data[0]);
                getIntroduce(info.data.data[0]);
                getFreetext(info.data.data[0]);
            }
        });
    },[]);
    
    // Khai báo title / favicon
    useEffect(()=>{
        document.title = 'NHA KHOA PARIS - KHẢO SÁT KHÁCH HÀNG';
        let link = document.querySelector("link[rel~='icon']");
        link.href = 'https://nhakhoaparis.vn/wp-content/themes/ParisBrand2021/favicon.png';
    },[]);  

    // Bắt đầu chạy chương trình
    const handleStart = () => {
        try {
            if(surveyList.data.data[0].brand_code === "PR"){
                introRef.current.remove();
                setStart(true);
            }
        } catch (error) {
            // console.log(error.message);
            alert('Bộ câu hỏi không đúng')
        } 
    }
    
    // Nhận Data từ các câu hỏi đổ về formValues
    const getField = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    }

    const validate = (values) => {
        const errors = {};
        // const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // const regexPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        // if (!values.phone) {
        //     errors.phone = "Vui lòng nhập số điện thoại!";
        // } else if (!regex_phone.test(values.phone)) {
        //     errors.phone = "Số điện thoại của bạn không đúng!";
        // }

        matrix && !values.staff && (errors.staff = "Bạn vui lòng nhập đầy đủ đánh giá về các bộ phận!");

        service && service.forEach((item, idx) => {
            idx == 0 && !values.service0 && (errors.service0 = "Bạn vui lòng chọn câu trả lời!");
            idx == 1 && !values.service1 && (errors.service1 = "Bạn vui lòng chọn câu trả lời!");
            idx == 2 && !values.service2 && (errors.service2 = "Bạn vui lòng chọn câu trả lời!");
            idx == 3 && !values.service3 && (errors.service3 = "Bạn vui lòng chọn câu trả lời!");
            idx == 4 && !values.service4 && (errors.service4 = "Bạn vui lòng chọn câu trả lời!");
            idx == 5 && !values.service5 && (errors.service5 = "Bạn vui lòng chọn câu trả lời!");
            idx == 6 && !values.service6 && (errors.service6 = "Bạn vui lòng chọn câu trả lời!");
            idx == 7 && !values.service7 && (errors.service7 = "Bạn vui lòng chọn câu trả lời!");
            idx == 8 && !values.service8 && (errors.service8 = "Bạn vui lòng chọn câu trả lời!");
            idx == 9 && !values.service9 && (errors.service9 = "Bạn vui lòng chọn câu trả lời!");
        })

        introduce && !values.introduce && (errors.introduce = "Bạn vui lòng chọn câu trả lời!");

        freetext && !values.freetext && (errors.freetext = "Bạn vui lòng chọn câu trả lời!");

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    // Call API Post Survery
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // Hide Form
            formRef.current.remove();
            let newsarr = [];
            
            //Convert user_input_line_ids API 
            formValues.staff && formValues.staff.map((item, idx)=> {
                newsarr.push(item);
            });

            service && service.map((item, idx)=> {
                newsarr.push(formValues['service' + idx]);
            });
            
            formValues.introduce && newsarr.push(formValues.introduce);
            formValues.freetext && newsarr.push(formValues.freetext);
            
            console.log({
                id: searchParams.get("id"), //84091 
                state: 'done', 
                user_input_line_ids: newsarr, 
            });

            // Call API
            postSurvey({
                id: searchParams.get("id"), //84091 
                state: 'done', 
                user_input_line_ids: newsarr, 
            });
        }
    }, [formErrors]);

    // console.log(surveyList);
    return (
        <div className={clsx(styles.background)}>
            <DefaultLayout>
                <div className={clsx(styles.box)}>
                    <div className={clsx(styles.logo)}>
                        <img src={require('../../assets/logo-pr.svg').default} alt="Logo" />
                    </div>

                    {/* Bắt đầu khảo sát */}
                    <div ref={introRef} className={styles.intro}>
                        <p className={styles.introContent}>
                            Nha khoa Paris trân trọng cảm ơn quý khách hàng <br />
                            đã đồng hành cùng chúng tôi trong suốt thời gian qua
                        </p>
                        <Button handleClick={handleStart} btnNK> Bắt đầu khảo sát </Button>
                    </div>

                    {/* Form khảo sát */}
                    {start && (
                        <form ref={formRef} className={clsx(styles.question)} onSubmit={handleSubmit}>
                        
                            {checkSurveyLoad && matrix && matrix.map((item, idx) => (
                                <QAone 
                                    key={idx}
                                    survey={item} 
                                    // question={0}
                                    name="staff"
                                    value={formValues.staff}
                                    onLoad={getField}
                                    error={formErrors.staff}
                                />
                            ))}
                            {checkSurveyLoad && service.map((item, idx) => {
                                idx === 0 && (valueCheck = formValues.service0); 
                                idx === 1 && (valueCheck = formValues.service1); 
                                idx === 2 && (valueCheck = formValues.service2);
                                idx === 3 && (valueCheck = formValues.service3);
                                idx === 4 && (valueCheck = formValues.service4);
                                idx === 5 && (valueCheck = formValues.service5);
                                idx === 6 && (valueCheck = formValues.service6);
                                idx === 7 && (valueCheck = formValues.service7);
                                idx === 8 && (valueCheck = formValues.service8);
                                idx === 9 && (valueCheck = formValues.service9);

                                idx === 0 && (errorCheck = formErrors.service0); 
                                idx === 1 && (errorCheck = formErrors.service1); 
                                idx === 2 && (errorCheck = formErrors.service2);
                                idx === 3 && (errorCheck = formErrors.service3);
                                idx === 4 && (errorCheck = formErrors.service4);
                                idx === 5 && (errorCheck = formErrors.service5);
                                idx === 6 && (errorCheck = formErrors.service6);
                                idx === 7 && (errorCheck = formErrors.service7);
                                idx === 8 && (errorCheck = formErrors.service8);
                                idx === 9 && (errorCheck = formErrors.service9);
                                return (
                                    <QAtwo 
                                        key={idx}
                                        survey={item}
                                        question={idx}
                                        name={"service" + idx}
                                        value={valueCheck}
                                        onLoad={getField}
                                        error={errorCheck}
                                    />
                                )
                            })}
                            {checkSurveyLoad && introduce.map((item, idx) => (
                                <QAthree 
                                    key={idx}
                                    survey={item} 
                                    // question={4}  
                                    name="introduce"
                                    value={formValues.introduce}
                                    onLoad={getField}
                                    error={formErrors.introduce}
                                />
                            ))}
                            {checkSurveyLoad && freetext.map((item, idx) => (
                                <QAfour 
                                    key={idx}
                                    survey={item} 
                                    // question={5}  
                                    name="freetext"
                                    value={formValues.freetext}
                                    onLoad={getField}
                                    error={formErrors.freetext}
                                />
                            ))}
                            {/* {checkSurveyLoad && matrix && <QAone 
                                survey={matrix} 
                                question={0}
                                name="staff"
                                value={formValues.staff}
                                onLoad={getField}
                                error={formErrors.staff}
                            />} */}
                            {/* {checkSurveyLoad && <QAtwo 
                                survey={surveyList} 
                                question={2}  
                                name="service2"
                                value={formValues.service2}
                                onLoad={getField}
                                error={formErrors.service2}
                            />}
                            {checkSurveyLoad && <QAtwo 
                                survey={surveyList} 
                                question={3}  
                                name="service3"
                                value={formValues.service3}
                                onLoad={getField}
                                error={formErrors.service3}
                            />}
                            {checkSurveyLoad && <QAthree 
                                survey={surveyList} 
                                question={4}  
                                name="introduce"
                                value={formValues.introduce}
                                onLoad={getField}
                                error={formErrors.introduce}
                            />}
                            {checkSurveyLoad && <QAfour 
                                survey={surveyList} 
                                question={5}  
                                name="description"
                                value={formValues.description}
                                onLoad={getField}
                                error={formErrors.description}
                            />} */}
                            <Button btnNK>Gửi kết quả</Button>
                        </form>
                    )}
                    
                    {/* Cảm ơn đã gửi Form */}
                    {Object.keys(formErrors).length === 0 && isSubmit && (
                        <div className={clsx(styles.thanks)}>
                            <div className={clsx(styles.thanksText)}>
                                <p>Nha khoa Paris chân thành cảm ơn sự góp ý/ phản hồi của Quý khách hàng</p>
                                <p>Sự góp ý/ phản hồi của Quý khách hàng sẽ giúp chúng tôi cải thiện chất lượng dịch vụ, phục vụ, nâng cao trải nghiệm khách hàng.</p>
                                <p>Trân trọng !</p>
                            </div>
                            <div className={clsx(styles.thanksHotline)}>Hotline: <a href='tel:19006900'>1900.6900</a></div>
                        </div>
                    )}

                </div>
            </DefaultLayout>
        </div>
    )
}

export default ParisSurvey;