/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSw0Q0FBNEMsYUFBYTtBQUN6RDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGlCQUFpQixHQUFHLGNBQWM7QUFDaEU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmluZGVyc19rZWViZXIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2NyYXBlUGFnZXMoKSB7XG4gICAgZnVuY3Rpb24gc2VhcmNoUGFnZXMocGFnZSkge1xuICAgICAgICBmZXRjaFN1YlJlZGRpdChwYWdlKS50aGVuKGxpc3RpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGlzdGluZ3MgPSBsaXN0aW5nLmRhdGEuY2hpbGRyZW5cbiAgICAgICAgICAgIC8vIGxpc3RpbmdzLmZvckVhY2gobGlzdGluZyA9PiBjb25zb2xlLmxvZyhsaXN0aW5nLmRhdGEubmFtZSkpXG4gICAgICAgICAgICBnZXRGaWx0ZXJlZERhdGEobGlzdGluZ3MpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGZpcnN0UGFnZSA9ICdodHRwczovL3d3dy5yZWRkaXQuY29tL3IvbWVjaG1hcmtldC9uZXcuanNvbidcbiAgICBzZWFyY2hQYWdlcyhmaXJzdFBhZ2UpXG4gICAgY29uc3QgbmV4dFBhZ2UgPSAnaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9yL21lY2htYXJrZXQvbmV3Lmpzb24/YWZ0ZXI9dDNfMTRpMW0zNydcbiAgICBzZWFyY2hQYWdlcyhuZXh0UGFnZSlcbiAgICAvLyBmb3IgKGxldCBpID0gMTsgaSA8PSA0IDsgaSsrKSB7XG4gICAgLy8gICAgIHNlYXJjaFBhZ2VzKG5leHRQYWdlKVxuICAgIC8vIH1cbn1cblxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFN1YlJlZGRpdChsaW5rKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChsaW5rLCB7bW9kZTogJ2NvcnMnfSlcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICByZXR1cm4gZGF0YVxuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG59fVxuXG5cbmZ1bmN0aW9uIGdldEZpbHRlcmVkRGF0YShsaXN0aW5ncykge1xuXG4gICAgZnVuY3Rpb24gZ2V0VXNlcklucHV0KCkge1xuICAgICAgICBjb25zdCByYWRpb1NlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSdsb2NhdGlvbiddOmNoZWNrZWRcIikudmFsdWVcbiAgICAgICAgY29uc3Qga2V5d29yZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2tleXdvcmQnKS52YWx1ZVxuICAgICAgICBjb25zdCBrZXl3b3JkQXJyID0ga2V5d29yZElucHV0LnNwbGl0KCcsJylcbiAgICAgICAgY29uc29sZS5sb2coa2V5d29yZEFycilcbiAgICAgICAgY29uc29sZS5sb2cocmFkaW9TZWxlY3Rpb24pXG5cbiAgICAgICAgcmV0dXJuIFtyYWRpb1NlbGVjdGlvbiwga2V5d29yZEFycl0gLy9uZWVkIHRvIGJlIGxvd2VyY2FzZSBrZXl3b3Jkc1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBbbG9jYXRpb24sIGtleXdvcmRzXSA9IGdldFVzZXJJbnB1dCgpXG5cbiAgICBsaXN0aW5ncy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICBsZXQgbG9jYXRpb25NYXRjaGVkID0gZmFsc2VcbiAgICAgICAgbGV0IGtleXdvcmRNYXRjaGVkID0gZmFsc2VcbiAgICAgICAgLy8gY29uc29sZS5sb2cocG9zdC5kYXRhLnNlbGZ0ZXh0KVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwb3N0LmRhdGEudGl0bGUpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvc3QuZGF0YS51cmwpXG4gICAgICAgIGNvbnN0IHByb3BlclNlbGZUZXh0ID0gcG9zdC5kYXRhLnNlbGZ0ZXh0LnRvTG93ZXJDYXNlKClcblxuICAgICAgICBrZXl3b3Jkcy5mb3JFYWNoKGtleXdvcmQgPT4ge1xuICAgICAgICAgICAgaWYgKHByb3BlclNlbGZUZXh0LmluY2x1ZGVzKGtleXdvcmQpKSB7XG4gICAgICAgICAgICAgICAga2V5d29yZE1hdGNoZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBpZiAocG9zdC5kYXRhLnRpdGxlLmluY2x1ZGVzKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgbG9jYXRpb25NYXRjaGVkID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvY2F0aW9uTWF0Y2hlZCAmJiBrZXl3b3JkTWF0Y2hlZCkge1xuICAgICAgICAgICAgcG9wdWxhdGVVSShbcG9zdC5kYXRhLnRpdGxlLCBwb3N0LmRhdGEudXJsXSlcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAke3Bvc3QuZGF0YS50aXRsZX0gKCR7cG9zdC5kYXRhLnVybH1gKVxuICAgICAgICAgICAgbG9jYXRpb25NYXRjaGVkID0gZmFsc2VcbiAgICAgICAgICAgIGtleXdvcmRNYXRjaGVkID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH0pXG59XG5cblxuZnVuY3Rpb24gcG9wdWxhdGVVSShhcnJheSkge1xuICAgIGNvbnN0IFt0aXRsZSwgbGlua10gPSBhcnJheVxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cycpXG4gICAgY29uc3QgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBsaW5rRWxlbWVudC5pbm5lclRleHQgPSB0aXRsZVxuICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgbGluaylcbiAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIiwgXCJfYmxhbmtcIilcblxuICAgIGJvZHkuYXBwZW5kKGxpbmtFbGVtZW50KVxufVxuXG5mdW5jdGlvbiByZW1vdmVQcmV2aW91c1Jlc3VsdHMoKSB7XG4gICAgY29uc3QgcmVzdWx0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMnKVxuICAgIHJlc3VsdERpdi5pbm5lckhUTUwgPSAnJ1xufVxuXG5jb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hvd1Jlc3VsdEJ0bicpXG5idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgcmVtb3ZlUHJldmlvdXNSZXN1bHRzKClcbiAgICBzY3JhcGVQYWdlcygpXG59KSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==