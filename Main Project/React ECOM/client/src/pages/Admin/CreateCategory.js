import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import AdminMenu from '../../components/layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';
import styled from "styled-components";

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

const Header = styled.h1`
  font-size: 24px;
`;

const CategoryFormContainer = styled.div`
  padding: 7px;
  width: 50%;
  
`;

const Table = styled.table`
  width: 75%;
`;

const TableHeader = styled.thead`
  background-color: #333;
  color: white;
`;

const TableHead = styled.th`
  padding: 10px;
`;

const TableRow = styled.tr`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const TableCell = styled.td`
  padding: 5px 10px;
`;

const EditButton = styled.button`
  background-color: rgb(100, 149, 237);
  color: white;
  border-radius: 10px;
  padding: 3px 6px;
  font-size: 12px;
  width: 100px;
  height: 50px;
`;

const DeleteButton = styled.button`
  background-color: rgb(237, 100, 100);
  color: white;
  border-radius: 10px;
  padding: 3px 6px;
  font-size: 12px;
  width: 100px;
  height: 50px;
`;

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post("http://localhost:8080/api/v1/category/create-category", {
            name,
        });
        if (data?.success) {
            toast.success(`${name} is created`);
            getAllCategory();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        // toast.error("somthing went wrong in input form");
    }
};

//get all cat
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

//update category
const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.put(
            `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
            { name: updatedName }
        );
        if (data?.success) {
            toast.success(`${updatedName} is updated`);
            setSelected(null);
            setUpdatedName("");
            setVisible(false);
            getAllCategory();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

//delete category
const handleDelete = async (pId) => {
    try {
        const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pId}`
        );
        if (data.success) {
            toast.success(`category is deleted`);

            getAllCategory();
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("Somtihing went wrong");
    }
};

  return (
    <Layout title="Create Category">
      <Container>
        <DashboardRow>
          <Sidebar>
            <AdminMenu />
          </Sidebar>
          <MainContent>
            <Header>Manage Category</Header>
            <CategoryFormContainer>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </CategoryFormContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableHead>Name</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </TableHeader>
              <tbody>
                {categories?.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>
                      <EditButton
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        ✍️Edit
                      </EditButton>
                    {/*}  <DeleteButton onClick={() => handleDelete(c._id)}>
                        ✂️Delete
                      </DeleteButton>*/}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
            </Modal>
          </MainContent>
        </DashboardRow>
      </Container>
    </Layout>
  );
};

export default CreateCategory;
