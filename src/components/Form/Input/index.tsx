import { InputHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { FieldError } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

export const Input = forwardRef(
  (
    { id, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div>
      <StyledInputContainer>
        <input ref={ref} {...rest} id={id} placeholder=" " />
        <label htmlFor={id}>{id}</label>
      </StyledInputContainer>
      <StyledParagraph fontColor="red">{error?.message}</StyledParagraph>
    </div>
  )
);

export default Input;
