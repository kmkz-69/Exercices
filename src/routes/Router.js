import express from "express";
import mongoose from "mongoose";

const router = express.Router();
/*
 *App Routes
 */

router.get("/api", (req, res) => {
  schema.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

router.get("/", (req, res) => {
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
            new Date(2018, 12, 30).toISOString() > e.started_on 
          );
        })
        .sort((a, b) => {
          return a.contract_reference - b.contract_reference;
        })
        .map((e, i) => {
          res.render("index", {
            started_on: e.current_status,
            current_status: e.started_on,
            contract_references: e.contract_reference,
          });
          console.log(e.current_status, e.started_on);
        });
    }
  });
});

export default router;

/************************** */
// Schema for Subscriptions
const subschema = new mongoose.Schema({
  id: { type: String, required: true },
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

const schema = mongoose.model("subscriptions", subschema);
