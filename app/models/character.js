import mongoose from 'mongoose';

const STATES = {
    INITIAL: 'INITIAL',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
};

const Character = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
    },
    location: {
        type: String,
    },
    summary: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    tone: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
    },
    assistant: {
        type: String,
    },
    metaData: {
        state: {
            type: String,
            enum: Object.values(STATES),
            default: STATES.INITIAL,
        },
        errors: {
            type: [String],
        },
    },

}, { timestamps: true });

Character.statics = {

    STATES,

    create(data) {
        const character = new this({
            name: data.name,
            description: data.description,
            tone: data.tone,
            metaData: {
                state: STATES.INITIAL,
                errors: [],
            },
        });
        
        return character.save();
    },
};

export default mongoose.model('Character', Character);