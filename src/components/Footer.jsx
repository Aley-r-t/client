import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-lg font-medium mb-4">© 2024 GESTION. Todos los derechos reservados.</p>
        <div className="space-x-6">
          <a href="/terms" className="hover:text-gray-400 transition-colors">Términos y condiciones</a>
          <a href="/privacy" className="hover:text-gray-400 transition-colors">Política de privacidad</a>
          <a href="/contact" className="hover:text-gray-400 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
