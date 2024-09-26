"use client"
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { IRegister } from "@/interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const UserDashboard = () => {
  const [formData, setFormData] = useState<IRegister>({
    name:'',
    email:'',
    password:'',
    phone:'',
    confirmPassword:''
   });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false); 
  const { user } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target;
    setFormData({
      ...formData,
      [name]:value,
    });
  }

  const toogleVisibility = () => {
    setShowPassword(!showPassword)
  };


  const renderSection = () => {
    
    switch (activeSection) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Perfil</h2>
            <p className="text-gray-600">Nombre: {user?.user?.name}</p>
            <p className="text-gray-600">Email: {user?.user?.email}</p>
          </div>
        );
      case 'favorites':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Lugares Favoritos</h2>
            <ul>
              <li className="text-gray-600">Lugar 1: ------</li>
              <li className="text-gray-600">Lugar 2: ------</li>
            </ul>
          </div>
        );
      case 'account':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Cuenta</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="focus:text-white hover:text-gray-700"
              >
                {isEditing ? "Cancelar" : "Editar información"}
              </button>
            </div>
            {!isEditing ? (
              <>
                <p className="text-gray-600">Nombre: {user?.user?.name}</p>
                <p className="text-gray-600">Email: {user?.user?.email}</p>
                <p className="text-gray-600">Teléfono: ------</p>
                <p className="text-gray-600">Avatar: ------</p>
              </>
            ) : (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    defaultValue={user?.token}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    defaultValue={user?.user?.email}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    placeholder="Ingresa tu número de teléfono"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="mt-1 p-2 border border-gray-300 rounded w-full pr-10"
                    placeholder="Ingresa tu nueva contraseña"
                  />
                  <span 
                    onClick={toogleVisibility}
                    className="absolute inset-y-0 right-3 mt-5 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                      <FontAwesomeIcon icon={faEye} />
                    )}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Avatar</label>
                  <input
                    type="file"
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 text-white px-4 py-2 hover:text-gray-700"
                >
                  Guardar cambios
                </button>
              </form>
            )}
          </div>
        );
      
      default:
        return <p>Selecciona una opción del menú.</p>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-arialroundedmtbold text-sivoy-blue">
      <div
        className={`bg-sivoy-gradient text-white ${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        <div className="p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none"
          >
            {sidebarOpen ? <span>&#10005; Cerrar</span> : <span>&#9776;</span>}
          </button>
        </div>
        <nav className="mt-10">
          <a
            href="#"
            onClick={() => setActiveSection('profile')}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Perfil
          </a>
          <a
            href="#"
            onClick={() => setActiveSection('favorites')}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Favoritos
          </a>
          <a
            href="#"
            onClick={() => setActiveSection('account')}
            className={`block py-2.5 px-4 rounded transition-all duration-200 hover:bg-sivoy-blue ${
              !sidebarOpen ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Cuenta
          </a>
        </nav>
      </div>

      <div className="flex-1 p-6">
        <header className="flex justify-between items-center bg-white shadow p-4">
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <div className="flex items-center">
            <span className="ml-2 text-sm font-medium">
              Bienvenido, {user?.user?.name}
            </span>
          </div>
        </header>

        <main className="mt-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
