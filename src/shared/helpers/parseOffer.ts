import {City, Goods, Offer, OfferType} from '../../types/index.js';

export function parseOffer(data: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxGuests,
    price,
    goods,
    authorName,
    authorEmail,
    authorAvatar,
    latitude,
    longitude,
    id,
    commentCount] = data.split('\t');

  return {
    title,
    description,
    postDate: postDate,
    city: City[city as keyof typeof City],
    previewImage,
    images: images.split(','),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    type: type as OfferType,
    rooms: parseInt(bedrooms, 10),
    guests: parseInt(maxGuests, 10),
    price: parseInt(price, 10),
    goods: goods.split(';').map((good) => good as Goods),
    authorName,
    authorEmail,
    authorAvatar,
    id,
    commentsCount: parseInt(commentCount, 10),
    coordinates: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)},
  };
}
