export const handleAdminError = (error) => {
  const error_message = error?.data?.error_message;

  if (error_message === 'error_invalid_input') {
    return 'Les données envoyées sont invalides.';
  }

  if (error_message === 'error_not_found') {
    return 'Élément introuvable.';
  }

  handleFrontendError(error, error_message);

  return 'Une erreur est survenue.';
};
