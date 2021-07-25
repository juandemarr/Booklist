import{Book,Booklist} from "./booklistClasses.js";

window.onload=main;
var lista,divTabla;

function main(){
    lista=new Booklist();
    let botonLibro=document.getElementById("addBook");
    botonLibro.addEventListener("click",anadirLibro);

    divTabla=document.getElementById("divTabla");

    tablaVacia();
    crearBoton();
}

function tablaVacia(){
    let elementoTabla=document.createElement("table");
    elementoTabla.id="tabla";
    divTabla.appendChild(elementoTabla);

    let elementoTr=document.createElement("tr");
    elementoTabla.appendChild(elementoTr);

    let elementoTh1=document.createElement("th");
    let textoTh1=document.createTextNode("Title");
    elementoTh1.appendChild(textoTh1);
    elementoTr.appendChild(elementoTh1);

    let elementoTh2=document.createElement("th");
    let textoTh2=document.createTextNode("Author");
    elementoTh2.appendChild(textoTh2);
    elementoTr.appendChild(elementoTh2);

    let elementoTh3=document.createElement("th");
    let textoTh3=document.createTextNode("Genre");
    elementoTh3.appendChild(textoTh3);
    elementoTr.appendChild(elementoTh3);

    let elementoTh4=document.createElement("th");
    let textoTh4=document.createTextNode("Read");
    elementoTh4.appendChild(textoTh4);
    elementoTr.appendChild(elementoTh4);

    let elementoTh5=document.createElement("th");
    let textoTh5=document.createTextNode("Read date");
    elementoTh5.appendChild(textoTh5);
    elementoTr.appendChild(elementoTh5);

    let elementoTh6=document.createElement("th");
    let textoTh6=document.createTextNode("Edit/Delete");
    elementoTh6.appendChild(textoTh6);
    elementoTr.appendChild(elementoTh6);
}

function anadirLibro(){
    let title=document.getElementById("nameBook").value;
    let author=document.getElementById("author").value;
    let genre=document.getElementById("genre").value;
    lista.add(new Book(title,author,genre));

    limpiar();
    tabla();
}
function limpiar(){
    document.getElementById("nameBook").value="";
    document.getElementById("author").value="";
    document.getElementById("genre").value="";
}

function tabla(){
    divTabla.textContent="";
    tablaVacia();
    for(let i=0; i<lista.listaLibros.length; i++){
        let elementoTrLibros=document.createElement("tr");
        elementoTrLibros.id=i;
        crearCelda(elementoTrLibros,lista.listaLibros[i].title);
        crearCelda(elementoTrLibros,lista.listaLibros[i].author);
        crearCelda(elementoTrLibros,lista.listaLibros[i].genre);
        crearCelda(elementoTrLibros,lista.listaLibros[i].read);
        crearCelda(elementoTrLibros,lista.listaLibros[i].readDate);
        crearCeldaBotones(elementoTrLibros);

        let tabla=document.getElementById("tabla");
        tabla.appendChild(elementoTrLibros);
    }

    document.getElementById("librosLeidos").textContent="Libros leidos: "+lista.numberRead;
    document.getElementById("librosNoLeidos").textContent="Libros no leidos: "+lista.numberNoRead;
}

function crearCeldaBotones(tr){
    let botonEditar=document.createElement("button");
    let contenidoEditar=document.createTextNode("Actualizar");
    botonEditar.appendChild(contenidoEditar);

    let botonBorrar=document.createElement("button");
    let contenidoBorrar=document.createTextNode("Borrar");
    botonBorrar.appendChild(contenidoBorrar);

    botonEditar.id="botonEditar";
    botonBorrar.id="botonBorrar";

    let numero=tr.getAttribute("id");
    
    //Evento borrar
    
    botonBorrar.addEventListener("click",()=>{
        tr.remove();
        lista.listaLibros.splice(numero,1);
        document.getElementById("librosLeidos").textContent="Libros leidos: "+lista.numberRead;
        document.getElementById("librosNoLeidos").textContent="Libros no leidos: "+lista.numberNoRead;
    });

    //Evento editar
    
    botonEditar.addEventListener("click",()=>{
        lista.listaLibros[numero].title=document.getElementById(numero).getElementsByTagName("td")[0].querySelector("input").value;
        lista.listaLibros[numero].author=document.getElementById(numero).getElementsByTagName("td")[1].querySelector("input").value;
        lista.listaLibros[numero].genre=document.getElementById(numero).getElementsByTagName("td")[2].querySelector("input").value;
        lista.listaLibros[numero].read=document.getElementById(numero).getElementsByTagName("td")[3].querySelector("input").value;
        lista.listaLibros[numero].readDate=document.getElementById(numero).getElementsByTagName("td")[4].querySelector("input").value;

        tabla();
    })

///////////////////////
    let td=document.createElement("td");
    td.appendChild(botonEditar);
    td.appendChild(botonBorrar);
    tr.appendChild(td);
}

function crearCelda(tr,contenido){
    let td=document.createElement("td");
    let inputTd=document.createElement("input");
    inputTd.type="text";
    inputTd.value=contenido;
    td.appendChild(inputTd);
    tr.appendChild(td);
}

function crearBoton(){
    let botonLeido=document.createElement("button");
    let contenidoBoton=document.createTextNode("Leido");
    botonLeido.appendChild(contenidoBoton);
    botonLeido.id="botonLeido";
    document.getElementById("botonDiv").appendChild(botonLeido);

    botonLeido.addEventListener("click",cambiarRead);
}

function cambiarRead(){
    lista.currentBookRead;
    lista.finishCurrentBook();
    tabla();
}
