import person from './api/person';

export default function (app) {
    app.use('/api', person);
}