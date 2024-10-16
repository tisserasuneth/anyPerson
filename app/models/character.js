import mongoose from 'mongoose';

const Character = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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
        }
    }],
    goals: {
        type: [String],
    },
    imageDescription: {
        type: String,
    },
    metaData: {
        state: {
            type: String,
            default: 'INITIAL',
        },
        errors: {
            type: [String],
        },
    },

}, { timestamps: true });

Character.statics = {

    STATES:{
        INITIAL: 'INITIAL',
        PROCESSING: 'PROCESSING',
        COMPLETED: 'COMPLETED',
        FAILED: 'FAILED',
    },

    create(data) {
        const character = new this({
            name: data.name,
            age: data.age,
            description: data.description,
        });
        
        return character.save();
    },
};

export default mongoose.model('Character', Character);