# Team11-front

Fecha última modifiación del README: 28 de Marzo de 2019 a las 21:31 horas.

Este repositorio esta dedicado al desarrollo del proyecto del equipo de trabajo 11 de la clase de Programación con Tecnologias Web 
(ISIS-3710) de la universidad de los Andes. El equipo es conformado por: 
<ul>
  <li>Gabriel Martínez Zarama  - código estudiante: 201227890</li>
  <li>Amilkar Eslava Galvis    - código estudiante: 201611332</li>
  <li>Rafael Tejón Rojas       - código estudiante: 201617853</li>
</ul>

El proyecto de este equipo se centra en el tema a continuación:

Existe una tendencia en los últimos años de leer lo que llamamos <em>‘novelas ligeras’</em> que se ha esparcido por la mayoría de América en general. Estas <em>novelas</em> ligeras son simplemente novelas de autores de origen Coreano, Japonés y Chino entre otros de mismo continente. Estas novelas tienden han ganado mucha popularidad en los últimos años lo que ha causado que se generen muchas traducciones no formales que se han subido a la web. Las personas que realizan estas traducciones no tienden a tener una relación entre ellas u organización alguna. Se han generado esfuerzos por organizar las traducciones y liderar grupos que se vean beneficiados por estas actividades, pero esto se ha dado más que todo solo para las traducciones en inglés.

La idea de este proyecto es implementar una plataforma que recopile estas traducciones, y sea en un comienzo una guía o por decirlo así un directorio de estas traducciones al público de habla hispana que es grande al observar el número de traducciones existentes en la web de este tipo. Se espera al final tener una plataforma que permita motivar a los lectores y traductores a involucrarse en la creación, por medio de los usuarios, de una base de datos de estas novelas y en lo posible en su futuro desarrollar una página que produzca grupos de traducción que se vean remunerados por su labor. 

# Uso de la aplicación

Se espera que la aplicación sea usada por usuarios que esten interesados en estar al tanto de la traducción de las ya mencionadas novelas ligeras que se suben por el internet. Lo anterior se esperar lograr por medio del uso de listas de lectura que el usuario puede crear y modificar, y el uso de la función de favoritos para poder tener rápido acceso a sus novelas preferidas. También se espera que los usuarios realicen busquedas de novelas en la página y puedan subir links con referencias a publicaciones de traducción de algun elemento de una novela que se encuentre registrada en la página. Para poder subir una publicación de una novela se espera que el usario se encuentre en un grupo de traducción, para lo cual se puede unir a un grupo ya existente o crear uno propio. El registro y login de usuarios no se han implementado completamente ya que esperamos poder implementar seguridad de manera concurrente con estas actividades por lo que solamente se creo el boton en la barra de navegación respectivo. Se tiene planteado en este caso que ya hay un usuario logeado y que éste tiene permisos de administrador para poder modificar y crear Novelas, Generos, Autores y Recomendaciones.
En resumidas cuentas se espera que el usuario pueda realizar las siguientes acciones:
<ul>
  <li>Agregar comentario a novela<</li>
  <li>Agregar novela a favoritos</li>
  <li>Agregar novela a lista de lectura</li>
  <li>Agregar publicacion a novela<</li>
  <li>Buscar novela</li>
  <li>Crear grupo traducción</li>
  <li>Unirse a un grupo de traducción<</li>
  <li>Salirsede un grupo de traducción</li>
  <li>Crear lista de lectura</li>
  <li>Eliminar novela de lista de lectura<</li>
  <li>Eliminar novela de favoritos</li>
  <li>Realizar una busqueda filtrada</li>
  <li>Vizualizar información detallada de una novela<</li>
  <li>Llegar a un link de una publicación especifica</li>
  <li>Ver publicaciones recientes</li>
  <li>Ver ranking de novelas</li>
</ul>

# Para despliegue de la aplicación:

ejecutar comando npm start en la carpeta frontend. (es necesario tener nodemon instalado)
