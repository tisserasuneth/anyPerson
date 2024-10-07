import person from './api/person.js';

export default function (app) {
    app.use('/api', person);
}