// Gemini AI assisted code

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useTheme } from "../contexts/ThemeProvider";

import "../styles/PriceTrackerCommunity.css";

const PriceTrackerCommunity = React.memo(() => {
  const { theme } = useTheme();

  const [inputs, setInputs] = useState([{ name: "", value: "" }]);

  const handleInputChange = (index, field, value) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index][field] = value;
      return updatedInputs;
    });
  };

  const addInput = () => {
    setInputs([...inputs, { name: "", value: "" }]);
  };

  const removeInput = (index) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  return (
    <>
      {/** Add Button for Products To Track */}
      <Button className="add-card" variant={theme} onClick={addInput}>
        Add Reviews
      </Button>
      {/** Add Products for Products To Track */}

      <Form>
        <div className="price-tracker-community">
          {inputs.map((input, index) => (
            <Form.Group key={index} controlId={`input-${index}`}>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={input.name}
                required={true}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              />
              <br />
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Product Review"
                value={input.value}
                required={true}
                onChange={(e) =>
                  handleInputChange(index, "value", e.target.value)
                }
              />
              <Button
                className="price-tracker-community-remove-button"
                variant="danger"
                onClick={() => removeInput(index)}
              >
                Remove
              </Button>
              <Button
                className="price-tracker-community-submit-button"
                variant="success"
              >
                Submit Review
              </Button>
              <br />
              <br />
              <br />
            </Form.Group>
          ))}
        </div>
      </Form>
    </>
  );
});

export default PriceTrackerCommunity;
