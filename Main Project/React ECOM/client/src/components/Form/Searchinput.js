import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchContainer = styled.div`
  padding-top: 10px;
`;

const SearchTitle = styled.p`
  font-size: 22px;
  font-weight: 900;
  text-align: center;
  color: #ff8b88;
`;

const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInputText = styled.p`
  text-align: center;
`;

const SearchInputWrapper = styled.div`
 
`;

const SearchInputBar = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchInputBarText = styled.p`
  text-align: center;
  font-size: 19px;
  line-height: 18px;
`;

const SearchInputBarLink = styled.a`
  color: #ff8b88;
  text-decoration: none;
  transition: color 250ms ease-in;

  &:hover,
  &:focus {
    color: color(#ff8b88 blackness(+55%));
  }
`;

const Input = styled.input`
  width: 283%;
  padding: 13px 24px;
  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 20px;
  line-height: 30px;
  color: #575756;
  background-color: white;
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
 
  background-position: 20% center;
  border-radius: 80px;
  border: 3px solid #575756;
  transition: all 400ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;

  &::placeholder {
    color: color(#575756 a(0.8));
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  &:hover,
  &:focus {
   
    outline: 0;
    border: 2px solid transparent;
    border-bottom: 3px solid #575756;
    border-radius: 0;
    background-position: 100% center;
    
  }
`;

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
    
      <SearchInputContainer>
       
        <SearchInputWrapper>
          <Input
            type="search"
            placeholder="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            onKeyPress={handleKeyPress} // Added Enter key handling
          />
        </SearchInputWrapper>
      </SearchInputContainer>
    </SearchContainer>
  );
};

export default SearchInput;
