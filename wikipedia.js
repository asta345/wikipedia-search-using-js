let searchEl = document.getElementById('searchInput');
let searchResEL = document.getElementById('searchResults');
let spin = document.getElementById('spinner');

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //   creating result item
    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add('result-item');
    searchResEL.appendChild(resultItemEl);
    // creating title Element
    let Anchortitle = document.createElement('a');
    Anchortitle.classList.add('result-title');
    Anchortitle.textContent = title;
    Anchortitle.href = link;
    Anchortitle.target = "_blank";
    resultItemEl.appendChild(Anchortitle);
    // create breaking element
    let Breakel = document.createElement('br');
    resultItemEl.appendChild(Breakel);
    // creating url Element
    let urlel = document.createElement('a');
    urlel.classList.add('result-url');
    urlel.href = link;
    urlel.textContent = link
    resultItemEl.appendChild(urlel);
    // create breaking Element
    let breakel = document.createElement('br');
    resultItemEl.appendChild(breakel);

    // create description Elementl
    let para = document.createElement('p');
    para.classList.add('line-description');
    para.textContent = description;
    resultItemEl.appendChild(para)
}

function displayresults(search_results) {
    spin.classList.toggle('d-none');
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spin.classList.toggle('d-none');
        searchEl.textContent = "";
        let searchInput = searchEl.value;
        console.log(searchInput);
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {

                let {
                    search_results
                } = jsonData;
                displayresults(search_results);

            });
    }
}


searchEl.addEventListener("keydown", searchWikipedia);