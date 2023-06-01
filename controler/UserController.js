const User = require("../model/user");
const multer = require('multer');

const allUser = async (req, res) => {
  try {
    const user = await User.findAll({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTime = (req, res) => {
  let date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where the uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create a Multer upload instance
const upload = multer({ storage: storage });
const addUser = async (req, res) => {
  try {
    upload.single('photo')(req, res, async function (err) {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).send('An error occurred during file upload.');
      }
      const { name, email, contact, photoId } = req.body;
      // const { filename, mimetype } = photoId;
      await User.create({
        Name: name,
        Email: email,
        Contact: contact,
        Photo_Id: photoId
      });
      res.status(200).send("user added");
    });
  } catch (err) {
    res.status(500).send({ 'Error': err.message });
  }
};

module.exports = {
  allUser,
  addUser,
};