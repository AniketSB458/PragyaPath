import mongoose from 'mongoose';

const PersonalNoteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
);

const PersonalNote = mongoose.models.PersonalNote || mongoose.model('PersonalNote', PersonalNoteSchema);
export default PersonalNote;
