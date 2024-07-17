
import { deleteReview } from '../../../../fetchers/show';
import { render, screen, waitFor, act } from '@testing-library/react';
import { mutate } from 'swr';
import { DeleteReviewItemButton } from './DeleteReviewItemButton';

jest.mock('../../../../fetchers/show', () => {
	return {
		deleteReview: jest.fn().mockResolvedValue(null),
	};
});

jest.mock('swr', () => {
	return {
		mutate: jest.fn(),
	};
});

describe('DeleteTodoButton', () => {
	it('should render button and open modal on click with yes and no buttons', async () => {
		render(<DeleteReviewItemButton reviewId='1' showId='2' />);

		const deleteButton = screen.getByRole('button');

		act(() => {
			deleteButton.click();
		});

        const yesButton = await screen.findByRole('button', { name: 'Yes' });
        const noButton = await screen.findByRole('button', { name: 'No' });

		await waitFor(() => {
			expect(noButton).toBeInTheDocument();
            expect(yesButton).toBeInTheDocument();
		});
	});

    it('should call deleteReview and mutate on success', async () => {
		render(<DeleteReviewItemButton reviewId='1' showId='2' />);

		const deleteButton = screen.getByRole('button');

		act(() => {
			deleteButton.click();
		});

        const yesButton = await screen.findByRole('button', { name: 'Yes' });
		act(() => {
			yesButton.click();
		});

		await waitFor(() => {
			expect(deleteReview).toHaveBeenCalled();
			expect(mutate).toHaveBeenCalled();
			expect(yesButton).not.toBeInTheDocument();
		});
	});
});
