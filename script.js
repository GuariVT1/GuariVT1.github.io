// JavaScript para el lector de texto y botón de volver arriba
document.addEventListener('DOMContentLoaded', function() {
    const btnTop = document.getElementById('btn-top');

    // Al hacer scroll, mostrar o ocultar el botón de volver arriba
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btnTop.style.display = 'block';
        } else {
            btnTop.style.display = 'none';
        }
    });

    // Al hacer clic en el botón de volver arriba, animar el scroll hacia arriba
    btnTop.addEventListener('click', function(e) {
        e.preventDefault();
        // Animar scroll hacia arriba con una función de animación
        scrollToTop();
    });

    // Obtener todos los botones Speak
    const btnSpeak = document.querySelectorAll('.btn-speak');

    // Escuchar texto al hacer clic en los botones Speak
    btnSpeak.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.getAttribute('data-text').trim();
            if (text) {
                readText(text);
            }
        });
    });
});

// Función para leer el texto
function readText(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = 'es-ES'; // Establecer el idioma (español)
    speech.text = text;
    speech.volume = 1; // 0 a 1
    speech.rate = 1; // 0.1 a 10
    speech.pitch = 1; // 0 a 2
    speech.voice = getFemaleVoice(); // Obtener una voz femenina

    window.speechSynthesis.speak(speech);
}

// Función para obtener una voz femenina
function getFemaleVoice() {
    let voices = window.speechSynthesis.getVoices();
    // Filtrar voces femeninas en español
    let femaleVoice = voices.find(voice => voice.lang === 'es-ES' && voice.name.includes('Femenina'));
    if (!femaleVoice) {
        // Si no encuentra una voz femenina específica, selecciona la primera voz disponible
        femaleVoice = voices.find(voice => voice.lang === 'es-ES');
    }
    return femaleVoice;
}

// Función para animar el scroll hacia arriba
function scrollToTop() {
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}
