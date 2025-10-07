import { Input, type InputProps } from "@mantine/core";
import styles from "./InfoInput.module.scss";

interface InfoInputProps extends Omit<InputProps, 'value'> {
  value?: string | number;
  label?: string;
}

export const InfoInput = ({ value, label, disabled }: InfoInputProps) => (
  <Input.Wrapper label={label} className={styles.wrapper}>
    <Input
      size="lg"
      radius="md"
      placeholder="Input component"
      value={value}
      disabled={disabled}
      readOnly
      style={{
        pointerEvents: "none",
      }}
    />
  </Input.Wrapper>
);
