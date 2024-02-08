import React from 'react';
import { Input, Button } from 'antd';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  width: 100%;
  align-items: center; 
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 15px; /* Increase border radius */
  padding: 30px;
  
`;

const InputWrapper = styled(Input)`
  border: none;
  border-radius: 15px; /* Apply border radius to the input */
  padding: 10px;
  font-weight: bold;
  margin-right: 10px; /* Add some spacing between the input and the button */
`;

const SubmitButton = styled(Button)`
  border: none;
  background-color: #1890ff;
  color: #fff;
  border-radius: 15px; /* Apply border radius to the button */
  width: 100px; /* Adjust the width of the button */
  transition: background-color 0.3s; /* Add a hover effect */

  &:hover {
    background-color: #1475e3; /* Button hover effect */
  }
`;

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <FormWrapper onSubmit={handleSubmit}>
      <InputWrapper
        type="text"
        placeholder="Enter the category"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SubmitButton type="primary" htmlType="submit">
        Submit
      </SubmitButton>
    </FormWrapper>
  );
};

export default CategoryForm;
