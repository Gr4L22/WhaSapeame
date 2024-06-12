const { countries } = require('country-data');

document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country-select');
    const phoneNumberInput = document.getElementById('phone-number');
    const customMessageInput = document.getElementById('custom-message');
    const whatsappLink = document.getElementById('whatsapp-link');
    const languageSelect = document.getElementById('language-select');

    // Población del selector de países
    countries.all.forEach(country => {
        const option = document.createElement('option');
        option.value = country.countryCallingCodes[0];
        option.textContent = `${country.name} (${country.countryCallingCodes[0]})`;
        countrySelect.appendChild(option);
    });
    
    phoneNumberInput.addEventListener('input', updateWhatsAppLink);
    countrySelect.addEventListener('change', updateWhatsAppLink);
    customMessageInput.addEventListener('input', updateWhatsAppLink);
    languageSelect.addEventListener('change', updateWhatsAppLink);
    
    function traducirTexto(texto, idiomaDestino) {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|${idiomaDestino}`;
    
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.responseStatus === 200) {
                    return data.responseData.translatedText;
                } else {
                    throw new Error('No se pudo traducir el texto.');
                }
            });
    }
    const sendMessageCheckbox = document.getElementById('send-message-checkbox');
const customMessageContainer = document.getElementById('custom-message-container');

sendMessageCheckbox.addEventListener('change', function() {
    customMessageContainer.style.display = this.checked ? 'block' : 'none';
});

function updateWhatsAppLink() {
    const selectedCode = countrySelect.value;
    const phoneNumber = phoneNumberInput.value;
    const customMessage = customMessageInput.value;
    const selectedLanguage = languageSelect.value;
    const sendMessage = document.getElementById('send-message-checkbox').checked;

    let whatsappURL = `https://wa.me/${selectedCode}${phoneNumber.replace(/[^0-9]/g, '')}`;
    if (sendMessage && customMessage.trim() !== '') {
        traducirTexto(customMessage, selectedLanguage)
            .then(traduccion => {
                if (traduccion) {
                    whatsappURL += `?text=${encodeURIComponent(traduccion)}`;
                }
                whatsappLink.href = whatsappURL;
            })
            .catch(error => {
                console.error(error.message);
            });
    } else {
        whatsappLink.href = whatsappURL;
    }
}
});
