const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer ory_at_t1hkxQhSWik9AnJgqa_lFXwbkQcygkkyulVuKo-_rDc.dZoJoRsvb9VRH9z6I_1KBAAqvkpGszXlWb3BAppvLMc");
myHeaders.append("Cookie", "csrf_token_689af3ef6c442bd243df094e1d655035a08b6b22fc8ad5f5c24168a747cf69ba=OcSAvpfzQOSBpF0e0lBk/ZRbREm+BoCS9D0/oab/h2o=");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "message": "Thank you for your response"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

app.post('/', (req, res) => {
  console.log(`Received ${req.method} request`);
  console.log('Headers:', req.headers);
  console.log('Data:', req.body);

  const conversationId = req.body.data.conversation.id;
  console.log("DEBUG conversationID", conversationId)
  
  if (conversationId) {
    console.log("DEBUG will be redirect?")
    res.status(200)
    // res.redirect(`/redirect?conversationId=${conversationId}`);
    fetch(`https://crm-dev.internal.collabo.dev/api/conversations/${conversationId}/messages`, requestOptions).then((response) => {
    if (response.ok) {
      res.status(200).send('Success');
    } else {
      console.error('Error response:', response.statusText);
      res.status(500).send('Internal Server Error');
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  } else {
    console.error('Conversation ID not found in the data');
    res.status(400).send('Bad Request: Missing conversation ID');
  }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
