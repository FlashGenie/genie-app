async function jwtFetch(url, options = {}) {
    // Set options.method to 'GET' if there is no method.
    options.method = options.method || "GET";
    // Set options.headers to an empty object if there is no headers.
    options.headers = options.headers || {};
    // Set the "Authorization" header to the value of "jwtToken" in localStorage.
    // Remember to add 'Bearer ' to the front of the token.
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;
    
    // If the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json" and the "CSRF-Token" header to the value stored in the
  // "CSRF-TOKEN" cookie.
  if (options.method.toUpperCase() !== "GET") {
    if (!(options.body instanceof FormData)) {
      options.headers["Content-Type"] = options.headers["Content-Type"] || "application/json";
    }
    options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
  }
  
    // Call fetch with the url and the updated options hash.
    const res = await fetch(url, options);

  
    // If the response status code is 400 or above, then throw an error with the
    // error being the response.
    if (res.status >= 400) throw res;
  
    // If the response status code is under 400, then return the response to the
    // next promise chain.
    return res;
  }


  function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === cookieName) return value;
    }
    return null;
  }
  
  
  export default jwtFetch;