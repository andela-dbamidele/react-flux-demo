import express from 'express';
import Firebase from 'firebase';

const router = express.Router();

router.get('/', (req, res) => {
  const ref = Firebase.database().ref().child('messages');
  ref.once('value', (snap) => {
    const dataFromDb = snap.val();
    const processedData = [];
    for (const data in dataFromDb) {
      const tempData = {};
      tempData.title = dataFromDb[data].title;
      tempData.user = dataFromDb[data].user;
      tempData.date = dataFromDb[data].date;
      processedData.push(tempData);
    }
    return res.send({
      messages: processedData
    });
  });
});

router.post('/', (req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const date = new Date();
  Firebase.database().ref(`messages/${title}${date}`).update({
    user,
    title,
    date
  }, (error) => {
    if (error) {
      return res.status(400).send({
        message: 'An error occured',
        error
      });
    }
    return res.status(200).send({
      message: 'Message added successfully'
    });
  });
});

export default router;
