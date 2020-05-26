const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// to make all middle ware function to have bodyparser
app.use(bodyParser.urlencoded({extend: true}));

// Custom MiddleWare bodyParser
// const bodyParser = (req, res, next) =>{
//   if (req.method === 'POST'){
//      // get access to email, password, passwordConfirmation
//     req.on('data', data => {
//       // take buffer and convert it to string in utf8 format
//       const parsed = data.toString('utf8').split('&');
//       const formData = {};
//       for (let pair of parsed){
//         const [key, value] = pair.split('=');
//         formData[key] = value;
//       }
//       req.body = formData;
//       next();
//     });
//   } else {
//     next();
//   }
// }

// route handler
app.get('/', (req, res) =>{
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button> Sign Up </button>
      </form>
    </div>
  `);
});


// bodyparser is middleware function
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Account created!!!');
});


// 3000 is port number
// type: localhost:3000 to the browser in order to access
app.listen(3000, () => {
  console.log('Listening');
});