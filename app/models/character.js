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
    description: {
        type: String,
        required: true,
    },
    personalize: {
        type: String,
        required: true,
    },
    age: {
        type: String,
    },
    location: {
        type: String,
    },
    job: {
        type: String,
    },
    education: {
        degree: {
            type: String,
        },
        fieldOfStudy: {
            type: String,
        },
        institution: {
            type: String,
        },
        graduationYear: {
            type: String,
        }
    },
    hobbies: {
        type: [String],
    },
    languages: {
        type: [String],
    },
    favoriteFoods: {
        type: [String],
    },
    lifeEvents: [{
        event: {
            type: String,
        },
        date: {
            type: String,
        },
        _id: false,
    }],
    goals: {
        type: [String],
    },
    imageDescription: {
        type: String,
    },
    image: {
        type: String,
    },
    summary: {
        type: String,
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
            personalize: data.personalize,
            metaData: {
                state: STATES.INITIAL,
                errors: [],
            },
        });
        
        return character.save();
    },
};

export default mongoose.model('Character', Character);