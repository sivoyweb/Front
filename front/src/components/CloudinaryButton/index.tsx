import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Swal from "sweetalert2";

 const CloudinaryButton = () => {
  return (
    <div> 
      
      <CldUploadWidget
        uploadPreset="siVoyPreset" 
        onSuccess={(result) => {
          const uploadedImage = result?.info as CloudinaryUploadWidgetInfo;
          
          if (uploadedImage) {
        
            Swal.fire({
              title: "¡Imagen subida con éxito!",
              text: `URL: ${uploadedImage.secure_url}`, 
              icon: "success",
            });
          } else {
            
            Swal.fire({
              title: "Error al subir la imagen",
              icon: "error",
            });
          }
        }}
      >
        {({ open }) => {
          return (
            <button
              className="focus text-ls px-3 py-2  text-white rounded-md ml-2"
              onClick={() => open()} 
            >
              Subir imagen
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default CloudinaryButton;