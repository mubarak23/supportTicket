const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    product: {
      type: String,
      required: [true, "Please a product"],
      enum: ["iPhone", "MacBook Pro", "iMac", "iPad"],
    },

    description: {
      type: String,
      required: [true, "Please enter description of the ticket"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tickets", ticketSchema);
