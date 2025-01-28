import express from  'express'
import { selectedCities,defaultCities } from './routes.js'


const app = express();
const port = 8000;

app.use(express.static('public'));


app.use('/', defaultCities)

//пример: http://localhost:8000/weather?city=moscow,london,berlin&userId=2826ada031c965e1f89a198bb98cc2f2&lang=en
app.use('/weather', selectedCities)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})