const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'data.json');

function getNextId(data) {
  if (data.length === 0) {
    return 1;
  }

  const lastItem = data[data.length - 1];

  return lastItem.id + 1;
}

app.get('/data', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    res.send(data);
  });
});

app.get('/data/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    const jsonData = JSON.parse(data);
    const item = jsonData.find(item => item.id === parseInt(id, 10));

    if (!item) {
      return res.status(404).send('Item not found');
    }

    res.send(item);
  });
});

app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    let jsonData = JSON.parse(data);
    const index = jsonData.findIndex(item => item.id === parseInt(id, 10));

    if (index === -1) {
      return res.status(404).send('Item not found');
    }

    jsonData[index] = { ...jsonData[index], ...req.body };

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }

      res.status(200).send('Data updated');
    });
  });
});

app.post('/data', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    const jsonData = JSON.parse(data);
    const newId = getNextId(jsonData);
    const newItem = { ...req.body, id: newId };
    jsonData.push(newItem);

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }

      res.status(200).send('Data saved');
    });
  });
});

app.delete('/data/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    let jsonData = JSON.parse(data);
    jsonData = jsonData.filter(item => item.id !== parseInt(id, 10));

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }

      res.status(200).send('Data deleted');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});