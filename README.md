# Consultoría K y J — sitio web contable, de auditoría y tributario

Sitio web estático, adaptable a móviles, en español. No necesita instalar dependencias ni ejecutar un servidor para probarse.

## Archivos
- `index.html`: estructura y contenido de la página.
- `styles.css`: diseño, colores y adaptación a móvil.
- `script.js`: catálogo/solicitud, formularios, WhatsApp y reserva.
- `README.md`: instrucciones de configuración y publicación.

## 1. Personalizar antes de publicar
Abre `script.js` y cambia:
- `whatsappNumber`: tu número real de WhatsApp con código de país, sin `+`, espacios ni guiones. Ejemplo de formato chileno: `56912345678`.
- `contactEmail`: correo real donde quieres recibir consultas.

También revisa `index.html` para actualizar:
- Descripciones, alcance de los servicios y catálogo para que correspondan exactamente a la oferta de Consultoría K y J.
- Horario de atención, textos de contacto y cualquier información comercial.
- Precios, una vez definidos.

El formulario de contacto prepara un correo con `mailto:`. Eso abre la aplicación de correo del visitante y no guarda los datos en una base de datos. La agenda y el carrito preparan una solicitud de cotización por WhatsApp; no confirman automáticamente una reserva.

## 2. Publicación gratuita con GitHub Pages
1. Crea una cuenta en GitHub si aún no tienes.
2. Crea un repositorio nuevo, por ejemplo `consultoria-kyj`.
3. Sube `index.html`, `styles.css`, `script.js` y `README.md` a la raíz del repositorio.
4. En el repositorio, entra en **Settings → Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**, elige `main` y la carpeta `/ (root)`, y guarda.
6. GitHub mostrará la dirección pública cuando termine la publicación.

Alternativas sencillas para sitios estáticos: Netlify o Cloudflare Pages. Los pasos y planes gratuitos pueden cambiar, revisa las condiciones vigentes del proveedor.

## 3. Importante sobre pagos online
Los pagos **no están conectados ni activos** en esta versión. Antes de recibir dinero, define servicios y precios, política de cancelaciones/reembolsos, entrega del servicio y datos tributarios. Luego integra una pasarela apropiada para Chile (por ejemplo, Mercado Pago o Flow) siguiendo su documentación oficial. No almacenes números de tarjeta ni códigos de seguridad en este sitio. La integración requiere credenciales de comercio y normalmente una función de servidor o checkout alojado; no es seguro poner secretos en `script.js`.

## 4. Privacidad y formularios
La página no tiene base de datos ni panel de administración. Antes de recopilar información de clientes, añade una política de privacidad y configura un proveedor de formularios o un backend seguro. Prueba todos los enlaces y envíos desde un teléfono antes de publicar.

## 5. Vista local
Abre `index.html` en un navegador. Para probar WhatsApp, cambia primero el número de ejemplo en `script.js`.
