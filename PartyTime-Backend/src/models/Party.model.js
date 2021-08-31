import { Schema, model } from "mongoose";


const partySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    adminId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    points: {
        type: {
            pointName: {
                type: String,
                required: true
            },
            maxPoints: {
                type: Number,
                required: true
            }
        },
        default: {
            pointName: "Points",
            maxPoints: 500
        }
    },
    stepsPoints: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: null
    },
    isPublic:{
        type: Boolean,
        default: true
    }, 
    creationDate: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Party', partySchema);