import React, {JSX, memo} from 'react';
import {useState} from 'react';
import {minCommentLength, maxCommentLength} from '../../const.ts';
import {sendReview} from '../../store/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getDetailOffer} from '../../store/detail-offer-data/selectors.ts';

function ReviewForm(): JSX.Element {
  const [formData, setFormData] = useState({
    review: '',
    rating: 0
  });
  const dispatch = useAppDispatch();
  const offerId = useAppSelector(getDetailOffer)!.id;
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    dispatch(
      sendReview({
        offerId,
        rating: formData.rating,
        comment: formData.review,
      }),
    ).then(() => {
      setFormData({rating: 0, review: ''});
    });
  };

  const isValid =
    formData.review.length >= minCommentLength &&
    formData.review.length <= maxCommentLength &&
    formData.rating !== null;

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value,
    });
  };

  function renderRatingInput(value: number, title: string) {
    return (
      <>
        <input
          className="form__rating-input visually-hidden"
          onChange={handleFieldChange}
          name="rating"
          value={value}
          id={`${value}-stars`}
          type="radio"
          checked={formData.rating === value}
        />
        <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </>
    );
  }

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderRatingInput(5, 'perfect')}
        {renderRatingInput(4, 'good')}
        {renderRatingInput(3, 'not bad')}
        {renderRatingInput(2, 'badly')}
        {renderRatingInput(1, 'terribly')}
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={handleFieldChange} value={formData.review} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{minCommentLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >Submit
        </button>
      </div>
    </form>
  );
}

const MemoizedReviewForm = memo(ReviewForm);
export default MemoizedReviewForm;
