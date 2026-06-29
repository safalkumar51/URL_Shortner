const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const encodeBase62 = (number) => {

    if (number === 0)
        return chars[0];

    let result = "";

    while (number > 0) {

        result = chars[number % 62] + result;

        number = Math.floor(number / 62);

    }

    return result;
}