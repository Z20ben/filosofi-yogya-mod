export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
  avatar?: string;
  last_login?: Date;
  created_at: Date;
}

export const mockUsersData: User[] = [
  {
    id: '1',
    name: 'Ahmad Santoso',
    email: 'ahmad.santoso@jogjabudaya.id',
    role: 'Admin',
    status: 'active',
    last_login: new Date('2024-03-15T14:30:00'),
    created_at: new Date('2024-01-10'),
  },
  {
    id: '2',
    name: 'Siti Rahayu',
    email: 'siti.rahayu@jogjabudaya.id',
    role: 'Editor',
    status: 'active',
    last_login: new Date('2024-03-15T10:15:00'),
    created_at: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'Budi Wijaya',
    email: 'budi.wijaya@jogjabudaya.id',
    role: 'Editor',
    status: 'active',
    last_login: new Date('2024-03-14T16:45:00'),
    created_at: new Date('2024-02-01'),
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@jogjabudaya.id',
    role: 'Viewer',
    status: 'active',
    last_login: new Date('2024-03-13T09:20:00'),
    created_at: new Date('2024-02-10'),
  },
  {
    id: '5',
    name: 'Joko Prasetyo',
    email: 'joko.prasetyo@jogjabudaya.id',
    role: 'Editor',
    status: 'inactive',
    last_login: new Date('2024-02-28T11:00:00'),
    created_at: new Date('2024-01-20'),
  },
];
