const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const imagePath = `uploads/${req.file.filename}`;
  const outputPath = `uploads/${req.file.filename}-processed.jpg`;

  // Perform image processing (resize, etc.) using sharp
  sharp(req.file.path)
    .resize(300) // Resize the image to 300 pixels width
    .toFile(outputPath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error processing image' });
      }

      // Perform your nudity detection logic here (not provided in this example)

      // Send the processed image and result to the client
      res.json({ imagePath: outputPath, result: 'Nudity detection result goes here' });
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
