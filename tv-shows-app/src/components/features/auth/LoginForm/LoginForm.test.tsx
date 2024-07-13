import {render, screen} from '@testing-library/react'
import { LoginForm } from './LoginForm';

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
}));

describe('LoginForm', () => {
    it('should have rendered email input', () => {
        render(<LoginForm />);

        const input = screen.getByPlaceholderText("Email");

        expect(input).toBeInTheDocument();
    });

    it('should have rendered password input', () => {
        render(<LoginForm />);

        const input = screen.getByPlaceholderText("Password");

        expect(input).toBeInTheDocument();
    });

    it('should have rendered button', () => {
        render(<LoginForm />);

        const button = screen.getByText("LOG IN");

        expect(button).toBeInTheDocument();
    });
})  