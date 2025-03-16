export const ReservationMessage = (formData) => {
    const { name, surname, phone, email, date, privatized, remarks, personNb, saunaType } = formData;

    let price;
    if (privatized) {
        price = saunaType === 'grand' ? 120 : 40;
    } else {
        price = personNb * 20;
    }
    
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

        Le prix de la réservation est de ${price} CHF, vous pouvez régler directement sur place en espèce ou par TWINT.

        Toute modification de la réservation doit être annoncée au moins 24 heures à l'avance. En cas de non-présentation, le montant total de la réservation reste dû.

        Nous vous remercions de vous présenter avec vos linges de bain et 10 minutes avant le début de votre réservation.

        Si vous avez des questions, n'hésitez pas à nous contacter.

        Cordialement,
        L'équipe K&Cie
        `.trim()
    };
};

export default ReservationMessage;
