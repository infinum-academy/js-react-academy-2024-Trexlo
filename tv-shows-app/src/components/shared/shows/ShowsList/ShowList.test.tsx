import { IShow } from '@/typings/Show.type';
import { render } from '@testing-library/react'
import { ShowsList } from './ShowsList';
import { ShowCard } from "../ShowCard/ShowCard";

jest.mock('../ShowCard/ShowCard', () => {
	return {
		ShowCard: jest.fn().mockReturnValue(null),
	};
});
describe('ShowList', () => {
    const mockShows:IShow[] = [
        {title: 'test1', average_rating:1, description:"desc", id:"1", image_url:"url", no_of_reviews:1},
        {title: 'test2', average_rating:1, description:"desc", id:"2", image_url:"url", no_of_reviews:1},
        {title: 'test3', average_rating:1, description:"desc", id:"3", image_url:"url", no_of_reviews:1},
        {title: 'test4', average_rating:1, description:"desc", id:"4", image_url:"url", no_of_reviews:1}
    ];

    it('should call ShowCard with appropriate props', () => {
        render(<ShowsList shows={mockShows}/>);

        mockShows.forEach((show, index) => {
            expect(ShowCard).toHaveBeenCalledWith({show}, expect.anything());
        });
        expect(ShowCard).toHaveBeenCalledTimes(mockShows.length);
    });
})  