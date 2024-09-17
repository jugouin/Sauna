export const ContactMessage = (formData) => {
    const { firstName, surname, phone, email, message } = formData;
    
    return {
        email: `${email}`,
        object: `Confirmation de la réception de votre message`,
        purpose: `Nouveau message`,

        killian: `${firstName} ${surname} écrit: 
            ${message}

            Coordonnées: 
            ${phone}
            ${email}`,

        message: `Bonjour ${firstName} ${surname},

        Nous vous confirmons la réception de votre message:

        ${message}

        Vos coordonnées: 
        ${phone}
        ${email}

        Nous allons vous répondre sous peu. 

        Cordialement,
        L'équipe K&Cie
        `.trim()
    };
};

export default ContactMessage;