import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  CheckCircle, 
  Shirt, 
  User, 
  FileText, 
  Image as ImageIcon,
  Trash2,
  Package,
  Send,
  Loader2,
  Printer,
  Scissors,
  Layers,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Phone
} from 'lucide-react';

// --- CONFIGURACIÓN DE TEMA ---
const THEME = {
  primary: "bg-[#000000]",
  primaryHover: "hover:bg-[#333333]",
  accent: "text-[#FE8F19]",
  accentBg: "bg-[#FE8F19]",
  secondary: "text-[#E21012]",
  bg: "bg-slate-50",
  card: "bg-white"
};

// --- COMPONENTES DE LA LANDING PAGE ---

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="h-12 cursor-pointer flex items-center" 
          onClick={() => onNavigate('home')}
        >
           <img 
            src="https://ba-bucket-aws.s3.us-east-1.amazonaws.com/logo_diartec.png" 
            alt="Diartec Logo" 
            className="h-full object-contain max-h-[50px]" 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="text-2xl font-black text-[#000000] tracking-tighter">DIAR<span class="text-[#E21012]">TEC</span></span>';
            }} 
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-[#FE8F19] font-medium transition">Inicio</button>
          <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-600 hover:text-[#FE8F19] font-medium transition">Servicios</button>
          <button 
            onClick={() => onNavigate('wizard')}
            className={`${THEME.primary} ${THEME.primaryHover} text-white px-5 py-2 rounded-lg font-semibold shadow-lg shadow-black/10 transition transform hover:-translate-y-0.5`}
          >
            Realizar Pedido
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 animate-fadeIn">
          <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-gray-700">Inicio</button>
          <button onClick={() => { document.getElementById('services')?.scrollIntoView(); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-gray-700">Servicios</button>
          <button 
            onClick={() => { onNavigate('wizard'); setIsMenuOpen(false); }}
            className={`w-full ${THEME.primary} text-white py-3 rounded-lg font-semibold text-center`}
          >
            Realizar Pedido
          </button>
        </div>
      )}
    </nav>
  );
};

const HeroSection = ({ onStartOrder }) => (
  <section className="relative overflow-hidden bg-white">
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#FE8F19]/10 rounded-full blur-3xl opacity-50"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-[#E21012]/10 rounded-full blur-3xl opacity-50"></div>

    <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-sm font-semibold text-gray-600">
          <span className="w-2 h-2 rounded-full bg-[#E21012]"></span>
          Innovación Textil en Perú
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-[#000000] leading-tight">
          <span className="text-[#000000]">DIAR</span><span className="text-[#FE8F19]">TEC</span>
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-[#000000] leading-tight">
          Calidad que Viste <br/>
          <span className="text-[#FE8F19]">Tu Marca</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-lg">
          Expertos en acabados textiles para polos y vestidos con tecnología de punta. Desde el corte láser hasta el sublimado perfecto, llevamos tus diseños a la realidad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            onClick={onStartOrder}
            className={`${THEME.primary} ${THEME.primaryHover} text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-black/10 flex items-center justify-center gap-2 transition transform hover:scale-105`}
          >
            Hacer Pedido Ahora <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 rounded-xl font-bold text-gray-700 border-2 border-gray-200 hover:border-[#FE8F19] hover:text-[#FE8F19] transition">
            Ver Catálogo
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="bg-gradient-to-tr from-gray-100 to-slate-200 rounded-3xl p-8 transform rotate-3 shadow-2xl">
          <div className="aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-inner flex items-center justify-center relative">
             <img 
               src="/polo-sublimado.png" 
               alt="Polo Deportivo con Diseño Sublimado" 
               className="object-cover w-full h-full hover:scale-105 transition duration-700"
             />
             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
               <span className="text-xs font-bold text-gray-500 uppercase">Sublimado Deportivo</span>
               <div className="text-[#000000] font-black text-lg">Diseño Personalizado</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => {
  const services = [
    {
      icon: Printer,
      title: "Servicio de Sublimados",
      desc: "Impresión digital de alta definición sobre tela, garantizando colores vibrantes y duraderos que no se destiñen con el lavado.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Layers,
      title: "Servicio de Calandrado",
      desc: "Transferencia térmica profesional para fijar tintas y texturas, asegurando un acabado suave y resistente en grandes rollos de tela.",
      color: "bg-orange-50 text-[#FE8F19]"
    },
    {
      icon: Scissors,
      title: "Servicio de Corte Láser",
      desc: "Precisión milimétrica para cortes complejos y detallados en cualquier tipo de textil, minimizando el desperdicio de material.",
      color: "bg-red-50 text-[#E21012]"
    }
  ];

  return (
    <section id="services" className="bg-slate-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">Nuestros Servicios</h2>
          <p className="text-gray-600">Ofrecemos soluciones integrales para la industria textil, cuidando cada detalle de tu producción.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#111] text-gray-400 py-12 border-t-4 border-[#FE8F19]">
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <h4 className="text-white text-2xl font-black mb-4">DIAR<span className="text-[#E21012]">TEC</span></h4>
        <p className="max-w-xs mb-6 text-sm">Especialistas en la personalización y acabados de prendas textiles en Perú. Calidad, tecnología y pasión en cada hilo.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#FE8F19] transition"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="hover:text-[#FE8F19] transition"><Instagram className="w-5 h-5" /></a>
        </div>
      </div>
      <div>
        <h5 className="text-white font-bold mb-4">Servicios</h5>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-white cursor-pointer transition">Sublimados</li>
          <li className="hover:text-white cursor-pointer transition">Calandrado</li>
          <li className="hover:text-white cursor-pointer transition">Corte Láser</li>
        </ul>
      </div>
      <div>
        <h5 className="text-white font-bold mb-4">Contacto</h5>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#FE8F19]" /> +51 999 999 999</li>
          <li>Lima, Perú</li>
          <li>ventas@diartec.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
      &copy; {new Date().getFullYear()} Diartec Perú. Todos los derechos reservados.
    </div>
  </footer>
);

// --- COMPONENTE DEL WIZARD (Lógica existente encapsulada) ---

const OrderWizard = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  
  const STEPS = [
    { id: 1, title: "Contacto", icon: User },
    { id: 2, title: "Tallas y Cantidades", icon: Shirt },
    { id: 3, title: "Nombres de Impresión", icon: FileText },
    { id: 4, title: "Diseño y Referencias", icon: ImageIcon },
    { id: 5, title: "Confirmación", icon: CheckCircle }
  ];
  const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    namesBySize: { XS: [], S: [], M: [], L: [], XL: [], XXL: [] },
    numbersBySize: { XS: [], S: [], M: [], L: [], XL: [], XXL: [] },
    files: [], observations: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSizeChange = (size, value) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      sizes: { ...prev.sizes, [size]: Math.max(0, numValue) }
    }));
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    
    const validFiles = [];
    const validPreviews = [];
    const fileErrors = [];
    
    newFiles.forEach((file, index) => {
      // Validar tipo de archivo
      if (!ALLOWED_TYPES.includes(file.type)) {
        fileErrors.push(`${file.name}: Tipo de archivo no permitido. Solo se aceptan imágenes (JPG, PNG, GIF, WEBP).`);
        return;
      }
      
      // Validar tamaño
      if (file.size > MAX_FILE_SIZE) {
        fileErrors.push(`${file.name}: El archivo es demasiado grande. Tamaño máximo: 10MB.`);
        return;
      }
      
      validFiles.push(file);
      if (file.type.startsWith('image/')) {
        validPreviews.push(URL.createObjectURL(file));
      } else {
        validPreviews.push(null);
      }
    });
    
    if (fileErrors.length > 0) {
      setValidationErrors(prev => ({
        ...prev,
        files: fileErrors
      }));
    } else {
      // Limpiar error de archivos si todo está bien
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.files;
        return newErrors;
      });
    }
    
    setFormData(prev => ({ ...prev, files: [...prev.files, ...validFiles] }));
    setFilePreviews(prev => [...prev, ...validPreviews]);
    
    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    e.target.value = '';
  };

  const removeFile = (index) => {
    // Limpiar la URL de la miniatura si existe
    if (filePreviews[index]) {
      URL.revokeObjectURL(filePreviews[index]);
    }
    
    setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // Limpiar URLs cuando el componente se desmonte
  useEffect(() => {
    return () => {
      filePreviews.forEach(url => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = (size, index, value) => {
    setFormData(prev => {
      const newNames = [...(prev.namesBySize[size] || [])];
      newNames[index] = value;
      return {
        ...prev,
        namesBySize: { ...prev.namesBySize, [size]: newNames }
      };
    });
  };

  const handleNumberChange = (size, index, value) => {
    setFormData(prev => {
      const newNumbers = [...(prev.numbersBySize[size] || [])];
      newNumbers[index] = value;
      return {
        ...prev,
        numbersBySize: { ...prev.numbersBySize, [size]: newNumbers }
      };
    });
  };

  // Obtener tallas seleccionadas (con cantidad > 0)
  const getSelectedSizes = () => {
    return SIZES.filter(size => formData.sizes[size] > 0);
  };

  // Funciones de validación
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Acepta números con o sin prefijos internacionales, espacios, guiones, paréntesis
    const phoneRegex = /^[\d\s\-\+\(\)]{8,15}$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length >= 8 && digitsOnly.length <= 15;
  };

  const validateStep1 = () => {
    const errors = {};
    
    // Validar nombre
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (formData.name.trim().length > 100) {
      errors.name = 'El nombre no puede exceder 100 caracteres';
    }
    
    // Validar email
    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Ingresa un correo electrónico válido';
    }
    
    // Validar teléfono
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Ingresa un teléfono válido (8-15 dígitos)';
    }
    
    return errors;
  };

  const validateStep2 = () => {
    const errors = {};
    const totalQuantity = Object.values(formData.sizes).reduce((a, b) => a + b, 0);
    
    if (totalQuantity === 0) {
      errors.sizes = 'Debes seleccionar al menos una talla con cantidad mayor a 0';
    }
    
    // Validar que las cantidades sean números válidos
    SIZES.forEach(size => {
      const quantity = formData.sizes[size];
      if (quantity < 0) {
        errors[`size_${size}`] = 'La cantidad no puede ser negativa';
      } else if (quantity > 1000) {
        errors[`size_${size}`] = 'La cantidad no puede exceder 1000 unidades por talla';
      }
    });
    
    return errors;
  };

  const validateStep3 = () => {
    // El paso 3 es opcional, pero si se llena un nombre o número, debe ser válido
    const errors = {};
    const selectedSizes = getSelectedSizes();
    
    selectedSizes.forEach(size => {
      const quantity = formData.sizes[size];
      const names = formData.namesBySize[size] || [];
      const numbers = formData.numbersBySize[size] || [];
      
      for (let i = 0; i < quantity; i++) {
        const name = names[i] || '';
        const number = numbers[i] || '';
        
        // Si se llena el nombre, validar
        if (name.trim()) {
          if (name.trim().length < 1) {
            errors[`name_${size}_${i}`] = 'El nombre no puede estar vacío';
          } else if (name.trim().length > 50) {
            errors[`name_${size}_${i}`] = 'El nombre no puede exceder 50 caracteres';
          }
        }
        
        // Si se llena el número, validar
        if (number.trim()) {
          if (number.trim().length > 10) {
            errors[`number_${size}_${i}`] = 'El número no puede exceder 10 caracteres';
          }
        }
      }
    });
    
    return errors;
  };

  const validateStep4 = () => {
    const errors = {};
    const MAX_FILES = 10;
    
    if (formData.files.length > MAX_FILES) {
      errors.files = [`No puedes subir más de ${MAX_FILES} archivos`];
    }
    
    // Validar observaciones si se llenan
    if (formData.observations && formData.observations.length > 1000) {
      errors.observations = 'Las observaciones no pueden exceder 1000 caracteres';
    }
    
    return errors;
  };

  const validateCurrentStep = () => {
    let errors = {};
    
    switch (currentStep) {
      case 1:
        errors = validateStep1();
        break;
      case 2:
        errors = validateStep2();
        break;
      case 3:
        errors = validateStep3();
        break;
      case 4:
        errors = validateStep4();
        break;
      default:
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Inicializar arrays de nombres y números cuando se entra al paso 3
  useEffect(() => {
    if (currentStep === 3) {
      setFormData(prev => {
        const updatedNames = { ...prev.namesBySize };
        const updatedNumbers = { ...prev.numbersBySize };
        let hasChanges = false;

        SIZES.forEach(size => {
          const quantity = prev.sizes[size] || 0;
          const currentNames = updatedNames[size] || [];
          const currentNumbers = updatedNumbers[size] || [];
          
          if (currentNames.length !== quantity) {
            const newNames = Array(quantity).fill('').map((_, i) => currentNames[i] || '');
            updatedNames[size] = newNames;
            hasChanges = true;
          }
          
          if (currentNumbers.length !== quantity) {
            const newNumbers = Array(quantity).fill('').map((_, i) => currentNumbers[i] || '');
            updatedNumbers[size] = newNumbers;
            hasChanges = true;
          }
        });

        return hasChanges ? { ...prev, namesBySize: updatedNames, numbersBySize: updatedNumbers } : prev;
      });
    }
  }, [currentStep]);

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < STEPS.length) {
        setCurrentStep(c => c + 1);
        // Limpiar errores al avanzar
        setValidationErrors({});
      }
    } else {
      // Scroll suave hacia el primer error
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500, .text-red-600');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }, 100);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(c => c - 1);
      // Limpiar errores al retroceder
      setValidationErrors({});
    }
  };
  
  const handleSubmit = async () => {
    // Validar todos los pasos antes de enviar
    const step1Valid = validateStep1();
    const step2Valid = validateStep2();
    const step3Valid = validateStep3();
    const step4Valid = validateStep4();
    
    const allErrors = {
      ...step1Valid,
      ...step2Valid,
      ...step3Valid,
      ...step4Valid
    };
    
    if (Object.keys(allErrors).length > 0) {
      setValidationErrors(allErrors);
      setCurrentStep(1); // Volver al primer paso con errores
      setError('Por favor, corrige los errores en el formulario antes de enviar.');
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500, .text-red-600');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // En desarrollo usa localhost, en producción usa la ruta relativa de Netlify
      const API_URL = import.meta.env.VITE_API_URL || 
        (import.meta.env.DEV ? 'http://localhost:3001' : '');
      const endpoint = import.meta.env.DEV 
        ? `${API_URL}/api/send-email`
        : '/api/send-email';
      
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();
      
      // Agregar los datos del formulario como JSON string
      const formDataWithoutFiles = {
        ...formData,
        files: [] // No enviar los objetos File en el JSON, se enviarán por separado
      };
      formDataToSend.append('formData', JSON.stringify(formDataWithoutFiles));
      
      // Agregar los archivos
      if (formData.files && formData.files.length > 0) {
        formData.files.forEach((file) => {
          formDataToSend.append('files', file);
        });
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        // No establecer Content-Type, el navegador lo hará automáticamente con el boundary
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el pedido');
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('Error al enviar pedido:', err);
      setError(err.message || 'Error al enviar el pedido. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 bg-[#FE8F19]/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-[#FE8F19]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">¡Pedido Enviado!</h2>
          <p className="text-gray-600">
            Gracias, <strong>{formData.name}</strong>. Hemos recibido tu solicitud. Te contactaremos pronto.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => window.location.reload()} className="text-gray-500 hover:text-gray-800 underline">Nuevo Pedido</button>
            <button onClick={onBack} className={`${THEME.primary} text-white px-6 py-2 rounded-lg`}>Volver al Inicio</button>
          </div>
        </div>
      </div>
    );
  }

  // Helper renderizado de pasos (Simplificado para el ejemplo, pero funcional)
  const renderContent = () => {
    // ... Copia de la lógica de renderStep del código anterior, adaptada
    if (currentStep === 1) return (
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><User className="text-[#FE8F19]"/> Datos del Cliente</h2>
        <div className="grid gap-6">
          <div>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange}
              onBlur={() => setTouchedFields(prev => ({ ...prev, name: true }))}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FE8F19] outline-none transition-colors ${
                validationErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`} 
              placeholder="Nombre Completo *" 
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-500">•</span>
                {validationErrors.name}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange}
                onBlur={() => setTouchedFields(prev => ({ ...prev, email: true }))}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FE8F19] outline-none transition-colors ${
                  validationErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`} 
                placeholder="Correo Electrónico *" 
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span className="text-red-500">•</span>
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange}
                onBlur={() => setTouchedFields(prev => ({ ...prev, phone: true }))}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FE8F19] outline-none transition-colors ${
                  validationErrors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`} 
                placeholder="Teléfono *" 
              />
              {validationErrors.phone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span className="text-red-500">•</span>
                  {validationErrors.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
    if (currentStep === 2) return (
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Shirt className="text-[#FE8F19]"/> Selección de Tallas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SIZES.map(size => (
            <div key={size} className="bg-slate-50 p-4 rounded-xl border hover:border-[#FE8F19]/30">
              <div className="flex justify-between mb-2"><span className="font-bold">{size}</span></div>
              <input 
                type="number" 
                min="0" 
                max="1000"
                value={formData.sizes[size]||''} 
                onChange={e=>handleSizeChange(size,e.target.value)} 
                className={`w-full p-2 border rounded text-center transition-colors ${
                  validationErrors[`size_${size}`] ? 'border-red-500' : 'border-gray-300'
                }`} 
                placeholder="0" 
              />
              {validationErrors[`size_${size}`] && (
                <p className="mt-1 text-xs text-red-600">{validationErrors[`size_${size}`]}</p>
              )}
            </div>
          ))}
        </div>
        {validationErrors.sizes && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm flex items-center gap-2">
              <span className="text-red-500 font-bold">⚠</span>
              {validationErrors.sizes}
            </p>
          </div>
        )}
        <div className="text-right font-bold text-[#FE8F19] text-xl">Total: {Object.values(formData.sizes).reduce((a,b)=>a+b,0)} u.</div>
      </div>
    );
    if (currentStep === 3) {
      const selectedSizes = getSelectedSizes();

      return (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><FileText className="text-[#FE8F19]"/> Nombres y Números de Impresión</h2>
          <p className="text-gray-600">Ingresa el nombre y número que deseas imprimir en cada polo según la talla seleccionada.</p>
          
          {selectedSizes.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">No hay tallas seleccionadas. Por favor, regresa al paso anterior y selecciona al menos una talla.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedSizes.map(size => {
                const quantity = formData.sizes[size];
                const names = formData.namesBySize[size] || [];
                const numbers = formData.numbersBySize[size] || [];
                
                return (
                  <div key={size} className="bg-slate-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg ${THEME.accentBg} text-white flex items-center justify-center font-bold text-lg`}>
                        {size}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">Talla {size}</h3>
                        <p className="text-sm text-gray-600">{quantity} {quantity === 1 ? 'polo' : 'polos'}</p>
                      </div>
                    </div>
                    
                    <div className="grid gap-3">
                      {Array.from({ length: quantity }, (_, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600 w-8">#{index + 1}</span>
                            <span className="text-xs text-gray-500">Polo {index + 1}</span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Nombre</label>
                              <input
                                type="text"
                                value={names[index] || ''}
                                onChange={(e) => handleNameChange(size, index, e.target.value)}
                                maxLength={50}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FE8F19] focus:border-[#FE8F19] outline-none transition-colors ${
                                  validationErrors[`name_${size}_${index}`] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                                }`}
                                placeholder={`Nombre para el polo ${index + 1}`}
                              />
                              {validationErrors[`name_${size}_${index}`] && (
                                <p className="mt-1 text-xs text-red-600">{validationErrors[`name_${size}_${index}`]}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Número</label>
                              <input
                                type="text"
                                value={numbers[index] || ''}
                                onChange={(e) => handleNumberChange(size, index, e.target.value)}
                                maxLength={10}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FE8F19] focus:border-[#FE8F19] outline-none transition-colors ${
                                  validationErrors[`number_${size}_${index}`] ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                                }`}
                                placeholder={`Número para el polo ${index + 1}`}
                              />
                              {validationErrors[`number_${size}_${index}`] && (
                                <p className="mt-1 text-xs text-red-600">{validationErrors[`number_${size}_${index}`]}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    }
    if (currentStep === 4) return (
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><ImageIcon className="text-[#FE8F19]"/> Diseño</h2>
        <div className={`border-2 border-dashed rounded-xl p-8 text-center relative group hover:border-[#FE8F19] transition-colors ${
          validationErrors.files ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
        }`}>
          <input 
            type="file" 
            multiple 
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" 
            onChange={handleFileUpload} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          />
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-[#FE8F19] mb-2"/>
            <span className="text-gray-600">Subir imágenes</span>
            <span className="text-xs text-gray-400 mt-1">Haz clic para seleccionar archivos (máx. 10MB por archivo, hasta 10 archivos)</span>
          </div>
        </div>
        {validationErrors.files && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm font-medium mb-2">Errores en los archivos:</p>
            <ul className="list-disc list-inside space-y-1">
              {Array.isArray(validationErrors.files) ? (
                validationErrors.files.map((error, idx) => (
                  <li key={idx} className="text-red-700 text-sm">{error}</li>
                ))
              ) : (
                <li className="text-red-700 text-sm">{validationErrors.files}</li>
              )}
            </ul>
          </div>
        )}
        
        {formData.files.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                {formData.files.length} {formData.files.length === 1 ? 'archivo seleccionado' : 'archivos seleccionados'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.files.map((file, index) => (
                <div key={index} className="relative group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {filePreviews[index] ? (
                    <div className="relative aspect-square">
                      <img 
                        src={filePreviews[index]} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <button
                          onClick={() => removeFile(index)}
                          className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-opacity"
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center bg-gray-100">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-xs text-gray-600 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity md:hidden"
                    type="button"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
            {formData.observations && (
              <span className="text-xs text-gray-500 ml-2">
                ({formData.observations.length}/1000 caracteres)
              </span>
            )}
          </label>
          <textarea 
            name="observations" 
            value={formData.observations} 
            onChange={handleInputChange} 
            rows="3" 
            maxLength={1000}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FE8F19] focus:border-[#FE8F19] outline-none transition-colors ${
              validationErrors.observations ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`} 
            placeholder="Agrega cualquier observación o detalle adicional sobre tu pedido..."
          />
          {validationErrors.observations && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <span className="text-red-500">•</span>
              {validationErrors.observations}
            </p>
          )}
        </div>
      </div>
    );
    if (currentStep === 5) return (
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><FileText className="text-[#FE8F19]"/> Revisar</h2>
        <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
          <p><strong>Cliente:</strong> {formData.name}</p>
          <p><strong>Total Prendas:</strong> {Object.values(formData.sizes).reduce((a,b)=>a+b,0)}</p>
          <p><strong>Archivos:</strong> {formData.files.length}</p>
          {getSelectedSizes().length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="font-bold mb-3">Nombres y Números de Impresión:</p>
              {getSelectedSizes().map(size => {
                const names = formData.namesBySize[size] || [];
                const numbers = formData.numbersBySize[size] || [];
                const quantity = formData.sizes[size];
                
                return (
                  <div key={size} className="mb-4 last:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-lg ${THEME.accentBg} text-white font-bold text-sm`}>
                        Talla {size}
                      </span>
                      <span className="text-sm text-gray-600">({quantity} {quantity === 1 ? 'polo' : 'polos'})</span>
                    </div>
                    <div className="bg-white rounded-lg p-3 space-y-2 border border-gray-200">
                      {Array.from({ length: quantity }, (_, index) => {
                        const name = names[index] || '';
                        const number = numbers[index] || '';
                        if (!name.trim() && !number.trim()) return null;
                        
                        return (
                          <div key={index} className="flex items-center gap-3 text-sm">
                            <span className="text-gray-500 w-6">#{index + 1}</span>
                            {name && <span className="font-medium text-gray-800">{name}</span>}
                            {number && <span className="text-[#FE8F19] font-semibold">#{number}</span>}
                            {!name && !number && <span className="text-gray-400 italic">Sin datos</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-[#FE8F19] transition">
          <ChevronLeft className="w-4 h-4 mr-1"/> Volver
        </button>
      </div>
      
      {/* Progress Bar Simplificada */}
      <div className="flex justify-between mb-8 relative">
         <div className="absolute top-1/2 w-full h-1 bg-gray-200 -z-10 rounded"></div>
         <div className="absolute top-1/2 h-1 bg-[#FE8F19] -z-10 rounded transition-all duration-500" style={{width: `${((currentStep-1)/(STEPS.length-1))*100}%`}}></div>
         {STEPS.map(s => (
           <div key={s.id} className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${currentStep >= s.id ? 'bg-[#FE8F19] border-[#FE8F19] text-white' : 'bg-white border-gray-200'}`}>
             <s.icon className="w-5 h-5"/>
           </div>
         ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10 min-h-[400px]">
        {renderContent()}
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button onClick={prevStep} disabled={currentStep===1 || isSubmitting} className={`px-6 py-2 rounded-lg font-medium ${currentStep===1 ? 'opacity-0' : 'text-gray-600 hover:bg-gray-100'}`}>Atrás</button>
        {currentStep === STEPS.length ? 
          <button onClick={handleSubmit} disabled={isSubmitting} className={`${THEME.primary} ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''} text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2`}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Confirmar Pedido
              </>
            )}
          </button> :
          <button onClick={nextStep} className={`${THEME.primary} text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2`}>
            Siguiente <ChevronRight className="w-4 h-4"/>
          </button>
        }
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (ORQUESTADOR) ---

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'wizard'

  useEffect(() => {
    window.scrollTo(0,0);
  }, [view]);

  return (
    <div className={`min-h-screen ${THEME.bg} font-sans`}>
      <Navbar onNavigate={setView} />
      
      {view === 'home' ? (
        <div className="animate-fadeIn">
          <HeroSection onStartOrder={() => setView('wizard')} />
          <ServicesSection />
          <Footer />
        </div>
      ) : (
        <OrderWizard onBack={() => setView('home')} />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}