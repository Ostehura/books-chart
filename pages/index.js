import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2';
import DATA from './Data.json'

const backgroundColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 0, 191, 0.2)',
  'rgba(128,172, 48, 0.2)',
  'rgba(40,49, 48, 0.2)',
  'rgba(40,249, 48, 0.2)',
  'rgba(140,99, 172, 0.2)',
  'rgba(40,249, 172, 0.2)',
  'rgba(255, 101, 9,0.2)',
  'rgba(120, 101, 255, 0.2)',
  'rgba(238, 197, 191,0.2)',
  'rgba(238, 65, 191,0.2)',
  'rgba(238, 255, 126, 0.2)',
  'rgba(28, 255, 126, 0.2)'
]
const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 0, 191, 1)',
  'rgba(128,172, 48, 1)',
  'rgba(40,49, 48, 1)',
  'rgba(40,249, 48, 1)',
  'rgba(140,99, 172, 1)',
  'rgba(40,249, 172, 1)',
  'rgba(255, 101, 9,1)',
  'rgba(120, 101, 255, 1)',
  'rgba(238, 197, 191,1)',
  'rgba(238, 65, 191,1)',
  'rgba(238, 255, 126, 1)',
  'rgba(28, 255, 126, 1)'
]

// let data = {
//   labels: [],
//   datasets: [],
// };

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y:
    {
      stacked: true
    }
  },
  plugins: {
    legend: {
      display: false,
      position: 'right',
    },
    title: {
      display: true,
      text: 'Number of words in books about some fictional universes',
    },
  },
};

export default function Home() {
  let [data, setData] = useState(DATA);

  const onSubmit = ({ universeName, bookName, wordCount }) => {

    let book = { name: bookName, count: wordCount };
    let index = data.findIndex(element => element.name == universeName)
    if (index == -1) {
      let bookUniverse = { name: universeName, books: [] };
      bookUniverse.books.push(book);
      let newData = JSON.parse(JSON.stringify(data));
      newData.push(bookUniverse);
      setData(newData);

    }
    else {
      let newData = JSON.parse(JSON.stringify(data));
      newData[index].books.push(book);
      setData(newData);
    }
  }

  const onReset = () => {
    console.log("RESET")
    setData(DATA);
  }

  const generateDataset = (data) => {
    console.log("generateDataSets");
    let datasets = [], labels = [];
    let dsbooks = [];
    let totalDatasets = 0, mbooks = 0;
    for (let i = 0; i < data.length; i++) {

      mbooks = Math.max(mbooks, data[i].books.length);
      dsbooks.push(totalDatasets);
      totalDatasets += data[i].books.length;
    }

    for (let i = 0; i < totalDatasets; i++) {
      datasets.push({ data: [], backgroundColor: [], borderColor: [], borderWidth: 1, label: i + 1 });
    }

    for (let i = 0; i < data.length; i++)
      labels.push(data[i].name);
    for (let j = 0; j < totalDatasets; j++) {
      for (let i = 0; i < mbooks; i++) {
        datasets[j].data.push(0);
      }
    }

    for (let j = 0; j < totalDatasets; j++) {
      for (let i = 0; i < data.length; i++) {
        let o = j - dsbooks[i];
        if (o >= data[i].books.length || o < 0) continue;

        datasets[j].data[i] = data[i].books[o].count;
        datasets[j].backgroundColor.push(backgroundColors[o]);
        datasets[j].borderColor.push(borderColors[o]);
        datasets[j].label = data[i].books[o].name;
      }
    }
    return { labels, datasets };
  }

  const sortData = (data) => {
    let totalWordCount = []
    for (let i = 0; i < data.length; i++) {
      let count = 0;
      for (let j = 0; j < data[i].books.length; j++) {
        count += data[i].books[j].count;
      }
      totalWordCount.push(count);
    }
    console.log('total', totalWordCount);
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (totalWordCount[j] > totalWordCount[i]) {
          let tmp = data[j], tmp1 = totalWordCount[j];
          data[j] = data[i];
          data[i] = tmp;
          totalWordCount[j] = totalWordCount[i];
          totalWordCount[i] = tmp1;
        }
      }
    }
    return data;
  }

  const validate = (values) => {
    const errors = {};
    if (!values.universeName) errors.universeName = 'Required';
    if (!values.bookName) errors.bookName = 'Required'
    if (!(!values.universeName && !values.bookName)) {
      let o = data.findIndex((universe) => universe.name == values.universeName);

      if (o != -1 && data[o].books.findIndex((book) => book.name == values.bookName) != -1) errors.bookName = 'Each book in book universe should have unique name'

    }
    if (!values.wordCount) errors.wordCount = 'Required';
    else if (values.wordCount < 0) errors.wordCount = 'Couldn`t be negative';
    else if (!Number.isInteger(values.wordCount)) errors.wordCount = 'Should be an integer';
    else if (values.wordCount > 1e15) errors.wordCount = 'Value should be in range [0, 1\'000\'000\'000\'000\'000]';

    return errors;
  }

  let universeName = "", bookName = "", wordCount = 0;


  return (
    <>
      <Container fluid="sm">
        <Bar data={generateDataset(sortData(data))} options={options} />
        <Card>
          <Card.Header>Add book universe</Card.Header>
          <Card.Body>

            <Formik
              onSubmit={onSubmit}
              onReset={onReset}
              validate={validate}

              initialValues={{
                universeName: universeName,
                bookName: bookName,
                wordCount: wordCount
              }}>
              {({
                handleSubmit,
                handleChange,
                handleReset,
                values,
                touched,
                errors,
              }) => (
                <Row>
                  <Col>
                    <Form onSubmit={handleSubmit}>

                      <Form.Group as={Row} className="mb-3" >
                        <Form.Label column sm="2">Enter book universe name</Form.Label>
                        <Col sm="10">
                          <Form.Control
                            name="universeName"
                            type="text"
                            placeholder="Enter name"
                            value={values.universeName}
                            onChange={handleChange}
                            isInvalid={touched.universeName && !!errors.universeName}
                          />
                          <Form.Control.Feedback type="invalid">{errors.universeName}</Form.Control.Feedback>
                        </Col>
                      </Form.Group>

                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Enter book name</Form.Label>
                        <Col sm="10">
                          <Form.Control
                            name="bookName"
                            type="text"
                            placeholder="Enter name"
                            value={values.bookName}
                            onChange={handleChange}
                            isInvalid={touched.bookName && !!errors.bookName}
                          />
                          <Form.Control.Feedback type="invalid">{errors.bookName}</Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">Enter number of words</Form.Label>
                        <Col sm="10">
                          <Form.Control
                            name="wordCount"
                            type="number"
                            placeholder="Enter number"
                            value={values.wordCount}
                            onChange={handleChange}
                            isInvalid={touched.wordCount && !!errors.wordCount} />
                          <Form.Control.Feedback type="invalid">{errors.wordCount}</Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      <Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                          <Button variant="primary" type="submit">
                            Add
                          </Button>
                        </Col>
                        <Col xs="auto" className="my-1">
                          <Button variant="danger" type="reset" onClick={handleReset} >Reset</Button>
                        </Col>
                      </Row>

                    </Form>
                  </Col>
                </Row>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>

    </>
  )
}
