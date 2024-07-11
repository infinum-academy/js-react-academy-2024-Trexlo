import { IReview } from '@/typings/Review.type';
import {render, screen} from '@testing-library/react'
import { ReviewItem } from './ReviewItem';

describe('ReviewItem', () => {
    const mockReview:IReview = {
        avatar: "https://fakeimg.pl/100x100/d4d4d4/000000?text=:-))))",
        email: "mail@mail.com",
        comment: "comment",
        rating: 4,
    };

    it('should have correct user email', () => {
        render(<ReviewItem review={mockReview} removeReview={()=>{}}/>)

        const email = screen.getByText(mockReview.email);

        expect(email).toBeInTheDocument();
        expect(email).toHaveTextContent(mockReview.email);
    });

    it('should have correct rating', () => {
        const {container} = render(<ReviewItem review={mockReview} removeReview={()=>{}}/>)
        
        const stars = container.querySelectorAll('svg');

        for (let index = 0; index < 5; index++) {
            const star = stars[index];

            if(index+1 <= mockReview.rating){
                expect(star).toHaveStyle('color: yellow')
            }else {
                expect(star).toHaveStyle('color: white')
            }

            expect(star).toBeInTheDocument();
        }
    });

    it('should have correct comment', () => {
        render(<ReviewItem review={mockReview} removeReview={()=>{}}/>)
        
        const comment = screen.getByText(mockReview.comment);

        expect(comment).toBeInTheDocument();
    });

    it('should have delete button', () => {
        render(<ReviewItem review={mockReview} removeReview={()=>{}}/>)

        const button = screen.getByText("Remove");

        expect(button).toBeInTheDocument();
    });

    it('should call removeReview on click once with correct data', () => {
        const mockOnDelete = jest.fn();

        render(<ReviewItem review={mockReview} removeReview={mockOnDelete}/>);

        const button = screen.getByText("Remove");
        button.click();

        expect(mockOnDelete).toHaveBeenCalled();
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenCalledWith(mockReview, 'remove');
    });
})  