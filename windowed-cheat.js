function createWindow() {
  const windowContainer = document.createElement('div');
  windowContainer.style.position = 'fixed';
  windowContainer.style.top = '20px';
  windowContainer.style.right = '20px';
  windowContainer.style.width = '300px';
  windowContainer.style.height = '200px';
  windowContainer.style.backgroundColor = 'white';
  windowContainer.style.border = '2px solid black';
  windowContainer.style.zIndex = '9999';
  windowContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
  windowContainer.style.padding = '10px';
  windowContainer.style.fontFamily = 'Arial, sans-serif';
  windowContainer.style.overflowY = 'auto';

  const titleBar = document.createElement('div');
  titleBar.style.fontWeight = 'bold';
  titleBar.style.marginBottom = '10px';
  titleBar.innerText = 'GeoGuessr Cheat Menu';

  const closeButton = document.createElement('button');
  closeButton.innerText = '✖';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '5px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '16px';
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = () => {
    windowContainer.remove();
  };

  // Beispielinhalt – kann angepasst werden
  const content = document.createElement('div');
  content.innerHTML = `
    <p>Willkommen im Cheat-Tool 😎</p>
    <button onclick="alert('Hier könnte dein Cheat stehen 😈')">Test-Button</button>
  `;

  windowContainer.appendChild(titleBar);
  windowContainer.appendChild(closeButton);
  windowContainer.appendChild(content);
  document.body.appendChild(windowContainer);
}

// 💡 Automatischer Start des Fensters:
createWindow();
