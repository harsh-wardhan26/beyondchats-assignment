async function mockRewrite(originalContent) {
    console.log("Mock rewriting article with AI");
  
    return `
  (UPDATED VERSION)
  
  ${originalContent}
  
  ---
  This article has been enhanced using competitor insights,
  improved clarity, and better structure.
  (Mock AI-generated content)
  `;
  }
  
  module.exports = mockRewrite;
  