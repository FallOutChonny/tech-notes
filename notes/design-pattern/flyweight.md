# Flyweight pattern

## 場景

中文翻譯為享元模式，當我們需要創建大量同性質的Object時，利用享元模式可以讓我們避免耗費掉大量的記憶體，導致整個應用程序崩潰。

## 如何使用

假設有一間圖書館，裡面會有很多的藏書，我們用一個Book類別來表示一本書

```javascript
class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}
```

我們用一個陣列來當作簡易圖書館，可以對這個圖書館來新增或刪除書籍

```js
const bookList = []

bookList.push(new Book('book1', 'chonny', '000001'))
bookList.push(new Book('book2', 'jane', '000002'))
bookList.push(new Book('book3', 'mary', '000003'))
bookList.push(new Book('book1', 'chonny', '000001'))
```

因為一本書在圖書館裡可以有很多本，允許多人同時借閱，所以我們可以重複新增同樣的書，不過上面情況，我們每新增一次同樣的書，就必須創建一個新的物件，當物件(書本)越來越多時，就會導致大量的儲存空間和記憶體被消耗掉，此時就可以使用享元模式來解決這個問題，我們對上面的程式碼進行些調整

```js
class BookList {
  bookById
  bookList

  constructor() {
    this.books = new Map()
    this.bookList = []
  }

  add(title, author, isbn) {
    let book
    if (this.bookById.has(isbn)) {
      book = this.bookById.get(isbn)
    } else {
      book = new Book(title, author, isbn)
      this.bookById.set(isbn, book)
    }

    this.bookList.push(book)

    return book
  }

  getBooks() {
    return this.bookList
  }

  getTotalAmountOfLength() {
    return this.bookList.length
  }

  getTotalAmountOfCopies() {
    return this.bookById.size
  }
}

const bookList = new BookList()

bookList.add(new Book('book1', 'chonny', '000001'))
bookList.add(new Book('book2', 'jane', '000002'))
bookList.add(new Book('book3', 'mary', '000003'))
bookList.add(new Book('book1', 'chonny', '000001'))

console.log(bookList.getTotalAmountOfLength())
console.log(bookList.getTotalAmountOfCopies())
```

從console可以看到總共有四本書，但只有三個book副本，因為實際上有兩本書的isbn是相同的，對重複isbn的書籍，不必額外去創建物件，只需使用isbn從圖書館中既有的書籍取得並新增至書架即可，只有當新的書本要加入時，才需要創建。

## 結論

當我們需要創建大量相同的物件時，可能會耗費大量記憶體，享元模式讓我們能最小化的減少內存量的消耗，但其實在 Javascript，也可以直接利用原型鏈 (prototype)的繼承來實現，還有如今，硬體設備已經非常強大，記憶體都是GB等級的了，在一般情況下享元模式其實也就沒那麼必要了。