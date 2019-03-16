'use strict';

 const apiKey = 'y9hir3q3pPKrGSNqwXcX2jiyuoR9Jd15bX2BEX01';
 const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, limit) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};
  
function getParks(query, limit=10) {
  const params = {
    q: query,
    api_key: apiKey,
    limit,
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

 fetch(url)
 .then(response => {
    if (response.ok) {
       return response.json();
       }
       throw new Error(response.statusText);
     })
     .then(responseJson => displayResults(responseJson, limit))
     .catch(err => {
       $('#js-error-message').text(`Something went wrong: ${err.message}`);
     });
 }
  
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#search-term').val();
    const userNumber = $('#max-results').val();
    const limit = parseInt(userNumber);
    getParks(searchTerm, limit);
  });
}
$(watchForm);
