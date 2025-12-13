export const CreateCommentMessages = {
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  date: {
    invalidFormat: 'Date must be a valid ISO date',
  },
  rating: {
    invalidFormat: 'rating must be a number',
    lengthField: 'min length is 1, max is 5',
  },
} as const;
