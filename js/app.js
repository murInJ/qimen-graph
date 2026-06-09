window.QM_APP=(function(){
const U=window.QM_UTILS,CORE=window.QM_CORE,RENDER=window.QM_RENDER,EXPORT=window.QM_EXPORT;
const state={chart:null,selectedPalaceNum:null};
function input(){return {date:U.parseDate(document.getElementById('dt').value),castMode:document.getElementById('castMode').value,school:document.getElementById('school').value,juMethod:document.getElementById('juMethod').value,topic:document.getElementById('topic').value,question:document.getElementById('question').value.trim()}}
function render(){state.chart=CORE.buildQimenChart(input());if(!state.selectedPalaceNum)state.selectedPalaceNum=state.chart.qimen.zhifuPalace||1;RENDER.renderChrome(state.chart);RENDER.renderSummary(state.chart);RENDER.renderBoard(state.chart,state.selectedPalaceNum,selectPalace);RENDER.renderDetail(state.chart,state.selectedPalaceNum,copyPalace)}
function selectPalace(num){state.selectedPalaceNum=num;RENDER.renderBoard(state.chart,state.selectedPalaceNum,selectPalace);RENDER.renderDetail(state.chart,state.selectedPalaceNum,copyPalace)}
async function copyFull(){if(!state.chart)render();await U.copyText(EXPORT.buildTextExport(state.chart));U.toast('完整盘面已复制')}
async function copyJson(){if(!state.chart)render();await U.copyText(JSON.stringify(state.chart,null,2));U.toast('JSON 已复制')}
function downloadJson(){if(!state.chart)render();const stamp=state.chart.input.localDatetime.replace(/[-:T]/g,'').slice(0,12);U.download(`qimen-chart-${stamp}.json`,JSON.stringify(state.chart,null,2))}
async function copyPalace(p,edges,mods){await U.copyText(EXPORT.buildPalaceExport(p,edges,mods));U.toast('本宫详情已复制')}
function init(){document.getElementById('dt').value=U.localInputValue(new Date());document.getElementById('setNowBtn').addEventListener('click',()=>{document.getElementById('dt').value=U.localInputValue(new Date());render()});document.getElementById('renderBtn').addEventListener('click',render);document.getElementById('topic').addEventListener('change',render);document.getElementById('copyFullBtn').addEventListener('click',copyFull);document.getElementById('copyJsonBtn').addEventListener('click',copyJson);document.getElementById('downloadJsonBtn').addEventListener('click',downloadJson);render()}
return {init,render};
})();
document.addEventListener('DOMContentLoaded',window.QM_APP.init);
