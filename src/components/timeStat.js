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

export default function TimeStats() {
  const [data, setData] = useState([]);
  const [months, setMonths] = useState([]);

  const fetchData = async () => {
    const res = await (
      await axios.get("https://localhost:7235/api/Expenses/Stats/Time")
    ).data;
    setData(Object.values(res));
  };

  const fetchCategories = async () => {
    const res = await (
      await axios.get("https://localhost:7235/api/Month")
    ).data;
    setMonths(res);
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  return (
    <Container className="col-md-6 my-5">
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{months[index]}</td>
              <td>{e}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
