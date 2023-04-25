const Login = require('../modals/loginModal');

module.exports.login = async (req, res) => {
    console.log(req.body);
    const login = await new Login({ email: req.body.email, password: req.body.password });
    login.save();
    res.status(200).json({
        status: 'success',
        data: {
            login
        }
    });
    console.log('login is working');
}
