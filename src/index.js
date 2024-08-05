document.addEventListener('DOMContentLoaded', () => {
    const countrySelect = document.getElementById('country-select');
    const phoneNumberInput = document.getElementById('phone-number');
    const customMessageInput = document.getElementById('custom-message');
    const whatsappLink = document.getElementById('whatsapp-link');
    const languageSelect = document.getElementById('language-select');

    const countries = [
        { code: '+43', name: 'Austria'},
        { code: '+32', name: 'Belgium'},
        { code: '+385', name: 'Croatia'},
        { code: '+420', name: 'Czech Republic'},
        { code: '+45', name: 'Denmark'},
        { code: '+358', name: 'Finland'},
        { code: '+33', name: 'France'},
        { code: '+49', name: 'Germany'},
        { code: '+39', name: 'Italy'},
        { code: '+31', name: 'Netherlands'},
        { code: '+47', name: 'Norway'},
        { code: '+48', name: 'Poland'},
        { code: '+351', name: 'Portugal'},
        { code: '+34', name: 'Spain'},
        { code: '+46', name: 'Sweden'},
        { code: '+41', name: 'Switzerland'},
        { code: '+44', name: 'United Kingdom'},
        { code: '+54', name: 'Argentina'},
        { code: '+591', name: 'Bolivia'},
        { code: '+55', name: 'Brazil'},
        { code: '+56', name: 'Chile'},
        { code: '+57', name: 'Colombia'},
        { code: '+593', name: 'Ecuador'},
        { code: '+51', name: 'Peru'},
        { code: '+595', name: 'Paraguay'},
        { code: '+598', name: 'Uruguay'},
        { code: '+58', name: 'Venezuela'},
        { code: '+1', name: 'Canada'},
        { code: '+52', name: 'Mexico'},
        { code: '+1', name: 'United States'}
      ];
      

    // Población del selector de países
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.code} - ${country.name}`;
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
