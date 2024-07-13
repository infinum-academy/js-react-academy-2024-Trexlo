import {fireEvent, render, screen} from '@testing-library/react'
import { RegistrationForm } from './RegistrationForm';
import { act } from 'react';

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

    it('should display error when password is too short',() => {
        act(() => render(<RegistrationForm />));

        const email = screen.getByPlaceholderText("Email");
        fireEvent.input(email, {target: {value: 'test@test.com'}});

        const input = screen.getByPlaceholderText("Password");
        fireEvent.input(input, {target: {value: '123'}});

        const button = screen.getByText("SIGN UP");
        act(() => button.dispatchEvent(new MouseEvent('click', {bubbles: true})));
    
        setTimeout(() => {
            const error = screen.getByText("Password must have at least 8 characters");
            expect(error).toBeInTheDocument();
        }, 200);
    });

    it('should display error when passwords do not match', () => {
        render(<RegistrationForm />);

        const email = screen.getByPlaceholderText("Email");
        fireEvent.change(email, {target: {value: 'test@test.com'}});

        const input = screen.getByPlaceholderText("Password");
        fireEvent.input(input, {target: {value: '123456789'}});

        const repeatInput = screen.getByPlaceholderText("Confirm password");
        fireEvent.input(repeatInput, {target: {value: '123456789111'}});

        const button = screen.getByText("SIGN UP");
        act(() => button.dispatchEvent(new MouseEvent('click', {bubbles: true})));
        
        setTimeout(() => {
            const error = screen.getByText("Passwords do not match");
            expect(error).toBeInTheDocument();
        }, 200);
    });
})  