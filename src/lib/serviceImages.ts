// Vite replacement for require.context
// Explicitly import all service images
import serviceAlquilerPortuario from '@/assets/service-alquiler-portuario.jpg';
import serviceAlquilerPortuario2 from '@/assets/service-alquiler-portuario-2.jpg';
import serviceAlquilerPortuario3 from '@/assets/service-alquiler-portuario-3.jpg';
import serviceAlquilerTierra from '@/assets/service-alquiler-tierra.jpg';
import serviceIzamientos from '@/assets/service-izamientos.jpg';
import serviceTransporte from '@/assets/service-transporte.jpg';
import serviceSandblasting from '@/assets/service-sandblasting.jpg';
import serviceLimpieza from '@/assets/service-limpieza.jpg';
import serviceReacondicionamiento from '@/assets/service-reacondicionamiento.jpg';
import serviceLineasFlujo from '@/assets/service-lineas-flujo.jpg';
import serviceDiques from '@/assets/service-diques.jpg';
import serviceAceros from '@/assets/service-aceros.jpg';
import serviceMantenimientoMayor from '@/assets/service-mantenimiento-mayor.jpg';

export const serviceImages: Record<string, string> = {
  'service-alquiler-portuario': serviceAlquilerPortuario,
  'service-alquiler-portuario-2': serviceAlquilerPortuario2,
  'service-alquiler-portuario-3': serviceAlquilerPortuario3,
  'service-alquiler-tierra': serviceAlquilerTierra,
  'service-izamientos': serviceIzamientos,
  'service-transporte': serviceTransporte,
  'service-sandblasting': serviceSandblasting,
  'service-limpieza': serviceLimpieza,
  'service-reacondicionamiento': serviceReacondicionamiento,
  'service-lineas-flujo': serviceLineasFlujo,
  'service-diques': serviceDiques,
  'service-aceros': serviceAceros,
  'service-mantenimiento-mayor': serviceMantenimientoMayor,
};
