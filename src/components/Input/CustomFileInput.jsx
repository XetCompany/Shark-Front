import { MuiFileInput } from "mui-file-input";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";

export const CustomFileInput = ({ fileData, setFileData, setFileBase64, accept, placeholder, styles }) => {
  return <MuiFileInput
    sx={styles}
    placeholder={placeholder}
    value={fileData}
    onChange={(file) => {
      if (!file) {
        setFileData(null);
        setFileBase64(null);
        return;
      }

      // Create an instance of FileReader
      const reader = new FileReader();

      // Define what happens once the file is read
      reader.onload = (event) => {
        // Extract the Base64 string (event.target.result contains the Data URL)
        const base64String = event.target.result;

        // Update the component's state with the Base64 string
        setFileData(file);
        setFileBase64({
          name: file.name,
          data: base64String,
        });
      };

      // Read the file as a Data URL (Base64 string)
      reader.readAsDataURL(file);
    }}
    InputProps={{
      inputProps: {
        accept: accept,
      },
      startAdornment: (
        <AttachFileIcon />
      ),
    }}
    clearIconButtonProps={{
      title: "Remove",
      children: <CloseIcon fontSize="small" />,
    }}
  />;
};
