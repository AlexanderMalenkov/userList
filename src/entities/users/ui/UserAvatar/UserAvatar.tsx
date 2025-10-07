import { useState, useRef } from "react";
import { Skeleton } from "@mantine/core";
import styles from "./UserAvatar.module.scss";
import iconUpload from "@/shared/assets/icons/upload.svg";

type Props = {
  avatarUrl?: string;
  isLoading?: boolean;
  onChange?: (file: File) => void;
};

export const UserAvatar = ({ avatarUrl, isLoading, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onChange) {
      onChange(file);
    }
  };

  return (
    <div
      className={styles.avatarWrapper}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      {isLoading ? (
        <Skeleton className={styles.avatar} />
      ) : (
        <img src={avatarUrl} alt="user avatar" className={styles.avatar} />
      )}

      {!isLoading && isHovering && (
        <div className={styles.overlay}>
          <img src={iconUpload} />
          <span>Select file</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
