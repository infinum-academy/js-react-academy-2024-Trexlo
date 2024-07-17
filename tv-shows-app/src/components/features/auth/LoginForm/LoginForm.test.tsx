import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import { LoginForm } from './LoginForm';
import { loginMutator } from '../../../../fetchers/mutators';
import { act } from 'react';
import { apiPaths } from '@/app/data/api-paths';
import { ILogInFormInputs } from '@/typings/Auth.type';

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
}));

jest.mock("../../../../fetchers/mutators", () => {
    return {
		loginMutator: jest.fn().mockImplementation(
            (url:string, {arg}:{arg:ILogInFormInputs})=>{
                return {
                    headers: new Headers()
                };
            }
        )
	};
});

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

    it('should call submit function with appropriate arguments', async () => {
        render(<LoginForm />);
        const mockLoginData = {
            email:'test@test.com',
            password:'123'
        }
        const email = screen.getByPlaceholderText("Email");
        act(() => fireEvent.input(email, {target: {value: mockLoginData.email}}));

        const input = screen.getByPlaceholderText("Password");
        act(() => fireEvent.input(input, {target: {value: mockLoginData.password}}));

        const button = screen.getByText("LOG IN");
        act(() => button.click());
        
        await waitFor(() => {
            expect(loginMutator).toHaveBeenCalledWith(apiPaths.login, {arg: {...mockLoginData}});
        });
    });
})  