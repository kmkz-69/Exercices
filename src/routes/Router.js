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

//Put a single Subscriber
router.put("/api/test",  async (req, res) => {
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
  const updatedSubs = new schema({
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
    const result = await updatedSubs.save();
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

 //Patch a single Subscriber
router.patch("/api/:id", getSubs, async (req, res) => {
  if (req.body.Company != null) {
    res.subs.Company = req.body.Company;
  }
  if (req.body.contract_reference != null) {
    res.subs.contract_reference = req.body.contract_reference;
  }
  if (req.body.current_status != null) {
    res.subs.current_status = req.body.current_status;
  }
  if (req.body.duration != null) {
    res.subs.duration = req.body.duration;
  }
  if (req.body.ended_on != null) {
    res.subs.ended_on = req.body.ended_on;
  }
  if (req.body.active != null) {
    res.subs.active = req.body.active;

  }
  if (req.body.payment_method != null) {
    res.subs.payment_method = req.body.payment_method;
  }
  if (req.body.started_on != null) {
    res.subs.started_on = req.body.started_on;
  }
  if (req.body.SubscriptionModel != null) {

    res.subs.SubscriptionModel = req.body.SubscriptionModel;
  }
  if (req.body.SubscriptionType != null) {
    res.subs.SubscriptionType = req.body.SubscriptionType;
  }
  if (req.body.Tool != null) {
    res.subs.Tool = req.body.Tool;
  }
  if (req.body.ToolCategory != null) {
    res.subs.ToolCategory = req.body.ToolCategory;
  }
  if (req.body.ToolModel != null) {
    res.subs.ToolModel = req.body.ToolModel;
  }
  if (req.body.renewable != null) {
    res.subs.renewable = req.body.renewable;
  }
  if (req.body.cancelled != null) {
    res.subs.cancelled = req.body.cancelled;
  }
  if (req.body.denounced != null) {
    res.subs.denounced = req.body.denounced;
  }
  try {
    const result = await res.subs.save();
    res.json(result);
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


//Optimistic Locking
async function getSubs(req, res, next) {
  let subs;
  try {
    subs = await schema.findById(req.params.id);
    if (subs == null) {
      return res.status(404).json({ message: "Cannot find Subscription" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subs = subs;
  next();
}

router.get("/", async (req, res) => {
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
  
export default router;
