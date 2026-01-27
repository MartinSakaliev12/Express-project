


export class UserUtils {
    private AVATAR_COLORS = [
    "#1ABC9C", // turquoise
    "#2ECC71", // emerald
    "#3498DB", // peter river
    "#9B59B6", // amethyst
    "#34495E", // wet asphalt
    "#16A085", // green sea
    "#27AE60", // nephritis
    "#2980B9", // belize hole
    "#8E44AD", // wisteria
    "#2C3E50"  // midnight blue
];
    getInitials(name: string | null | undefined, email: string | null | undefined): string {
        // 1. Изчистваме входните данни
        const cleanName = name?.trim() || "";
        const cleanEmail = email?.trim() || "";

        // СЦЕНАРИЙ 1: Имаме Име (независимо дали има имейл)
        if (cleanName !== "") {
            const splitedName = cleanName.split(/\s+/);

            if (splitedName.length > 1) {
                // "Martin Sakaliev" -> MS
                return (splitedName[0][0] + splitedName[splitedName.length - 1][0]).toUpperCase();
            } else {
                const firstInitial = splitedName[0][0].toUpperCase();
                // Ако има имейл и първата му буква е различна -> ИмеПърваБуква + ИмейлПърваБуква
                if (cleanEmail !== "" && firstInitial !== cleanEmail[0].toUpperCase()) {
                    return firstInitial + cleanEmail[0].toUpperCase();
                }
                // Ако са еднакви или няма имейл -> Само първа буква от името
                return firstInitial;
            }
        }

        // СЦЕНАРИЙ 2: Нямаме име, но имаме Имейл
        if (cleanEmail !== "") {
            const [namePart] = cleanEmail.split('@');
            const splitedEmailName = namePart.split(/[._-]+/);

            if (splitedEmailName.length > 1) {
                // "martin.sakaliev@email.com" -> MS
                return (splitedEmailName[0][0] + splitedEmailName[splitedEmailName.length - 1][0]).toUpperCase();
            }
            return splitedEmailName[0][0].toUpperCase();
        }

        // СЦЕНАРИЙ 3: (Критичен за грешката) - Ако всичко е празно
        // Този ред гарантира, че функцията ВИНАГИ връща string
        return "?";
    }

     getColors(initials:string) {
    if (initials == "" || initials == null) {
        return this.AVATAR_COLORS[0]
    }
    let sum = 0;
    for (let i = 0; i < initials.length; i++) {
        sum += initials.charCodeAt(i)
    }
    const colorIndex = sum % 10
    return this.AVATAR_COLORS[colorIndex]
}
}