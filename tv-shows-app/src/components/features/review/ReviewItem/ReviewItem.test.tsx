import { IReview } from '@/typings/Review.type';
import {render, screen} from '@testing-library/react'
import { ReviewItem } from './ReviewItem';
import { useUser } from '../../../../hooks/useUser';

jest.mock('../../../../hooks/useUser', () => ({
    useUser: () =>  [{
        accessToken:"",
        client:"",
        expiry:"",
        uid:"mail"
    }, jest.fn()]
}));

describe('ReviewItem', () => {
    const mockReview:IReview = {
        comment: "comment",
        rating: 4,
        id: "1",
        show_id: 2,
        user: {
            email: "mail",
            id: "3",
            image_url: undefined
        }
    };

    it('should have correct user email', () => {
        render(<ReviewItem review={mockReview} />)

        const email = screen.getByText(mockReview.user.email);

        expect(email).toBeInTheDocument();
        expect(email).toHaveTextContent(mockReview.user.email);
    });

    it('should have correct rating', () => {
        const {container} = render(<ReviewItem review={mockReview} />)
        
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
        render(<ReviewItem review={mockReview} />)
        
        const comment = screen.getByText(mockReview.comment);

        expect(comment).toBeInTheDocument();
    });

    it('should have delete button', async () => {
        render(<ReviewItem review={mockReview} />)

        const button = await screen.findByText("Remove");

        expect(button).toBeInTheDocument();
    });

    // it('should call removeReview on click once with correct data', () => {
    //     const mockOnDelete = jest.fn();

    //     render(<ReviewItem review={mockReview} removeReview={mockOnDelete}/>);

    //     const button = screen.getByText("Remove");
    //     button.click();

    //     expect(mockOnDelete).toHaveBeenCalled();
    //     expect(mockOnDelete).toHaveBeenCalledTimes(1);
    //     expect(mockOnDelete).toHaveBeenCalledWith(mockReview, 'remove');
    // });
})  