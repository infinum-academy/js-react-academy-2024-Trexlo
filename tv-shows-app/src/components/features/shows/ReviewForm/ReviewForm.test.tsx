import {render, screen} from '@testing-library/react'
import { ReviewForm } from './ReviewForm';

describe('ReviewForm', () => {
    it('should have rendered comment input', () => {
        render(<ReviewForm addShowReview={()=>{}}/>);

        const input = screen.getByPlaceholderText("Add comment");

        expect(input).toBeInTheDocument();
    });

    it('should have rendered rating input', () => {
        render(<ReviewForm addShowReview={()=>{}}/>)

        const group = screen.getByRole('radiogroup');
        const input = screen.getAllByRole('radio');

        expect(group).toBeInTheDocument();
        input.forEach(i => expect(i).toBeInTheDocument());
        expect(input.length).toBe(5);
    });

    it('should have rendered button', () => {
        render(<ReviewForm addShowReview={()=>{}}/>)

        const button = screen.getByText("Post");

        expect(button).toBeInTheDocument();
    });
})  