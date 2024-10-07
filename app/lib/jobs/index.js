import buildPerson from './build-person.js';

const JOBS = {
  "build-person": args => buildPerson(args),
};

export default JOBS;