//select Dynamic message
const totalResult = document.getElementById('total-result');

//result display header
const displayHeader = document.getElementById('display-header');
displayHeader.classList.add('hidden')
displayHeader.classList.remove('block')

//book display container
const container = document.getElementById('books-container');

document.getElementById('search-box').onkeydown = function(e){
    if(e.keyCode === 13){
        loadBooks();
    }
 };

//api loading function
const loadBooks = () => {
    container.innerHTML = ''
    displayHeader.classList.add('hidden')
    displayHeader.classList.remove('block')
    totalResult.innerText = `Loading.....`    
    const search = document.getElementById('search-box')
    const searchValue = search.value;
    if (searchValue !== ''){
    fetch(`https://openlibrary.org/search.json?q=${searchValue}`)
        .then(res => res.json())
        .then(data => displayBooks(data))
    }
    else{
        totalResult.innerText = `Please write the name of your desire book`
    }
}

//book displaying function
const displayBooks = (data) => {
    displayHeader.classList.add('block')
    displayHeader.classList.remove('hidden')
    

    totalResult.innerText = `Total books found: ${data.numFound}`

    const bookArray = data.docs;
    bookArray.forEach(book => {
        const div = document.createElement('div')
        div.classList.add('group')
        div.classList.add('relative')
        let publisher = book.publisher && book.publisher[0];
        let author = book.author_name && book.author_name[0];
        div.innerHTML = `
        <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="Book Cover" class="w-full h-full object-center object-cover lg:w-full lg:h-full">
        </div>
        <div class="mt-4 flex justify-between">
            <div>
                <h3 class="text-sm text-gray-700">
                <a href="#" class="font-bold">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${book.title}
                </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">By ${author}</p>
                <p class="mt-1 text-sm text-gray-500">Publisher: ${publisher}</p>
                <p class="mt-1 text-sm text-gray-500">First Published: ${book.first_publish_year}</p>
            </div>

        </div>
        `
        container.appendChild(div);
    })

}
