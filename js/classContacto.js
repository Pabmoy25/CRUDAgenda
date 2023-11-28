export default class Contacto {
  #id;
  #nombre;
  #apellido;
  #email;
  #celular;

  constructor(id = 1, nombre, apellido, email, celular) {
    this.#id = id;
    this.#nombre = nombre;
    this.#apellido = apellido;
    this.#email = email;
    this.#celular = celular;
  }

  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  set nombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
  }

  get apellido() {
    return this.#apellido;
  }

  set apellido(nuevoApellido) {
    this.#apellido = nuevoApellido;
  }

  get email() {
    return this.#email;
  }

  set email(nuevoEmail) {
    this.#email = nuevoEmail;
  }

  get celular() {
    return this.#celular;
  }

  set celular(nuevoCelular) {
    this.#celular = nuevoCelular;
  }
  //este metodo sirve para el objeto JSON.stringify
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      celular: this.celular,
    };
  }
}
