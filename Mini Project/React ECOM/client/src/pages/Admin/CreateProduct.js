import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import { Select, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Option } = Select;

const Container = styled.div`
  padding: 3rem;
  background-color: #f0f0f0;
`;

const DashboardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Sidebar = styled.div`
  flex: 0 0 25%;
`;

const MainContent = styled.div`
  flex: 0 0 75%;
`;

const Heading = styled.h1`
  font-size: 24px;
`;

const FormContainer = styled.div`
  width: 75%;
`;


const SelectOption = styled(Select)`
  border: none;
  width: 33%;
  margin-bottom: 1rem;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
  `;

const SelectCategory = styled(Select)`
  border: none;
  width: 50%;
  margin-bottom: 1rem;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;

  & .ant-select-selector {
    border: 2px solid #ccc;
    border-radius: 5px;
  }

  & .ant-select-selection-item {
    background-color: #f0f0f0;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: #e6fff2; /* Change to your desired color on hover */
      color: Black;
    }
  }
`;



const UploadLabel = styled.label`
  display: block;
  width: 50%;
  text-align: center;
  background-color: #f0f0f0;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;

  &:hover {
    background-color: #007bff; /* Change to your desired color on hover */
    border-color: #007bff;
    color: white;
  }
`;
const UploadInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  height: 200px;
`;

const TextInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextareaInput = styled.textarea`
  width: 100%;
  margin-bottom: 1rem;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const NumberInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledTooltip = styled(Tooltip)`
  background-color: rgba(255, 255, 255, 0.9); /* Tooltip background color with transparency */
  border: 1px solid #ccc; /* Tooltip border */
  color: #333; /* Tooltip text color */
  max-width: 300px; /* Maximum width for the tooltip */
  padding: 12px; /* Padding for tooltip content */
`;

const StyledSelect = styled(Select)`
  .ant-select-selection-placeholder {
    color: #999; /* Placeholder text color */
  }

  .ant-select-selector {
    border: 1px solid #ccc; /* Select component border */
    border-radius: 4px; /* Rounded corners for the Select component */
    background-color: #fff; /* Select component background color */
  }

  .ant-select-dropdown {
    border: 1px solid #ccc; /* Dropdown menu border */
  }

  .ant-select-item-option {
    padding: 8px; /* Padding for each dropdown option */
  }

  .ant-select-item-option:hover {
    background-color: #f0f0f0; /* Background color on hover */
  }

  .ant-select-item-option-active {
    background-color: #e6e6e6; /* Background color when selected */
  }

  .ant-select-dropdown-menu {
    max-height: 200px; /* Maximum height of the dropdown menu */
    overflow-y: auto; /* Add a scrollbar when needed */
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 7px 14px;
  font-size: 16px;
  cursor: pointer;
`;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodType, setFoodType] = useState("");
  const [photo, setPhoto] = useState(null);
  const [flavor, setFlavor] = useState("");
  const [orgin, setOrgin] = useState("");
  const [color, setColor] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const allowedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile && allowedImageFormats.includes(selectedFile.type)) {
      setPhoto(selectedFile);
    } else {
      // Notify the user that the selected file is not a valid image format
      toast.error('Please select a valid image file (jpg, jpeg, png).');
      // Optionally, you can also reset the file input
      e.target.value = null;
    }
  };



  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("foodType", foodType);
      productData.append("flavor", flavor);
      productData.append("orgin", orgin);
      productData.append("color", color);

      const { data } = await axios.post("http://localhost:8080/api/v1/product/create-product", productData);


      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/products");
      } else {

        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <Container>
        <DashboardRow>
          <Sidebar>
            <AdminMenu />
          </Sidebar>
          <MainContent>
            <Heading>Add Item</Heading>
            <FormContainer>

              <div className="mb-3">
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
                  <UploadLabel>
                    {photo ? photo.name : "Upload Photo"}
                    <UploadInput
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                     
                    />
                  </UploadLabel>

                </div>
              </div>
              <div className="text-center">
                {photo && <PreviewImage src={URL.createObjectURL(photo)} alt="product_photo" />}
              </div>
              <TextInput
                type="text"
                value={name}
                placeholder="Write a name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextareaInput
                type="text"
                value={description}
                placeholder="Write a description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Tooltip title="Categories help customers easily navigate and find items on your menu">
                <SelectCategory
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </SelectCategory>
              </Tooltip>

              <Tooltip title="This helps customers understand the nature of the dish ">
                <SelectCategory
                  bordered={false}
                  placeholder="Food Type"
                  size="large"
                  showSearch
                  onChange={(value) => {
                    setFoodType(value);
                  }}
                >
                  <Option value="veg">Veg</Option>
                  <Option value="NonVeg">Non-Veg</Option>
                  <Option value="Drinks">Drinks</Option>
                </SelectCategory>
              </Tooltip>
              <Tooltip title="Indicate the place of origin for this food item ">
              <SelectOption
                bordered={false}
                placeholder="Select Origin"
                size="large"
                showSearch
                onChange={(value) => {
                  setOrgin(value);
                }}
              >
                <Option value="Mexican">Mexican</Option>
                <Option value="Italian">Italian</Option>
                <Option value="Chinese">Chinese</Option>
                <Option value="Indian">Indian</Option>
                <Option value="Japanese">Japanese</Option>

                {/* Add more options as needed */}
              </SelectOption>
              </Tooltip>


              <Tooltip title="This helps customers understand the flavor of the dish">
                <SelectOption
                  bordered={false}
                  placeholder="Flavor"
                  size="large"
                  showSearch
                  onChange={(value) => {
                    setFlavor(value);
                  }}
                >
                  <Option value="sweet">Sweet</Option>
                  <Option value="sour">Sour</Option>
                  <Option value="spicy">Spicy</Option>
                  <Option value="salty">Salty</Option>
                  <Option value="bitter">Bitter</Option>
                  <Option value="umami">Umami</Option>
                  <Option value="savory">Savory</Option>
                  {/* Add more flavor options as needed */}
                </SelectOption>
              </Tooltip>


              <Tooltip title="This helps customers understand the color of the dish">
                <SelectOption
                  bordered={false}
                  placeholder="Color"
                  size="large"
                  showSearch
                  onChange={(value) => {
                    setColor(value);
                  }}
                >
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="yellow">Yellow</Option>
                  <Option value="orange">Orange</Option>
                  <Option value="purple">Purple</Option>
                  <Option value="blue">Blue</Option>
                  <Option value="brown">Brown</Option>
                  {/* Add more color options as needed */}
                </SelectOption>
              </Tooltip>



              <NumberInput
                type="number"
                value={price}
                placeholder="Write a Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              {/*<NumberInput
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />*/}

              <div className="mb-3">
                <SubmitButton onClick={handleCreate}>Add Item</SubmitButton>
              </div>
            </FormContainer>
          </MainContent>
        </DashboardRow>
      </Container>
    </Layout>
  );
};

export default CreateProduct;
