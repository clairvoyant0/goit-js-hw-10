import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i}from"./assets/vendor-77e16229.js";document.querySelector(".form").addEventListener("submit",function(t){t.preventDefault();const s=parseInt(t.target.elements.delay.value),r=t.target.elements.state.value;new Promise((e,m)=>{setTimeout(()=>{r==="fulfilled"?e(s):m(s)},s)}).then(e=>{i.success({message:`Fulfilled promise in ${e}ms`})}).catch(e=>{i.error({message:`Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map