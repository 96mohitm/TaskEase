def format_errors(errors):
  if 'title' in errors:
    return {"error": errors['title'][0]}
  error_key = next(iter(errors))
  return {"error": errors[error_key][0]}
