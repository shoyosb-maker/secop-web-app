// frontend/src/utils/citiesData.ts

export const citiesByDepartment: Record<string, string[]> = {
  'Amazonas': ['Leticia'],
  'Antioquia': ['Medellín', 'Bello', 'Envigado', 'Itagüí', 'Rionegro', 'Apartadó', 'Turbo', 'Caucasia', 'Puerto Berrío', 'Yarumal'],
  'Arauca': ['Arauca', 'Arauquita', 'Cravo Norte', 'Fortul', 'Puerto Rondón', 'Saravena', 'Tame'],
  'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Puerto Colombia', 'Sabanagrande', 'Sabanalarga', 'Campo de la Cruz'],
  'Bolívar': ['Cartagena', 'Magangué', 'Turbaco', 'Arjona', 'El Carmen de Bolívar', 'Santa Rosa del Sur'],
  'Boyacá': ['Tunja', 'Sogamoso', 'Duitama', 'Chiquinquirá', 'Paipa', 'Villa de Leyva', 'Moniquirá'],
  'Caldas': ['Manizales', 'La Dorada', 'Chinchiná', 'Villamaría', 'Riosucio', 'Aguadas', 'Salamina'],
  'Caquetá': ['Florencia', 'San Vicente del Caguán', 'Cartagena del Chairá', 'Curillo', 'Solano'],
  'Casanare': ['Yopal', 'Aguazul', 'Tauramena', 'Villanueva', 'Monterrey', 'Maní', 'Sácama'],
  'Cauca': ['Popayán', 'Santander de Quilichao', 'Puerto Tejada', 'Silvia', 'Corinto', 'Miranda', 'Patía'],
  'Cesar': ['Valledupar', 'Aguachica', 'Bosconia', 'La Paz', 'San Alberto', 'Curumaní', 'Chimichagua'],
  'Chocó': ['Quibdó', 'Istmina', 'Tadó', 'Condoto', 'Nuquí', 'Bahía Solano', 'Juradó'],
  'Córdoba': ['Montería', 'Cereté', 'Lorica', 'San Pelayo', 'Sahagún', 'Montelíbano', 'Planeta Rica'],
  'Cundinamarca': ['Soacha', 'Girardot', 'Zipaquirá', 'Facatativá', 'Chía', 'Mosquera', 'Madrid', 'Fusagasugá'],
  'Distrito Capital de Bogotá': ['Bogotá'],
  'Guainía': ['Inírida'],
  'Guaviare': ['San José del Guaviare', 'Calamar', 'El Retorno', 'Miraflores'],
  'Huila': ['Neiva', 'Pitalito', 'Garzón', 'La Plata', 'Campoalegre', 'Gigante', 'San Agustín'],
  'La Guajira': ['Riohacha', 'Maicao', 'Uribia', 'San Juan del Cesar', 'Manaure', 'Fonseca', 'Barrancas'],
  'Magdalena': ['Santa Marta', 'Ciénaga', 'Fundación', 'El Banco', 'Plato', 'Aracataca', 'Zona Bananera'],
  'Meta': ['Villavicencio', 'Acacías', 'Granada', 'Puerto López', 'Cumaral', 'San Martín', 'Restrepo'],
  'Nariño': ['Pasto', 'Ipiales', 'Tumaco', 'Samaniego', 'La Unión', 'Túquerres', 'Sandona'],
  'Norte de Santander': ['Cúcuta', 'Ocaña', 'Villa del Rosario', 'Los Patios', 'Pamplona', 'San José de Cúcuta'],
  'Putumayo': ['Mocoa', 'Puerto Asís', 'Orito', 'Sibundoy', 'Villagarzón', 'San Miguel'],
  'Quindío': ['Armenia', 'Calarcá', 'La Tebaida', 'Montenegro', 'Quimbaya', 'Salento', 'Circasia'],
  'Risaralda': ['Pereira', 'Dosquebradas', 'La Virginia', 'Santa Rosa de Cabal', 'Quinchía', 'Apía'],
  'San Andrés, Providencia y Santa Catalina': ['San Andrés', 'Providencia', 'Santa Catalina'],
  'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'San Gil', 'Socorro'],
  'Sucre': ['Sincelejo', 'Corozal', 'Sampués', 'San Benito Abad', 'Tolú', 'Tolú Viejo', 'Coveñas'],
  'Tolima': ['Ibagué', 'Espinal', 'Honda', 'Chaparral', 'Líbano', 'Mariquita', 'Purificación'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Tuluá', 'Cartago', 'Buga', 'Yumbo', 'Jamundí'],
  'Vaupés': ['Mitú', 'Carurú', 'Papunaua', 'Taraira', 'Yavaraté'],
  'Vichada': ['Puerto Carreño', 'La Primavera', 'Santa Rosalía', 'Cumaribo']
};

export const departments: string[] = ['', ...Object.keys(citiesByDepartment)];