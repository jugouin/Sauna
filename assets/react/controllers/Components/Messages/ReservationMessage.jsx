export const ReservationMessage = (formData) => {
    const { name, surname, phone, email, date, privatized, remarks, personNb, saunaType } = formData;
    
    return {
        email: `${email}`,
        object: `Réservation du sauna confirmée – Merci !`,
        purpose: `Nouvelle réservation`,
        killian: `Nouvelle réservation de ${name} ${surname}

            - Type de sauna : ${saunaType}
            - Date et heure : ${new Date(date).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}
            - Nombre de personnes : ${personNb}
            - Sauna privatisé : ${privatized ? 'Oui' : 'Non'}
            ${remarks ? `Remarques : ${remarks}` : ''}

            Coordonnées: 
            ${phone}
            ${email}`,

        message: `Bonjour ${name} ${surname},

        Nous vous confirmons votre réservation pour le ${saunaType} sauna.

        Détails de la réservation :
        - Date et heure : ${new Date(date).toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' })}
        - Nombre de personnes : ${personNb}
        - Sauna privatisé : ${privatized ? 'Oui' : 'Non'}

        Informations de contact :
        - Téléphone : ${phone}
        - E-mail : ${email}

        ${remarks ? `Remarques : ${remarks}` : ''}

        Nous vous remercions de vous présenter avec vos linges de bain et 10 minutes avant le début de votre réservation.

        Si vous avez des questions, n'hésitez pas à nous contacter.

        Cordialement,
        L'équipe K&Cie
        `.trim()
    };
};

export default ReservationMessage;