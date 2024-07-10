import { IShow } from '@/typings/Show.type';
import {render, screen} from '@testing-library/react'
import { ShowCard } from './ShowCard';

describe('ShowCard', () => {
    const mockShow: IShow = {
      title: "test",
      average_rating: 1,
      description: "desc",
      id: "1",
      image_url: "url",
      no_of_reviews: 1,
    };
    const mockShowNoRating: IShow = {
      title: "test",
      average_rating: undefined,
      description: "desc",
      id: "1",
      image_url: "url",
      no_of_reviews: 1,
    };

    it('should contain image element with correct url', () => {
        render(<ShowCard show={mockShow}/>);

        const image = screen.getByRole('img');

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockShow.image_url);
    });

    it('should have a title', ()=>{
        render(<ShowCard show={mockShow}/>);

        const title = screen.getByText(mockShow.title);

        expect(title).toBeInTheDocument();
    });

    it('should have a correct average rating rendered', ()=>{
        render(<ShowCard show={mockShow}/>);

        const rating = screen.getByText(" / 5", {exact:false});

        expect(rating).toBeInTheDocument();
        expect(rating.textContent).toContain(mockShow.average_rating?.toFixed(1) + " / 5");
    });

    it('should have a correct average rating rendered when it has no ratings', ()=>{
        render(<ShowCard show={mockShowNoRating}/>);

        const rating = screen.getByText("No ratings", {exact:false});

        expect(rating).toBeInTheDocument();
        expect(rating.textContent).toContain("No ratings");
    });
})  