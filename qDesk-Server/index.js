// require
const express = require('express');
const cors = require("cors")
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

// configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}
require('dotenv').config()
const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

// verify JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" })
  }

  jwt.verify(token, process.env.JSON_TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" })
    }
    req.user = decoded;
    next()
  })
}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nuv2b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const jobsCollection = client.db("qDeskDB").collection("jobs")
    const bidsCollection = client.db("qDeskDB").collection("bids")

    // ++++++ JWT related API starts ++++++++++
    // set cookie in the browser
    app.post("/jwt", async (req, res) => {
      const userInfo = req.body;
      const token = jwt.sign(userInfo, process.env.JSON_TOKEN_KEY, { expiresIn: '7d' });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true })
    })

    // clear cookie from the browser
    app.get("/log-out", async (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true })
    })

    // ++++++ Job related API starts ++++++++++

    // get all jobs
    app.get("/jobs", async (req, res) => {
      const result = await jobsCollection.find().toArray()
      res.send(result)
    })

    // get all jobs count for pagination
    app.get("/job-count", async (req, res) => {
      const filter = req.query.filter;
      const search = req.query.search
      let query = {
        job_title: { $regex: search, $options: "i" }
      }
      if (filter) {
        query.category = filter
      }
      const count = await jobsCollection.countDocuments(query)
      res.send({ count })
    })

    // get jobs for per page (filter, search, sort, pagination) 
    app.get("/jobs-per-page", async (req, res) => {
      const page = parseInt(req.query.page) - 1;
      const size = parseInt(req.query.size);
      const filter = req.query.filter;
      const sort = req.query.sort
      const search = req.query.search
      let query = {
        job_title: { $regex: search, $options: "i" }
      }
      let options = {}
      if (filter) {
        query.category = filter
      }
      if (sort) {
        options = {
          sort: { deadline: sort === "asc" ? 1 : -1 }
        }
      }
      const result = await jobsCollection.find(query, options).skip(page * size).limit(size).toArray()
      res.send(result)
    })

    // get a specific job
    app.get("/job/:id", async (req, res) => {
      const jobId = req.params.id;
      const query = { _id: new ObjectId(jobId) }
      const result = await jobsCollection.findOne(query)
      res.send(result)
    })

    // get user specific jobs
    app.get("/jobs/:email", verifyToken, async (req, res) => {
      const userEmail = req.user.email;
      const email = req.params.email;
      if (userEmail !== email) {
        return res.status(403).send({ message: "Forbidden" })
      }
      const query = { "buyer.email": email }
      const result = await jobsCollection.find(query).toArray()
      res.send(result)
    })

    // post a job
    app.post("/jobs", verifyToken, async (req, res) => {
      const jobInfo = req.body;
      const result = await jobsCollection.insertOne(jobInfo)
      res.send(result)
    })

    // update a specific job
    app.put("/job/:id", verifyToken, async (req, res) => {
      const jobId = req.params.id;
      const jobData = req.body;
      const query = { _id: new ObjectId(jobId) }
      const options = { upsert: true }
      const updateJob = {
        $set: {
          ...jobData
        }
      }
      const result = await jobsCollection.updateOne(query, updateJob, options)
      res.send(result)
    })

    // delete a job
    app.delete("/job/:id", verifyToken, async (req, res) => {
      const jobId = req.params.id;
      const query = { _id: new ObjectId(jobId) }
      const result = await jobsCollection.deleteOne(query)
      res.send(result)
    })

    // ++++++ Bid related API starts ++++++++++

    // get user specific bids
    app.get("/my-bids/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      // console.log(email);
      const query = { email: email }
      const result = await bidsCollection.find(query).toArray()
      res.send(result)
    })

    // get buyer specific bids
    app.get("/bid-requests/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { buyer_email: email }
      const result = await bidsCollection.find(query).toArray()
      res.send(result)
    })

    // place a bid request
    app.post("/bids", verifyToken, async (req, res) => {
      const bidInfo = req.body;
      const query = { jobId: bidInfo.jobId, email: bidInfo.email }
      const isExistsJob = await bidsCollection.findOne(query)
      if (isExistsJob) {
        return res
          .status(400)
          .send({ message: "Already applied this job!" })
      };

      const result = await bidsCollection.insertOne(bidInfo)
      res.send(result)
    })

    // update specific bid status
    app.patch("/bid/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const query = { _id: new ObjectId(id) }
      const updateBid = {
        $set: status
      }
      const result = await bidsCollection.updateOne(query, updateBid)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("qDesk server is running");
})

app.listen(port, () => {
  console.log(`server is running on ${port}`);
})