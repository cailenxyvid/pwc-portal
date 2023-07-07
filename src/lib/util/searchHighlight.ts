export const highlight = (text: string, query: string | null) => {
    if (!query) return text;
  
    let regEx = new RegExp(`(?!<[^>]+)${query}(?![^<]*?>)`, 'ig');
    let result = text.match(regEx);
  
    if (!result) return text;
  
    let outputText = text.replace(regEx, `<b class="highlight">$&</b>`);
  
    return outputText;
  };
  

// export const highlight = (text: string, query: string | null) => {
//     if (!query) return;
//     // let queryString = ' ' + query;


//     let regEx = new RegExp(query, 'ig');
    
    
//     let result = text.match(regEx)
//     //# figure out logic to use all matches in output - taking the first result works most of the time, but isn't reliable 
//     let output = result?.[0]
    
//     return text.replace(regEx, `<b class="highlight">${output}</b>`);
// };
