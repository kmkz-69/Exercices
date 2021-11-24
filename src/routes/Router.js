import express from "express";
import mongoose from "mongoose";

const router = express.Router();
/*
 *App Routes
 */

//Get all Subscribers
router.get("/api", async (req, res) => {
  try {
    const subs = await schema.find({});
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//find one subscriber by id mongoose query
router.get("/api/:id", getSubs, (req, res) => {
  res.json(res.subs);

  console.log(typeof schema);
});
/***********/

router.get("/", async (_req, res) => {
  schema.find((err, subscriptions) => {
    if (err) {
      res.json({
        success: false,
        References: null,
      });
    } else {
      subscriptions
        .filter((e, i) => {
          return (
            e.current_status === "processing" &&
            new Date(2018, 12, 30).toLocaleDateString() > e.started_on
          );
        })
        .sort((a, b) => {
          return a.contract_reference - b.contract_reference;
        })
        .map((e, i) => {
          res.render("index", {
            Date: new Date().toUTCString(),
            Subscriptions: subscriptions,
            started_on: e.current_status,
            current_status: e.started_on,
            contract_references: e.contract_reference,
          });
          console.log(e.current_status, e.started_on);
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

/************************** */
// Schema for Subscriptions
const subschema = new mongoose.Schema({
  Company: { type: String, required: true },
  contract_reference: { type: String, required: true },
  current_status: { type: String, required: true },
  duration: { type: String, required: true },
  ended_on: { type: String, required: true },
  payment_method: { type: String, required: true },
  started_on: { type: String, required: true },
  SubscriptionModel: { type: String, required: true },
  SubscriptionType: { type: String, required: true },
  Tool: { type: String, required: true },
  ToolCategory: { type: String, required: true },
  ToolModel: { type: String, required: true },
});

const schema = mongoose.model("Subscriptions", subschema);
