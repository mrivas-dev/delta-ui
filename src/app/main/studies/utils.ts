export const fixDate = (date: string) => {
    var doo = new Date(date);
    return (new Date(doo.getTime() - doo.getTimezoneOffset() * -60000));
}