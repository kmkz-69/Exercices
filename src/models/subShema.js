import mongoose from "mongoose";

// Schema for Subscriptions
const subschema =  new mongoose.Schema({
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
export default schema;