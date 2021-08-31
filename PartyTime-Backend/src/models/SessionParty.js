import { Schema, model } from "mongoose";


const SessionPartySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    partyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Party'
    },
    points: {
        type: String,
        required: true
    },
    lastPoints: {
        type: Date,
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('SessionParty', SessionPartySchema);