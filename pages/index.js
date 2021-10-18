import React from 'react';
import { Nav } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2';
import Data from './Data.json'

const backgroundColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 0, 191, 0.2)',
  'rgba(128,172, 48, 0.2)'
]
const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(255, 0, 191, 1)',
  'rgba(128,172, 48, 1)'
]

let data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {

      data: [12],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',

      ],
      borderWidth: 1,
    },
    {
      label: '# of antivotes',
      data: [82],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',

      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',

      ],
      borderWidth: 1,
    },
  ],
};

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
function generateDataSets() {
  console.log("generateDataSets");
  let datasets = [], labels = [];
  let dsbooks = [];
  let totalDatasets = 0, mbooks = 0;
  for (let i = 0; i < Data.length; i++) {

    mbooks = Math.max(mbooks, Data[i].books.length);
    dsbooks.push(totalDatasets);
    totalDatasets += Data[i].books.length;
  }

  for (let i = 0; i < totalDatasets; i++) {
    datasets.push({ data: [], backgroundColor: [], borderColor: [], borderWidth: 1, label: i + 1 });
  }

  for (let i = 0; i < Data.length; i++)
    labels.push(Data[i].name);
  for (let j = 0; j < totalDatasets; j++) {
    for (let i = 0; i < mbooks; i++) {
      datasets[j].data.push(0);
    }
  }

  for (let j = 0; j < totalDatasets; j++) {
    for (let i = 0; i < Data.length; i++) {
      let o = j - dsbooks[i];
      if (o >= Data[i].books.length || o < 0) continue;

      datasets[j].data[i] = Data[i].books[o].count;
      datasets[j].backgroundColor.push(backgroundColors[o]);
      datasets[j].borderColor.push(borderColors[o]);
      datasets[j].label = Data[i].books[o].name;
    }
  }
  data.labels = labels;
  data.datasets = datasets;
  return;
}

export default function Home() {

  generateDataSets();
  return (
    <>
      {/* <Nav activeKey="/" variant="pills" >
        <Nav.Item>
          <Nav.Link href="/" >Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about-us">About us</Nav.Link>
        </Nav.Item>
      </Nav> */}
      <Bar data={data} options={options} />
    </>
  )
}
