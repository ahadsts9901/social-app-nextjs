// generate tokens
const hartRef = jwt.sign({
  firstName: firstName,
  lastName: lastName,
  email: email,
  isAdmin: false,
  profilePhoto: null,
  _id: signupResponse.insertedId,
}, process.env.JWT_SECRET, {
  expiresIn: extendedSessionInDays * 24 * 60 * 60 * 1000,
});

const hart = jwt.sign({
  firstName: firstName,
  lastName: lastName,
  email: email,
  isAdmin: false,
  profilePhoto: null,
  _id: signupResponse.insertedId,
}, process.env.JWT_SECRET, {
  expiresIn: initialSessionInDays * 24 * 60 * 60 * 1000,
});

const response = NextResponse.json({
  message: "Verification email has sent, verify your email"
});

response.cookies.set('hartRef', hartRef, {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + extendedSessionInDays * 24 * 60 * 60 * 1000)
});

response.cookies.set('hart', hart, {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + initialSessionInDays * 24 * 60 * 60 * 1000)
});

return response;