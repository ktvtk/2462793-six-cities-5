import {City, Goods, Offer, OfferType} from '../../types/index.js';

export function parseOffer(data: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
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
    id,
    latitude,
    longitude] = data.replace('\n', '')
    .split('\t');

  return {
    title,
    description,
    postDate: postDate,
    city: City[city as keyof typeof City],
    previewImage,
    images: [image1, image2, image3, image4, image5, image6],
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    type: OfferType[type as keyof typeof OfferType],
    rooms: parseInt(bedrooms, 10),
    guests: parseInt(maxGuests, 10),
    price: parseInt(price, 10),
    goods: goods.split(';').map((good) => good as Goods),
    authorName,
    authorEmail,
    authorAvatar,
    id,
    commentsCount: 0,
    coordinates: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)},
  };
}
