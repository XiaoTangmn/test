const copy ={
    bind(el,{value}){
        el.$value=value;
        console.log(el);
        el.hanlder=()=>{
            const text=document.createElement("textarea");
            text.readOnly="readonly";
            text.style.position="absolute";

            text.style.left="-9999px";
            text.value=el.$value;
            document.body.appendChild(text);
            // text
            text.select();
            const res=document.execCommand("Copy");
            if(res){
                console.log("复制成功");
            }
            // this.bind
            document.body.removeChild(text);

        }
        el.addEventListener('click',el.hanlder)
    },
    unbind(el){
        el.removeEventListener('click',el.hanlder)
    }
}
export default copy;