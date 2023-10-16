import { BgdMenu } from "./bgd.menu.model";

export const BgdmenuItems = [ 
    //new BgdMenu (10, 'Cuadrante 1', '/mesadeayuda/dashboard', null, 'dashboard', null, false, 0),
    new BgdMenu (20, 'Cuadrante 1', null, null, 'filter_1', null, true, 0),
    new BgdMenu (21, 'Antiguedad de Saldos', '/bigdata/antiguedad-saldos', null, 'history', null, false, 20),
    
    new BgdMenu (22, 'Cartera de Clientes', '/bigdata/carteraclientes', null, 'people_outline', null, false, 20), 
    new BgdMenu (23, 'Estadistica Ventas', '/bigdata/ventasporasesor', null, 'functions', null, false, 20), 
    new BgdMenu (24, 'Ventas por oficina', '/bigdata/ventasporoficina', null, 'functions', null, false, 20),
 
    new BgdMenu (30, 'cuadrante 2', null, null, 'filter_2', null, true, 0), 
    new BgdMenu (31, 'Dashboard', '/bigdata/dashboard', null, 'dashboard', null, false, 30),
    new BgdMenu (32, 'Productos', '/bigdata/bdproductos', null, 'assignment', null, false, 30),
    new BgdMenu (33, 'Generar Folios', '/bigdata/generafolios', null, 'format_list_numbered', null, false, 30), 
    new BgdMenu (34, 'Lista de Reportes', '/bidata/listadoreporte', null, 'format_list_bulleted', null, false, 30),
    new BgdMenu (35, 'Reporteo Prospectos', '/bidata/reporteoprospecto', null, 'receipt', null, false, 30),
   
    
 

    // new Menu (110, 'ADMIN_NAV.SUPPORT', '/admin/support', null, 'support', null, false, 0), 
    // new MaMenu (120, 'ADMIN_NAV.REVIEWS', '/admin/reviews', null, 'insert_comment', null, false, 0), 
    // new MaMenu (140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    // new MaMenu (141, 'Level 2', null, null, 'folder_open', null, true, 140),
    // new MaMenu (142, 'Level 3', null, null, 'folder_open', null, true, 141),
    // new MaMenu (143, 'Level 4', null, null, 'folder_open', null, true, 142),
    // new MaMenu (144, 'Level 5', null, '/', 'link', null, false, 143),
    // new MaMenu (200, 'ADMIN_NAV.EXTERNAL_LINK', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0)
]

