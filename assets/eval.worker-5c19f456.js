(function(){"use strict";function evalCode(code,params){const result=eval(`${code}
solution(${params})`);return{result}}self.addEventListener("message",async function(s){const t=s.data;try{const{code:e,param:a}=t,o=evalCode(e,a);self.postMessage(o)}catch(e){self.postMessage(e)}})})();
