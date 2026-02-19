// Tarea 6: Obtener datos usando fetch API
const apiUrl = './all_year_round_of_travel_api.json';

function fetchRecommendations() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            // Verificación en consola requerida por la tarea
            console.log("Datos recibidos de la API:", data);
            
            // Aquí puedes llamar a una función para procesar la búsqueda
            // handleSearch(data); 
        })
        .catch(error => {
            console.error('Error al obtener las recomendaciones:', error);
        });
}

// Ejecutar la función al cargar la página o al hacer clic en buscar
document.getElementById('searchBtn').addEventListener('click', fetchRecommendations);

// Tarea 2 (Restablecer): Lógica para limpiar la búsqueda
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    console.log("Búsqueda restablecida");
});


// Selección de elementos del DOM
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.querySelector('main'); // O el div donde mostrarás resultados

// Función para obtener y filtrar datos
function handleSearch() {
    const keyword = searchInput.value.toLowerCase().trim();
    const apiUrl = './all_year_round_of_travel_api.json';

    if (!keyword) {
        alert("Por favor, ingresa una palabra clave.");
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Datos para búsqueda:", data);
            
            let results = [];

            // Lógica de coincidencia por palabras clave (Tarea 7)
            if (keyword === 'playa' || keyword === 'playas' || keyword === 'beach' || keyword === 'beaches') {
                results = data.beaches;
            } 
            else if (keyword === 'templo' || keyword === 'templos' || keyword === 'temple' || keyword === 'temples') {
                results = data.temples;
            } 
            else {
                // Buscar en países
                const countryMatch = data.countries.find(c => c.name.toLowerCase().includes(keyword));
                if (countryMatch) {
                    results = countryMatch.cities;
                }
            }

            displayResults(results);
        })
        .catch(error => console.error("Error al buscar:", error));
}

// Función para mostrar los resultados en el HTML
function displayResults(results) {
    // Limpiar resultados anteriores (opcional, dependiendo de tu diseño)
    // resultsContainer.innerHTML = ''; 

    if (results.length === 0) {
        console.log("No se encontraron resultados para esta palabra clave.");
        return;
    }

    results.forEach(item => {
        console.log(`Resultado encontrado: ${item.name}`);
        // Aquí insertarás el HTML de las tarjetas de recomendación en la Tarea 8
    });
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    console.log("Búsqueda limpiada");
});


// Tarea 8: Función para mostrar las tarjetas de recomendación
function displayResults(results) {
    const resultsList = document.getElementById('results-list');
    
    // Limpiar resultados previos
    resultsList.innerHTML = '';

    if (results.length === 0) {
        resultsList.innerHTML = '<p class="no-results">No se encontraron recomendaciones.</p>';
        return;
    }

    // Mostrar al menos dos recomendaciones según la tarea
    results.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('recommendation-card');

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button class="btn-visit">Visit</button>
            </div>
        `;
        
        resultsList.appendChild(card);
    });
}

// Selección de elementos
const resultsList = document.getElementById('results-list');

/**
 * Tarea 9: Función para restablecer la búsqueda
 * Esta función limpia el campo de entrada y elimina los resultados de la pantalla.
 */
function resetSearch() {
    // 1. Limpiar el valor del cuadro de texto
    searchInput.value = '';

    // 2. Eliminar todos los elementos hijos del contenedor de resultados
    resultsList.innerHTML = '';

    // 3. Verificación en consola para desarrollo
    console.log("La búsqueda y los resultados han sido restablecidos.");
}

// Asignar la función al evento click del botón Restablecer
clearBtn.addEventListener('click', resetSearch);

// Tarea 10: Función para obtener la hora formateada de una zona horaria
function getLocalTime(timeZone) {
    // Configuración de opciones según los requisitos
    const options = { 
        timeZone: timeZone, 
        hour12: true, 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric' 
    };
    
    // Retorna la hora formateada en inglés (en-US)
    return new Date().toLocaleTimeString('en-US', options);
}

function displayResults(results) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    results.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('recommendation-card');

        // Obtenemos la hora local si la zona horaria está definida
        const currentTime = item.timeZone ? getLocalTime(item.timeZone) : "Time not available";

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p class="local-time"><strong>Current Time:</strong> ${currentTime}</p>
                <p>${item.description}</p>
                <button class="btn-visit">Visit</button>
            </div>
        `;
        
        resultsList.appendChild(card);
        
        // Verificación en consola como pide la tarea
        console.log(`Current time in ${item.name}:`, currentTime);
    });
}