import { MuiFileInput } from "mui-file-input";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";

export const CustomFileInput = ({
  fileData,
  setFileData,
  setFileBase64,
  accept,
  placeholder,
  styles,
}) => {
  return (
    <MuiFileInput
      sx={styles}
      placeholder={placeholder}
      value={fileData}
      onChange={(file) => {
        if (!file) {
          setFileData(null);
          setFileBase64(null);
          return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
          const base64String = event.target.result;

          setFileData(file);
          setFileBase64({
            name: file.name,
            data: base64String,
          });
        };

        reader.readAsDataURL(file);
      }}
      InputProps={{
        inputProps: {
          accept: accept,
        },
        startAdornment: <AttachFileIcon />,
      }}
      clearIconButtonProps={{
        title: "Remove",
        children: <CloseIcon fontSize="small" />,
      }}
    />
  );
};
