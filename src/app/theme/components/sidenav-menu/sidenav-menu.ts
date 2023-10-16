import { SidenavMenu } from './sidenav-menu.model';

export const sidenavMenuItems = [ 
    new SidenavMenu (1, 'Inicio', '/', null, null, false, 0),
    new SidenavMenu (2, 'Divisiones de Negocio', null, null, null, true, 0), 
    //new SidenavMenu (10, 'Químicos', null, null, null, false, 2),   
    new SidenavMenu (21, 'Aliementos', '/aliementos', null, null, false, 2),
    new SidenavMenu (22, 'Cadenas', '/cadenas', null, null, false, 2),
    new SidenavMenu (23, 'Industrial', '/aliementos', null, null, false, 2),
   
    new SidenavMenu (3, 'Catalogos', null, null, null, true, 0), 
    //new SidenavMenu (10, 'Químicos', null, null, null, false, 2),   
    new SidenavMenu (31, 'D-TREND', '/trend', null, null, false, 3),
    new SidenavMenu (32, 'Alimentos', '/catalogo', null, null, false, 3),
    new SidenavMenu (33, 'Cadenas', '/catalogoscadenas', null, null, false, 3),
    new SidenavMenu (33, 'Industrial', '/catalogosindustrial', null, null, false, 3),
    
    new SidenavMenu (4, 'Categorías', null, null, null, true, 0), 
    //new SidenavMenu (10, 'Químicos', null, null, null, false, 2),   
    new SidenavMenu (41, 'Químicos', "/productos", null, null, false, 4),
    new SidenavMenu (22, 'Equipos', "/productos", null, null, false, 4),
    
    new SidenavMenu (50, '¿Quines somos?', '/quienessomos', null, null, false, 0), 
    new SidenavMenu (51, 'sucursales', '/sucursales', null, null, false, 0), 
    new SidenavMenu (52, 'Universidad diken', '/sucursales', null, null, false, 0), 
    new SidenavMenu (53, 'Contacto', '/contact', null, null, false, 0), 
    new SidenavMenu (54, 'Intranet', '/plataformas', null, null, false, 0), 

    // new SidenavMenu (60, 'NAV.PAGES', null, null, null, true, 0),   
    // new SidenavMenu (61, 'NAV.SHOP', null, null, null, true, 60), 
    // new SidenavMenu (62, 'NAV.ALL_PRODUCTS', '/productos', null, null, false, 61),  
    // new SidenavMenu (63, 'NAV.PRODUCT_DETAIL', '/productos/2/PC All-in-One', null, null, false, 61), 
    // new SidenavMenu (64, 'NAV.CART', '/cart', null, null, false, 61), 
    // new SidenavMenu (65, 'NAV.CHECKOUT', '/Cotizacion', null, null, false, 61),  
    // new SidenavMenu (65, 'NAV.CHECKOUT', '/checkout', null, null, false, 61),  
    new SidenavMenu (70, 'LOGIN', '/sign-in', null, null, false, 60), 
    // new SidenavMenu (71, 'NAV.404_PAGE', '/404', null, null, false, 60), 
    // new SidenavMenu (72, 'NAV.LANDING', '/landing', null, null, false, 60), 
    // new SidenavMenu (80, 'NAV.CONTACT', '/contact', null, null, false, 0),  
    // new SidenavMenu (90, 'NAV.ADMIN', '/admin', null, null, false, 0),  
    // new SidenavMenu (140, 'Level 1', null, null, null, true, 0),
    // new SidenavMenu (141, 'Level 2', null, null, null, true, 140),
    // new SidenavMenu (142, 'Level 3', null, null, null, true, 141),
    // new SidenavMenu (143, 'Level 4', null, null, null, true, 142),
    // new SidenavMenu (144, 'Level 5', null, 'http://themeseason.com', null, false, 143),
    // new SidenavMenu (200, 'NAV.EXTERNAL_LINK', null, 'http://themeseason.com', '_blank', false, 0)
]