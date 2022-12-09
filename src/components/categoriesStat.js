import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

export default function CategoriesStats() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const res = await (
      await axios.get("https://localhost:7235/api/Expenses/Stats/Categories")
    ).data;
    setData(Object.values(res));
  };

  const fetchCategories = async () => {
    const res = await (
      await axios.get("https://localhost:7235/api/Categories")
    ).data;
    setCategories(res);
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

//   useEffect(() => {
//     console.log(data, categories)
//   }, [data, categories]);

  return (
    <Container className="col-md-6 my-5">
      <Table bordered hover >
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
        {data.map((e,index) => (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{categories[index]}</td>
                <td>{e}</td>
            </tr>
        ))}
        </tbody>
      </Table>
    </Container>
  );
}
