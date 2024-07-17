import { IReview } from '@/typings/Review.type';
import {render, screen} from '@testing-library/react'
import { DeleteReviewItemButton } from '../DeleteReviewItemButton/DeleteReviewItemButton';
import { useUser } from '../../../../hooks/useUser';
import { ReviewItem } from './ReviewItem';

jest.mock('../../../../hooks/useUser', () => ({
    useUser: () =>  [{
        accessToken:"",
        client:"",
        expiry:"",
        uid:"mail"
    }, jest.fn()]
}));

jest.mock('../DeleteReviewItemButton/DeleteReviewItemButton', () => {
    return {
        DeleteReviewItemButton: jest.fn().mockReturnValue(null),
    };
});

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

    it('should have delete button component', async () => {
        render(<ReviewItem review={mockReview} />)

        expect(DeleteReviewItemButton).toHaveBeenCalled();
    });
})  