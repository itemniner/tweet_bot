const express = require('express');
const app = express();

const dotenv = require('dotenv')

dotenv.config()

const Nightmare = require('nightmare');
let nightmare = Nightmare({ show: true });
//run npm start or nodemon (if you have nodemon installed globally)
// to run the app locally
//this sets the post at 3001 - go to localhost:3001 in your browser to see app
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Twitter Hackery';
// at localhost:3001/, you should see the text in this response


app.get('/send-tweet', async (request, response) => {
  var message = request.param('message');
  var handle = request.param('handle');
  try {
    var tweet = await sendTweet(message, handle);
    return response.json(tweet);
  } catch (err) {
    console.log(err);
  }
});

app.listen(app.get('port'), () => {

  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/', (request, response) => {
  response.send('Tweeter Hackery');
});
function sendTweet(message, handle) {
  var url = `https://twitter.com/intent/tweet?text=${message}&via=${handle}`;
  return nightmare
    .goto(url)
    .wait(500)
    .type('input[type="text"]', 'oversiteoversite@gmail.com')
    .type('input[type="password"]', 'oversite123')
    .type('input[type="password"]', '\u000d')
    .wait(2500)
    .evaluate(() => {
      let tweetBtn = [...document.querySelectorAll('span')].find(span => span.innerText === "Tweet")
      tweetBtn.addEventListener("click", e => { console.log("clicked") })
      tweetBtn.click()
    })
    .wait(2000)
    .then(() => {
      return nightmare.end();
    })
    .then(function(){
      nightmare  = Nightmare()
      console.log("nightmare done")
    })
}