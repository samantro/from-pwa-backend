const User = require("../model/user");
const { or } = require("sequelize");
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
      const { filename, mimetype } = photoId;
      await User.create({
        Name: name,
        Email: email,
        Contact: contact,
        Photo_Id: filename
      });
      res.status(200).send("user added");
    });
  } catch (err) {
    res.status(500).send({ 'Error': err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    if (!findUser) {
      throw new Error("User not found");
    }
    let updatedInfo = {
      ...req.body,
      Updated_By: req.user.User_UNID,
      Updated_At: new Date(),
    };
    const user = await User.update(updatedInfo, {
      where: {
        User_UNID: req.params.id,
      },
    });
    res.status(200).json({ message: "User is updated!!!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUserRoleID = async (req, res) => {
  try {
    const data = await User_Role.findOne({
      where: {
        User_Role: req.body.userRole,
      }
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const deleteUser = async (req, res) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    if (!findUser) {
      throw new Error("User not found");
    }
    await User.destroy({
      where: {
        User_UNID: req.params.id,
      },
    });
    res.status(200).json({ message: "User is Deleted!!!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  allUser,
  addUser,
};
