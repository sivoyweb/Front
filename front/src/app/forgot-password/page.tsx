import ResetPasswordRequest from "@/components/ResetPasswordRequest";
import ResetPassword from "@/components/ResetPassword";


function ForgotPassword() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-10 space-y-10 lg:space-y-0 p-6 min-h-screen">

      <div className="lg:w-1/3 w-full">
        <ResetPasswordRequest />
      </div>

      <div className="lg:w-1/3 w-full">
      <div className="flex flex-col items-center p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Paso 2: Verifique su correo</h1>
      <p className="text-lg text-center">
        Hemos enviado un código de restablecimiento a su correo electrónico. Busque el correo de 
        <strong> si.voy.web</strong> y copie el código de verificación.
      </p>
    </div>
      </div>

      <div className="lg:w-1/3 w-full">
        <ResetPassword />
      </div>
    </div>
  );
}

export default ForgotPassword;