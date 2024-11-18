type Especialidad = 'Medico de familia' | 'Pediatra' | 'Cardiólogo';

interface Pacientes {
  id: number;
  nombre: string;
  apellidos: string;
  sexo: string;
  temperatura: number;
  frecuenciaCardiaca: number;
  especialidad: Especialidad;
  edad: number;
}

const pacientes: Pacientes[] = [
  {
    id: 1,
    nombre: 'John',
    apellidos: 'Doe',
    sexo: 'Male',
    temperatura: 36.8,
    frecuenciaCardiaca: 80,
    especialidad: 'Medico de familia',
    edad: 44,
  },
  {
    id: 2,
    nombre: 'Jane',
    apellidos: 'Doe',
    sexo: 'Female',
    temperatura: 36.8,
    frecuenciaCardiaca: 70,
    especialidad: 'Medico de familia',
    edad: 43,
  },
  {
    id: 3,
    nombre: 'Junior',
    apellidos: 'Doe',
    sexo: 'Male',
    temperatura: 36.8,
    frecuenciaCardiaca: 90,
    especialidad: 'Pediatra',
    edad: 8,
  },
  {
    id: 4,
    nombre: 'Mary',
    apellidos: 'Wien',
    sexo: 'Female',
    temperatura: 36.8,
    frecuenciaCardiaca: 120,
    especialidad: 'Medico de familia',
    edad: 20,
  },
  {
    id: 5,
    nombre: 'Scarlett',
    apellidos: 'Somez',
    sexo: 'Female',
    temperatura: 36.8,
    frecuenciaCardiaca: 110,
    especialidad: 'Cardiólogo',
    edad: 30,
  },
  {
    id: 6,
    nombre: 'Brian',
    apellidos: 'Kid',
    sexo: 'Male',
    temperatura: 39.8,
    frecuenciaCardiaca: 80,
    especialidad: 'Pediatra',
    edad: 11,
  },
];

console.log(
  '%cAPARTADO 1 a) con esta funcion extraigo lista de pacientes de cualquier especialidad:',
  'background: #b3e5fc; color: #000; padding: 4px; border-radius: 4px;',
);

const extraerListaPacientes = (
  miListaEspecialidad: Especialidad,
): Pacientes[] => {
  let listaEspecialidadXEdad = [];
  console.log(`Lista de pacientes pertenecientes a ${miListaEspecialidad}`);
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === miListaEspecialidad) {
      listaEspecialidadXEdad[listaEspecialidadXEdad.length] = pacientes[i];
      console.log(
        `ID: ${pacientes[i].id}, Apellidos: ${pacientes[i].apellidos}, Nombre: ${pacientes[i].nombre}`,
      );
    }
  }
  return listaEspecialidadXEdad;
};

extraerListaPacientes('Pediatra');

console.log(
  '%cAPARTADO 1 b) con esta funcion extraigo lista de pacientes de cualquier especialidad y menores a cualquier edad:',
  'background: #b3e5fc; color: #000; padding: 4px; border-radius: 4px;',
);

const extraerListaPacientesMenorXEdad = (
  miListaEspecialidad: Especialidad,
  edad: number,
): Pacientes[] => {
  let listaEspecialidad = [];
  console.log(`
    Lista de pacientes pertenecientes a la especialidad de ${miListaEspecialidad}, menores a ${edad} anos de edad:`);
  for (let i = 0; i < pacientes.length; i++) {
    if (
      pacientes[i].especialidad === miListaEspecialidad &&
      pacientes[i].edad < edad
    ) {
      listaEspecialidad[listaEspecialidad.length] = pacientes[i];
      console.log(
        `ID: ${pacientes[i].id}, Apellidos: ${pacientes[i].apellidos}, Nombre: ${pacientes[i].nombre}`,
      );
    }
  }
  return listaEspecialidad;
};

extraerListaPacientesMenorXEdad('Pediatra', 10);

console.log(
  '%cAPARTADO 2. Queremos activar el protocolo de urgencia si cualquier de los pacientes tiene un ritmo cardíaco superior a 100 pulsaciones por minuto y una temperatura corporal superior a 39 grados:',
  'background: #b3e5fc; color: #000; padding: 4px; border-radius: 4px;',
);

const protocoloUrgencia = (pacientes: Pacientes[]): boolean => {
  let activarProtocolo = false;
  for (let i = 0; i < pacientes.length; i++) {
    if (
      pacientes[i].frecuenciaCardiaca > 100 &&
      pacientes[i].temperatura > 39
    ) {
      if (!activarProtocolo) {
        console.log(
          '\x1b[41m\x1b[1m🚨 PROTOCOLO DE URGENCIA ACTIVADO 🚨\x1b[0m', // Fondo rojo con negrita
        );
        activarProtocolo = true;
      }
      console.log(
        `ID: ${pacientes[i].id}, Apellidos: ${pacientes[i].apellidos}, Nombre: ${pacientes[i].nombre}`,
      );
    }
  }
  return activarProtocolo;
};

protocoloUrgencia(pacientes);

console.log(
  '%cAPARTADO 3 El pediatra no puede atender hoy a los pacientes, queremos reasignar los pacientes asignados a la especialidad de pediatría a la de medico de familia:',
  'background: #b3e5fc; color: #000; padding: 4px; border-radius: 4px;',
);

const reasignarEspecialidadPacientes = (
  especialidadA: Especialidad,
  especialidadB: Especialidad,
): Pacientes[] => {
  let cambioAEspecialidad: Pacientes[] = []; // array donde almaceno pacientes reasignados
  let indiceCambio = 0; // indice separado para llenarlo de manera consecutiva
  console.log(`Lista de pacientes reasignados hoy a otra especialidad:`);
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === especialidadA) {
      pacientes[i].especialidad = especialidadB; // cambio la especialidad del paciente
      cambioAEspecialidad[indiceCambio] = pacientes[i]; // anade el paciente en el siguiente espacio libre
      indiceCambio++; // avanzo el indice para el proximo reasignado
      console.log(
        `Paciente con ID: ${pacientes[i].id}, ${pacientes[i].apellidos}, ${pacientes[i].nombre} y visto por especialista de ${especialidadA}, sera visto hoy por el especialista de ${especialidadB}`,
      );
    }
  }
  return cambioAEspecialidad; // retorno solo pacientes reasignados
};

// const pacientesReasignados = reasignarEspecialidadPacientes(
//   'Pediatra',
//   'Medico de familia',
// );
// console.log('Pacientes reasignados', pacientesReasignados);

/* ATENCION PARA EL EJERCICIO 4 Y 5 HAY QUE TENER EN CUENTA LA REASIGNACION DE PACIENTES DEL EJERCICIO 3 PARA 
QUE FUNCIONE CORRECTAMENTE, POR ESO HE COMENTADO EL ULTIMO CODIGO DEL EJERCICIO*/

console.log(
  '%cAPARTADO 4 Queremos saber si podemos mandar al Pediatra a casa (si no tiene pacientes asignados) comprobar si en la lista hay algún paciente asignado a pediatría u otra especialidad:',
  'background: #b3e5fc; color: #000; padding: 4px; border-radius: 4px;',
);

const especialistaFinalizaJornada = (especialista: Especialidad): boolean => {
  let finalizaJornada = true;
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === especialista) {
      console.log(`El especialista de ${especialista} continua la jornada`);
      finalizaJornada = false;
      break;
    }
  }
  if (finalizaJornada) {
    console.log(`El especialista de ${especialista} finaliza la jornada`);
  }
  return finalizaJornada;
};

especialistaFinalizaJornada('Cardiólogo');

console.log(
  '%cAPARTADO 5 FORMA DE ACTUACION A) Queremos calcular el número total de pacientes que están asignados a la especialidad de Medico de familia, y lo que están asignados a Pediatría y a cardiología:',
  'background: #b3e5fc; color: #000; padding: 4px; border-radius: 4px;',
);

const obtenerPacientesTotales = (lista: Especialidad): Pacientes[] => {
  let pacientesTotales: Pacientes[] = [];
  console.log(`Pacientes en ${lista}:`);
  for (let i = 0; i < pacientes.length; i++) {
    if (pacientes[i].especialidad === lista) {
      console.log(
        `ID ${pacientes[i].id}, ${pacientes[i].apellidos}, ${pacientes[i].nombre}`,
      );
    }
  }
  return pacientesTotales;
};
// Obtengo por lista
obtenerPacientesTotales('Medico de familia');

console.log('________________________________');

console.log(
  '%cAPARTADO 5 FORMA DE ACTUACION B) Queremos calcular el número total de pacientes que están asignados a la especialidad de Medico de familia, y lo que están asignados a Pediatría y a cardiología:',
  'background: #b3e5fc; color: #000; padding: 4px; border-radius: 4px;',
);
interface NumeroPacientesPorEspecialidad {
  medicoDeFamilia: number;
  pediatria: number;
  cardiologia: number;
}

const cuentaPacientesPorEspecialidad = (
  pacientes: Pacientes[],
): NumeroPacientesPorEspecialidad => {
  const contador: NumeroPacientesPorEspecialidad = {
    medicoDeFamilia: 0,
    pediatria: 0,
    cardiologia: 0,
  };

  for (let i = 0; i < pacientes.length; i++) {
    switch (pacientes[i].especialidad) {
      case 'Medico de familia':
        contador.medicoDeFamilia++;
        break;
      case 'Pediatra':
        contador.pediatria++;
        break;
        case 'Cardiólogo':
          contador.cardiologia++;
    }
  }
  return contador; // Retorno el objeto con los contadores por especialidad
};
//Obtengo listas
const resultado = cuentaPacientesPorEspecialidad(pacientes);
console.log('Numero de pacientes por especialidad:', resultado);