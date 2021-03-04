const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.loginUser = async (req, res) => {

    // Look for the user in DB
    const user = await User.findOne({
        username: req.body.username
    });

    // Check if the user exists
    if (!user) {
        return res.status(400).json({ error: 'User doesn\'t exist' });
    }

    // Encrypt and match password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send({ error: 'Invalid Password' });
    }

    // Sign a JWT token with a secret key
    const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
            iat: new Date().getTime()
        },
        process.env.JWT_TOKEN
    );

    // Send JWT token
    res.header('auth-token', token).status(202).send({ token, user });

}

exports.signupUser = async (req, res) => {

    // Look for the same user
    const emailExists = await User.findOne({ email: req.body.email });

    // Check if user already exists
    if (emailExists) {
        return res.status(400).json({ error: 'Email already exists' })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User Model with the info provided
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        defaultIP: req.ip,
        username: req.body.username
    });

    // Save user to DB
    try {
        const saveUser = await newUser.save();

        // Send a welcome mail
        // welcomeMail(req.body.email, req.body.name)

        // Send registration confirmation message to client
        res.status(202).send({ success: true });
    }
    catch (err) {
        res.status(406).send({ error: err });
    }
}