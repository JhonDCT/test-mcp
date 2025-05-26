En la arquitectura DDD (Domain-Driven Design), la capa de dominio es fundamental porque encapsula la lógica de negocio central de la aplicación. Aquí te explico los elementos principales que suelen ubicarse en esta capa:

1. Entidades

Las entidades son objetos con identidad definida, es decir, cada instancia de una entidad es única a lo largo de su ciclo de vida. Una entidad se caracteriza por tener propiedades y métodos que reflejan el comportamiento dentro del dominio. Un ejemplo común sería un “Usuario” en un sistema, que tiene una identidad única y atributos como nombre o correo.

2. Objetos de Valor (Value Objects)

A diferencia de las entidades, los objetos de valor no tienen identidad propia. Son objetos que representan conceptos y se definen completamente por sus atributos. Si dos objetos de valor tienen los mismos atributos, se consideran iguales. Un ejemplo típico es una “Dirección” o “Dinero”, donde lo que importa son sus atributos, no su identidad.

3. Agregados (Aggregates)

Un agregado es un conjunto de entidades y objetos de valor que son tratados como una única unidad en ciertas operaciones. El agregado tiene una raíz (entidad raíz) que controla su consistencia. Esto significa que el acceso y las modificaciones a las entidades dentro del agregado deben realizarse a través de la raíz del agregado. Por ejemplo, un “Pedido” puede ser un agregado que contiene varias “Líneas de Pedido”.

4. Repositorios

Los repositorios son abstractions que permiten acceder a las entidades y agregados persistidos en bases de datos u otros almacenamientos. En la capa de dominio, el repositorio define la interfaz para buscar y recuperar objetos del dominio, pero la implementación suele ubicarse en una capa inferior (infraestructura). Un repositorio podría ser un “PedidoRepository” que proporciona métodos como findById() o save().

5. Servicios de Dominio (Domain Services)

Los servicios de dominio contienen lógica de negocio que no pertenece directamente a ninguna entidad o agregado. Se utilizan cuando una operación de negocio afecta a múltiples objetos del dominio o no encaja dentro de un solo agregado. Un ejemplo sería un servicio que calcula un descuento en función de reglas de negocio complejas que involucran varios objetos del dominio.

6. Fabricas (Factories)

Las fábricas son responsables de la creación de entidades y agregados complejos. En lugar de construir un objeto agregando propiedades manualmente, una fábrica encapsula el proceso de creación, asegurando que el objeto sea válido en el momento de su creación.

7. Especificaciones (Specifications)

Las especificaciones son reglas o criterios que definen si un objeto cumple con ciertos requisitos o condiciones del dominio. Pueden ser utilizadas para validar entidades o para filtrar datos en repositorios. Por ejemplo, una especificación podría validar si un cliente es elegible para una promoción.

Estos elementos colaboran para representar el núcleo del negocio, respetando las reglas y el lenguaje del dominio, lo que permite mantener la coherencia y flexibilidad de la lógica central del sistema.