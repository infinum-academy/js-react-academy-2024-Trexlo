import {render, screen} from '@testing-library/react'
import { ReviewForm } from './ReviewForm';

describe('ReviewForm', () => {
    it('should have rendered comment input', () => {
        render(<ReviewForm showId={1}/>);

        const input = screen.getByPlaceholderText("Add comment");

        expect(input).toBeInTheDocument();
    });

    it('should have rendered rating input', () => {
        render(<ReviewForm showId={1}/>)

        const group = screen.getByRole('radiogroup');
        const input = screen.getAllByRole('radio');

        expect(group).toBeInTheDocument();
        input.forEach(i => expect(i).toBeInTheDocument());
        expect(input.length).toBe(5);
    });

    it('should have rendered button', () => {
        render(<ReviewForm showId={1}/>)

        const button = screen.getByText("Post");

        expect(button).toBeInTheDocument();
    });
})  