import { User, WishCategory } from '../types';

export const CATEGORIES: { value: WishCategory; label: string; icon: string }[] = [
  { value: 'tecnologia', label: 'Tecnología', icon: '💻' },
  { value: 'deportes', label: 'Deportes', icon: '⚽' },
  { value: 'hogar', label: 'Hogar', icon: '🏠' },
  { value: 'educacion', label: 'Educación', icon: '📚' },
  { value: 'arte', label: 'Arte', icon: '🎨' },
  { value: 'musica', label: 'Música', icon: '🎵' },
  { value: 'viajes', label: 'Viajes', icon: '✈️' },
  { value: 'otros', label: 'Otros', icon: '🎁' }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Estudiante de diseño y programación. Amante de la tecnología y el arte.',
    wishlist: [
      {
        id: 'w1',
        title: 'MacBook Air M2',
        description: 'Para poder estudiar programación y diseño gráfico',
        price: 1299,
        progress: 1299,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        userId: '1',
        category: 'tecnologia'
      },
      {
        id: 'w2',
        title: 'iPad Pro 11"',
        description: 'Para ilustración digital y tomar apuntes',
        price: 799,
        progress: 350,
        imageUrl: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9',
        userId: '1',
        category: 'tecnologia'
      }
    ],
    donations: [
      {
        id: 'd3',
        amount: 200,
        wishId: 'w5',
        donorId: '1',
        timestamp: new Date('2024-03-15'),
        comment: '¡Para que sigas creando arte increíble! 🎨'
      }
    ],
    followers: ['2', '3'],
    following: ['2']
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    bio: 'Apasionado del deporte y la vida al aire libre. Instructor de ciclismo.',
    wishlist: [
      {
        id: 'w3',
        title: 'Bicicleta Mountain Bike Teknial Tarpan 100r 29',
        description: 'Para poder hacer ejercicio y explorar nuevas rutas',
        price: 799,
        progress: 799,
        imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
        userId: '2',
        category: 'deportes'
      },
      {
        id: 'w7',
        title: 'Smartwatch Amazfit Gts 4 Mini',
        description: 'Para tracking de ejercicios y rutas',
        price: 199,
        progress: 50,
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_686140-MLA53090750897_122022-F.webp',
        userId: '2',
        category: 'tecnologia'
      }
    ],
    donations: [
      {
        id: 'd1',
        amount: 150,
        wishId: 'w1',
        donorId: '2',
        timestamp: new Date('2024-03-10'),
        comment: '¡Espero que esto te ayude a conseguir tu MacBook! 💪'
      }
    ],
    followers: ['1'],
    following: ['1', '3']
  },
  {
    id: '3',
    name: 'María López',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    bio: 'Ilustradora digital y diseñadora UX/UI. Creando arte todos los días.',
    wishlist: [
      {
        id: 'w4',
        title: 'Tableta Gráfica Wacom Cintiq Pro 16',
        description: 'Para mejorar mi flujo de trabajo en ilustración digital',
        price: 1499,
        progress: 1499,
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_787890-MLA46516512347_062021-F.webp',
        userId: '3',
        category: 'arte'
      },
      {
        id: 'w5',
        title: 'Monitor LG UltraFine 27UN850-W',
        description: 'Monitor 4K para diseño profesional',
        price: 699,
        progress: 699,
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_985112-MLA46516512281_062021-F.webp',
        userId: '3',
        category: 'tecnologia'
      }
    ],
    donations: [
      {
        id: 'd2',
        amount: 300,
        wishId: 'w3',
        donorId: '3',
        timestamp: new Date('2024-03-12'),
        comment: 'Para que puedas empezar a explorar nuevas rutas 🚴‍♂️'
      }
    ],
    followers: ['2'],
    following: []
  },
  {
    id: '4',
    name: 'Luis Martínez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Fotógrafo profesional y videógrafo. Capturando momentos únicos.',
    wishlist: [
      {
        id: 'w8',
        title: 'Sony Alpha A7 III Kit',
        description: 'Cámara mirrorless profesional para fotografía y video',
        price: 2499,
        progress: 2499,
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_744609-MLA46479924210_062021-F.webp',
        userId: '4',
        category: 'arte'
      },
      {
        id: 'w9',
        title: 'DJI Air 2S Fly More Combo',
        description: 'Drone para fotografía y video aéreo',
        price: 999,
        progress: 450,
        imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_2X_833011-MLA46516512228_062021-F.webp',
        userId: '4',
        category: 'tecnologia'
      }
    ],
    donations: [
      {
        id: 'd4',
        amount: 250,
        wishId: 'w4',
        donorId: '4',
        timestamp: new Date('2024-03-14'),
        comment: '¡Para tus increíbles ilustraciones! 🎨'
      }
    ],
    followers: ['2', '3'],
    following: ['1', '3']
  }
];