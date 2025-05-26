En Domain-Driven Design (DDD), separar agregados es fundamental para garantizar que cada agregado sea independiente y mantenga sus propias reglas de consistencia, evitando dependencias complejas entre agregados. Para lograr esto, es clave que cada agregado tenga un límite bien definido y que no interfiera directamente con otros agregados, comunicándose a través de identificadores (IDs) y eventos de dominio.

A continuación te explico un enfoque práctico y te doy un método en TypeScript para separar los agregados de manera clara y efectiva:

1. Identificar los Límites del Agregado

Cada agregado debe tener una entidad raíz que gestione las interacciones con las demás entidades u objetos de valor dentro de su límite. Es esencial que los agregados mantengan sus operaciones y lógica de negocio en su propio contexto. Cuando un agregado necesita interactuar con otro, debe hacerlo indirectamente, a través de un identificador o mediante eventos de dominio.

2. Utilizar Identificadores para Relaciones

En lugar de que un agregado contenga directamente una referencia a otro agregado, utiliza identificadores (IDs). Esto previene la dependencia directa entre los agregados, ya que solo se pasan identificadores para representar relaciones entre ellos.

3. Comunicación entre Agregados a través de Eventos de Dominio

Cuando un agregado necesita notificar a otro de un cambio de estado o evento, se deben usar eventos de dominio. Esto desacopla los agregados y permite que se mantenga la independencia entre ellos.

Ejemplo en TypeScript: Separando los Agregados

Supongamos que tienes dos agregados: Usuario y Pedido. En lugar de que el Usuario tenga una referencia directa a un Pedido, utilizará identificadores para representar la relación, y cualquier interacción se realizará a través de eventos de dominio.

Agregado Usuario

class Usuario {
    private id: string;
    private email: Email;
    private name: FullName;

    constructor(id: string, email: Email, name: FullName) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    public getId(): string {
        return this.id;
    }

    public getEmail(): Email {
        return this.email;
    }

    public getName(): FullName {
        return this.name;
    }

    // Método para simular la creación de un pedido
    public crearPedido(pedidoId: string): PedidoCreadoEvent {
        // Genera un evento de dominio que indica que el usuario ha creado un pedido
        return new PedidoCreadoEvent(this.id, pedidoId);
    }
}

Agregado Pedido

class Pedido {
    private id: string;
    private usuarioId: string; // Referencia al usuario por su ID
    private items: string[];

    constructor(id: string, usuarioId: string) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.items = [];
    }

    public getId(): string {
        return this.id;
    }

    public getUsuarioId(): string {
        return this.usuarioId;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }
}

Eventos de Dominio

Los eventos de dominio permiten la comunicación entre agregados sin crear dependencias directas.

class PedidoCreadoEvent {
    public readonly usuarioId: string;
    public readonly pedidoId: string;

    constructor(usuarioId: string, pedidoId: string) {
        this.usuarioId = usuarioId;
        this.pedidoId = pedidoId;
    }
}

Servicio de Aplicación

En un servicio de aplicación o dominio, podrías manejar la interacción entre los agregados cuando se emita un evento. El servicio podría encargarse de crear el pedido cuando el usuario genere un evento de creación de pedido.

class PedidoService {
    private pedidos: Map<string, Pedido> = new Map();

    // Método que maneja el evento de creación de pedido
    public handlePedidoCreado(event: PedidoCreadoEvent): void {
        const nuevoPedido = new Pedido(event.pedidoId, event.usuarioId);
        this.pedidos.set(event.pedidoId, nuevoPedido);

        console.log(`Pedido creado para el usuario con ID: ${event.usuarioId}`);
    }
}

Separación de los Agregados:

	1.	El Usuario y el Pedido están desacoplados:
	•	El Usuario no contiene directamente un Pedido, solo interactúa con él a través de eventos y utilizando el ID.
	•	El Pedido guarda una referencia al ID del Usuario, pero no tiene una referencia directa al objeto de usuario.
	2.	Uso de Eventos de Dominio:
	•	Cuando un Usuario crea un pedido, no lo crea directamente, sino que emite un evento (PedidoCreadoEvent), lo que permite que un servicio externo, como PedidoService, maneje la creación del pedido.
	3.	Escalabilidad y Modularidad:
	•	Al mantener los agregados separados y comunicarse a través de eventos, puedes modificar o extender uno sin afectar al otro. Además, podrías introducir nuevas lógicas en los servicios que manejen los eventos sin tocar los agregados.

Ventajas de la Separación:

	•	Desacoplamiento: Evita dependencias complejas entre agregados, manteniéndolos independientes.
	•	Escalabilidad: Al estar separados, los agregados son más fáciles de escalar y mantener.
	•	Consistencia: Cada agregado se asegura de mantener sus propias invariantes de negocio.
	•	Flexibilidad: Nuevos comportamientos o lógicas pueden añadirse en los servicios de aplicación, permitiendo más flexibilidad en la forma en que los agregados interactúan.

Este patrón sigue los principios de DDD y permite que los agregados evolucionen de manera independiente, garantizando la consistencia y simplicidad en el manejo de las relaciones entre ellos.