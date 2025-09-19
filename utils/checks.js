

export const checkForCitations = async (text) => {
  return new Promise(async (resolve, reject) => {
    try {
      const citations = [];
      // Here we would run checks for citations, either with regex, further LLM prompts, or both
      resolve(citations);
    } catch (err) {
      console.log('An error has occured checking for citations.');
      reject(err);
    }
  })
}


export const checkCitationsExist = async (citations) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (citations.length === 0) {
        resolve([]);
      }
      /*
      Here we would take a list of citations, either from this application or another and check them
      using Lexis or Westlaw's API's to validate that they do, in fact, exist. This would help
      prevent a LLM from hallucinating new cases
      */
      const checkedCitations = citations.map(citation => {
        if (citationFound) {
          return {
            "citation": citation,
            "real": true
          }
        } else {
          return {
            "citation": citation,
            "real": false
          }
        }
      })
      resolve(checkedCitations);
    } catch (err) {
      console.log('An error has occured checking for citations.');
      reject(err);
    }
  })
}