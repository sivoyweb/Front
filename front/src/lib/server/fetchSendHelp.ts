import { ISendHelp } from "@/interfaces/interfaces";

const sendHelpEmail = async (helpData: ISendHelp) => {
    try {
      const response = await fetch("https://api-sivoy.onrender.com/auth/send-help-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(helpData),
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar el correo de ayuda.");
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  export default sendHelpEmail;