const express = require("express"),
  app = express(),
  cors = require("cors"),
  corsOptions = require("./config/corsOptions"),
  credentials = require("./middleware/credentials"),
  helmet = require("helmet"),
  hpp = require("hpp"),
  morgan = require("morgan"),
  path = require("path"),
  quotes = require("./quotes.json");

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://www.gstatic.com"],
      styleSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com",
      ],
      imgSrc: ["'self'"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
    },
  })
);

app.set("trust proxy", 1);
app.use(hpp());
app.disable("x-powered-by");    
app.use(credentials);
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/random-quote", (req, res) => {
  let random = Math.floor(Math.random() * 480);
  return res.status(200).json(quotes[random]);
});

app.get("/*", function (req, res) {
  return res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(2500, (err) => {
  if (err) return console.error(err);
  console.log("Server started successfully ✔🆗");
});
