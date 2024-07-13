import {render, screen} from '@testing-library/react'
import { PasswordInput } from './PasswordInput';
import {act} from 'react';

describe('PasswordInput', () => {
    it('should have rendered input', () => {
        render(<PasswordInput placeholder='Password' />);

        const input = screen.getByPlaceholderText("Password");

        expect(input).toBeInTheDocument();
    });

    it('should have rendered button', () => {
        render(<PasswordInput />);

        const button = screen.getByText("Show");

        expect(button).toBeInTheDocument();
    });

    it('should change show state on button click', () => {
        act(() => render(<PasswordInput />));
        
        const button = screen.getByText("Show");
        
        act(() => button.dispatchEvent(new MouseEvent('click', {bubbles: true})));

        expect(button).toHaveTextContent("Hide");
    });
})  