import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { loginFormSchema, TLoginFormValues } from "./loginFormSchema";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "../../../providers/userContext";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { Login } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const submit: SubmitHandler<TLoginFormValues> = async (data) => {
    await Login(data, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id="login"
        type="text"
        {...register("email")}
        disabled={loading}
        error={errors.email}
      />
      <Input
        id="senha"
        type="password"
        {...register("password")}
        disabled={loading}
        error={errors.password}
      />
      <StyledButton
        $buttonSize="default"
        $buttonStyle="green"
        disabled={loading}
        type="submit"
      >
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
