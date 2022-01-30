var signupBtns = document.querySelectorAll('.signup')
for (var signupBtn of signupBtns){
    signupBtn.onclick=function(e){
    document.querySelector('.modal-signup').classList.add('open');
    document.querySelector('.modal-signin').classList.remove('open');
}
}
document.querySelector(".modal-signup-container").onclick=function(e){
    e.stopPropagation();
}

document.querySelector(".modal-signup").onclick=function(e){
    document.querySelector('.modal-signup').classList.remove('open');
}

var signinBtns = document.querySelectorAll('.signin')
for (var signinBtn of signinBtns){
    signinBtn.onclick=function(e){
    document.querySelector('.modal-signin').classList.add('open');
    document.querySelector('.modal-signup').classList.remove('open');
}
}
document.querySelector(".modal-signin-container").onclick=function(e){
    e.stopPropagation();
}
document.querySelector(".modal-signin").onclick=function(e){
    document.querySelector('.modal-signin').classList.remove('open');
}

var URLsearch = "http://localhost:3000/search"
function getSearchInput(callback){
    fetch(URLsearch)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

getSearchInput(renderHTMLsearch);

function renderHTMLsearch(data){
    var dataSearch = data.map(function(input){
        return `<li class="search-history-item${input.id} search-history-item" onclick="getSearch(${input.id})">${input.content}</li>`
    }) 
    var html = dataSearch.join('');
    var searchHistory = document.querySelector(".search-history");
    searchHistory.innerHTML = html;
}

document.querySelector('.icon-search').onclick=function(e){
    var inputSearch = document.querySelector('.search-input').value;
    var contentBody = {
        content: inputSearch
    }
    var option ={
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contentBody)
    }
    fetch(URLsearch,option)
        .then(response=>response.json())
        .then(getSearchInput(renderHTMLsearch))
}

document.querySelector('.search-input').onclick= function(e){
    document.querySelector('.search-history').classList.toggle('open');
}

function getSearch(id){
    var inputSearch = document.querySelector('.search-input');
    var item = document.querySelector( `.search-history-item${id}`).textContent;
    inputSearch.value = item;
}

