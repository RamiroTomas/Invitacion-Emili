export const INVITATION_DATA = {
  name: "Emilia Tomas",
  date: "19 de Septiembre, 2026",
  time: "21:00 hs",
  whatsappNumber: "+59899123456", // Cambia esto por el número de WhatsApp de Emilia / Organizador
  cloudinary: {
    cloudName: "qbnzhyou", // Ej: "tu_cloud_name" de Cloudinary
    uploadPreset: "event_photos" // Ej: "xv_emilia" (Unsigned upload preset)
  },
  supabase: {
    url: "https://jglmccbkvmzqxbehkkef.supabase.co", // Reemplazar con tu URL de Supabase (ej: https://xyz.supabase.co)
    anonKey: "sb_publishable_gQSharkixPxjBqsDC6YSWQ_ERTaK59o" // Reemplazar con tu Anon Key de Supabase
  },
  driveAlbumUrl: "", // Opcional: Link a álbum compartido de Google Photos o Drive
  location: {
    name: "Chacra las calas",
    address: "Cam. Altair, 12400 Montevideo, Uruguay",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13106.874136979927!2d-56.1287955!3d-34.7873836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a1d7f6c3210497%3A0x7d6a5c1815d9796!2sCam.%20Altair%2012400%2C%2012400%20Montevideo%2C%20Departamento%20de%20Montevideo!5e0!3m2!1ses-419!2suy!4v1715443200000!5m2!1ses-419!2suy"
  },
  dressCode: "Vestimenta Formal. Se ruega restringir los colores amarillo dorado y champán.",
  giftRegistry: {
    message: "Mi mayor regalo es tu compañía. Si deseas obsequiarme algo, puedes hacerlo mediante transferencia o en el cofre de la fiesta.",
    bankDetails: "CBU: 0000000000000000000000\nAlias: EMILIA.BELLA.15\nBanco de Mágica"
  },
  pages: [
    {
      title: "La Rosa Encantada",
      content: '"Érase una vez una tierra lejana"... una joven festejaba sus XV años, una noche que quedaría para siempre en su corazón',
      image: "/images/NAC02340.jpg"
    },
    {
      title: "Mis Recuerdos",
      content: "Te invito a compartir este festejo donde los sueños y el amor por los momentos especiales se hacen realidad.",
      image: "/images/NAC02484.jpg"
    },
    {
      title: "El Gran Baile",
      content: "Inspirada en un cuento que nos enseñó a descubrir la belleza en los pequeños detalles, soñé con una fiesta llena de rosas, música y una tiara",
      image: "/images/NAC03363.jpg"
    },
    {
      title: "Dulces 15",
      content: "Solo falta un detalle para completar este cuento, que estés allí. Te espero para compartir mi noche soñada",
      image: "/images/NAC03414.jpg"
    },
    {
      title: "Cuándo y Qué vestir",
      type: "schedule"
    },
    {
      title: "Dónde es la magia",
      type: "location"
    },
    {
      title: "Confirmar Asistencia",
      type: "rsvp"
    },
    {
      title: "Un Detalle",
      type: "gift"
    },
    {
      title: "¡TE ESPERO!",
      content: "",
      image: "/images/NAC04019.jpg",
      type: "teespero"
    }
  ]
};
