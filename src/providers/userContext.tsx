import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TRegisterFormValues } from "../components/Form/RegisterForm/RegisterSchema";
import { TLoginFormValues } from "../components/Form/LoginForm/loginFormSchema";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  user: IUser | null;
  userRegister: (
    data: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  Login: (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  Logout: () => void;
}

interface IUser {
  email: string;
  name: string;
  id: number;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

interface IUserRegisterResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");

    const userAutoLogin = async () => {
      if (!token) {
        return null;
      }

      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        navigate("/shop");
      } catch (error) {
        console.log(error);
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
      }
    };
    if (token && userId) {
      userAutoLogin();
    }
  }, []);

  const userRegister = async (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await api.post<IUserRegisterResponse>("/users", formData);
      toast.success("Conta criada com sucesso");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Ops!Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  const Login = async (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<IUserLoginResponse>("/login", formData);
      localStorage.setItem("@TOKEN", data.accessToken);
      localStorage.setItem("@USERID", JSON.stringify(data.user.id));
      setUser(data.user);
      toast.success("Login realizado");
      navigate("/shop");
    } catch (error) {
      console.log(error);
      toast.error("Ops!Algo deu errado");
    } finally {
      setLoading(false);
    }
  };

  const Logout = () => {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, userRegister, Login, Logout }}>
      {children}
    </UserContext.Provider>
  );
};
