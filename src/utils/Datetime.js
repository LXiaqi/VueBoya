export default {
    formateDate(time) {
        if(!time) return '';
        let date = new Date(time*1000);
        return date.getFullYear() +'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    }
}