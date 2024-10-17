import clsx from 'clsx';
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from 'react-router-dom'
import Button from "../../components/Button";
import DefaultLayout from '../../layout/DefaultLayout';
import styles from './KnSurvey.module.scss';
import { getSurvey, postSurvey } from '../../api/feedback';

// Câu 1: Dịch vụ 
import QAfive_1_0_1 from '../../survery/QAfive_1_0_1';

// Câu 2: Nhân viên
import QAnine_1_1_0 from '../../survery/QAnine_1_1_0';

// Câu 3: Giới thiệu
import QAthree_1_0_1 from '../../survery/QAthree_1_0_1';

// Câu 4: Góp ý
import QAfour from '../../survery/QAfour';

// Thêm file media
import logo from '../../assets/logoKN.png';

const KnSurvey = () => {
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
    const [staff, setStaff] = useState();
    const [service, setService] = useState();
    const [introduce, setIntroduce] = useState();
    const [freetext, setFreetext] = useState();
    const [brand, setBrand] = useState();
    // console.log(surveyList.data.data[0].question_ids);

    // Lấy danh sách khảo sát về dịch vụ
    // console.log('Cau hoi dich vu', service);

    const getService = (survey, sequence) => {
        const question = survey.question_ids.filter((q)=>{
         return (q.col_nb === "12" && q.sequence === sequence && q.question_type === "simple_choice");
        })
        setService(question);
    }
    
    // Lấy danh sách khảo sát nhân viên
    // console.log('Khảo sát nhân viên', staff);

    const getStaff = (survey, sequence) => {
        // Lấy câu hỏi nhân viên
        const question = survey.question_ids.filter((q)=>{
            return (q.sequence === sequence && q.question_type === "multiple_choice");
        })

        // Lấy id câu hỏi
        const idStaff = question[0].id

        // Lấy danh sách câu trả lời chính
        const mainAnswer = question[0].answer

        // Lấy Kết quả chuyên môn
        const anserService = question[0].answer.filter((q)=>{
            return (q.value === 'Kết quả chuyên môn')
        })

        // Lấy danh sách trả lời bên ngoài
        const answer = survey.question_ids.filter((q)=>{
            return (q.triggering_question_id === idStaff && q.question_type === "multiple_choice");
        })


        // console.log(answer);
        
        // Loop danh sách câu trả lời chính
        for(let i = 0; i < mainAnswer.length; i++){
            // Kiểm tra nếu không có nội dung
            if(mainAnswer[i].list_service.length === 0 ){
                // Lấy id câu hỏi
                let id = mainAnswer[i].id;
                // lọc câu trả lời theo id câu hỏi
                let list_service = answer.filter((q) => {
                    return q.triggering_answer_ids[0].id === id
                });
                mainAnswer[i].list_service = [...list_service[0].answer];
                // console.log(list_service[0].answer);
                // console.log(mainAnswer);
                
                
            }
        }
        
        // console.log(question);
        // console.log(answer);
        
        setStaff(question);
    }

    // Giới thiệu bạn bè
    // console.log('Giới thiệu bạn bè', introduce);

    const getIntroduce = (survey) => {
        const question = survey.question_ids.filter((q)=>{
            if(q.col_nb == "10" && q.sequence === 17 && q.question_type === "simple_choice") {
                return q;
            }
        })
        setIntroduce(question);
    }

    // Câu hỏi của khách hàng
    // console.log('Câu hỏi của khách hàng', freetext);

    const getFreetext = (survey) => {
        const question = survey.question_ids.filter((q)=>{
         return (q.question_type === "free_text");
        })
        setFreetext(question);
    }
    
    // console.log(formValues);
    // Gọi API gán vào State surveryList
    useEffect(() => {
        getSurvey({
            id: surveryID, 
        }).then((info) => {
            setSurveyList(info);
            setCheckSurveyLoad(true);
            getStaff(info.data.data[0], 11);
            getService(info.data.data[0], 10);
            getIntroduce(info.data.data[0]);
            getFreetext(info.data.data[0]);
        });
    },[]);

    // console.log(surveyList);

    
    // Khai báo title / favicon
    useEffect(()=>{
        document.title = 'KHẢO SÁT KHÁCH HÀNG - BÊNH VIỆN THẨM MÝ KANGNAM';
        let link = document.querySelector("link[rel~='icon']");
        link.href = 'https://benhvienthammykangnam.com.vn/css/lib/kn_favicon.ico';
    },[]); 

    // Bắt đầu chạy chương trình
    const handleStart = () => {
        try {
            if(surveyList.data.data[0].brand_code === "KN"){
                setBrand('KN');
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
    // console.log(formValues);

    const validate = (values) => {
        const errors = {};

        !staff && !values.staff && (errors.staff = "Bạn vui lòng đánh giá về các bộ phận!");

        service && !values.service && (errors.service = "Bạn vui lòng chọn câu trả lời!");

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
            formValues.service && newsarr.push(formValues.service);

            // formValues.staff && formValues.staff.map((item)=> {
            //     newsarr.push(item);
            // });

            // Kiểm tra trạng thái trả lời 
            if(formValues.staff){
                if (formValues.staff.length > 0) {
                    formValues.staff.map((item)=> {
                        newsarr.push(item);
                    });
                } else {
                    newsarr.push(formValues.staff);
                }
            }

            formValues.introduce && newsarr.push(formValues.introduce);

            formValues.freetext && newsarr.push(formValues.freetext);

            // Sent API
            postSurvey({
                id: searchParams.get("id"), //84091 
                state: 'done', 
                user_input_line_ids: newsarr, 
            });
            console.log(newsarr);
        }
    }, [formErrors]);

    
    return (
        <div className={clsx(styles.background)}>
            <DefaultLayout>
                <div className={clsx(styles.box)}>
                    <div className={clsx(styles.logo)}>
                        <img src={logo} alt="Logo" />
                    </div>

                    {/* Bắt đầu khảo sát */}
                    <div ref={introRef} className={styles.intro}>
                        <p className={styles.introContent}>
                            Kangnam trân trọng cảm ơn quý khách hàng <br/> đã đồng hành cùng chúng tôi trong suốt thời gian qua
                        </p>
                        <Button handleClick={handleStart} btnKN> Bắt đầu khảo sát </Button>
                    </div>

                    {/* Form khảo sát */}
                    {start && (
                        <form ref={formRef} className={clsx(styles.question)} onSubmit={handleSubmit}>
                        
                            {checkSurveyLoad && service.map((item, idx) => (
                                <QAfive_1_0_1
                                    key={idx}
                                    survey={item}                                     
                                    name="service"
                                    value={formValues.service}
                                    onLoad={getField}
                                    error={formErrors.service}
                                    brand={brand}
                                />
                            ))}
                            {checkSurveyLoad && staff &&  staff.map((item, idx) => (
                                <QAnine_1_1_0 
                                    key={idx}
                                    survey={item} 
                                    name="staff"
                                    value={formValues.staff}
                                    onLoad={getField}
                                    error={formErrors.staff}
                                    brand={brand}
                                />
                            ))}
                            
                            {checkSurveyLoad && introduce.map((item, idx) => (
                                <QAthree_1_0_1 
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
                                    name="freetext"
                                    value={formValues.freetext}
                                    onLoad={getField}
                                    error={formErrors.freetext}
                                    brand={brand}
                                />
                            ))}
                            <Button btnKN>Gửi kết quả</Button>
                        </form>
                    )}
                    
                    {/* Cảm ơn đã gửi Form */}
                    {Object.keys(formErrors).length === 0 && isSubmit && (
                        <div className={clsx(styles.thanks)}>
                            <div className={clsx(styles.thanksText)}>
                                <p>Bệnh viện Hồng Hà chân thành cảm ơn sự góp ý/ phản hồi của Quý khách hàng</p>
                                <p>Sự góp ý/ phản hồi của Quý khách hàng sẽ giúp chúng tôi cải thiện chất lượng dịch vụ, phục vụ, nâng cao trải nghiệm khách hàng.</p>
                                <p>Trân trọng !</p>
                            </div>
                            <div className={clsx(styles.thanksHotline)}>Hotline: <a href='tel:1900633988'>1900.633.988</a></div>
                        </div>
                    )}

                </div>
            </DefaultLayout>
        </div>
    )
}

export default KnSurvey;