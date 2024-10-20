const express = require('express');
const multer = require('multer');
const tf = require('@tensorflow/tfjs'); // Using @tensorflow/tfjs for local model
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Images will be stored in 'uploads/'

// Load the TensorFlow model from the 'backend/model' folder
let model;
async function loadModel() {
  const modelPath = 'file://backend/model/model.json'; // Adjusted model path
  try {
    model = await tf.loadGraphModel(modelPath);
    console.log('Model loaded successfully.');
  } catch (error) {
    console.error('Error loading model:', error);
  }
}
loadModel();

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);

    const tensor = tf.browser
      .fromPixels(new Uint8Array(imageBuffer)) // Create tensor from image
      .resizeNearestNeighbor([224, 224]) // Resize image
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const prediction = await model.predict(tensor).data();
    const result = prediction[0] > 0.5 ? 'Defected' : 'Non-Defected';

    res.json({ result });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image.');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
