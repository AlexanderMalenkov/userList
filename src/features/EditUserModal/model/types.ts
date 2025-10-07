export type EditUserModalProps = {
  opened: boolean;
  open: () => void;
  close: () => void;
};

export type EditUserFormValues = {
  first_name: string;
  last_name: string;
  email: string;
};
