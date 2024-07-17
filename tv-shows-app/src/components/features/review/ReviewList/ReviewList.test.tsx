import { IReview } from '@/typings/Review.type';
import {render, screen} from '@testing-library/react'
import { ReviewItem } from '../ReviewItem/ReviewItem';
import { ReviewList } from './ReviewList';
jest.mock('../ReviewItem/ReviewItem', () => {
    return {
        ReviewItem: jest.fn().mockReturnValue(null),
    };
});
describe('ReviewList', () => {
    const mockReviews:IReview[] = [
        {
            comment: "comment",
            rating: 4,
            id: "1",
            show_id: 2,
            user: {
                email: "mail",
                id: "3",
                image_url: undefined
            }
        },
        {
            comment: "comment2",
            rating: 2,
            id: "5",
            show_id: 2,
            user: {
                email: "mail2",
                id: "6",
                image_url: undefined
            }
        },
    ];

    it('should call ReviewItem with appropriate props', ()=>{
        render(<ReviewList reviews={mockReviews} removeReview={jest.fn()}/>)
        mockReviews.forEach((review, index) => {
            expect(ReviewItem).toHaveBeenCalledWith(review, expect.anything());
        });
        expect(ReviewItem).toHaveBeenCalledTimes(mockReviews.length);
    })
})  