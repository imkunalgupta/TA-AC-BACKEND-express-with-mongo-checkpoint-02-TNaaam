var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var remarkSchema = new Schema(
  {
    remark: { type: String, required: true },
    client: String,
    likes: { type: Number, default: 0 },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  },
  { timestamps: true }
);

var Remark = mongoose.model('Remark', remarkSchema);
module.exports = Remark;
