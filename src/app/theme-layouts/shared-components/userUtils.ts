export const getNameInitials = (userName: string = ''): string => {
    const fullName = userName.split(' ')?.length > 1 ? userName.split(' ') : userName.split('^');

    return fullName ? `${fullName[0]?.charAt(0)} ${fullName[1]?.charAt(0)}` : 'Sin nombre';
}
export const parsePatientName = (userName: string) => {
    if(!userName){
        return ''
    }
    const splitedName = userName?.split(' ')?.length > 1 ? userName?.split(' ') : userName?.split('^');
    const lastName = splitedName[0]?.charAt(0).toUpperCase() + splitedName[0]?.slice(1).toLocaleLowerCase();
    const firstName = splitedName[1]?.charAt(0).toUpperCase() + splitedName[1]?.slice(1).toLocaleLowerCase();
    const secondName = splitedName.length > 1 ? splitedName[2]?.charAt(0).toUpperCase() + splitedName[2]?.slice(1).toLocaleLowerCase() : '';
    return `${lastName}${firstName ? `, ${firstName}` : ''}${secondName ? ` ${secondName}` : ''}`;
}