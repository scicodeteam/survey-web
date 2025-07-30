import { useState, useEffect } from "react";
import styles from './CheckBoxList.module.scss';

const CheckBoxList = (props) => {
    const { survey } = props;
    // console.log(survey.answer);
    
    // Danh sách các câu chính và câu con
    const questions_1 = [];

    // Chuyển đổi cấu trúc API
    survey && survey.answer.forEach((item, index) => {
        let count = index + 1;
        
        // Lấy câu hỏi cha [subs]
        const subs = () => {
            let stt;
            let output = item.list_service.map((sub,i) => {
                stt = i + 1;
                return `cau${count}_${stt}`;
            })

            // Thêm câu comment
            if(item.value === 'Khác'){
                output.push(`cau${count}_${stt+1}`);
            }
            return output;
        }

        // Kiểm tra API câu hỏi
        // console.log(item);
        
        // Lấy câu trả lời subs_data
        const subs_data = () => {
            let output = item.list_service.map((sub, index) => ({
                // Kiểm tra trường hợp Kết quả dịch vụ
                name: (sub.name ? sub.name : sub.value),
                // question_id: 461,
                // suggested_answer_id:1841
                // Lấy question_id
                question_id: item.list_service[index].question_id ? item.list_service[index].question_id : item.question_id, 

                // Nếu không là dịch vụ lấy suggested_answer_id là id của list_service
                suggested_answer_id:(!sub.name ? item.list_service[index].id : item.id),

                // Nếu là dịch vụ thì lấy id cho vào list_service
                list_service: (sub.name ? sub.id : '')
            }))

            // Thêm object đặc tả comment
            if(item.value === 'Khác'){
                output.push({
                    name:'Ý kiến khác...',
                    question_id: item.question_id, 
                    suggested_answer_id:item.id, 
                    comments_allowed: true
                });
            }
            return output;
        }

        // Lấy dữ liệu câu hỏi cha & con
        questions_1.push({
            main: 'cau' + count,
            value: item.value,
            parents: true,
            subs: subs(),
            subs_data: subs_data()
        })
    });

    // Kiểm tra danh sách câu hỏi và câu trả lời lấy từ api
    // console.log(questions_1);
    
    const questions = questions_1;

    // const questions = [
    //     { 
    //         main: "cau1", value: 'Câu 1', parents: true,
    //         subs: ["cau1_1", "cau1_2", "cau1_3", "cau1_4"], 
    //         subs_data: [{name:'Câu 1.1'}, {name:'Câu 1.2'},{name:'Câu 1.3'},{name:'Câu 1.4'},] 
    //     },
    //     { 
    //         main: "cau2", value: 'Câu 2', parents: true, 
    //         subs: ["cau2_1", "cau2_2"], 
    //         subs_data: [{name:'Câu 2.1'}, {name:'Câu 2.2'}]},
    //     { 
    //         main: "cau3", value: 'Câu 3', parents: true, 
    //         subs: ["cau3_1"], 
    //         subs_data: [{name:'Câu 3.1'}] },
    //     { 
    //         main: "cau4", value: 'Câu 4', parents: true, 
    //         subs: ["cau4_1", "cau4_2", "cau4_3", "cau4_4", "cau4_5"], 
    //         subs_data: [
    //             {name:'Câu 4.1', question_id: 461, suggested_answer_id:1841}, 
    //             {name:'Câu 4.2', question_id: 461, suggested_answer_id:1842},
    //             {name:'Câu 4.3', question_id: 461, suggested_answer_id:1843},
    //             {name:'Câu 4.4', question_id: 461, suggested_answer_id:1844},
    //             {name:'Câu 4.5', question_id: 461, suggested_answer_id:1845},
    //         ] 
    //     },
    //     { 
    //         main: "cau5", value: 'Câu 5', parents: true, 
    //         subs: ["cau5_1", "cau5_2", "cau5_3"], 
    //         subs_data: [
    //             {name:'Câu 5.1', question_id: 463, suggested_answer_id:1864}, 
    //             {name:'Câu 5.2', question_id: 463, suggested_answer_id:1865},
    //             {name:'Câu 5.3', question_id: 463, suggested_answer_id:1866}
    //         ]
    //     },
    //     { 
    //         main: "cau6", value: 'Câu 6', parents: true, 
    //         subs: ["cau6_1", "cau6_2", "cau6_3"], 
    //         subs_data: [
    //             {name:'Câu 6.1', question_id: 462, suggested_answer_id:1860}, 
    //             {name:'Câu 6.2', question_id: 462, suggested_answer_id:1861},
    //             {name:'Ý kiến khác...', comments_allowed:true, question_id: 456, suggested_answer_id:462}
    //         ]
    //     },
    // ];

    // Khai báo trạng thái cho từng câu trả lời
    const [checkedItems, setCheckedItems] = useState(
        questions.reduce((acc, question) => {
            acc[question.main] = false;
            
            question.subs.forEach(sub => acc[sub] = { check: false, show: true });
            // console.log(acc);
            return acc;
        }, {})
    );

    // console.log(checkedItems);
  
  // Reset các câu con khi câu chính không được check
    const resetSubOptions = (mainOption) => {
        // Hiển thị các câu trả lời khi câu hỏi được chọn
        const resetOptions = (prefix, count) => {
            const options = {};
            for (let i = 1; i <= count; i++) {
                options[`${prefix}${i}`] = { check: false, show: true };
            }
            return options;
        };
    
        // Update lại trang thái hiển thị của câu trả lời
        const updateOptions = (prefix, count) => {
            const options = {};
            for (let i = 1; i <= count; i++) {
                options[`${prefix}${i}`] = { check: checkedItems[`${prefix}${i}`].check, show: checkedItems[`${prefix}${i}`].check };
            }
            return options;
        };

        // const mainCount = questions.length; // Số lượng câu chính
        const result = {};
          
        // Khi click vào câu hỏi các câu trả lời của nó được hiển thị, các câu trả lời của câu khác sẽ bị ẩn nếu không được checked
        questions.forEach((question, index) => {
            const prefix = `cau${index + 1}_`;
            const count = question.subs.length;
          
            if (question.main === mainOption) {
                Object.assign(result, resetOptions(prefix, count));
            } else {
                Object.assign(result, updateOptions(prefix, count));
            }
        });
        return result;
    };

    // Thay đổi trạng thái check các câu Cha
    const handleChange = (event) => {
        const { name, checked } = event.target;

        // Update trạng thái câu hỏi được checked
        setCheckedItems((prevState) => {
            const newState = { ...prevState, [name]: checked };

            // Kiểm tra câu hỏi chính được click
            if (checked && questions.some(q => q.main === name)) {

                // Trả về điều kiện hiển thị
                const updatedState = { ...newState, ...resetSubOptions(name) };
                // console.log(newState);

                // Kiểm tra các câu chính khác
                questions.forEach(question => {
                    if (question.main !== name) {
                        
                        const allSubsUnchecked = question.subs.every(sub => !updatedState[sub].check);
                        if (allSubsUnchecked) {
                            updatedState[question.main] = false;
                        }
                    }
                });
                return updatedState;
            }

            return newState;
        });
    };

    // Thay đổi trạng thái check các câu con
    const handleChangeItem = (event) => {
        const { name, checked } = event.target;
        
        // Update trang thái câu trả lời được checked
        setCheckedItems((prevState) => {
            const newState = { ...prevState, [name]: { check: checked, show: true } };

            // Kiểm tra nếu tất cả các câu con đều là false thì câu cha cũng là false
            questions.forEach(question => {
                if (question.subs.includes(name)) {
                    const allSubsUnchecked = question.subs.every(sub => !newState[sub].check);
                    if (allSubsUnchecked) {
                        newState[question.main] = false;
                    }
                }
            });
            
            return newState;
        })
    };

  return (
    <div className={styles.question}>
      {questions.map((question, index) => (
        <div className={styles.item} key={question.main}>
          <Input 
            name={question.main} 
            title={question.value}
            parents={question.parents}
            question_id={question.question_id}
            suggested_answer_id={question.suggested_answer_id}
            subs_data={question.subs_data}
            checked={checkedItems[question.main]} 
            handleChange={handleChange}
            show={true}
            onClick={props.onClick}
            handleDeleteItem={props.handleDeleteItem}
            handleDeleteItems={props.handleDeleteItems}
          />
          {checkedItems[question.main] && (
            <div style={{ paddingLeft: '29px' }}>
                {question.subs.map((sub, index) => (
                    <Input
                        key={sub}
                        name={sub}
                        title={question.subs_data[index].name}
                        comments_allowed={question.subs_data[index].comments_allowed}
                        question_id={question.subs_data[index].question_id}
                        suggested_answer_id={question.subs_data[index].suggested_answer_id}
                        list_service={question.subs_data[index].list_service}
                        checked={checkedItems[sub].check}
                        handleChange={handleChangeItem}
                        show={checkedItems[sub].show}
                        onClick={props.onClick}
                    />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const Input = (props) => {
    // Khai báo State lưu trữ dữ liệu người dùng nhập vào Input
    const [inputValues, setInputValues] = useState("");

      // Update inputValues khi sự thay đổi của người dùng
    const handleInputChange = (event) => {
        setInputValues(event.target.value);
    };

    const handleClick = () => {
        // Kiểm tra nếu là câu hỏi và được check
        if(props.parents && props.checked){
            //suggested_answer_id
            // let ids = [1860, 1861];
            // let ids = [1864, 1865, 1866]

            // Lấy danh sách suggested_answer_id các câu con
            let ids = props.subs_data.map((sub,i) => {
                return sub.suggested_answer_id;
            })
            // console.log(ids);
            
            // Xóa danh sách sản phẩm
            props.handleDeleteItems(ids);
          
        } 
        // Gửi dữ liệu mỗi khi Input được check
        // inputValues, question_id, suggested_answer_id, nameInput, props.noIdead, props.checked
        props.onClick(inputValues, props.question_id, props.suggested_answer_id, props.comments_allowed, props.checked, props.list_service, props.name)
    }
    
    // Gưi dữ liệu khi gõ text trong comment
    useEffect(() => {
        inputValues !== '' && props.onClick(inputValues, props.question_id, props.suggested_answer_id);
    }, [inputValues]);
    
    return (
        <div>
            <label style={{ display: props.show ? 'block' : 'none' }}>
                {
                    !props.comments_allowed && (<>
                        <input 
                            type="checkbox"         
                            name={props.name}
                            checked={props.checked}
                            onChange={props.handleChange}
                            onClick={handleClick}
                            
                        /> 
                        <span>{props.title}</span>
                    </>)               
                }
                {
                    props.comments_allowed && (<>
                        <input 
                            type="checkbox"         
                            name={props.name}
                            checked={props.checked}
                            onChange={props.handleChange}
                            onClick={handleClick}
                        /> 
                        <span>{props.title}</span>

                        {props.checked && <textarea 
                            placeholder="Nhập nội dung..." 
                            value={inputValues}
                            onChange={handleInputChange}
                        />}
                    </>)
                }
                
            </label>
        </div>
    )
}

export default CheckBoxList;