import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errorVisibility, setErrorVisibility] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    let hasErrors = false;

    if (formData.name.trim() === '') {
      errors.name = 'El nombre es obligatorio';
      hasErrors = true;
    }

    if (formData.email.trim() === '') {
      errors.email = 'El correo electrónico es obligatorio';
      hasErrors = true;
    }

    if (formData.message.trim() === '') {
      errors.message = 'El mensaje es obligatorio';
      hasErrors = true;
    }

    setFormErrors(errors);

    if (!hasErrors) {
      console.log('Formulario enviado:', formData);
    } else {
     
      setErrorVisibility(true);
      setTimeout(() => {
        setErrorVisibility(false);
      }, 3000);
    }
  };

  return (
    <div className="contact-container">
      <h2 className='title'>Contacto</h2>
      <div className="contact-info">
        <div className="contact-item">
          <FaPhone />
          <p>Teléfono: (123) 456-7890</p>
        </div>
        <div className="contact-item">
          <FaEnvelope />
          <p>Email: ejemplo@email.com</p>
        </div>
        <div className="contact-item">
          <FaWhatsapp />
          <p>WhatsApp: +1234567890</p>
        </div>
      </div>
      <div className="contact-form">
        <h3>Para mas informacion envianos un email</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && errorVisibility && (
              <span className="error">{formErrors.name}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && errorVisibility && (
              <span className="error">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            {formErrors.message && errorVisibility && (
              <span className="error">{formErrors.message}</span>
            )}
          </div>
          <button type="submit" style={{backgroundColor: '#2A7BBE'}}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
