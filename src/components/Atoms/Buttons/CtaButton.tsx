import style from "./Button.module.scss";

interface ButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  icon?: string;
}

const CtaButton = (props: ButtonProps) => {
  const { label, className, onClick, type = "button", disabled = false, icon } = props;

  return (
    <button className={`${style.button} ${style.ctaButton} ${className && style[className]}`} onClick={onClick} type={type} disabled={disabled}>
      {icon && (
        <span className={style.icon}>
          <img src={icon} alt="Icon" />
        </span>
      )}
      {label}
    </button>
  );
};

export default CtaButton;
