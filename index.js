import express from 'express';
import path from 'path';
import multer from 'multer';
import pg from "pg";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import { fileURLToPath } from 'url';
import classifyImage from './api.js';

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const saltRounds = 10;

// In-memory user store
const users = [];

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the file
  },
  filename: (req, file, cb) => {
    // Use original name or generate a unique name
    cb(null, file.originalname); // Saving the file with the original name
  }
});

const upload = multer({ storage: storage });

// Serve static files (like CSS) if needed
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "TOPSECRETWORD",
    resave: false,
    saveUninitialized: true,
    cookie:{
      maxAge:1000*60*60*24,
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "skin_cancer",
  password: "root",
  port: 5432,
});
db.connect();

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            // Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              // Passed password check
              return cb(null, user);
            } else {
              // Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Define routes
app.get('/', (req, res) => {
  if(req.isAuthenticated()){
    res.render('home');
  }else{
    res.redirect('/login');
  }
  
});
app.get('/predict', (req, res) => {
  res.render('index');
})

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body);  // Log to verify form data is being received

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
            [fullname, email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) {
              console.error("Error logging in user:", err);
              res.redirect("/login");
            } else {
              console.log("success");
              res.redirect("/");
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});


app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

app.post('/upload', upload.single('image'), async (req, res) => {
  if(req.isAuthenticated()){
    const labels = {
      'bcc': 'Basal Cell Carcinoma',
      'bkl': 'Benign Keratosis-like Lesions',
      'nv': 'Melanocytic Nevi',
      'mel': 'Melanoma',
      'akiec': 'Actinic Keratosis and Intraepithelial Carcinoma',
      'vasc': 'Vascular Lesions',
      'df': 'Dermatofibroma'
    };
  
    if (req.file) {
      try {
        // Classify the image
        const predict = await classifyImage(`uploads/${req.file.originalname}`);
        console.log(predict);
  
        // Render the report with prediction and labels
        res.render('report', { predict, labels });
      } catch (error) {
        console.error('Error classifying image:', error);
        res.status(500).send('An error occurred while classifying the image.');
      }
    } else {
      res.send('No file uploaded.');
    }
  }else{
    res.redirect('/login');
  }
  
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
