import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { useContext, useState } from "react";
import { UserContext } from "../../../providers/userContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterFormValues, registerFormSchema } from "./RegisterSchema";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { userRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  const submit: SubmitHandler<TRegisterFormValues> = async (formData) => {
    await userRegister(formData, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type="text"
        id="name"
        {...register("name")}
        disabled={loading}
        error={errors.name}
      />
      <Input
        type="email"
        id="email"
        {...register("email")}
        disabled={loading}
        error={errors.email}
      />
      <Input
        type="password"
        id="password"
        {...register("password")}
        disabled={loading}
        error={errors.password}
      />
      <Input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword")}
        disabled={loading}
        error={errors.confirmPassword}
      />
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        type="submit"
        disabled={loading}
      >
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
