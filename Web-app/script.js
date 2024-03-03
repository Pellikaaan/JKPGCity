document.addEventListener("DOMContentLoaded", function() {
    // Fetch store data from the JSON file
    fetch('stores.json')
      .then(response => response.json())
      .then(data => {
        // Create a string to hold the HTML content
        let htmlContent = '';
  
        // Iterate over the array of store data
        data.forEach(store => {
          // Append store information to the HTML content string
          htmlContent += `
            <div class="store">
              <h2>${store.name}</h2>
              <p><a href="${store.url}">${store.name} Website</a></p>
              <p>District: ${store.district || 'N/A'}</p>
            </div>
          `;
        });
  
        // Create a Blob object from the HTML content string
        const blob = new Blob([htmlContent], { type: 'text/html' });
  
        // Create a link element to download the HTML file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'stores.html';
  
        // Append the link to the document body and trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error fetching store data:', error);
      });
  });
  