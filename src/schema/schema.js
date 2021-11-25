import mongoose from "mongoose";

const subschema = new mongoose.Schema({
  Company: { type: String, required: true },
  contract_reference: { type: String, required: true },
  current_status: { type: String, required: true },
  duration: { type: Number, required: true },
  ended_on: { type: String, required: true },
  renewable: { type: Boolean, required: true },
  active: { type: Boolean, required: true },
  cancelled: { type: Boolean, required: true },
  denounced: { type: Boolean, required: true },
  payment_method: { type: String, required: true },
  started_on: { type: String, required: true },
  SubscriptionModel: { type: String, required: true },
  SubscriptionType: { type: String, required: true },
  Tool: { type: String, required: true },
  ToolCategory: { type: String, required: true },
  ToolModel: { type: String, required: true },
});

const schema = mongoose.model("Subscription", subschema);
export default schema;
