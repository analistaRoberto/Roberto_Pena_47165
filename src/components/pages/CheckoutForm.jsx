import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { dataBase } from '../../firebase/config';
import { useCarrito } from '../../context/ContextCart';

function CheckoutForm() {
  const [isFormValid, setIsFormValid] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({ mode: 'onchange' });
  const formRef = useRef();
  const {carrito} = useCarrito(); 

  const onSubmit = (data, e) => {
    e.preventDefault();
    const productosComprados = carrito.map((producto) => ({
      productId: producto.id,
      productName: producto.name,
      quantity: 1,
      price: producto.price,
    }));

    addDoc(collection(dataBase, 'order'), {
      name: data.names,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      orderDate: new Date(),
      productosComprados: productosComprados,
    })
      .then((docRef) => {
        console.log('Documento escrito con ID:', docRef.id);
        formRef.current.reset();
        setIsFormValid(false);

        alert(`¡Compra exitosa! Tu número de orden es: ${orderId}`);
      })
      .catch((error) => {
        console.error('Error al agregar el documento:', error);
      });
  };

  useEffect(() => {
    setIsFormValid(isValid);
  }, [isValid]);

  return (
    <div>
      <form
        className='my-form'
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              id='names'
              {...register('names', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener como minímo 4 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El nombre debe tener como máximo 50 caracteres'
                },
              })}

              autoComplete="off"
            />
            {errors.names && <span>{errors.names.message}</span>}
          </div>

          <div>
            <label>Apellido:</label>
            <input
              type="text"
              id='lastName'
              {...register('lastName', {
                required: 'El apellido es requerido',
                minLength: {
                  value: 4,
                  message: 'El apellido debe tener como minimo 4 caracteres'
                },
                maxLength: {
                  value: 50,
                  message: 'El apellido debe tener como máximo 50 caracteres'
                },
                pattern: /^[A-Za-z]+$/,
              })}

              autoComplete="off"
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>

          <div>
            <label>Teléfono:</label>
            <input
              type="tel"
              id='phone'
              {...register('phone', {
                required: 'El teléfono es requerido',
                pattern: {
                  value: /^\d+$/, 
                  message: 'El teléfono debe contener solo números',
                },
                minLength: {
                  value: 10, 
                  message: 'El teléfono debe tener al menos 10 dígitos',
                },
                maxLength: {
                  value: 20, 
                  message: 'El teléfono debe tener menos de 20 dígitos',
                },
              })}
            />
            {errors.phone && <span>{errors.phone.message}</span>}
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              id='email'
              {...register('email', {
                required: 'Ingrese el email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[\p{L}]{2,}$/iu,
                  message: 'Ingrese un correo valido'
                }
              })}

              autoComplete="off"
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <label>Repetir Email:</label>
            <input
              type="email"
              id='confirmEmail'
              {...register('confirmEmail', {
                required: 'Confirma el correo electrónico',
                validate: (value) => value === watch('email') || 'Los correos electrónicos no coinciden',
              })}

              autoComplete="off"
            />
            {errors.confirmEmail && <span>{errors.confirmEmail.message}</span>}
          </div>

          <div>
            <button
              type="submit"
              className={isFormValid ? 'active-button' : 'disabled-button'}
              disabled={!isFormValid}
            >
              Enviar
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default CheckoutForm;
