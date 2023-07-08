const XLSX = require('xlsx');
const express = require('express');
const app = express();

// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const workbook2 = XLSX.readFile('data.xlsx');
const worksheet2 = workbook2.Sheets['PLNT21'];
const jsonData2 = XLSX.utils.sheet_to_json(worksheet2);
jsonData2.shift()
// route for handling requests from the Angular client
const worksheet3 = workbook2.Sheets['ST21'];
const stateData = XLSX.utils.sheet_to_json(worksheet3);
stateData.shift()

app.get('/api/state', (req, res) => {
  let givenState = req.query?.state;
  let selectedStateData = stateData.filter((state) => {
    return state["State abbreviation"] == givenState
  });
  res.json(selectedStateData?.length ? selectedStateData[0] : null)
})

/**
 * This api will get 2 params(#n and state) and will filter the rows according to them.
 * 
 */
app.get('/api/plants', (req, res) => {
  let n = req.query?.n;
  let state = req.query?.state;
  let name = req.query?.name;
  let result = [];
  if (state) {
    let a = jsonData2.filter((plant) => {
      return plant['Plant state abbreviation'] == state;
    })
    result.push(...a);
  }
  if (n > 0) {
    let values = null;
    if (result?.length) {
      values = result
        .map((p) => p["Plant annual net generation (MWh)"])
        .sort((a, b) => parseInt(b) - parseInt(a)).slice(0, n)

      top10 = result.filter((plant) => values.includes(plant["Plant annual net generation (MWh)"]));
      res.json(top10)
    }
    else {
      values = jsonData2.map((p) => p["Plant annual net generation (MWh)"]).sort((a, b) => parseInt(b) - parseInt(a)).slice(0, n)
      top10 = jsonData2.filter((plant) => values.includes(plant["Plant annual net generation (MWh)"]));
      res.json(top10)
    }
  }
  else {
    if (result?.length) {
      res.json(result)
    }
    else {
      values = jsonData2.map((p) => p["Plant annual net generation (MWh)"]).sort((a, b) => parseInt(b) - parseInt(a)).slice(0, 10)
      top10 = jsonData2.filter((plant) => values.includes(plant["Plant annual net generation (MWh)"]));
      res.json(top10)
    }
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});