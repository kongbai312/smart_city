//将数字变为带千分位的字符串
export const processNum = ( number : number ) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}