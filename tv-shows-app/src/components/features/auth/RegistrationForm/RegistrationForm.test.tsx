import {render, screen} from '@testing-library/react'
import { RegistrationForm } from './RegistrationForm';

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
}));

describe('RegistrationForm', () => {
    it('should have rendered email input', () => {
        render(<RegistrationForm />);

        const input = screen.getByPlaceholderText("Email");

        expect(input).toBeInTheDocument();
    });

    it('should have rendered password input', () => {
        render(<RegistrationForm />);

        const input = screen.getByPlaceholderText("Password");

        expect(input).toBeInTheDocument();
    });

    it('should have rendered repeat password input', () => {
        render(<RegistrationForm />);

        const input = screen.getByPlaceholderText("Confirm password");

        expect(input).toBeInTheDocument();
    });

    it('should have rendered button', () => {
        render(<RegistrationForm />);

        const button = screen.getByText("SIGN UP");

        expect(button).toBeInTheDocument();
    });
})  