import {City, Goods, Offer, OfferType, UserType} from '../../types/index.js';

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
    authorType,
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
    maxGuests: parseInt(maxGuests, 10),
    price: parseInt(price, 10),
    goods: goods.split(';').map((good) => good as Goods),
    author:{
      name: authorName,
      email: authorEmail,
      avatar: authorAvatar,
      type: UserType[authorType as keyof typeof UserType] ,
    },
    id,
    commentsCount: parseInt(commentCount, 10),
    coordinates: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)},
  };
}
