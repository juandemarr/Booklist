/*Create a class BookList

* Create another class called Book

* BookLists should have the following properties:
  x Number of books marked as read
  x Number of books marked not read yet
  x A reference to the next book to read (book object)
  x A reference to the current book being read (book object)
  x A reference to the last book read (book object)
  x An array of all the Books
* Each Book should have several properties:
  x Title
  x Genre
  x Author
  x Read (true or false)
  x Read date, can be blank, otherwise needs to be a JS Date() object
* Every Booklist should have a few methods:

x   .add(book)
        should add a book to the books list.
.finishCurrentBook()
    should mark the book that is currently being read as "read"
    Give it a read date of new Date(Date.now())
    Change the last book read to be the book that just got finished
    Change the current book to be the next book to be read
    Change the next book to be read property to be the first unread book you find in the 
    list of books
* Booklists and Books might need more methods than that. Try to think of more that 
might be useful.*/
//Considero que en el array ya pueden haber libros leidos y no leidos
class Book{
    constructor(title,author,genre){
        this.title=title;
        this.author=author;
        this.genre=genre;
        this.read=false;
        this.readDate=null;
    }
}

class Booklist{
    constructor(){
        this.listaLibros=[];
        this.currentBookIndex=0;
        this.lastBookRead=null;
    }

    get numberRead(){
        let cont=0;
        for(let i=0; i<this.listaLibros.length; i++){
            if(this.listaLibros[i].read==true)
                cont++;
        }
        return cont;
    }

    get numberNoRead(){
        return this.listaLibros.length-this.numberRead;
    }

    get nextBookRead(){
        for(let i=this.currentBookIndex; i<this.listaLibros.length; i++){
            if(this.listaLibros[i].read==false)
                return this.listaLibros[i];
            else
                return null;
        }
    }

    get currentBookRead(){
        for(let i=0; i<this.listaLibros.length; i++){
            if(this.listaLibros[i].read==false){
                this.currentBookIndex=i;
                return this.listaLibros[i];
            }else
                return null;
        }
    }

    ///////MÉTODOS

    add(book){
        this.listaLibros.push(book);
    }

    finishCurrentBook(){
        if(this.currentBookIndex<this.listaLibros.length){
            this.listaLibros[this.currentBookIndex].read=true;
            this.listaLibros[this.currentBookIndex].readDate=new Date(Date.now()).toLocaleString();
            this.lastBookRead=this.listaLibros[this.currentBookIndex];
            this.currentBookIndex++;
        }   
    }
}

export{Book,Booklist};