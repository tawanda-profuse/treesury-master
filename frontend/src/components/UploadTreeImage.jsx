import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import { useState } from "react";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

const UploadTreeImage = ({ handleFileUpload }) => {
  const [files, setFiles] = useState([]);

  const rootStyles = window.getComputedStyle(document.documentElement);
  const coverWidth = parseFloat(rootStyles.getPropertyValue("--book-cover-width-large"));
  const coverAspectRatio = parseFloat(rootStyles.getPropertyValue("--book-cover-aspect-ratio"));
  const coverHeight = coverWidth / coverAspectRatio;

  return (
    <FilePond
      className="book-cover filepond"
      name="cover"
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={false}
      allowFileTypeValidation={true}
      acceptedFileTypes={["image/*"]}
      maxFiles={1}
      labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
      imageCropAspectRatio="1:1" // Adjust according to your aspect ratio
      stylePanelAspectRatio={1 / coverAspectRatio} // Set the panel aspect ratio directly
      imageResizeTargetWidth={coverWidth} // Set the image resize target width
      imageResizeTargetHeight={coverHeight} // Set the image resize target height
      onprocessfile={(error, file) => {
        if (!error) {
          handleFileUpload(files); // Pass file items to handleFileUpload function
        }
      }}
    />
  );
};

export default UploadTreeImage;
