const User = require('../models/User.js');

const userProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (String(req.user) !== String(id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const profile = await User.findById(id).populate('posts');
    if (!profile) {
      return res.status(404).json({ message: `User doesn't exist` });
    }

    const returnData = profile.toObject();
    delete returnData.password;

    res.status(200).json(returnData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (String(req.user) !== String(id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (!name || !email) {
      return res.status(400).json({ message: 'Provide all details' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User Not Found!' });
    }

    const returnData = updatedUser.toObject();
    delete returnData.password;

    res.status(200).json(returnData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userProfile, updateProfile };
