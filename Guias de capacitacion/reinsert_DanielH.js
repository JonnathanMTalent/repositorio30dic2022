Viernes 6 de enero de 2023 

 
Reinsert 

1. Son errores ligados a fallas de indexación que evitan que una cantidad determinada de jobs no se inserte correctamente en la base de datos.  

Puede deberse a: 

Acción errónea, omisión en el código. 

Validaciones del sistema (Empnames o locations con más de 100 caracteres). 

 

2. ¿Cómo se refleja en el Crawl History? 

En la columna “New” de la tabla inferior, se observa una cantidad considerable de jobs nuevos. 

 

Captura 1. Tomado de la herramienta Crawl History, scanid: 201378 

 

 

 
3. Causas 

Error en el step Job Description. 

Selectores que no se han validado. 

Jobs sin locación. 

Feedcode inválido.  

 

¿Cómo podemos identficar identificar el error?  

La herramienta Jobs Error Log nos permiten identicar los jobs que no se han insertado en la base de datos.  
 
Guía de Jobs Error Log 

 

Validaciones 

 

Step Job Description: 

El selector principal de la descipción no se debe validar. Si un job no tiene descripción no es necesario validarlo. Si validamos tratará de insertarse en cada corrida.  

 

¿Qué selectores validar? 

Debemos validar cualquier selector distinto al de la descripción.  

 

Ejemplo:  

Captura 2. Validación de un selector distinto a valor nulo. 

 

Aunque parezca que el selector está disponible para todos los jobs, es probable que en algunos jobs no exista la que puede romper la descripción de los mismos. Por lo tanto, el job sin descripción presentará error.  

Esta buena práctica parte de los patrones observados en diversos spiders, lo que nos ahorrara trabajo en el futuro.  

Si un valor no existe (Ej. Job Type, Salary), no es necesario hacer la validación igualando a vacío. 

Captura 3. Validación incorrecta, asignado el valor vacío.  