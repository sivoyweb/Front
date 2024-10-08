import { IContact } from "@/interfaces/interfaces";

const sendContactEmail = async (contactData: IContact) => {
    try {
      const response = await fetch("https://api-sivoy.onrender.com/auth/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar el correo de ayuda.");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error en la solicitud de correo:", error);
      throw error;
    }
  };
  
  export default sendContactEmail;