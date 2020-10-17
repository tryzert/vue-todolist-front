import Vue from 'vue'
import Toast from './Toast.vue'


let toast = Vue.extend(Toast)
let instance

let timer = null

let toastMsg = (options)=> {
    if (!instance) {
        instance = new toast()
        document.body.append(instance.$mount().$el)
    }

    instance.duration = 2000;
    if (typeof options === 'string') {
        instance.message = options;
    } else if (typeof options === 'object') {
        instance.type = options.type;
        instance.message = options.message;
        instance.duration = options.duration || 2000;
    } else {
        return
    }
    instance.show = true;
    timer = setTimeout(()=>{
        instance.show = false;
        clearTimeout(timer);
        timer = null
    }, instance.duration);
}


export default toastMsg;