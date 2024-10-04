// STYLE
import { InputBoxProps } from "@/interfaces/interfaces";
import style from "./Input.module.scss";

const Input = (props: InputBoxProps) => {
  const { type = "text", name, onChange, value, placeholder, minLength, required = false } = props;

  return <input className={style.input} type={type} name={name} placeholder={placeholder} minLength={minLength} value={value} onChange={onChange} required={required} />;
};

export default Input;

//  minlength="3" maxlength="20"
