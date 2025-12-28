async function mockGoogleSearch(query) {
    console.log(`Mock searching competitors for: ${query}`);
  
    return [
      "https://example.com/competitor-1",
      "https://example.com/competitor-2",
      "https://example.com/competitor-3",
    ];
  }
  
  module.exports = mockGoogleSearch;
  