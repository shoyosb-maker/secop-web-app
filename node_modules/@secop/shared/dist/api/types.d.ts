/**
 * Tipos compartidos para toda la aplicación
 * Estos tipos los usan tanto backend como frontend
 */
export interface SecopProcess {
    id_del_proceso: string;
    referencia_del_proceso: string;
    urlproceso: string;
    id_del_portafolio?: string;
    entidad: string;
    nit_entidad: string;
    codigo_entidad?: string;
    ordenentidad?: string;
    codigo_pci?: string;
    ppi?: string;
    departamento_entidad: string;
    ciudad_entidad: string;
    direccion_entidad?: string;
    nombre_de_la_unidad_de?: string;
    ciudad_de_la_unidad_de?: string;
    nombre_del_procedimiento: string;
    descripci_n_del_procedimiento: string;
    justificaci_n_modalidad_de?: string;
    fase: string;
    estado_del_procedimiento: string;
    id_estado_del_procedimiento?: string;
    estado_resumen?: string;
    estado_de_apertura_del_proceso?: string;
    modalidad_de_contratacion: string;
    tipo_de_contrato?: string;
    subtipo_de_contrato?: string;
    precio_base: string;
    condiciones_de_pago?: string;
    duracion?: string;
    unidad_de_duracion?: string;
    codigo_principal_de_categoria?: string;
    categorias_adicionales?: string;
    numero_de_lotes?: string;
    fecha_de_publicacion_del: string;
    fecha_de_ultima_publicaci?: string;
    fecha_de_publicacion_fase?: string;
    fecha_de_publicacion_fase_1?: string;
    fecha_de_publicacion?: string;
    fecha_de_publicacion_fase_2?: string;
    fecha_de_publicacion_fase_3?: string;
    fecha_de_recepcion_de: string;
    fecha_de_apertura_de_respuesta?: string;
    fecha_de_apertura_efectiva?: string;
    proveedores_invitados?: string;
    proveedores_con_invitacion?: string;
    visualizaciones_del?: string;
    proveedores_que_manifestaron?: string;
    respuestas_al_procedimiento?: string;
    respuestas_externas?: string;
    conteo_de_respuestas_a_ofertas?: string;
    proveedores_unicos_con?: string;
    adjudicado?: string;
    id_adjudicacion?: string;
    fecha_adjudicacion?: string;
    valor_total_adjudicacion?: string;
    nombre_del_adjudicador?: string;
    nombre_del_proveedor?: string;
    nit_del_proveedor_adjudicado?: string;
    codigoproveedor?: string;
    departamento_proveedor?: string;
    ciudad_proveedor?: string;
    [key: string]: unknown;
}
export interface TransformedProcess {
    id: string;
    reference: string;
    entity: string;
    entity_nit: string;
    title: string;
    phase: string;
    status: string;
    modality: string;
    base_value: number;
    publication_date: string;
    deadline: string;
    url: string;
    description: string;
    unspsc_code?: string;
    unspsc_additional?: string;
}
export interface SearchParams {
    entity_name?: string;
    department?: string;
    city?: string;
    phase?: string;
    modality?: string;
    min_value?: number;
    max_value?: number;
    from_date?: string;
    to_date?: string;
    status?: string;
    limit?: number;
    query?: string;
    search_mode?: 'all_words' | 'phrase' | 'any_word';
}
export interface AggregationResult {
    fase: string;
    modalidad_de_contratacion: string;
    count: string;
    total_value: string;
}
export interface ResponseMeta {
    tool: string;
    timestamp: string;
    count?: number;
    total_fetched?: number;
    limit?: number;
    entity?: string;
    nit?: string;
    process_id?: string;
    note?: string;
}
export interface SocrataClientConfig {
    SOCRATA_APP_TOKEN: string;
    SOCRATA_BASE_URL: string;
    SOCRATA_DATASET_ID: string;
    REQUEST_TIMEOUT_MS: number;
    RETRY_ATTEMPTS: number;
    SOCRATA_API_KEY?: string;
    SOCRATA_API_SECRET?: string;
}
//# sourceMappingURL=types.d.ts.map