import express from "express";
import schema from "../schema/schema.js";


const router = express.Router();

//Get all Subscribers
router.get("/api", async (req, res) => {
  try {
    const subs = await schema.find({});
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get a single Subscriber
router.get("/api/:id", getSubs, (req, res) => {
  res.json(res.subs);
});

//Post a new subscriber
router.post("/api/subscriber", async (req, res) => {
  const {
    Company,
    contract_reference,
    current_status,
    duration,
    ended_on,
    active,
    payment_method,
    started_on,
    SubscriptionModel,
    SubscriptionType,
    Tool,
    ToolCategory,
    ToolModel,
    renewable,
    cancelled,
    denounced,
  } = req.body;
  const newSubs = new schema({
    Company,
    contract_reference,
    current_status,
    duration,
    ended_on,
    active,
    payment_method,
    started_on,
    SubscriptionModel,
    SubscriptionType,
    Tool,
    ToolCategory,
    ToolModel,
    renewable,
    cancelled,
    denounced,
  });
  try {
    const result = await newSubs.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete a Subscriber
router.delete("/api/:id", getSubs, async (req, res) => {
  try {
    await res.subs.deleteOne({ _id: req.params.id });
    res.json({ message: "Deleted Subscription" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (_req, res) => {
  schema.find((err, subscriptions) => {
    
    if (err) {
      res.json({
        success: false,
        References: null,
      });
    } else {
      subscriptions
      .filter((e) => {
        return (
          e.started_on = new Date(e.started_on).toLocaleDateString()

          // e.current_status === "processing" 
          // &&
          // new Date(2018, 12, 30).toLocaleDateString()> e.started_on 
          );
        })
        .sort((a, b) => {
          return a.contract_reference - b.contract_reference;
        })
        .map((e) => {
          res.render("index", {
            Date: new Date().toUTCString(),
            Subscriptions: subscriptions,
            
          });
        });
    }
  });
});


//middleware to use for all requests
async function getSubs(req, res, next) {
  let subs;
  try {
    subs = await schema.findById(req.params.id);
    if (!subs) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.subs = subs;
  next();
}
export default router;
