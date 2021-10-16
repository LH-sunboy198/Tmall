const cookie = {
    get(key) {
        if (document.cookie) {
            let cookies = document.cookie.split('; ');
            for (let i in cookies) {
                let item = cookies[i].split('=');
                if (item[0] === key) {
                    return item[1];
                }
            }
            return ''; // 遍历结束没有cookie 返回空字符串
        }
    },
    set(key, value, day) {
        if (typeof day === 'number') {
            let d = new Date();
            d.setDate(d.getDate() + day);
            document.cookie = `${key}=${value};expires=${d};path=/`;
        } else {
            document.cookie = `${key}=${value};path=/`;
        }

        return this; // 当函数支持链式调用
    },
    remove(key) {
        this.set(key, '', -1);
        return this;
    }
}


export default cookie;