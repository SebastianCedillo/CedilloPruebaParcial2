export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  /* {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      }
    ]
  },*/
  {
    id: 'Componentes',
    title: 'Componentes',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'proveedores',
        title: 'Proveedores',
        type: 'item',
        classes: 'nav-item',
        url: '/proveedores',
        icon: ''
      },
      {
        id: 'color',
        title: 'Clientes',
        type: 'item',
        classes: 'nav-item',
        url: '/clientes',
        icon: 'bg-colors'
      },
      {
        id: 'tabler',
        title: 'Facturas',
        type: 'item',
        classes: 'nav-item',
        url: '/facturas',
        icon: 'ant-design'
      },
      {
        id: 'tabler',
        title: 'Unidad de Medida',
        type: 'item',
        classes: 'nav-item',
        url: '/unidadmedida',
        icon: 'ant-design'
      },
      {
        id: 'tabler',
        title: 'Productos',
        type: 'item',
        classes: 'nav-item',
        url: '/productos',
        icon: 'ant-design'
      },
      // New items for habitaciones, huespedes, and reservas
      {
        id: 'habitaciones',
        title: 'Habitaciones',
        type: 'item',
        classes: 'nav-item',
        url: '/habitaciones',
        icon: 'home'
      },
      {
        id: 'huespedes',
        title: 'Huéspedes',
        type: 'item',
        classes: 'nav-item',
        url: '/huespedes',
        icon: 'user'
      },
      {
        id: 'reservas',
        title: 'Reservas',
        type: 'item',
        classes: 'nav-item',
        url: '/reservas',
        icon: 'calendar'
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }
];
