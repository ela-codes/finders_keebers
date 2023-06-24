function scrapePages() {
    function searchPages(page) {
        fetchSubReddit(page).then(listing => {
            const listings = listing.data.children
            // listings.forEach(listing => console.log(listing.data.name))
            getFilteredData(listings)
        })
    }
    
    const firstPage = 'https://www.reddit.com/r/mechmarket/new.json'
    searchPages(firstPage)
    const nextPage = 'https://www.reddit.com/r/mechmarket/new.json?after=t3_14i1m37'
    searchPages(nextPage)
    // for (let i = 1; i <= 4 ; i++) {
    //     searchPages(nextPage)
    // }
}


async function fetchSubReddit(link) {
    try {
        const response = await fetch(link, {mode: 'cors'})
        const data = response.json()
        return data
    } catch(error) {
        console.log(error)
}}


function getFilteredData(listings) {

    function getUserInput() {
        const radioSelection = document.querySelector("input[name='location']:checked").value
        const keywordInput = document.querySelector('#keyword').value
        const keywordArr = keywordInput.split(',')
        console.log(keywordArr)
        console.log(radioSelection)

        return [radioSelection, keywordArr] //need to be lowercase keywords
    }
    
    const [location, keywords] = getUserInput()

    listings.forEach(post => {
        let locationMatched = false
        let keywordMatched = false
        // console.log(post.data.selftext)
        // console.log(post.data.title)
        // console.log(post.data.url)
        const properSelfText = post.data.selftext.toLowerCase()

        keywords.forEach(keyword => {
            if (properSelfText.includes(keyword)) {
                keywordMatched = true
            }
        })
        
        if (post.data.title.includes(location)) {
            locationMatched = true
        }

        if (locationMatched && keywordMatched) {
            populateUI([post.data.title, post.data.url])
            // console.log(`${post.data.title} (${post.data.url}`)
            locationMatched = false
            keywordMatched = false
        }
    })
}


function populateUI(array) {
    const [title, link] = array
    const body = document.querySelector('#results')
    const linkElement = document.createElement('a')
    linkElement.innerText = title
    linkElement.setAttribute("href", link)
    linkElement.setAttribute("target", "_blank")

    body.append(linkElement)
}

function removePreviousResults() {
    const resultDiv = document.querySelector('#results')
    resultDiv.innerHTML = ''
}

const btn = document.querySelector('#showResultBtn')
btn.addEventListener('click', () => {
    removePreviousResults()
    scrapePages()
})