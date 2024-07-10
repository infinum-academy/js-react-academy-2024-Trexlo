
import { IReview } from '@/typings/Review.type';
import { IShow } from '@/typings/Show.type';
import {render, screen} from '@testing-library/react'
import { ReviewForm } from './ReviewForm';
/**


ReviewItem
    check if related input comment, rating & button components are rendered
 */
describe('ReviewForm', () => {
    it('should have rendered comment input', () => {
        render(<ReviewForm addShowReview={()=>{}}/>)

        const input = screen.getByPlaceholderText("Add comment");

        expect(input).toBeInTheDocument();
    });
    it('should have rendered rating input', () => {
        render(<ReviewForm addShowReview={()=>{}}/>)

        const group = screen.getByRole('radiogroup');
        const input = screen.getAllByRole('radio');
        expect(group).toBeInTheDocument();
        input.forEach(i => expect(group).toBeInTheDocument());
        expect(input.length).toBe(5);
    });
    it('should have rendered button', () => {
        render(<ReviewForm addShowReview={()=>{}}/>)

        const button = screen.getByText("Post");
        expect(button).toBeInTheDocument();
    });

    
})  