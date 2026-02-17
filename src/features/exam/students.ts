export interface Student {
    id: string;
    name: string;
}

export const STUDENTS: Student[] = [
    { id: '1068417801', name: 'Juan David Alvarez Mejia' },
    { id: '1006321643', name: 'Camila Alvitres Cabeza' },
    { id: '1006201622', name: 'Cristhian Alzate Gómez' },
    { id: '1118201113', name: 'Carlos Andres Angola Berrio' },
    { id: '1089932388', name: 'Santiago Aristizábal Sepúlveda' },
    { id: '1004944877', name: 'Juan Felipe Benavides Álvarez' },
    { id: '1113858851', name: 'Juan Esteban Cardona Blandon' },
    { id: '1112389057', name: 'Juan David Correa Ramos' },
    { id: '1004417134', name: 'Juan Manuel Diaz Torres' },
    { id: '1006022340', name: 'Santiago Gallego Rendón' },
    { id: '1002545539', name: 'Óscar Andrés García Jurado' },
    { id: '1193040310', name: 'Justin Andres Garcia Ocampo' },
    { id: '1093213414', name: 'Jonathan Gaviria Ocampo' },
    { id: '1010135325', name: 'Jessica Lorena González Gómez' },
    { id: '1089378180', name: 'Santiago Gonzalez Hincapie' },
    { id: '1034289634', name: 'Steven Grisales Lopez' },
    { id: '1089380652', name: 'Samuel Herrera Marín' },
    { id: '1126603669', name: 'Isabela Hevia Sanchez' },
    { id: '1077997025', name: 'Amir Evelio Hurtado Mena' },
    { id: '1088244726', name: 'Sofia Jaramillo Agudelo' },
    { id: '1004681831', name: 'Jose David Marin Giraldo' },
    { id: '1035971266', name: 'Juana Valentina Martinez Sanchez' },
    { id: '1089931989', name: 'Tomás Marulanda Aristizabal' },
    { id: '1113858457', name: 'Daniel Andres Ortiz Solano' },
    { id: '1121446249', name: 'Sebastian Alberto Perdomo Rengifo' },
    { id: '1004778204', name: 'Santiago Ramirez Cardona' },
    { id: '1006538369', name: 'Elkin Darío Rojas Ortiz' },
    { id: '1004235669', name: 'Valentina Rosas Coral' },
    { id: '1004754881', name: 'Santiago Rudas Muñoz' },
    { id: '1004736377', name: 'Edwin Geovanny Triana Pulgarin' },
    { id: '1089931781', name: 'Santiago Trujillo Orozco' },
    { id: '1088346467', name: 'Juan José Villa Ramírez' },
    { id: '1022327579', name: 'Cesar David Villegas Naranjo' },
];

export function findStudentById(id: string): Student | undefined {
    return STUDENTS.find(s => s.id === id.trim());
}
