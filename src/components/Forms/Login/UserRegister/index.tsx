import { Logo } from "@/components/Logo";
import { FormBackground } from "../Elements/Background";
import { LoginInput } from "../Elements/Input";
import { Button } from "../Elements/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginSchema, ILoginSchema } from "@/validation/Login/LoginSchema";
import { registerMask } from "@/utils/masks/registerMask";
import { useRouter } from "next/navigation";

export function UserRegister() {
  const router = useRouter();
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredValue = registerMask(value);
    setValue("register", filteredValue.toLocaleUpperCase());
    trigger("register");
  };
  const onSubmit = (data: ILoginSchema) => {
    console.log(data);
    router.push("/login/senha");
  };
  console.log(errors);
  return (
    <FormBackground onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <LoginInput
        id="register"
        label="Registro do colaborador"
        placeholder="EX: AAAAAA01"
        type="text"
        register={register("register", {
          onChange: (e) => handleInputChange(e),
        })}
        errors={errors.register}
      />
      <Button text="Continuar" />
    </FormBackground>
  );
}
