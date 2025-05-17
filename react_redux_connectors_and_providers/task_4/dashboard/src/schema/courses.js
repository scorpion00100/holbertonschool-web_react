import { normalize, schema } from 'normalizr';

// Define course schema
const courseSchema = new schema.Entity('courses');

// Normalizer function
export const coursesNormalizer = (data) => {
  return normalize(data, [courseSchema]);
};
