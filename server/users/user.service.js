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
            throw("user not verifed")
        }
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    } else {
        throw("no user found")
    }
}

async function signUp({ email, password }) {
    if (!email || !password) {
        // we know they have by-passed front end security
        throw ("Please sign up through our web application");
    }
    // do validation
    hashedEmail = md5(email)
    users.push({
        id: hashedEmail,
        email,
        password: md5(password),
        verifed: false
    });
    
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
        text: `http://localhost:4000/users?id=${hashedEmail}`
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions)

    console.log(users)

    return {
        status: "success",
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info)
    };
}

async function verifyEmail({ id }) {
    const user = users.find(u => u.id === id);
    if (user) {
        user.verifed = true
        return {
            status: "success"
        };
    } else {
       throw("no user found")
    }
}