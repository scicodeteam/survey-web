import clsx from 'clsx';
import styles from './QAnine.module.scss';
import { useEffect, useState } from 'react';

const QAnine = (props) => {
  const [survey] = useState(props.survey);
  const [answer] = useState(survey.answer);
  // const [nameInput, setNameInput] = useState();
  const [products, setProducts] = useState([]);

  // Xử lý UI
  const handleChange = (message, question_id, suggested_answer_id, nameInput, noIdead, checked) => {
    let data;
    let check = false;

    data = {
      "skipped": "",
      "question_id": question_id,
      "suggested_answer_id": suggested_answer_id,
      "matrix_row_id": 0,
      "answer_type": "simple_choice",
      "value_datetime": "",
      "value_date": "",
      "value_text_box": "",
      "value_numberical_box": "",
      "value_char_box": "",
      "value_comment": message ? message : '',
    };
    // setNameInput(nameInput);

    if (!noIdead) {

      // Check Product Update
      if (products.length > 0) {
        products.forEach((product) => {
          if (product.suggested_answer_id === suggested_answer_id) {
            handleUpdateItem(data);
            check = false;
          } else {
            check = true;
          }
        })
      }
      // console.log(check);

      if (products.length === 0) {
        handleAddItem(data)
      }

      if (products.length > 0 && check === true) {
        handleAddItem(data)
      }
      // console.log(checked);
      if (products.length > 0 && checked === true) {
        handleDeleteItem(suggested_answer_id)
      }
    } else {
      // Nếu click No Anser gửi data
      props.onLoad('staff', data);
    }
  }

  // Add Data
  const handleAddItem = (item) => {
    setProducts((prevProducts) => {
      return [...prevProducts, item];
    });
  };

  // Update Product
  const handleUpdateItem = (productUpdate) => {
    setProducts(
      products.map((product) =>
        product.suggested_answer_id === productUpdate.suggested_answer_id ? productUpdate : product
      )
    );
  };

  // Delete Data
  const handleDeleteItem = (id) => {
    setProducts(() => {
      return products.filter((item) => {
        return item.suggested_answer_id !== id;
      });
    });
  };

  // Gửi data ra Component Cha
  useEffect(() => {
    if (products.length !== 0) {
      props.onLoad('staff', products);
    }
  }, [products]);

  return (
    <div className={clsx(styles.section)}>
      <div className={clsx(styles.title)}>
        {props.brand !== 'HH' && 'Câu'} {survey.title}
      </div>

      <div className={clsx(styles.question)}>
        <App
          answer={answer}
          onClick={handleChange}
        />
      </div>
      {props.error && (
        <div className={clsx(styles.feedback)}>{props.error}</div>
      )}
    </div>
  );
}

// Build Component App
const App = (props) => {
  const [reset, setReset] = useState(false);
  const { answer } = props;

  const handleCheckReset = (checked) => {
    checked ? setReset(true) : setReset(false);
  };

  const handleRemoveReset = () => {
    setReset(false);
  };

  return (
    <>
      {answer.map((item, index) => (
        <div key={item.id} className={clsx(styles.col)}>
          {index < answer.length - 1 && <CheckBox
            name={item.value}
            onReset={handleRemoveReset}
            reset={reset}
            onClick={props.onClick}
            staff={item}
          />}
          {index === answer.length - 1 && <Reset
            name={item.value}
            onReset={handleCheckReset}
            reset={reset}
            noIdead
            onClick={props.onClick}
            staff={item}
          />}
        </div>
      ))}
    </>
  );
};

// Build Component CheckBox
const CheckBox = (props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!props.reset) {
      setChecked(false);
    }
  }, []);

  const handleChange = () => {
    props.onReset();
    setChecked(!checked);
  };

  return (
    <Input
      checked={checked}
      handleChange={handleChange}
      name={props.name}
      reset={props.reset}
      onClick={props.onClick}
      staff={props.staff}
    />
  );
};

// Build Component Reset
const Reset = (props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.reset);
  });

  const handleChange = () => {
    props.onReset(!checked);
    setChecked(!checked);
  };

  return (
    <Input
      checked={checked}
      handleChange={handleChange}
      name={props.name}
      reset={props.reset}
      noIdead={props.noIdead}
      onClick={props.onClick}
      staff={props.staff}
    />
  );
};

// Input
const Input = (props) => {
  // const [message, setMessage] = useState();
  const question_id = props.staff.question_id;
  const suggested_answer_id = props.staff.id;
  const nameInput = props.staff.id;

  // const handleInputChanged = (event) => {
  //   setMessage(event.target.value);
  // };

  // Khai báo State lưu trữ danh sách Input
  const [inputList, setInputList] = useState([""]);

  // Khai báo State lưu trữ dữ liệu người dùng nhập vào Input
  const [inputValues, setInputValues] = useState([""]);

  // Tạo giá trị ngẫu nhiên render Key không trùng lặp
  const generateId = () => Math.floor(Math.random() * 10000);

  // Update inputValues khi sự thay đổi của người dùng
  const handleInputChange = (index) => (event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  // Thêm Input
  const handleAdd = (event) => {
    event.preventDefault();
    setInputList([...inputList, generateId()]);
    setInputValues([...inputValues, ""]);
  };

  // Xóa Input
  const handleRemove = (index) => (event) => {
    event.preventDefault();
    setInputList(inputList.filter((input, i) => i !== index));
    setInputValues(inputValues.filter((input, i) => i !== index));
  };

  // Xuất kết quả inputValues
  // useEffect(() => {
  //   setMessage(inputValues)
  //   // console.log(inputValues);
  // });

  // Truyền dữ liệu khi gõ text
  useEffect(() => {
    inputValues !== '' && props.onClick(inputValues, question_id, suggested_answer_id, nameInput);
  }, [inputValues]);

  return (
    <div className={styles.checkBox}>
      {props.noIdead && (
        <div className={clsx(styles.questionCheck)}>
          <label>
            <input
              type='checkbox'
              checked={props.reset && props.checked}
              onChange={props.handleChange}
              onClick={() => props.onClick(!props.checked && 'Không ý kiến', question_id, suggested_answer_id, nameInput, props.noIdead)}
            />
            <span> {props.name}</span>
          </label>
        </div>
      )}

      {!props.noIdead && (
        <div className={clsx(styles.questionCheck)}>
          <label>
            <input
              type='checkbox'
              checked={!props.reset && props.checked}
              onChange={props.handleChange}
              onClick={() => props.onClick(inputValues, question_id, suggested_answer_id, nameInput, props.noIdead, props.checked)}
              name={props.staff.id}
            />
            <span> {props.name}</span>
          </label>
        </div>
      )}
      {props.checked && !props.reset && (
        <div>
          {/* <textarea
            value={message}
            onChange={handleInputChanged}
            placeholder="Lý do quý khách không hài lòng & nhân sự nào? "
          /> */}
          {inputList.map((input, index) => (
            <div key={input}>
              <textarea
                value={inputValues[index] || ""}
                onChange={handleInputChange(index)}
                placeholder="Lý do quý khách không hài lòng & nhân sự nào? "
              />
              <span className={styles.del} onClick={handleRemove(index)}>[Xóa]</span>
            </div>
          ))}
          <button className={styles.btnAdd}  onClick={handleAdd} >Thêm lý do</button>
        </div>
      )}
    </div>
  );
};

export default QAnine;