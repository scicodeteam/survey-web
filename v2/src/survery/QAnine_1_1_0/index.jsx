import clsx from 'clsx';
import styles from './QAnine_1_1_0.module.scss';
import { useEffect, useState } from 'react';
import CheckBoxList from '../../components/CheckBoxList';

const QAnine_1_1_0 = (props) => {
  const [survey] = useState(props.survey);
  // const [answer] = useState(survey.answer);

  // Lấy danh sách câu trả lời
  const [answer] = useState(props.survey.answer);

  // const [nameInput, setNameInput] = useState();
  const [products, setProducts] = useState([]);
  

  // console.log(props.survey.answer);
  // console.log(products);

  // Update sự thay đổi của UI
  const handleChange = (message, question_id, suggested_answer_id, noIdead, checked, list_service, name_anser) => {
    let data;
    let check = false;

    data = {
      "name_anser": name_anser,
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

    // kiểm tra  list_service có  trong answer hay không
    if (list_service) {
      data.list_service = [list_service];
    }
    // setNameInput(nameInput);

    if (!noIdead && question_id && suggested_answer_id) {

      // Check Product Update
      if (products.length > 0) {
        products.forEach((product) => {
          if (product.name_anser === name_anser) {
          // if (product.suggested_answer_id === suggested_answer_id) {
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
      
      // Nếu đã có sản phẩm, và sản phẩm được checked thì sẽ xóa sản phẩm
      if (products.length > 0 && checked === true) {
        handleDeleteItem(name_anser)
        // handleDeleteItem(suggested_answer_id)
      }      

    } else {
      // Nếu click No Anser gửi data
      // props.onLoad('staff', data);
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
        product.name_anser === productUpdate.name_anser ? productUpdate : product
        // product.suggested_answer_id === productUpdate.suggested_answer_id ? productUpdate : product
      )
    );
  };

  // Delete Data
  const handleDeleteItem = (id) => {
    setProducts(products.filter(item => item.name_anser !== id));
    // setProducts(products.filter(item => item.suggested_answer_id !== id));
  };

  // Xóa nhiều sản phẩm
  const handleDeleteItems = (ids) => {
    setProducts(products.filter(item => !ids.includes(item.name_anser)));
    // setProducts(products.filter(item => !ids.includes(item.suggested_answer_id)));
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
        {survey.title}
        <span className={clsx(styles.titleSub)}>
            Bấm vào phía dưới để lựa chọn
        </span>
      </div>

      <div className={clsx(styles.question)}>
        <CheckBoxList 
          survey={survey}
          onClick={handleChange}
          handleDeleteItem={handleDeleteItem}
          handleDeleteItems={handleDeleteItems}
        />
      </div>
      {props.error && (
        <div className={clsx(styles.feedback)}>{props.error}</div>
      )}
    </div>
  );
}

export default QAnine_1_1_0;