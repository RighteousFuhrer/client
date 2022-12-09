import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
export default function ItemList() {
  const defaultExp = {
    name: "",
    cost: 0,
    time: new Date(),
    category: 0,
  };

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [value, onChange] = useState(new Date());

  const [expense, setExpense] = useState(defaultExp);

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);
  useEffect(() => {
    console.log(expense);
  }, [expense]);

  const fetchData = async () => {
    const res = await (
      await axios.get("https://localhost:7235/api/Expenses")
    ).data;
    setExpenses(res);
  };

  const deleteItem = async (id) => {
    const response = await axios.delete(
      `https://localhost:7235/api/Expenses/${id}`
    );

    fetchData();
  };

  const fetchCategories = async () => {
    const res = await (
      await axios.get("https://localhost:7235/api/Categories")
    ).data;
    setCategories(res);
  };

  const handleEdit = (item) => {
    const { time, ...newExp } = item;
    setEdit(true);
    setExpense({ ...newExp, time: new Date(time) });
    handleShow();
  };

  const handleCreate = () => {
    setEdit(false);
    setExpense(defaultExp);
    handleShow();
  };

  const submitItem = async (e) => {
    e.preventDefault();

    console.log(expense);

    const url = "https://localhost:7235/api/Expenses";

    if (edit) {
      const res = await await axios.put(url + "/" + expense.id, expense);
      console.log(res);
    } else {
      const res = await await axios.post(url, expense);
      console.log(res);
    }
    fetchData();
    handleClose();
  };

  return (
    <>
      <Container className="col-md-8 my-5">
        <Row className="my-5">
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Cost</th>
                <th>Category</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{expense.name}</td>
                  <td>{expense.cost}</td>
                  <td>{categories[expense.category]}</td>
                  <td>{expense.time}</td>
                  <td className="d-flex justify-content-center">
                    <Button
                      variant="outline-primary mx-3"
                      onClick={() => handleEdit(expense)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger mx-3"
                      onClick={() => deleteItem(expense.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
        <Row className="dflex justify-content-end">
          <Button variant="primary" onClick={handleCreate}>
            Add new Item
          </Button>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit Expense" : "Create Expense"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => submitItem(e)}>
            <Row className="mb-3">
              <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  required
                  value={expense.name}
                  onChange={(e) =>
                    setExpense({ ...expense, name: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Cost"
                  min={0}
                  required
                  value={expense.cost}
                  onChange={(e) =>
                    setExpense({ ...expense, cost: Number(e.target.value) })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onInput={(e) => {
                    setExpense({
                      ...expense,
                      category: Number(e.target.value),
                    });
                  }}
                >
                  {categories.map((c, i) => (
                    <option value={i} key={i}>
                      {c}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Label>Time</Form.Label>
                <Datetime
                  value={expense.time}
                  onInput={(val) => {
                    console.log(val);
                    setExpense({ ...expense, time: new Date(val._i) });
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-3 dflex justify-content-end">
              <Col className="col-md-4">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
