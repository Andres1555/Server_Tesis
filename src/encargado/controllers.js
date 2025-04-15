import { EncargadoService } from './services.js';

export const getencargadocontroller = async (req, res) => {
  try {
    const encargados = await EncargadoService.getAll();
    res.status(200).json(encargados);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Error al obtener encargados', error: error.message });
  }
};

export const postencargadocontroller = async (req, res) => {
  try {
    const { ci, nombre, apellido, telefono, password, email } = req.body;

    if (!ci || !nombre || !apellido || !telefono || !password || !email) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios: ci, nombre, apellido, telefono, password, email',
      });
    }

    if (typeof ci !== 'number' ||typeof telefono !== 'string' ||typeof nombre !== 'string' ||typeof apellido !== 'string' ||typeof email !== 'string' ||typeof password !== 'string' ) {
      return res.status(400).json({
        message: 'ci y telefono deben ser números; nombre, apellido, email y password deben ser cadenas.',
      });
    }

    await EncargadoService.create({ ci, nombre, apellido, telefono, password, email });
    res.status(201).json({ message: 'Encargado creado correctamente' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Error al crear encargado', error: error.message });
  }
};

export const putencargadocontroller = async (req, res) => {
  try {
    const ci = Number(req.params.ci);
    const { nombre, apellido, telefono, password, email } = req.body;

    const telefonoNumber = Number(telefono);

    if (!ci || !nombre || !apellido || !email || !telefonoNumber || !password) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios: ci, nombre, apellido, telefono, password, email',
      });
    }

    if (isNaN(ci) ||isNaN(telefonoNumber) ||typeof nombre !== 'string' ||typeof apellido !== 'string' ||typeof email !== 'string' ||typeof password !== 'string' ) {
      return res.status(400).json({
        message: 'ci y telefono deben ser números válidos; nombre, apellido, email y password deben ser cadenas.',
      });
    }

    await EncargadoService.update(ci, { nombre, apellido, telefono: telefonoNumber, password, email });
    res.status(200).json({ message: 'Encargado actualizado correctamente' });
  } catch (error) {
    console.error('Error en putencargadocontroller:', error.message);
    res.status(500).json({ message: 'Error al actualizar encargado', error: error.message });
  }
};

export const deletencargadocontroller = async (req, res) => {
  try {
    const { ci } = req.params;

    if (!ci) {
      return res.status(400).json({ message: 'El campo ci es obligatorio' });
    }

    const ciNumber = Number(ci);
    if (isNaN(ciNumber)) {
      return res.status(400).json({ message: 'El campo ci debe ser un número válido' });
    }

    await EncargadoService.delete(ciNumber);
    res.status(200).json({ message: 'Encargado eliminado correctamente' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Error al eliminar encargado', error: error.message });
  }
};
