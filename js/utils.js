window.QM_UTILS=(function(){
function pad(n){return String(n).padStart(2,'0')}
function mod(n,m){return ((n%m)+m)%m}
function clamp(n,min=0,max=100){return Math.max(min,Math.min(max,n))}
function localInputValue(d){return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`}
function parseDate(v){return v?new Date(v):new Date()}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function escapeSvg(s){return escapeHtml(s).replace(/#/g,'')}
async function copyText(text){if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(text);return}const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}
function download(filename,content,type='application/json'){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url)}
function toast(msg='已复制'){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(window.__qimenToastTimer);window.__qimenToastTimer=setTimeout(()=>el.classList.remove('show'),1600)}
return {pad,mod,clamp,localInputValue,parseDate,escapeHtml,escapeSvg,copyText,download,toast};
})();
