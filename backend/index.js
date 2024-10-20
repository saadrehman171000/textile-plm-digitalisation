const express = require('express');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

let model;
async function loadModel() {
  model = await tf.loadLayersModel('file://model/model.json'); // Adjust path as needed
}
loadModel();

app.post('/upload', upload.single('image'), async (req, res) => {
  const imageBuffer = fs.readFileSync(req.file.path);
  const tensor = tf.node.decodeImage(imageBuffer)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .div(tf.scalar(255))
    .expandDims();

  const prediction = await model.predict(tensor).data();
  const result = prediction[0] > 0.5 ? 'Defected' : 'Non-Defected';

  res.json({ result });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
