import { MaMenu } from "./ma.menu.model";

export const MAmenuItems = [ 
    new MaMenu (10, 'ADMIN_NAV.DASHBOARD', '/mesadeayuda/dashboard', null, 'dashboard', null, false, 0),
    new MaMenu (20, 'Categorías', null, null, 'category', null, true, 0),  
    new MaMenu (21, 'Categorías', '/mesadeayuda/categoria', null, 'category', null, false, 20), 
    new MaMenu (22, 'Sub Categorías', '/mesadeayuda/subcategoria', null, 'list', null, false, 20), 
 
    new MaMenu (30, 'Tickets', null, null, 'support', null, true, 0), 
    new MaMenu (31, 'Tickets', '/mesadeayuda/tikets', null, 'support', null, false, 30), 
    new MaMenu (32, 'Tablero', '/mesadeayuda/tablero', null, 'grid_on', null, false, 30)
    
    // new Menu (110, 'ADMIN_NAV.SUPPORT', '/admin/support', null, 'support', null, false, 0), 
    // new MaMenu (120, 'ADMIN_NAV.REVIEWS', '/admin/reviews', null, 'insert_comment', null, false, 0), 
    // new MaMenu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    // new MaMenu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    // new MaMenu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    // new MaMenu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    // new MaMenu (144, 'Level 5', null, '/', 'link', null, false, 143),
    // new MaMenu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]

export const MAmenuItemsuser = [ 
    // new MaMenu (10, 'ADMIN_NAV.DASHBOARD', '/mesadeayuda/dashboard', null, 'dashboard', null, false, 0),
    // new MaMenu (20, 'Categorías', null, null, 'category', null, true, 0),  
    // new MaMenu (21, 'Categorías', '/mesadeayuda/categoria', null, 'category', null, false, 20), 
    // new MaMenu (22, 'Sub Categorías', '/mesadeayuda/subcategoria', null, 'list', null, false, 20), 
 
    new MaMenu (30, 'Tickets', null, null, 'support', null, true, 0), 
    // new MaMenu (31, 'Tikets', '/mesadeayuda/tikets', null, 'support', null, false, 30), 
    new MaMenu (32, 'Tablero', '/mesadeayuda/tablero', null, 'grid_on', null, false, 30)
    
    // new Menu (110, 'ADMIN_NAV.SUPPORT', '/admin/support', null, 'support', null, false, 0), 
    // new MaMenu (120, 'ADMIN_NAV.REVIEWS', '/admin/reviews', null, 'insert_comment', null, false, 0), 
    // new MaMenu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    // new MaMenu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    // new MaMenu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    // new MaMenu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    // new MaMenu (144, 'Level 5', null, '/', 'link', null, false, 143),
    // new MaMenu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]