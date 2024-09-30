// Gemini AI assisted code

import { useState } from "react";
import { Modal, Button, Form, Toast, ToastContainer } from "react-bootstrap";

import { useTheme } from "../contexts/ThemeProvider";
import { useProductInfoContext } from "../contexts/ProductInfoProvider";

const PriceTrackerPromptModal = ({ isOpen, onClose, onSubmit }) => {
  const { theme } = useTheme();
  const { products } = useProductInfoContext();

  const [inputName, setInputName] = useState("");
  const [inputNumber, setInputNumber] = useState("");

  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const [showToastSuccess, setShowToastSuccess] = useState(false);
  const toggleShowToastSuccess = () => setShowToastSuccess(!showToastSuccess);

  const checkIfObjectExists = (obj) => {
    return products.some((item) => {
      return Object.keys(obj).every((key) => item[key] === obj[key]);
    });
  };

  const handleInputNameChange = (event) => {
    setInputName(event.target.value);
  };
  const handleInputNumberChange = (event) => {
    setInputNumber(event.target.value);
  };
  const handleSubmit = () => {
    console.log(
      "prod exists: ",
      checkIfObjectExists({ name: inputName, number: inputNumber })
    );
    if (!checkIfObjectExists({ name: inputName, number: inputNumber })) {
      onSubmit(inputName, inputNumber);
      setInputName("");
      setInputNumber("");
      onClose();
      setShowToastSuccess(true);
    } else {
      setShowToast(true);
    }
  };

  return (
    <>
      {/*This is Modal Component to get Product Name and Info*/}
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="product-name"
                value={inputName}
                onChange={handleInputNameChange}
                placeholder="Enter Product Name Here"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Manufacturer Product Number</Form.Label>
              <Form.Control
                type="text"
                name="product-number"
                value={inputNumber}
                onChange={handleInputNumberChange}
                placeholder="Enter Manufacturer Product Number Here"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={theme} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/*This is Modal Component to get Product Name and Info*/}

      {/*This is Toast Component to show duplicate entry*/}
      <ToastContainer className="p-3" position="bottom-center">
        <Toast
          className="toast-center"
          show={showToast}
          onClose={toggleShowToast}
          delay={3000}
          autohide={true}
          bg="danger"
        >
          <Toast.Body className={"text-white"}>
            Duplicate Entry, Enter unique name and number
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {/*This is Toast Component to show duplicate entry*/}

      {/*This is Toast Component to show successful entry*/}
      <ToastContainer className="p-3" position="bottom-center">
        <Toast
          className="toast-center"
          show={showToastSuccess}
          onClose={toggleShowToastSuccess}
          delay={3000}
          autohide={true}
          bg="success"
        >
          <Toast.Body className={"text-white"}>
            Product Added, Successfully
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {/*This is Toast Component to show successful entry*/}
    </>
  );
};

export default PriceTrackerPromptModal;
