import Vue from 'vue'
import toast from './toast.vue'


let Toast = Vue.extend(toast)


let instance

let timer = null

let toastMsg = (options) => {
    if (!instance) {
        instance = new Toast()
        document.body.append(instance.$mount().$el)
    }
    instance.duration = 3000;
    if (typeof options === 'string') {
        instance.message = options
    } else if (typeof options === 'object'){
        instance.type = options.type
        instance.message = options.message
        instance.duration = options.duration || 3000
    } else {
        return
    }

    instance.show = true
    timer = setTimeout(() => {
        instance.show = false
        clearTimeout(timer)
        timer = null
    }, instance.duration)
}

export default toastMsg