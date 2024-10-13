import buildPerson from './build-person.js';

const JOBS = {
  "BUILD_PERSON": args => buildPerson(args),
};

export default JOBS;