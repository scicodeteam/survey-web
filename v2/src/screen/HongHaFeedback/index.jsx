import clsx from 'clsx';
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from 'react-router-dom'
import Input from "../../components/Input";
import Button from "../../components/Button";
import TextArea from '../../components/TextArea';
import DefaultLayout from '../../layout/DefaultLayout';
import styles from './HongHaFeedback.module.scss';
import { postFeedback } from '../../api/feedback';
import logo from '../../assets/logo-hh.png';

const HongHaFeedback = () => {
    const intialValues = { description: '', name: '', phone: '' };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const formRef = useRef(null);
    const [searchParams] = useSearchParams()

    useEffect(()=>{
        document.title = 'THẨM MỸ BỆNH VIỆN HỒNG HÀ - PHẢN ÁNH/ GÓP Ý CỦA KHÁCH HÀNG';
        let link = document.querySelector("link[rel~='icon']");
        link.href = 'https://thammythailan.vn/css/lib/favicon.png';
    },[]);   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const validate = (values) => {
        const errors = {};
        // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regex_phone = /((09|03|07|08|05)+([0-9]{8})\b)/g;

        if (!values.description) {
            errors.description = "Vui lòng nhập nội dung!";
        }

        if (!values.name) {
            errors.name = "Vui lòng nhập tên bạn!";
        }

        if (!values.phone) {
            errors.phone = "Vui lòng nhập số điện thoại!";
        } else if (!regex_phone.test(values.phone)) {
            errors.phone = "Số điện thoại của bạn không đúng!";
        }

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // Hide Form
            formRef.current.remove();

            // Call API
            postFeedback({
                name: formValues.name,
                phone: formValues.phone,
                content: formValues.description,
                company_id: searchParams.get("company_id"), //36
                type: searchParams.get("type"),
            });
        }
    }, [formErrors]);

    return (
        <div className={clsx(styles.background)}>
            <DefaultLayout>
                <div className={clsx(styles.box)}>
                    <div className={clsx(styles.logo)}>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div ref={formRef}>
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
                    </div>
                    <div className={clsx(styles.thanks)}>
                        <div className={clsx(styles.thanksTitle)}>Xin chào Quý Khách</div>
                        <div className={clsx(styles.thanksText)}>
                            <p>Cảm ơn Quý khách đã tin chọn trải nghiệm dịch vụ tại <br></br> Thẩm mỹ Bệnh viện Hồng Hà.</p>
                            <p>Mọi góp ý của Quý khách sẽ giúp Thẩm mỹ Bệnh viện Hồng Hà nâng cao chất lượng dịch vụ & phục vụ tốt hơn.</p>
                        </div>
                        <div className={clsx(styles.thanksHotline)}>Hotline: <a href='tel:1900633988'>1900 633 988</a></div>
                    </div>
                </div>
            </DefaultLayout>
        </div>
    )
}

export default HongHaFeedback;