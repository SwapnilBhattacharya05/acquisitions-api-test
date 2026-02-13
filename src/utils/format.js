export const formatValidationError = errors => {
  if (!errors || !errors.issues) return 'Validation Failed';

  if (Array.isArray(errors.issues))
    return errors.issues.map(i => i.message).join(', ');

  return JSON.stringify(errors);
};
