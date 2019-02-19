const config = require('config.json');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const nodemailer = require("nodemailer");

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, email: 'test', password: 'test' }];

module.exports = {
    login,
    signUp,
    verifyEmail
};

async function login({ email, password }) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        if (!user.verifed) {
            return ({
                message: "user not verifed",
                previewUrl: user.previewUrl
            })
        }
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            message: "success",
            ...userWithoutPassword,
            token
        };
    } else {
        throw ("no user found")
    }
}

async function signUp({ nickname, email, password }) {
    if (!email || !password) {
        // we know they have by-passed front end security
        throw ("Please sign up through our web application");
    }
    // do validation
    let hashedEmail = md5(email)
    
    const user = users.find(u => u.id === hashedEmail);
    if (user) {
        throw("Already used this email address")
    }
    // Generate test SMTP service account from ethereal.email
    const account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    const mailOptions = {
        from: '"Peter Kirkham" <me@fakeemail.com>', // sender address
        to: email,
        subject: "Verify your email", // Subject line
        text: `http://localhost:4000/users/verify-email?id=${hashedEmail}`
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions)
    users.push({
        id: hashedEmail,
        nickname,
        email,
        password: md5(password),
        verifed: false,
        previewUrl: nodemailer.getTestMessageUrl(info)
    });
    console.log(users)
    return {
        message: "success",
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info)
    };
}

async function verifyEmail({ id }) {
    const user = users.find(u => u.id === id);
    if (user) {
        user.verifed = true
        return {
            message: "success"
        };
    } else {
        throw ("no user found")
    }
}